import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { AssetFrame } from "@/components/asset-frame";
import Image from "next/image";
import { ScienceGallery } from "@/components/science-gallery";
import { collectionIds, collections, entriesFor, isCollectionId } from "@/lib/portfolio";

type Props={params:Promise<{collection:string}>};
export function generateStaticParams(){return collectionIds.map(collection=>({collection}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {collection}=await params;
 return isCollectionId(collection)?{title:collections[collection].title,description:collections[collection].description,openGraph:{images:[{url:collection==="research"?"/assets/bioglass/G18_opengraph-research.webp":"/assets/bioglass/G17_opengraph-main.webp",width:1672,height:941}]}}:{};
}
export default async function CollectionPage({params}:Props){
 const {collection}=await params;
 if(!isCollectionId(collection))notFound();
 const category=collections[collection],items=entriesFor(collection);
 return <main id="main-content" className="v6-subpage v6-archive-page">
  <div className="site-container">
   <div className="v6-crumb"><Link href="/"><ArrowRight size={17}/> خانه</Link><span dir="ltr">ARCHIVE / {category.index}</span></div>
   <header className="v6-page-hero">
    <div className="v6-page-hero-top" dir="ltr"><span>BIOGLASS / ACADEMIC WORKS</span><span>COLLECTION 0{collectionIds.indexOf(collection)+1}</span></div>
    <div className="v6-page-hero-main"><div><span className="v6-kicker" dir="ltr">{category.english}</span><h1>{category.title}<span>.</span></h1></div><p>{category.description}</p></div>
    <div className="v6-page-hero-bottom" dir="ltr"><span>OPEN ARCHIVE / EDITION 01</span><span>SELECTED DOCUMENT TEMPLATES</span></div>
   </header>
   <div className="v7-collection-banner">
     <div className="v7-collection-banner-image"><Image src={collection==="research"?"/assets/bioglass/G06_research-biomaterials.webp":collection==="projects"?"/assets/bioglass/G10_project-lab.webp":collection==="presentations"?"/assets/bioglass/G08_presentation-light.webp":"/assets/bioglass/G11_gallery-specimen.webp"} width={1122} height={1402} sizes="(max-width:700px) 100vw, 36vw" alt="تصویر هنری مفهومی اختصاصی مجموعه" loading="lazy"/></div>
     <div><span dir="ltr">A STUDY IN MATERIAL / ARTISTIC PLATE</span><p>جلد هنری ساخته‌شده برای این مجموعه است، نه تصویر مستند یک پژوهش یا بیمار.</p></div>
   </div>
   <section className="v6-publications" aria-labelledby="publication-heading">
    <div className="v6-section-head"><div><span className="v6-kicker" dir="ltr">CONTENTS / INDEX</span><h2 id="publication-heading">فهرست صفحات<span className="v6-period">.</span></h2></div><p>برای مشاهده ساختار و اطلاعات هر صفحه روی عنوان آن بزنید.</p></div>
    <div className="v6-publication-list">
     {items.map((item,n)=><article key={item.slug} className="v6-publication-row">
      <span className="v6-publication-number" dir="ltr">{String(n+1).padStart(2,"0")}</span>
      <Link href={"/"+collection+"/"+item.slug} className="v6-publication-cover" aria-label={"مشاهده "+item.title}><AssetFrame asset={item.asset}/></Link>
      <div className="v6-publication-copy"><span className="v6-publication-type">{item.category} <i/> ساختار نمایشی</span><h3><Link href={"/"+collection+"/"+item.slug}>{item.title}</Link></h3><p>{item.description}</p></div>
      <Link className="v6-publication-action" href={"/"+collection+"/"+item.slug} aria-label={"مشاهده جزئیات "+item.title}><ArrowUpLeft size={23}/></Link>
     </article>)}
    </div>
   </section>
   {collection==="gallery"?<ScienceGallery/>:null}
   <aside className="v6-archive-disclaimer"><span dir="ltr">EDITORIAL NOTE / 001</span><p>این‌ها قالب‌های نمونه برای نمایش ساختار آرشیو هستند، نه پژوهش‌ها یا ارائه‌های منتشرشده. فایل واقعی و اطلاعات مستند پس از تأیید صاحب پورتفولیو جایگزین خواهند شد.</p></aside>
  </div>
 </main>;
}
