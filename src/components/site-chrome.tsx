
import Link from "next/link";
import { ArrowUpLeft, Dna, Menu } from "lucide-react";

const navigation = [
  { label: "خانه", href: "/" },
  { label: "پژوهش‌ها", href: "/research" },
  { label: "پروژه‌ها", href: "/projects" },
  { label: "ارائه‌ها", href: "/presentations" },
  { label: "گالری", href: "/gallery" },
  { label: "درباره", href: "/about" },
];

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="BioGlass Studio، صفحه اصلی">
      <span className="brand-symbol"><Dna size={24} strokeWidth={1.8} /></span>
      <span className="brand-name" dir="ltr">BIOGLASS <span>STUDIO</span></span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="ناوبری اصلی">
          {navigation.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
        <Link className="header-action" href="/about">
          پورتفولیو <ArrowUpLeft size={17} aria-hidden="true" />
        </Link>
        <details className="mobile-nav">
          <summary aria-label="باز کردن فهرست"><Menu size={23} /></summary>
          <nav aria-label="ناوبری موبایل">
            {navigation.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-top">
        <div>
          <Brand />
          <p>دفتر دیجیتال یک دانشجوی دندان‌پزشکی؛ محلی برای رشد ایده‌ها و اشتراک دانش.</p>
        </div>
        <div className="footer-links">
          {navigation.slice(1, 5).map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span dir="ltr">© BioGlass Studio</span>
        <span>نسخه اولیه؛ محتوا و اَسِت‌های نمایشی هنوز منتشر نشده‌اند.</span>
      </div>
    </footer>
  );
}
