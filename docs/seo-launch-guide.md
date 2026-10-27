# Google indexing and launch guide

Prepared 2026-10-26. This is a local implementation; no domain, hosting, or Search Console account was changed.

## Files already implemented

| Feature | Source | Public URL |
| --- | --- | --- |
| Public-page sitemap | `src/app/sitemap.ts` | `/sitemap.xml` |
| Crawler rules + sitemap reference | `src/app/robots.ts` | `/robots.txt` |
| Canonical, title, description, social metadata | `src/lib/seo.ts` | Each public page's HTML head |
| Default share image | `src/app/opengraph-image.tsx` | `/opengraph-image` |
| Brand icon | `src/app/icon.svg` | `/icon.svg` |
| Organization / WebSite structured data | `src/app/layout.tsx` | Server-rendered JSON-LD |
| Article metadata / structured data | `src/app/(marketing)/blog/[slug]/page.tsx` | Three article pages |
| Search Console verification support | `src/app/layout.tsx` | Optional `google-site-verification` meta |

The sitemap uses the configured origin in `src/config/site.ts` (`https://insparc.in`). It includes public services, products, industries, articles, and legal pages. Actual project pages join automatically when their data status changes from `placeholder` to `live`. It excludes order pages, APIs, thank-you pages, and placeholder project details. Dates are omitted unless a real per-page update date is available; rebuilding is not a content update.

`/orders`, `/order/[orderId]`, `/thank-you`, and placeholder project details have `noindex`. Crawlers may visit HTML pages to discover that directive. `robots.txt` blocks `/api/`. Neither robots nor noindex is access control; backend authentication is still required for customer records.

## Before making the site public

1. Confirm ownership of the intended domain. If it changes, update `siteConfig.url`, email/social details, and the domain text in `opengraph-image.tsx`. Use one HTTPS canonical origin.
2. Replace sample phone/WhatsApp details, confirm the business address, and verify social URLs. Add a real founder profile, genuine project screenshots, and verified project descriptions. Remove the fifth placeholder project or complete it before publishing it.
3. Have the legal drafts reviewed and replace legal placeholders. Review service/product claims, prices, setup estimates, and availability against what you actually provide.
4. Complete `docs/backend-plan.md` launch gates before accepting online payments. Existing API prototypes remain in this checkout; frontend inquiry buttons do not make them production-ready. Disable unfinished APIs at the hosting layer or complete their security controls before a public launch.
5. Deploy to hosting that supports this project's Next.js server routes. Configure the production domain, HTTPS, and redirects from alternate hosts such as `www` to the canonical host. Keep preview/staging deployments behind access protection or a host-level `X-Robots-Tag: noindex` rule.
6. Run `npm run lint` and `npm run build`. Start with `npm run start`, then run `node scripts/verify-frontend.mjs http://127.0.0.1:3000` for local Chromium checks. Verify mobile devices, keyboard/screen reader access, and Lighthouse on the real deployment as well.

## Connect Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Add a **Domain property** for the domain you own. Add Google's provided TXT record at your DNS provider, then verify ownership. Do not invent or reuse somebody else's verification value.
3. Alternatively, add a URL-prefix property for the exact HTTPS origin. Choose the HTML tag method and set the host environment variable `GOOGLE_SITE_VERIFICATION` to **only the content value** from Google's tag. Redeploy. The root layout emits the verification meta tag. This value is public verification information, not an API secret.
4. Check that `https://<your-domain>/sitemap.xml` and `/robots.txt` load publicly with HTTP 200.
5. In Search Console → Sitemaps, submit `sitemap.xml`.
6. Use URL Inspection on the homepage and the most important service/product pages. Test the live URL, check the canonical and indexability information, then request indexing where appropriate.
7. Monitor Page indexing, Sitemaps, and Core Web Vitals. Investigate server errors, redirects, missing pages, or excluded URLs. Submit revised content when it genuinely changes; do not repeatedly submit unchanged URLs.

Submitting a sitemap helps Google discover URLs; it does not guarantee indexing, ranking, or a particular timeline. Google also evaluates crawl access and the content it finds. Structured data likewise does not guarantee a rich result.

## Content work after launch

- Publish useful, original articles that address customers' real questions.
- Add actual project explanations and screenshots after removing private data. Only then change project status to `live`.
- Link related services, articles, and templates naturally. Avoid duplicated pages created solely for keywords.
- Keep important content in the server-rendered HTML; animation must remain an enhancement.
- Add real image assets with descriptive alternative text. Avoid fabricated reviews, certifications, client logos, and results.
- Do not introduce analytics/advertising scripts before deciding the privacy and consent requirements for that setup. No analytics tracker was added in this task.

## Primary references

- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: Ask to recrawl URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google: URL Inspection](https://support.google.com/webmasters/answer/9012289)
- [Next.js metadata file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)

## Service copy update - 2026-10-26

`/digital-marketing` is included in the sitemap with canonical/social metadata. Changed service URLs and the former knowledge-project URL permanently redirect to their new equivalents. Legacy order prototype pages now redirect to `/contact`. The 54 sitemap URLs were checked for successful responses and implementation-name-free visible copy/metadata. Search Console submission remains an owner launch step.
