import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyDownloadToken } from "@/lib/payment";
import { getProductBySlugOrId } from "@/data/products";

// Rate limiting in-memory map (IP/token -> count)
const downloadRateLimit = new Map<string, { count: number; resetAt: number }>();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const requestedFileName = searchParams.get("file");

    if (!token || !requestedFileName) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required token or file parameter." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Rate Limiting: max 30 downloads per 10 minutes per token
    const clientKey = token.slice(0, 32);
    const now = Date.now();
    const rateData = downloadRateLimit.get(clientKey);

    if (rateData) {
      if (now < rateData.resetAt) {
        if (rateData.count >= 30) {
          return new NextResponse(
            JSON.stringify({ error: "Download rate limit exceeded. Please wait 10 minutes." }),
            { status: 429, headers: { "Content-Type": "application/json" } }
          );
        }
        rateData.count++;
      } else {
        downloadRateLimit.set(clientKey, { count: 1, resetAt: now + 10 * 60 * 1000 });
      }
    } else {
      downloadRateLimit.set(clientKey, { count: 1, resetAt: now + 10 * 60 * 1000 });
    }

    // Cryptographic Token Verification
    const verification = verifyDownloadToken(token);
    if (!verification.valid || !verification.productSlug) {
      return new NextResponse(
        JSON.stringify({
          error: verification.error || "Unauthorized: Invalid or expired download token.",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify file belongs to product
    const product = getProductBySlugOrId(verification.productSlug);
    if (!product) {
      return new NextResponse(
        JSON.stringify({ error: "Product record not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Clean and sanitize file name (prevent directory traversal)
    const sanitizedFileName = path.basename(requestedFileName.trim());
    const isAllowedFile = product.downloadFiles.some(
      (f: { fileName: string }) => path.basename(f.fileName) === sanitizedFileName
    );

    if (!isAllowedFile) {
      return new NextResponse(
        JSON.stringify({ error: "The requested file is not part of this purchased package." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Resolve private file path
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      "downloads",
      product.slug,
      sanitizedFileName
    );

    if (!fs.existsSync(filePath)) {
      return new NextResponse(
        JSON.stringify({ error: "The requested file is temporarily unavailable. Please contact support." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    // Determine MIME type
    let contentType = "application/octet-stream";
    if (sanitizedFileName.endsWith(".json")) {
      contentType = "application/json";
    } else if (sanitizedFileName.endsWith(".md") || sanitizedFileName.endsWith(".txt")) {
      contentType = "text/markdown; charset=utf-8";
    } else if (sanitizedFileName.endsWith(".pdf")) {
      contentType = "application/pdf";
    }

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${sanitizedFileName}"`,
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: unknown) {
    console.error("Secure download error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error during download stream." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
