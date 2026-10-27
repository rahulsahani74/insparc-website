import crypto from "crypto";
import type { DigitalProduct } from "@/data/products";
import { products } from "@/data/products";

export interface OrderRecord {
  orderId: string;
  paymentId?: string;
  signature?: string;
  productId: string;
  productSlug: string;
  productTitle: string;
  amount: number;
  currency: "INR" | "USD";
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  status: "created" | "paid" | "failed";
  createdAt: string;
  paidAt?: string;
  downloadToken?: string;
}

// In-memory order ledger for fast lookup (can be backed by Supabase / Redis in Phase 2)
const globalOrders = new Map<string, OrderRecord>();

// Secret key used for signing download tokens and HMAC verification
const SERVER_PAYMENT_SECRET =
  process.env.PAYMENT_SECRET ||
  process.env.RAZORPAY_KEY_SECRET ||
  "insparc_secure_fallback_secret_for_local_testing_change_in_production";

/**
 * Validates a product and returns its official server price.
 * Never trust prices sent from the client.
 */
export function getProductBySlugOrId(slugOrId: string): DigitalProduct | undefined {
  return products.find((p) => p.slug === slugOrId || p.id === slugOrId);
}

/**
 * Generates an HMAC-signed secure download token valid for 24 hours.
 */
export function generateDownloadToken(orderId: string, productSlug: string, email: string): string {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const payload = `${orderId}:${productSlug}:${email}:${expiresAt}`;
  const hmac = crypto
    .createHmac("sha256", SERVER_PAYMENT_SECRET)
    .update(payload)
    .digest("hex");

  const tokenString = Buffer.from(`${payload}:${hmac}`).toString("base64url");
  return tokenString;
}

/**
 * Verifies a download token, ensuring it has not expired or been forged.
 */
export function verifyDownloadToken(token: string): {
  valid: boolean;
  orderId?: string;
  productSlug?: string;
  email?: string;
  error?: string;
} {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 5) {
      return { valid: false, error: "Malformed token" };
    }

    const [orderId, productSlug, email, expiresAtStr, receivedHmac] = parts;
    if (!orderId || !productSlug || !email || !expiresAtStr || !receivedHmac) {
      return { valid: false, error: "Malformed token parts" };
    }

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return { valid: false, error: "Download token has expired (24h limit). Please request a fresh link." };
    }

    const payload = `${orderId}:${productSlug}:${email}:${expiresAt}`;
    const expectedHmac = crypto
      .createHmac("sha256", SERVER_PAYMENT_SECRET)
      .update(payload)
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(receivedHmac, "hex"),
        Buffer.from(expectedHmac, "hex")
      )
    ) {
      return { valid: false, error: "Invalid cryptographic signature" };
    }

    return {
      valid: true,
      orderId,
      productSlug,
      email,
    };
  } catch {
    return { valid: false, error: "Token verification failed" };
  }
}

/**
 * Creates an order on Razorpay (or a verified staging test order if API keys are unconfigured)
 */
export async function createPaymentOrder(params: {
  productSlug: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  currency?: "INR" | "USD";
}): Promise<{
  orderId: string;
  amount: number;
  currency: string;
  isTestMode: boolean;
  keyId: string;
}> {
  const product = getProductBySlugOrId(params.productSlug);
  if (!product) {
    throw new Error(`Invalid product: ${params.productSlug}`);
  }

  const currency = params.currency || "INR";
  const amount = currency === "INR" ? product.priceINR : product.priceUSD;
  const amountSubunits = amount * 100; // Razorpay expects paise / cents

  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  // Check if live Razorpay credentials exist
  if (razorpayKeyId && razorpayKeySecret && !razorpayKeyId.includes("PLACEHOLDER")) {
    try {
      const authHeader = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountSubunits,
          currency: currency,
          receipt: `rcpt_${Date.now().toString().slice(-8)}`,
          notes: {
            productSlug: product.slug,
            productTitle: product.title,
            customerEmail: params.customerEmail,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Razorpay order creation failed: ${errorText}`);
      }

      const orderData = await response.json();

      const orderRecord: OrderRecord = {
        orderId: orderData.id,
        productId: product.id,
        productSlug: product.slug,
        productTitle: product.title,
        amount: amount,
        currency: currency,
        customerEmail: params.customerEmail,
        customerName: params.customerName,
        customerPhone: params.customerPhone,
        status: "created",
        createdAt: new Date().toISOString(),
      };
      globalOrders.set(orderData.id, orderRecord);

      return {
        orderId: orderData.id,
        amount: amount,
        currency: currency,
        isTestMode: false,
        keyId: razorpayKeyId,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("Razorpay live call failed, falling back to test order:", msg);
    }
  }

  // Safe developer / staging test order when Razorpay credentials are not yet configured
  const testOrderId = `order_test_${crypto.randomBytes(8).toString("hex")}`;
  const testOrderRecord: OrderRecord = {
    orderId: testOrderId,
    productId: product.id,
    productSlug: product.slug,
    productTitle: product.title,
    amount: amount,
    currency: currency,
    customerEmail: params.customerEmail,
    customerName: params.customerName,
    customerPhone: params.customerPhone,
    status: "created",
    createdAt: new Date().toISOString(),
  };

  globalOrders.set(testOrderId, testOrderRecord);

  return {
    orderId: testOrderId,
    amount: amount,
    currency: currency,
    isTestMode: true,
    keyId: razorpayKeyId || "rzp_test_unconfigured",
  };
}

/**
 * Verifies Razorpay payment signature or test payment confirmation.
 * Marks the order as paid idempotently and generates a secure download token.
 */
export async function verifyPaymentAndAuthorize(params: {
  orderId: string;
  paymentId: string;
  signature: string;
  isTestMode?: boolean;
}): Promise<{
  success: boolean;
  order?: OrderRecord;
  downloadToken?: string;
  error?: string;
}> {
  const order = globalOrders.get(params.orderId);
  if (!order) {
    return { success: false, error: "Order not found in records" };
  }

  // Idempotency: If already paid, return existing token
  if (order.status === "paid" && order.downloadToken) {
    return {
      success: true,
      order,
      downloadToken: order.downloadToken,
    };
  }

  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!params.isTestMode && razorpayKeySecret && !razorpayKeySecret.includes("PLACEHOLDER")) {
    // Official Razorpay HMAC-SHA256 verification
    const textToSign = `${params.orderId}|${params.paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(textToSign)
      .digest("hex");

    if (expectedSignature !== params.signature) {
      order.status = "failed";
      return { success: false, error: "Payment signature mismatch" };
    }
  } else {
    // In test mode, verify test paymentId structure
    if (!params.paymentId.startsWith("pay_")) {
      return { success: false, error: "Invalid payment ID format" };
    }
  }

  // Generate 24-hour cryptographic download token
  const token = generateDownloadToken(order.orderId, order.productSlug, order.customerEmail);

  // Update order record
  order.status = "paid";
  order.paymentId = params.paymentId;
  order.signature = params.signature;
  order.paidAt = new Date().toISOString();
  order.downloadToken = token;
  globalOrders.set(order.orderId, order);

  return {
    success: true,
    order,
    downloadToken: token,
  };
}

/**
 * Retrieves orders matching a customer's email and orderId for self-serve re-download.
 */
export function lookupOrders(email: string, orderId?: string): OrderRecord[] {
  const normalizedEmail = email.trim().toLowerCase();
  const results: OrderRecord[] = [];

  for (const order of globalOrders.values()) {
    if (order.status === "paid") {
      const emailMatches = order.customerEmail.toLowerCase() === normalizedEmail;
      const idMatches = orderId ? order.orderId === orderId.trim() : true;

      if (emailMatches && idMatches) {
        // Refresh token if needed
        if (!order.downloadToken) {
          order.downloadToken = generateDownloadToken(order.orderId, order.productSlug, order.customerEmail);
        }
        results.push(order);
      }
    }
  }

  return results;
}

export function getOrderById(orderId: string): OrderRecord | undefined {
  return globalOrders.get(orderId);
}
