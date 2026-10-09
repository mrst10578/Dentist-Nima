import Link from "next/link";
import { ArrowUpLeft, ArrowLeft } from "lucide-react";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { PortfolioCard } from "@/components/portfolio-card";
import { collections, entries } from "@/lib/portfolio";

const directory = [
  { id: "research", title: "پژوهش‌ها", english: "Research & publications", index: "01", copy: "مقاله‌ها، مرور منابع و مسیر شکل‌گیری پرسش‌های علمی." },
  { id: "presentations", title: "ارائه‌های علمی", english: "Talks & presentations", index: "02", copy: "اسلایدها، پوسترها و سخنرانی‌های دانشگاهی." },
  { id: "projects", title: "پروژه‌ها", english: "Academic projects", index: "03", copy: "پروژه‌های درسی، فعالیت‌های پژوهشی و مستندات آن‌ها." },
  { id: "gallery", title: "گالری مستندات", english: "Scientific imagery", index: "04", copy: "تصاویر مرتبط با کارهای علمی، با توضیح و ذکر منبع." },
] as const;

export default function Home() {
  return (
    <main id="main-content" className="editorial-home">
      <section className="editorial-hero site-container" aria-labelledby="hero-heading">
        <div className="editorial-lead">
          <div className="editorial-overline">
            <span className="editorial-mark" aria-hidden="true" />
            <span dir="ltr">INDEPENDENT ACADEMIC PORTFOLIO</span>
          </div>
          <p className="editorial-sector">DENTAL SCIENCES <span aria-hidden="true">/</span> 2026</p>
          <h1 id="hero-heading">مسیرِ علمی،<br /><span>به روایت پژوهش.</span></h1>
          <p className="editorial-summary">
            آرشیوی شخصی برای گردآوری پژوهش‌ها، ارائه‌های دانشگاهی و
            پروژه‌های علمی در مسیر تحصیل دندان‌پزشکی.
          </p>
          <div className="editorial-actions">
            <Link href="/research" className="editorial-main-action">
              مرور پژوهش‌ها <ArrowUpLeft size={20} aria-hidden="true" />
            </Link>
            <Link href="/about" className="editorial-secondary-action">
              درباره صاحب پورتفولیو <ArrowLeft size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="editorial-hero-bottom" dir="ltr">
            <span>AN ONGOING BODY OF WORK</span>
            <span>01 / RESEARCH JOURNAL</span>
          </div>
        </div>
        <div className="editorial-cover" aria-label="تصویر مفهومی پژوهش‌های دندان‌پزشکی">
          <div className="editorial-cover-top" dir="ltr"><span>BG / STUDIO</span><span>FIG. 001</span></div>
          <HeroCanvas />
          <div className="editorial-cover-caption">
            <div><span dir="ltr">VISUAL STUDY</span><strong>زیبایی در جزئیات علم</strong></div>
            <span dir="ltr">DENTISTRY / 01</span>
          </div>
        </div>
      </section>

      <div className="editorial-ticker" aria-label="موضوعات پورتفولیو">
        <div className="site-container" dir="ltr">
          <span>RESEARCH</span><span className="editorial-ticker-star" aria-hidden="true">✦</span>
          <span>ACADEMIC PROJECTS</span><span className="editorial-ticker-star" aria-hidden="true">✦</span>
          <span>PRESENTATIONS</span><span className="editorial-ticker-star" aria-hidden="true">✦</span>
          <span>SCIENTIFIC NOTES</span>
        </div>
      </div>

      <section className="site-container editorial-directory" aria-labelledby="directory-heading">
        <header className="editorial-section-head">
          <div>
            <div className="editorial-overline"><span className="editorial-mark" aria-hidden="true" /><span dir="ltr">THE ARCHIVE / INDEX</span></div>
            <h2 id="directory-heading">مجموعه آثار</h2>
          </div>
          <p>هر بخش برای معرفی و مستندسازی روشنِ یک دسته از فعالیت‌های علمی طراحی شده است.</p>
        </header>
        <div className="editorial-index">
          {directory.map((item) => (
            <Link href={"/" + item.id} key={item.id} className="editorial-index-row">
              <span className="editorial-index-count" dir="ltr">{item.index}</span>
              <span className="editorial-index-body"><strong>{item.title}</strong><small dir="ltr">{item.english}</small></span>
              <span className="editorial-index-copy">{item.copy}</span>
              <span className="editorial-index-arrow" aria-hidden="true"><ArrowUpLeft size={24}/></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-container editorial-work-section" aria-labelledby="preview-heading">
        <header className="editorial-section-head">
          <div>
            <div className="editorial-overline"><span className="editorial-mark" aria-hidden="true" /><span dir="ltr">SELECTED LAYOUT STUDIES</span></div>
            <h2 id="preview-heading">نمونه ساختار آثار</h2>
          </div>
          <p>نمونه‌های زیر صرفاً قالب صفحه‌اند؛ هنوز مقاله یا ارائه واقعی به آن‌ها نسبت داده نشده است.</p>
        </header>
        <div className="portfolio-grid editorial-portfolio-grid">
          {[entries[0], entries[2], entries[4]].map((item)=><PortfolioCard key={item.slug} item={item}/>)}
        </div>
      </section>

      <section className="site-container editorial-personal-section" aria-labelledby="personal-heading">
        <div className="editorial-personal-copy">
          <span dir="ltr">A PERSONAL ACADEMIC ARCHIVE / 2026</span>
          <h2 id="personal-heading">هر پژوهش، بخشی از<br/><em>مسیر یادگیری.</em></h2>
          <p>این فضا به مرور با پژوهش‌ها، پروژه‌ها و ارائه‌های واقعی تکمیل می‌شود.
            هر اثر با اطلاعات علمی و فایل‌های مرتبط خود ارائه خواهد شد.</p>
          <Link href="/about">بیشتر درباره این مسیر <ArrowUpLeft size={19} aria-hidden="true"/></Link>
        </div>
        <div className="editorial-personal-aside" aria-hidden="true">
          <span>BG.</span><small dir="ltr">A DOCUMENTED JOURNEY<br/>IN DENTAL SCIENCE</small>
        </div>
      </section>
      <div className="editorial-collection-note site-container" dir="ltr"><span>© BIOGLASS STUDIO</span><span>{Object.keys(collections).length} ARCHIVE CATEGORIES</span></div>
    </main>
  );
}
