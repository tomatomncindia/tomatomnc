import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/products`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/manufacturing`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/network`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/founders`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/compliance`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
