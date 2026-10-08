
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { PortfolioCard } from "@/components/portfolio-card";
import { collectionIds, collections, entriesFor, isCollectionId } from "@/lib/portfolio";

type Props = { params: Promise<{ collection: string }> };

export function generateStaticParams() {
  return collectionIds.map((collection) => ({ collection }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await params;
  if (!isCollectionId(collection)) return {};
  return { title: collections[collection].title, description: collections[collection].description };
}

export default async function CollectionPage({ params }: Props) {
  const { collection } = await params;
  if (!isCollectionId(collection)) notFound();

  const group = collections[collection];
  const items = entriesFor(collection);
  return (
    <main id="main-content" className="site-container listing-main">
      <div className="back-row"><Link href="/"><ArrowRight size={18} /> بازگشت به خانه</Link><span className="english-label">{group.english}</span></div>
      <header className="page-heading glass-panel">
        <div className="eyebrow">BIOGLASS ARCHIVE / {group.index}</div>
        <h1>{group.title}</h1>
        <p>{group.description}</p>
        <div className="archive-status"><span className="pulse-dot" /> در حال آماده‌سازی محتوا و اَسِت‌ها</div>
      </header>
      <div className="section-heading listing-heading">
        <div><div className="eyebrow">STRUCTURE PREVIEW</div><h2>چیدمان نمونه‌ها</h2></div>
        <p>این موارد فقط برای نمایش قالب ساخته شده‌اند؛ فایل، مقاله یا تصویر واقعی هنوز بارگذاری نشده است.</p>
      </div>
      <div className="portfolio-grid">{items.map((item) => <PortfolioCard item={item} key={item.slug} />)}</div>
      <aside className="empty-notice glass-panel">
        <span>+</span>
        <div><strong>آماده افزودن محتوای واقعی</strong><p>پس از آماده شدن مقاله‌ها، ارائه‌ها و تصاویر، نمونه‌ها با محتوای تأییدشده جایگزین می‌شوند.</p></div>
        <Link href="/about">درباره پروژه <ArrowUpLeft size={16} /></Link>
      </aside>
    </main>
  );
}
