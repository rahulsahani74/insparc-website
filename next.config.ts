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
  poweredByHeader: false,
  devIndicators: false,

  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
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
