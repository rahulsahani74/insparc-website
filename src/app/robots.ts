import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const baseUrl =
  siteConfig.url === "[YOUR_DOMAIN_URL]" ? "http://localhost:3000" : siteConfig.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
