import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import { verifyPaymentAndAuthorize } from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, paymentId, signature, isTestMode } = body;

    if (!orderId || !paymentId) {
      return NextResponse.json(
        { error: "Order ID and Payment ID are required." },
        { status: 400 }
      );
    }

    const result = await verifyPaymentAndAuthorize({
      orderId,
      paymentId,
      signature: signature || "test_sig",
      isTestMode: Boolean(isTestMode),
    });

    if (!result.success || !result.order) {
      return NextResponse.json(
        { error: result.error || "Payment verification failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: result.order.orderId,
      productSlug: result.order.productSlug,
      productTitle: result.order.productTitle,
      customerEmail: result.order.customerEmail,
      amount: result.order.amount,
      currency: result.order.currency,
      downloadToken: result.downloadToken,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to verify payment.";
    console.error("Verification error:", err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
