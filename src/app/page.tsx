
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpLeft,
  BookOpenText,
  ChevronLeft,
  FlaskConical,
  Layers3,
  Microscope,
  Presentation,
  Sparkles,
} from "lucide-react";

import { AssetFrame } from "@/components/asset-frame";
import { PortfolioCard } from "@/components/portfolio-card";
import { collections, entries } from "@/lib/portfolio";

const collectionLinks = [
  { id: "research", icon: BookOpenText },
  { id: "projects", icon: FlaskConical },
  { id: "presentations", icon: Presentation },
  { id: "gallery", icon: Microscope },
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero site-container" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> DIGITAL DENTAL PORTFOLIO <Sparkles size={14} /></div>
          <p className="hero-pretitle">علم. کنجکاوی. ساختن.</p>
          <h1 id="hero-heading">
            جایی برای ثبت
            <br />
            <span>مسیر کشف و پژوهش.</span>
          </h1>
          <p className="hero-description">
            یک فضای شخصی برای گردآوری تحقیقات، پروژه‌های دانشگاهی،
            ارائه‌ها و تجربه‌های علمی در دنیای دندان‌پزشکی.
          </p>
          <div className="hero-actions">
            <Link href="/research" className="button-primary">
              کشف آرشیو علمی <ArrowUpLeft size={19} aria-hidden="true" />
            </Link>
            <Link href="/about" className="button-quiet">
              آشنایی بیشتر <ArrowLeft size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="index-marker">01 / 04</span>
            <span>پژوهش • پروژه • ارائه • گالری</span>
          </div>
        </div>
        <div className="hero-display">
          <div className="hero-display-frame glass-panel">
            <div className="display-topline"><span>VISUAL LAB / OBJECT 001</span><span className="crosshair">+</span></div>
            <AssetFrame asset="hero-molar" className="hero-asset" priority />
            <div className="display-caption">
              <div><span className="display-kicker">COMING ASSET</span><strong>Dental structure study</strong></div>
              <span className="display-number">01</span>
            </div>
          </div>
          <div className="floating-chip glass-panel"><Layers3 size={18} /><span>Asset-first<br /><b>DESIGN SYSTEM</b></span></div>
        </div>
      </section>

      <section className="intro-strip site-container" aria-label="معرفی سایت">
        <div className="section-index">THE IDEA <span> / 001</span></div>
        <p>یک ویترین علمی مستقل؛ <strong>هر فایل، تصویر و ایده در جای درست خودش.</strong></p>
        <div className="tiny-orbit" aria-hidden="true">✳</div>
      </section>

      <section className="site-container section-space" aria-labelledby="collections-heading">
        <div className="section-heading">
          <div><div className="eyebrow">EXPLORE THE STUDIO</div><h2 id="collections-heading">چه چیزی اینجا پیدا می‌کنی؟</h2></div>
          <p>چهار فضای مستقل، با یک زبان بصری مشترک و آماده پذیرش اَسِت‌های سفارشی.</p>
        </div>
        <div className="collection-grid">
          {collectionLinks.map(({ id, icon: Icon }) => {
            const group = collections[id];
            return (
              <Link href={"/" + id} className="collection-tile glass-panel" key={id}>
                <div className="tile-top"><span>{group.index} / STUDIO</span><ArrowUpLeft size={20} /></div>
                <span className="tile-icon"><Icon size={29} strokeWidth={1.6} /></span>
                <div className="tile-bottom"><span className="english-label">{group.english}</span><h3>{group.title}</h3><p>{group.short}</p></div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="site-container section-space" aria-labelledby="preview-heading">
        <div className="section-heading">
          <div><div className="eyebrow">LAYOUT PREVIEW / ASSET RESERVATIONS</div><h2 id="preview-heading">ساختاری برای ایده‌های آینده</h2></div>
          <p>کارت‌های زیر نمونه ساختاری‌اند و به‌عنوان پژوهش یا دستاورد واقعی معرفی نمی‌شوند.</p>
        </div>
        <div className="portfolio-grid">
          {[entries[0], entries[2], entries[4]].map((item) => <PortfolioCard item={item} key={item.slug} />)}
        </div>
      </section>

      <section className="site-container" aria-labelledby="about-preview-heading">
        <div className="feature-banner glass-panel">
          <div className="feature-text">
            <div className="eyebrow">BEHIND THE WORK</div>
            <h2 id="about-preview-heading">پشت هر پروژه، یک مسیر یادگیری وجود دارد.</h2>
            <p>اینجا قرار است روایت علمی یک دانشجوی دندان‌پزشکی شکل بگیرد. معرفی، سوابق و راه‌های ارتباطی پس از تکمیل اطلاعات شخصی منتشر می‌شوند.</p>
            <Link href="/about" className="button-primary">درباره این فضا <ChevronLeft size={18} /></Link>
          </div>
          <AssetFrame asset="portrait" className="feature-portrait" />
        </div>
      </section>
    </main>
  );
}
