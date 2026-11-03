import type { MetadataRoute } from "next";
import { blogs } from "#site/content";
import { siteConfig } from "@/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: siteConfig.origin, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.origin}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.origin}/blogs`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const posts: MetadataRoute.Sitemap = blogs
    .filter((blog) => blog.published)
    .map((blog) => ({
      url: `${siteConfig.origin}/blogs/${blog.slugAsParams}`,
      lastModified: new Date(blog.date),
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  return [...pages, ...posts];
}
