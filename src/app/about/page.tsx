
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft, BookOpen, GraduationCap, HeartHandshake } from "lucide-react";

import { AssetFrame } from "@/components/asset-frame";

export const metadata: Metadata = {
  title: "درباره استودیو",
  description: "درباره فضای علمی و پورتفولیوی BioGlass Studio",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="site-container about-main">
      <div className="about-grid">
        <section className="about-copy glass-panel">
          <div className="eyebrow">ABOUT THE STUDIO</div>
          <h1>یک دفتر باز برای <span>مسیر یادگیری.</span></h1>
          <p>
            BioGlass Studio برای ثبت و نمایش مسیر علمی یک دانشجوی دندان‌پزشکی طراحی شده است:
            از ایده‌های اولیه و پروژه‌های کلاسی تا پژوهش‌ها و ارائه‌های دانشگاهی.
          </p>
          <div className="about-values">
            <div><GraduationCap size={24} /><strong>یادگیری پیوسته</strong><span>ثبت پیشرفت و مهارت‌های علمی</span></div>
            <div><BookOpen size={24} /><strong>مستندسازی دقیق</strong><span>نگهداری فایل‌ها و منابع قابل ارجاع</span></div>
            <div><HeartHandshake size={24} /><strong>اشتراک مسئولانه</strong><span>رعایت حریم خصوصی و اعتبار محتوا</span></div>
          </div>
          <p className="about-pending">نام کامل، بیوگرافی، دانشگاه، رزومه و راه‌های تماس پس از تأیید صاحب پورتفولیو تکمیل می‌شوند.</p>
          <Link href="/projects" className="button-primary">مشاهده قالب پروژه‌ها <ArrowUpLeft size={18} /></Link>
        </section>
        <div className="about-portrait glass-panel">
          <div className="display-topline"><span>PERSONAL PROFILE</span><span>01 / PENDING</span></div>
          <AssetFrame asset="portrait" />
          <p>جایگاه پرتره اختصاصی؛ در مرحله تولید اَسِت تعیین می‌شود.</p>
        </div>
      </div>
    </main>
  );
}
