
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileClock, Layers3 } from "lucide-react";
import { notFound } from "next/navigation";

import { AssetFrame } from "@/components/asset-frame";
import { collectionIds, collections, entries, getEntry, isCollectionId } from "@/lib/portfolio";

type Props = { params: Promise<{ collection: string; slug: string }> };

export function generateStaticParams() {
  return entries.map((item) => ({ collection: item.collection, slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection, slug } = await params;
  if (!isCollectionId(collection)) return {};
  const item = getEntry(collection, slug);
  return item ? { title: item.title, description: item.description } : {};
}

export default async function DetailPage({ params }: Props) {
  const { collection, slug } = await params;
  if (!isCollectionId(collection)) notFound();
  const item = getEntry(collection, slug);
  if (!item) notFound();

  return (
    <main id="main-content" className="site-container detail-main">
      <div className="back-row"><Link href={"/" + collection}><ArrowRight size={18} /> بازگشت به {collections[collection].title}</Link><span className="english-label">STRUCTURE PREVIEW</span></div>
      <div className="detail-grid">
        <article className="detail-content glass-panel">
          <div className="eyebrow"><Layers3 size={15} /> {item.category} / BIOGLASS</div>
          <h1>{item.title}</h1>
          <p className="detail-description">{item.description}</p>
          <div className="demo-alert"><FileClock size={21} /><p>این صفحه نمونه‌ی طراحی است؛ هنوز سند علمی، تصویر واقعی یا فایل دانلودی به آن متصل نشده است.</p></div>
          <h2>ساختار پیش‌بینی‌شده</h2>
          <ol className="detail-outline">{item.outline.map((text, index) => <li key={text}><span dir="ltr">0{index + 1}</span>{text}</li>)}</ol>
          <p className="detail-bottom-text">نسخه نهایی هر صفحه شامل اطلاعات منبع، تاریخ انتشار، پیوست‌ها و اعتبار علمی خواهد بود.</p>
        </article>
        <div className="detail-visual glass-panel">
          <div className="display-topline"><span>RESERVED / {item.asset.toUpperCase()}</span><span>+</span></div>
          <AssetFrame asset={item.asset} />
          <div className="detail-visual-caption">محل اَسِت اختصاصی این محتوا</div>
        </div>
      </div>
    </main>
  );
}
