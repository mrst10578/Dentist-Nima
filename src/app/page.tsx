
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpLeft } from "lucide-react";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { PortfolioCard } from "@/components/portfolio-card";
import { entries } from "@/lib/portfolio";

const departments = [
  { href:"/research", number:"01", title:"پژوهش‌ها", latin:"Research / Writing", summary:"مرورها، مقاله‌ها و مسیر شکل‌گیری مسئله‌های علمی" },
  { href:"/presentations", number:"02", title:"ارائه‌ها", latin:"Presentations / Talks", summary:"اسلاید، پوستر و مستندات ارائه‌های دانشگاهی" },
  { href:"/projects", number:"03", title:"پروژه‌ها", latin:"Projects / Practice", summary:"فرایند اجرا، مشاهده‌ها و خروجی کارهای علمی" },
  { href:"/gallery", number:"04", title:"گالری", latin:"Visual Archive", summary:"مجموعه‌ای از تصاویر و یادداشت‌های علمی" },
] as const;

export default function Home() {
  return <main id="main-content" className="atlas-home">
    <section className="atlas-hero" aria-labelledby="atlas-hero-heading">
      <div className="site-container atlas-hero-grid">
        <div className="atlas-hero-copy">
          <div className="atlas-eyebrow"><span className="atlas-eyebrow-rule"/> پورتفولیوی مستقل دندان‌پزشکی</div>
          <p className="atlas-edition" dir="ltr">BIOGLASS STUDIO  /  VOLUME 01</p>
          <h1 id="atlas-hero-heading">علم، از نگاه<br/><em>یک جستجوگر.</em></h1>
          <p className="atlas-hero-intro">دفتر شخصی پژوهش‌ها، ارائه‌ها و پروژه‌های دانشگاهی. جایی برای نگهداری آنچه مطالعه شده، ساخته شده و ارزش ثبت کردن دارد.</p>
          <div className="atlas-actions">
            <Link href="/research" className="atlas-button">ورود به آرشیو <ArrowUpLeft size={18} aria-hidden="true"/></Link>
            <Link href="/about" className="atlas-text-link">درباره این مسیر <ArrowLeft size={17} aria-hidden="true"/></Link>
          </div>
          <div className="atlas-hero-rail">
            <span dir="ltr">RESEARCH / PROCESS / PRESENTATION</span>
            <span>پروژه‌ای در حال تکمیل</span>
          </div>
        </div>
        <div className="atlas-hero-art" aria-label="اثر بصری انتزاعی با الهام از ساختار دندان">
          <div className="atlas-art-frame">
            <div className="atlas-art-top" dir="ltr"><span>PLATE NO. 001</span><span>FORM & MATERIAL</span></div>
            <HeroCanvas />
            <div className="atlas-art-footer" dir="ltr"><span>AN EXPERIMENT IN FORM</span><span>NOT A CLINICAL MODEL</span></div>
            <span className="atlas-art-stamp" aria-hidden="true" dir="ltr">BG.</span>
          </div>
          <div className="atlas-art-corner" aria-hidden="true"/>
        </div>
      </div>
      <div className="atlas-hero-bottom site-container">
        <span dir="ltr">01 — PERSONAL RESEARCH JOURNAL</span>
        <a href="#atlas-index" aria-label="رفتن به فهرست آثار">مشاهده مجموعه <ArrowDown size={16} aria-hidden="true"/></a>
      </div>
    </section>

    <section className="site-container atlas-statement" aria-label="درباره فلسفه سایت">
      <div className="atlas-small-heading" dir="ltr">A WORK IN PROGRESS / 2026</div>
      <p>پژوهش فقط نتیجه نیست.<br/><strong>فرایندِ پرسیدن، تجربه‌کردن و دقیق‌تر دیدن است.</strong></p>
      <div className="atlas-statement-bottom"><span>این پورتفولیو به مرور با آثار واقعی صاحب آن تکمیل می‌شود.</span><span dir="ltr">THE PRACTICE OF CURIOSITY</span></div>
    </section>

    <section className="atlas-index-section" id="atlas-index" aria-labelledby="atlas-index-heading">
      <div className="site-container">
        <div className="atlas-section-heading">
          <div><span dir="ltr">02 / ARCHIVE INDEX</span><h2 id="atlas-index-heading">درون آرشیو<span>.</span></h2></div>
          <p>چهار مسیر روشن برای مرور فعالیت‌های علمی، بدون دسته‌بندی‌های پیچیده و اضافه.</p>
        </div>
        <div className="atlas-index-list">{departments.map(item=>
          <Link href={item.href} key={item.href} className="atlas-index-item">
            <span className="atlas-index-number" dir="ltr">{item.number}</span>
            <span className="atlas-index-title"><strong>{item.title}</strong><small dir="ltr">{item.latin}</small></span>
            <span className="atlas-index-summary">{item.summary}</span>
            <span className="atlas-index-arrow"><ArrowUpLeft size={24} aria-hidden="true"/></span>
          </Link>
        )}</div>
      </div>
    </section>

    <section className="atlas-featured-section" aria-labelledby="atlas-featured-heading">
      <div className="site-container">
        <div className="atlas-section-heading">
          <div><span dir="ltr">03 / SELECTED FORMATS</span><h2 id="atlas-featured-heading">چیدمان آثار<span>.</span></h2></div>
          <p>این نمونه‌ها برای نمایش قالب انتشار هستند. هیچ‌کدام مقاله منتشرشده یا دستاورد واقعی معرفی نمی‌شوند.</p>
        </div>
        <div className="atlas-featured-grid">
          <div className="atlas-featured-lead"><PortfolioCard item={entries[0]}/></div>
          <div className="atlas-featured-side"><PortfolioCard item={entries[4]}/></div>
          <div className="atlas-featured-side"><PortfolioCard item={entries[2]}/></div>
        </div>
        <div className="atlas-featured-bottom"><span dir="ltr">EDITORIAL PREVIEWS / NO PUBLISHED RECORDS</span><Link href="/research">همه ساختارهای پژوهشی <ArrowUpLeft size={16}/></Link></div>
      </div>
    </section>

    <section className="site-container atlas-about-strip" aria-labelledby="atlas-about-heading">
      <div className="atlas-about-index" dir="ltr">04 / THE PERSON BEHIND THE WORK</div>
      <h2 id="atlas-about-heading">هر اثر، بخشی از<br/><em>یک مسیر شخصی است.</em></h2>
      <div className="atlas-about-right"><p>پشت این آرشیو یک دانشجوی دندان‌پزشکی است؛ کسی که می‌خواهد مسیر مطالعات، پروژه‌ها و ارائه‌هایش را منظم، قابل‌ارجاع و ماندگار ثبت کند.</p><Link href="/about">بیشتر درباره پورتفولیو <ArrowUpLeft size={18}/></Link></div>
      <span className="atlas-about-watermark" aria-hidden="true">B.</span>
    </section>
    <div className="site-container atlas-ending" dir="ltr"><span>BIOGLASS — AN INDEPENDENT ACADEMIC ARCHIVE</span><span>© 2026 / VOLUME 01</span></div>
  </main>;
}
