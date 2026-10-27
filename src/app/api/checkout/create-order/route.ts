import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import { createPaymentOrder, getProductBySlugOrId } from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productSlug, customerName, customerEmail, customerPhone, currency } = body;

    if (!productSlug || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Product slug, name, and email are required fields." },
        { status: 400 }
      );
    }

    // Verify product exists and get server-authoritative price
    const product = getProductBySlugOrId(productSlug);
    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${productSlug}` },
        { status: 404 }
      );
    }

    const order = await createPaymentOrder({
      productSlug,
      customerName,
      customerEmail,
      customerPhone,
      currency: currency === "USD" ? "USD" : "INR",
    });

    return NextResponse.json({
      success: true,
      orderId: order.orderId,
      amount: order.amount,
      currency: order.currency,
      isTestMode: order.isTestMode,
      keyId: order.keyId,
      productTitle: product.title,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create payment order.";
    console.error("Order creation error:", err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
