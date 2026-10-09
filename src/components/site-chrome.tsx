import Link from "next/link";
import { ArrowUpLeft, Menu } from "lucide-react";

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
      <span className="brand-symbol" dir="ltr">B<span>.</span></span>
      <span className="brand-name" dir="ltr">BIOGLASS <span>ACADEMIC PORTFOLIO</span></span>
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
        <Link className="header-action" href="/research">
          مشاهده آثار <ArrowUpLeft size={17} aria-hidden="true" />
        </Link>
        <details className="mobile-nav">
          <summary aria-label="باز کردن فهرست"><Menu size={22} /></summary>
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
          <p>یک آرشیو شخصی برای ثبت پژوهش‌ها، پروژه‌ها و ارائه‌های دانشگاهی.</p>
        </div>
        <div className="footer-links">
          {navigation.slice(1, 5).map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span dir="ltr">© BIOGLASS STUDIO / 2026</span>
        <span>پورتفولیوی دانشجویی، در مرحله تکمیل محتوای واقعی.</span>
      </div>
    </footer>
  );
}
