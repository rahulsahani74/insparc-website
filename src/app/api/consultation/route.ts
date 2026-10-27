import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company,
      serviceInterest,
      preferredContact,
      businessChallenge,
      preferredTime,
    } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid work email address." },
        { status: 400 }
      );
    }

    if (!businessChallenge || businessChallenge.trim().length < 10) {
      return NextResponse.json(
        { error: "Please describe your business challenge or workflow requirements (at least 10 characters)." },
        { status: 400 }
      );
    }

    // In a production backend, this would trigger an n8n webhook or insert into Supabase / Resend.
    // We log it and return an official confirmation reference code.
    const referenceCode = `INSP-${Date.now().toString(36).toUpperCase()}`;

    console.warn("New Consultation Request Logged:", {
      referenceCode,
      name,
      email,
      phone,
      company,
      serviceInterest,
      preferredContact,
      preferredTime,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      referenceCode,
      message:
        "Your consultation request has been received. An automation architect will review your software stack and reach out within 24 business hours.",
    });
  } catch (err: unknown) {
    console.error("Consultation API error:", err);
    return NextResponse.json(
      { error: "Internal server error submitting consultation." },
      { status: 500 }
    );
  }
}
