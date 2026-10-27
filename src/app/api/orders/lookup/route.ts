import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import { lookupOrders } from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, orderId } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required to look up orders." },
        { status: 400 }
      );
    }

    const orders = lookupOrders(email, orderId);

    return NextResponse.json({
      success: true,
      orders: orders.map((o) => ({
        orderId: o.orderId,
        productSlug: o.productSlug,
        productTitle: o.productTitle,
        amount: o.amount,
        currency: o.currency,
        paidAt: o.paidAt || o.createdAt,
        downloadToken: o.downloadToken,
      })),
    });
  } catch (err: unknown) {
    console.error("Order lookup error:", err);
    return NextResponse.json(
      { error: "Failed to query purchase records." },
      { status: 500 }
    );
  }
}
