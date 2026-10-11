import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
export const metadata:Metadata={title:"درباره این پورتفولیو",description:"درباره آرشیو علمی و دانشجویی BioGlass Studio"};
export default function AboutPage(){
 return <main id="main-content" className="site-container atlas-about-page">
   <div className="atlas-breadcrumb"><Link href="/"><ArrowRight size={17}/> صفحه اصلی</Link><span dir="ltr">ABOUT / PERSONAL PRACTICE</span></div>
   <header className="atlas-about-header"><span dir="ltr">BIOGLASS / PERSONAL ACADEMIC ARCHIVE</span><h1>پشت هر اثر،<br/><em>مسیرِ یادگیری است.</em></h1></header>
   <div className="atlas-about-layout">
     <div className="atlas-about-image"><figure className="v7-about-concept"><Image src="/assets/bioglass/G13_about-concept.webp" width={1122} height={1402} sizes="(max-width:700px) 100vw, 40vw" alt="تصویر هنری تولیدشده از یک پژوهشگر فرضی، نه عکس صاحب این پورتفولیو"/><figcaption>تصویر مفهومی ساخته‌شده با هوش مصنوعی؛ این شخص صاحب پورتفولیو نیست. تصویر واقعی پس از تأیید جایگزین می‌شود.</figcaption></figure></div>
     <div className="atlas-about-copy">
       <div className="atlas-small-heading" dir="ltr">01 / ABOUT THE PRACTICE</div>
       <p className="atlas-about-lead">این پورتفولیو برای ثبت و نمایش مسیر علمی یک دانشجوی دندان‌پزشکی ساخته شده است.</p>
       <p>از مرور منابع و پروژه‌های دانشگاهی تا تهیه اسلایدها و ارائه‌های علمی، هدف این است که هر فعالیت با زمینه، فرایند، منابع و فایل‌های مرتبطش در یک محل قابل‌مرور ثبت شود.</p>
       <p>نام کامل، دانشگاه، بیوگرافی، سوابق و اطلاعات تماس تنها پس از تأیید صاحب پورتفولیو منتشر می‌شوند.</p>
       <div className="atlas-about-values">
        <div><span dir="ltr">01</span><strong>پژوهش</strong><small>مستندسازی پرسش‌ها و منابع</small></div>
        <div><span dir="ltr">02</span><strong>ارائه</strong><small>ثبت آموخته‌ها و انتقال دانش</small></div>
        <div><span dir="ltr">03</span><strong>آرشیو</strong><small>دسترسی منظم به آثار و پیوست‌ها</small></div>
       </div>
       <Link className="atlas-about-cta" href="/research">مشاهده آرشیو علمی <ArrowUpLeft size={18}/></Link>
     </div>
   </div>
 </main>;
}