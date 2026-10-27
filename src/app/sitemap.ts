import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/services", "/digital-marketing", "/products", "/industries", "/projects", "/demo", "/audit", "/about", "/contact", "/faq", "/blog", "/resources", "/careers", "/roi-calculator", "/privacy-policy", "/terms-and-conditions", "/refund-policy", "/cookie-policy", "/disclaimer", "/security", "/accessibility"];
  const routes = [
    ...staticRoutes,
    ...products.map((item) => `/products/${item.slug}`),
    ...services.map((item) => `/services/${item.slug}`),
    ...industries.map((item) => `/industries/${item.slug}`),
    // Placeholder portfolios are preview content, not verified case studies.
    ...projects.filter((item) => item.status !== "placeholder").map((item) => `/projects/${item.slug}`),
    ...articles.map((item) => `/blog/${item.slug}`),
  ];
  // Do not claim every URL changed today. Add lastModified when an actual per-page date exists.
  return Array.from(new Set(routes)).map((route) => ({ url: new URL(route, siteConfig.url).href }));
}
