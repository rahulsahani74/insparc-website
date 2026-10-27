import type { NextConfig } from "next";

// Security headers applied to every route.
// CSP with nonce will be added in middleware (Phase 2).
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  distDir: process.env.INSPARC_BUILD_DIR || ".next",
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  devIndicators: false,

  async redirects() { return [{"source":"/services/n8n-workflow-automation","destination":"/services/workflow-automation","permanent":true},{"source":"/services/document-ai","destination":"/services/document-processing","permanent":true},{"source":"/services/api-saas-integrations","destination":"/services/business-coordination","permanent":true},{"source":"/services/rag-knowledge-assistants","destination":"/services/knowledge-assistants","permanent":true},{"source":"/services/custom-automation-consulting","destination":"/services/business-audit","permanent":true},{"source":"/services/analytics-marketing-automation","destination":"/services/marketing-performance","permanent":true},{"source":"/projects/rag-knowledge-bot","destination":"/projects/knowledge-support","permanent":true}]; },

  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/landing-pages/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },

  // Images: allow only local public/ folder for now; extend when adding external sources.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // Strict React mode for catching side-effects early.
  reactStrictMode: true,
};

export default nextConfig;
