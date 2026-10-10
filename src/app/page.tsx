import Link from "next/link";
import { ArrowUpLeft, ArrowDown, ArrowLeft } from "lucide-react";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { AssetFrame } from "@/components/asset-frame";
import { entries, collections } from "@/lib/portfolio";

const index = [
  { key:"research", english:"Research & writing", description:"پژوهش‌ها، مرور منابع و یادداشت‌های علمی." },
  { key:"presentations", english:"Presentations & talks", description:"اسلایدها، سمینارها و ارائه‌های دانشگاهی." },
  { key:"projects", english:"Projects & practice", description:"روند پروژه‌ها، مراحل اجرا و مستندات." },
  { key:"gallery", english:"Visual archive", description:"تصاویر علمی، طرح‌ها و مستندات بصری." },
] as const;

export default function Home() {
  const selected=[entries[0], entries[4], entries[2]];
  return <main id="main-content" className="atelier-v6">
    <section className="v6-opening site-container" aria-labelledby="v6-title">
      <div className="v6-opening-head" dir="ltr"><span>BG / PERSONAL RESEARCH ARCHIVE</span><span>VOL. 01 <i/> 2026</span></div>
      <div className="v6-opening-grid">
        <div className="v6-opening-copy">
          <div className="v6-overline"><span className="v6-dash"/> <span dir="ltr">A QUIET PLACE FOR BIG IDEAS</span></div>
          <h1 id="v6-title">ردِّ یک<br/><em>ذهنِ کنجکاو.</em></h1>
          <p className="v6-opening-deck">پژوهش‌ها، پروژه‌ها و ارائه‌های دانشگاهی در یک آرشیو شخصی؛ جایی که مسیر یادگیری مهم‌تر از جلوه‌های اضافه است.</p>
          <div className="v6-opening-actions">
            <Link className="v6-cta" href="/research">ورود به آرشیو آثار <ArrowUpLeft size={18}/></Link>
            <Link className="v6-subcta" href="/about">درباره این مسیر <ArrowLeft size={17}/></Link>
          </div>
          <div className="v6-opening-note"><span dir="ltr">A PORTFOLIO IN PROGRESS</span><span>آرشیو شخصی یک دانشجوی دندان‌پزشکی</span></div>
        </div>
        <div className="v6-opening-visual">
          <div className="v6-visual-ruler" dir="ltr"><span>FIG / 001</span><span>LIGHT, MATTER, FORM</span></div>
          <div className="v6-stage">
            <HeroCanvas/>
            <div className="v6-stage-annotation" dir="ltr"><span>STUDY OF FORM</span><span>BIOGLASS STUDIO</span></div>
            <div className="v6-stage-axis" aria-hidden="true"/>
          </div>
          <div className="v6-visual-description">مجسمه مفهومی الهام‌گرفته از فرم دندان. تصویر تزئینی است و مدل آناتومیک بالینی نیست.</div>
        </div>
      </div>
      <div className="v6-opening-bottom" dir="ltr"><span>ACADEMIC PORTFOLIO / 001</span><span>EXPLORE BELOW <ArrowDown size={15}/></span></div>
    </section>

    <section className="v6-manifesto" aria-labelledby="manifesto-title">
      <div className="site-container v6-manifesto-layout">
        <span className="v6-counter" dir="ltr">01 / PREFACE</span>
        <h2 id="manifesto-title">علم، فقط پاسخ‌ها نیست.<br/><span>مسیر رسیدن به آن‌هاست.</span></h2>
        <p>این فضا برای ثبت و به‌اشتراک‌گذاشتن فعالیت‌های علمی ساخته شده است؛ از نخستین ایده تا آماده‌سازی یک ارائه یا پروژه دانشگاهی.</p>
      </div>
    </section>

    <section id="archive" className="site-container v6-directory" aria-labelledby="directory-title">
      <div className="v6-section-head"><div><span className="v6-kicker" dir="ltr">02 / THE INDEX</span><h2 id="directory-title">فهرست آثار<span className="v6-period">.</span></h2></div><p>چهار بخش روشن؛ بدون امکانات نمایشی بی‌ارتباط با محتوا.</p></div>
      <div className="v6-directory-list">
        {index.map((entry,n)=><Link href={"/"+entry.key} className="v6-directory-row" key={entry.key}>
          <span className="v6-row-number" dir="ltr">0{n+1}</span>
          <span className="v6-row-name">{collections[entry.key].title}<small dir="ltr">{entry.english}</small></span>
          <span className="v6-row-description">{entry.description}</span>
          <span className="v6-round-arrow"><ArrowUpLeft size={23}/></span>
        </Link>)}
      </div>
    </section>

    <section className="v6-selected" aria-labelledby="selected-heading">
      <div className="site-container">
        <div className="v6-section-head"><div><span className="v6-kicker" dir="ltr">03 / WORKING ARCHIVE</span><h2 id="selected-heading">صفحات منتخب<span className="v6-period">.</span></h2></div><p>این موارد، قالب‌های نمایشی‌اند و به‌عنوان دستاورد علمی واقعی معرفی نمی‌شوند.</p></div>
        <div className="v6-selected-grid">
          {selected.map((item,n)=><article className={"v6-work v6-work-"+n} key={item.slug}>
            <Link href={"/"+item.collection+"/"+item.slug} className="v6-work-cover" aria-label={"مشاهده "+item.title}>
              <AssetFrame asset={item.asset}/>
              <span className="v6-work-num" dir="ltr">PLATE / 0{n+1}</span>
            </Link>
            <div className="v6-work-heading"><span>{item.category}</span><span dir="ltr">LAYOUT PREVIEW</span></div>
            <Link href={"/"+item.collection+"/"+item.slug} className="v6-work-title">{item.title}<ArrowUpLeft size={21}/></Link>
            <p>{item.description}</p>
          </article>)}
        </div>
        <div className="v6-selected-foot"><span dir="ltr">NO PUBLICATIONS CLAIMED / STRUCTURE ONLY</span><Link href="/research">مشاهده همه قالب‌های پژوهشی <ArrowUpLeft size={17}/></Link></div>
      </div>
    </section>

    <section className="site-container v6-about-teaser" aria-labelledby="about-teaser-heading">
      <div className="v6-about-number" dir="ltr">BG<span>°</span></div>
      <div className="v6-about-copy"><span className="v6-kicker" dir="ltr">04 / AN OPEN NOTEBOOK</span><h2 id="about-teaser-heading">هر پروژه، یک صفحه<br/><em>از مسیر یادگیری.</em></h2>
        <p>این پورتفولیو به‌تدریج با محتوای واقعی و تأییدشده صاحب آن کامل می‌شود؛ همراه با منابع، فایل‌ها و تاریخچه هر اثر.</p>
        <Link href="/about">آشنایی با صاحب پورتفولیو <ArrowUpLeft size={19}/></Link>
      </div>
    </section>
  </main>;
}
