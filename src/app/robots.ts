import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const baseUrl = siteConfig.url || "https://insparc.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Allow crawlers to read noindex on order and thank-you pages.
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
