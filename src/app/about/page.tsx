import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft, ArrowRight } from "lucide-react";
import { AssetFrame } from "@/components/asset-frame";
export const metadata:Metadata={title:"درباره این پورتفولیو",description:"معرفی و مسیر علمی صاحب پورتفولیوی BioGlass Studio"};
export default function AboutPage(){
 return <main id="main-content" className="v6-subpage v6-about-page">
  <div className="site-container">
   <div className="v6-crumb"><Link href="/"><ArrowRight size={17}/> خانه</Link><span dir="ltr">ABOUT / THE PERSON BEHIND THE WORK</span></div>
   <section className="v6-about-hero" aria-labelledby="about-title">
    <div className="v6-about-primary"><span className="v6-kicker" dir="ltr">A PERSONAL ACADEMIC NOTEBOOK</span><h1 id="about-title">پشت هر اثر،<br/><em>یک مسیر یادگیری.</em></h1>
     <p>این فضا برای نمایش و مستندسازی کارهای علمی یک دانشجوی دندان‌پزشکی طراحی شده است: پژوهش‌ها، فعالیت‌های دانشگاهی، پروژه‌ها و ارائه‌ها، در کنار منابع و فایل‌های مرتبط.</p>
     <div className="v6-about-divider"/>
     <span className="v6-about-status">اطلاعات فردی، دانشگاه و سوابق تنها پس از تأیید صاحب پورتفولیو منتشر می‌شوند.</span>
     <Link href="/research">مرور آرشیو پژوهش‌ها <ArrowUpLeft size={18}/></Link>
    </div>
    <div className="v6-about-image"><div className="v6-about-image-header" dir="ltr"><span>PERSONAL PORTRAIT</span><span>PLACEHOLDER / 001</span></div><AssetFrame asset="portrait"/><div className="v6-about-image-caption">جایگاه تصویر اختصاصی و تأییدشده صاحب پورتفولیو</div></div>
   </section>
   <section className="v6-about-principles" aria-label="اصول این آرشیو">
    <div><span dir="ltr">01 / DOCUMENT</span><h2>مستندسازی</h2><p>حفظ زمینه، منابع و مراحل هر اثر؛ نه صرفاً نمایش نتیجه نهایی.</p></div>
    <div><span dir="ltr">02 / LEARN</span><h2>یادگیری</h2><p>ثبت مسیر شکل‌گیری ایده‌ها و پیشرفت علمی در طول تحصیل.</p></div>
    <div><span dir="ltr">03 / SHARE</span><h2>اشتراک مسئولانه</h2><p>انتشار فقط محتوای علمی تأییدشده، با رعایت منبع و حریم خصوصی.</p></div>
   </section>
  </div>
 </main>;
}
