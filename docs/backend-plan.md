# Backend plan — after frontend review

No backend integration was implemented in the frontend polish task. The existing `src/app/api` and `src/lib/payment.ts` are prototypes, not a production backend.

## Proposed stack

| Need | Tool | Purpose |
| --- | --- | --- |
| Application backend | Next.js Route Handlers + Zod | Validate requests and keep credentials on the server |
| Durable data | Supabase Postgres | Leads, customers, orders, payment events, download entitlements |
| Admin identity | Supabase Auth + MFA | Restricted admin access and audit trails |
| Transactional email | Resend | Inquiry notifications, receipts, verified purchase-access links |
| Automation | n8n Cloud or an operated self-hosted instance | Signed webhooks and business workflows |
| Spam protection | Cloudflare Turnstile + honeypot | Public-form abuse controls |
| Shared rate limiting | Managed Redis, such as Upstash | Limits that work across application instances |
| Payments, when ready | Razorpay | Server-created orders, signature verification, captured-payment checks and webhooks |
| Private downloads | Supabase private Storage | Short-lived links after entitlement checks |
| Error monitoring | Sentry or an equivalent service | Operational errors with personal data redacted |
| AI, later and optional | Selected model provider's server API | Budgeted assistant/idea features after the core flows work |

This is an implementation proposal, not a purchase requirement. Check current terms, plan limits, regions, and prices before creating paid accounts. Hosting must support the current Next.js routes and private server credentials.

## Implement in this order

### 1. Lead collection

Create a `leads` table with RLS and a server-only insert path. Validate the name, email, phone, consent where applicable, selected service, and message on the server. Add body-size limits, Turnstile, a server-validated honeypot, rate limits, and generic errors. Save the lead first, then queue a notification and signed n8n event. Record retry status so a temporary email failure does not lose the lead. Show a genuine received confirmation only after durable acceptance.

Currently, the consultation form prepares a brief in the browser and explicitly asks the visitor to send it using WhatsApp or email. It does not call the logging-only prototype API or claim a booking was received.

### 2. Operations and admin

Build an authenticated admin view with MFA and roles. Add lead status changes, minimal audit events, retention rules, export/deletion handling, and backups. Keep service/secret keys server-side; Supabase's elevated keys bypass RLS. Restrict data access deliberately, rather than relying on an obscured URL.

### 3. Payments and entitlements

Replace the process-memory order Map with persistent database records. Create orders server-side using catalog prices. Persist the expected amount, currency, product, customer, and gateway order ID. Never trust a client `isTestMode` flag. Test and live mode must be fixed by server environment and isolated records. A gateway failure must fail the checkout, not fall back to an authorized fake payment.

Verify the Razorpay signature using the server's original order ID. Confirm the expected payment state, amount, and currency before granting access. Verify webhook signatures over the raw body, handle repeated events idempotently, and reconcile delayed/missed callbacks. Do not assume a browser success message alone proves payment was captured.

The frontend currently offers a product inquiry dialog. It collects no payment. Reintroduce payment UI only after the full verified path exists.

### 4. Purchase access and downloads

Require a verified email link, authenticated customer session, or equivalent ownership proof. An email address alone is not sufficient to return order details or download credentials. Check a paid entitlement server-side before creating a short-lived private Storage link. Persist refund/revocation status and make link expiry and renewal work predictably. Use a configured signing secret with no fallback secret, shared rate limits, and logs without personal data or tokens.

### 5. AI features

Add only after leads/orders work reliably. Define each feature's job, approved data access, input limits, per-user/IP limits, total daily budget, and output handling. Treat user text and retrieved content as untrusted. Use human approval for consequential actions. A marketing demo should remain labeled as a simulation until it is connected to a real service.

## Existing prototype issues to resolve before launch

- Consultation handler logs personal details and returns success without durable storage or delivery.
- Orders live only in a process-local Map and will not survive restarts or coordinate across instances.
- Verification trusts a client-controlled test-mode flag; the test path accepts a payment ID prefix.
- Payment creation can fall back to test orders after a live gateway error.
- Download signing uses a hardcoded fallback secret when configuration is missing.
- Email-only order lookup returns order/download information without proving ownership.
- Some input validation and limits are incomplete; the download limiter is process-local.
- Order rendering has a preview fallback even when a record does not exist.

Do not expose those endpoints publicly until they are replaced or disabled. No live keys, provider accounts, external messages, or real payments were used in the frontend task.

## Account/configuration checklist for the backend phase

Supabase project and region; mail-sending domain with DNS verification; n8n instance and webhook secret; Turnstile site/secret values; shared rate-limit store; Razorpay merchant/KYC and separate test/live credentials when commerce is approved; private storage bucket; monitoring; hosting domain/SSL and backup ownership. Set values in the host's protected environment settings and a local ignored environment file. Never send secret keys through chat or store them in public config.

## References

- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase: Secure data and elevated keys](https://supabase.com/docs/guides/database/secure-data)
- [Razorpay: Standard Checkout integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/)
- [n8n hosting](https://docs.n8n.io/hosting/)
