import Link from "next/link";
import { ArrowUpLeft, ArrowLeft, MoveDownRight } from "lucide-react";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { PortfolioCard } from "@/components/portfolio-card";
import { entries } from "@/lib/portfolio";

const sections = [
  { href: "/research", number: "01", persian: "پژوهش‌ها", latin: "RESEARCH & WRITING", description: "مقاله‌ها، مرور منابع و مسیر شکل‌گیری پرسش‌های علمی." },
  { href: "/presentations", number: "02", persian: "ارائه‌های علمی", latin: "TALKS & PRESENTATIONS", description: "پوسترها، اسلایدها و ارائه‌های دانشگاهی." },
  { href: "/projects", number: "03", persian: "پروژه‌ها", latin: "PROJECTS & PRACTICE", description: "فعالیت‌های دانشگاهی، فرایند اجرا و مستندات هر پروژه." },
  { href: "/gallery", number: "04", persian: "گالری علمی", latin: "VISUAL ARCHIVE", description: "تصاویر و مستندات بصری مرتبط با فعالیت‌های علمی." },
] as const;

export default function Home() {
  return (
    <main id="main-content" className="edition-v4">
      <section className="v4-hero" aria-labelledby="hero-heading">
        <div className="site-container v4-hero-inner">
          <div className="v4-hero-topline" dir="ltr">
            <span>BIOGLASS / DENTAL SCIENCES</span>
            <span>INDEPENDENT ACADEMIC PORTFOLIO <i aria-hidden="true" /></span>
          </div>
          <div className="v4-hero-grid">
            <div className="v4-hero-text">
              <div className="v4-hero-eyebrow"><span className="v4-hero-line" aria-hidden="true" /> دفتر شخصی پژوهش و تجربه</div>
              <h1 id="hero-heading">
                از کنجکاوی،<br />
                <span>تا کشف.</span>
              </h1>
              <p className="v4-hero-subtitle">پژوهش‌ها، پروژه‌ها و ارائه‌های علمی یک دانشجوی دندان‌پزشکی؛ گردآوری‌شده در آرشیوی زنده و مستقل.</p>
              <div className="v4-hero-links">
                <Link className="v4-primary-link" href="/research">کاوش آثار علمی <ArrowUpLeft size={20} aria-hidden="true" /></Link>
                <Link className="v4-minimal-link" href="/about">درباره این مسیر <ArrowLeft size={18} aria-hidden="true" /></Link>
              </div>
              <div className="v4-hero-bottom-note" dir="ltr">
                <span className="v4-circle-mark" aria-hidden="true" />
                <span>IDEAS. RESEARCH. EXPRESSION.</span>
                <span>© 2026</span>
              </div>
            </div>
            <div className="v4-hero-art">
              <div className="v4-art-top" dir="ltr"><span>01 / A STUDY OF FORM</span><span>FIGURE A–01</span></div>
              <div className="v4-hero-object">
                <HeroCanvas />
                <div className="v4-object-caption" dir="ltr"><span>THE SCIENCE OF DETAIL</span><span>001 — BIOGLASS</span></div>
              </div>
              <span className="v4-art-edge" aria-hidden="true">CURIOUS BY NATURE.</span>
            </div>
          </div>
          <div className="v4-hero-end" dir="ltr"><span>PORTFOLIO — VOL. 01</span><span>SCROLL TO EXPLORE <MoveDownRight size={16} aria-hidden="true" /></span></div>
        </div>
      </section>

      <div className="v4-manifesto-band">
        <div className="site-container v4-manifesto-inner" dir="ltr">
          <span>RESEARCH</span><span className="v4-band-point" aria-hidden="true" />
          <span>LEARNING</span><span className="v4-band-point" aria-hidden="true" />
          <span>EXPLORATION</span><span className="v4-band-point" aria-hidden="true" />
          <span>DOCUMENTATION</span>
        </div>
      </div>

      <section className="site-container v4-intro" aria-label="معرفی آرشیو">
        <span className="v4-section-id" dir="ltr">00 / INTRODUCTION</span>
        <p>اینجا یک ویترین معمولی نیست.<br />این <strong>روایتِ یک مسیر علمی</strong> است.</p>
        <div className="v4-intro-aside">
          از نخستین پرسش‌ها تا ارائه نتایج، هر اثر در جای مشخص خودش ثبت می‌شود. بدون شلوغی، بدون ادعای اضافه؛ با تمرکز بر خودِ محتوا.
        </div>
      </section>

      <section className="site-container v4-archive" aria-labelledby="archive-heading">
        <div className="v4-section-heading">
          <div className="v4-section-kicker" dir="ltr">01 — EXPLORE THE WORK</div>
          <div className="v4-section-title-row">
            <h2 id="archive-heading">آرشیو آثار<span>.</span></h2>
            <p>چهار مسیر برای شناخت پژوهش‌ها و فعالیت‌های دانشگاهی.</p>
          </div>
        </div>
        <div className="v4-archive-list">
          {sections.map(item => (
            <Link href={item.href} className="v4-archive-item" key={item.href}>
              <span className="v4-archive-number" dir="ltr">{item.number}</span>
              <span className="v4-archive-name"><strong>{item.persian}</strong><small dir="ltr">{item.latin}</small></span>
              <span className="v4-archive-detail">{item.description}</span>
              <span className="v4-archive-icon"><ArrowUpLeft size={25} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="v4-featured" aria-labelledby="featured-heading">
        <div className="site-container">
          <div className="v4-section-heading">
            <div className="v4-section-kicker" dir="ltr">02 — THE WORKS / SELECTED LAYOUTS</div>
            <div className="v4-section-title-row">
              <h2 id="featured-heading">مجموعه منتخب<span>.</span></h2>
              <p>این‌ها قالب نمایشی محتوا هستند؛ آثار واقعی پس از تأیید و بارگذاری جایگزین می‌شوند.</p>
            </div>
          </div>
          <div className="v4-feature-grid">
            <div className="v4-feature-primary"><PortfolioCard item={entries[0]} /></div>
            <div className="v4-feature-secondary"><PortfolioCard item={entries[4]} /></div>
            <div className="v4-feature-tertiary"><PortfolioCard item={entries[2]} /></div>
          </div>
          <div className="v4-feature-bottom"><span>SELECTED FORMAT STUDIES / NOT PUBLISHED RESEARCH</span><Link href="/research">مشاهده آرشیو پژوهش‌ها <ArrowUpLeft size={17}/></Link></div>
        </div>
      </section>

      <section className="site-container v4-philosophy" aria-labelledby="philosophy-heading">
        <div className="v4-philosophy-numeral" dir="ltr">B<span>G</span></div>
        <div className="v4-philosophy-copy">
          <span className="v4-section-kicker" dir="ltr">03 — BEHIND THE RESEARCH</span>
          <h2 id="philosophy-heading">هر اثر یک داستان دارد؛<br/><em>داستانِ یادگرفتن.</em></h2>
          <p>هدف از این فضا، ثبت دقیق مسیر تحصیل و فعالیت‌های پژوهشی است. مقالات، ارائه‌ها، منابع و فایل‌های مرتبط، هرکدام در یک ساختار روشن و قابل‌مرور قرار می‌گیرند.</p>
          <Link href="/about">آشنایی با این پورتفولیو <ArrowUpLeft size={18} aria-hidden="true" /></Link>
        </div>
        <div className="v4-philosophy-index" dir="ltr"><span>THE WORK CONTINUES</span><span>EST. 2026 / CHAPTER 01</span></div>
      </section>
      <div className="site-container v4-home-last" dir="ltr"><span>ACADEMIC PRACTICE, BEAUTIFULLY DOCUMENTED.</span><span>FIN / 001</span></div>
    </main>
  );
}
