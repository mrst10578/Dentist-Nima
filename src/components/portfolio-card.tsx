
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

import { AssetFrame } from "@/components/asset-frame";
import type { PortfolioItem } from "@/lib/portfolio";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="portfolio-card glass-panel">
      <Link
        className="portfolio-card-media"
        href={"/" + item.collection + "/" + item.slug}
        aria-label={"مشاهده " + item.title}
      >
        <AssetFrame asset={item.asset} />
      </Link>
      <div className="portfolio-card-body">
        <div className="card-meta">
          <span>{item.category}</span>
          <span>نمونه چیدمان</span>
        </div>
        <h3><Link href={"/" + item.collection + "/" + item.slug}>{item.title}</Link></h3>
        <p>{item.description}</p>
        <Link href={"/" + item.collection + "/" + item.slug} className="text-link">
          مشاهده ساختار <ArrowUpLeft size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
