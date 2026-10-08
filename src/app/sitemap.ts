
import type { MetadataRoute } from "next";

import { collectionIds, entries } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", ...collectionIds.map((id) => "/" + id), ...entries.map((item) => "/" + item.collection + "/" + item.slug)];
  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.6,
  }));
}
