import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const baseUrl =
  siteConfig.url === "[YOUR_DOMAIN_URL]" ? "http://localhost:3000" : siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/services",
    "/projects",
    "/demo",
    "/pricing",
    "/about",
    "/contact",
    "/faq",
    "/blog",
    "/resources",
    "/careers",
    "/roi-calculator",
    "/industries",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
