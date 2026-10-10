import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpLeft, FileText, Link2, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";
import { AssetFrame } from "@/components/asset-frame";
import { collections,entries,getEntry,isCollectionId } from "@/lib/portfolio";
type Props={params:Promise<{collection:string;slug:string}>};
export function generateStaticParams(){return entries.map(e=>({collection:e.collection,slug:e.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {collection,slug}=await params;
 if(!isCollectionId(collection))return{};
 const item=getEntry(collection,slug);
 return item?{title:item.title,description:item.description}:{};
}
export default async function DetailPage({params}:Props){
 const {collection,slug}=await params;
 if(!isCollectionId(collection))notFound();
 const item=getEntry(collection,slug);if(!item)notFound();
 return <main id="main-content" className="v6-subpage v6-detail-page">
  <div className="site-container">
   <div className="v6-crumb"><Link href={"/"+collection}><ArrowRight size={17}/> بازگشت به {collections[collection].title}</Link><span dir="ltr">WORK / EDITORIAL PREVIEW</span></div>
   <header className="v6-detail-heading"><div className="v6-overline"><span className="v6-dash"/> <span dir="ltr">BIOGLASS / WORK RECORD</span></div>
    <div className="v6-detail-title-grid"><div><span className="v6-detail-category">{item.category} / نمونه ساختار</span><h1>{item.title}</h1></div><p>{item.description}</p></div>
   </header>
   <div className="v6-detail-meta" aria-label="اطلاعات اثر"><span><FileText size={17}/> نوع اثر: {item.category}</span><span><CalendarDays size={17}/> زمان انتشار: ثبت نشده</span><span><Link2 size={17}/> سند اصلی: بارگذاری نشده</span></div>
   <div className="v6-detail-art"><div className="v6-detail-plate-label" dir="ltr"><span>PLATE / RESERVED</span><span>CONTENT AWAITING REVIEW</span></div><AssetFrame asset={item.asset}/></div>
   <div className="v6-detail-body">
    <article className="v6-detail-article">
     <span className="v6-kicker" dir="ltr">DOCUMENT STRUCTURE / 001</span>
     <h2>درباره این صفحه</h2>
     <p>این صفحه برای ارائه یک اثر علمی در آرشیو شخصی طراحی شده است. هنوز محتوای پژوهشی یا دستاورد مشخصی به آن اختصاص داده نشده است.</p>
     <h2>سرفصل‌های پیش‌بینی‌شده</h2>
     <ol>{item.outline.map((line,i)=><li key={line}><span dir="ltr">0{i+1}</span><strong>{line}</strong></li>)}</ol>
    </article>
    <aside className="v6-detail-sidebar"><span className="v6-kicker" dir="ltr">DOCUMENT STATUS</span><strong>در انتظار محتوای واقعی</strong><p>پس از افزودن متن تأییدشده، منابع و فایل‌های ارائه، اطلاعات این بخش کامل می‌شوند.</p><div className="v6-file-placeholder"><FileText size={22}/><span>هنوز فایل قابل دریافت وجود ندارد</span></div><Link href={"/"+collection}>بازگشت به مجموعه <ArrowUpLeft size={17}/></Link></aside>
   </div>
  </div>
 </main>;
}
