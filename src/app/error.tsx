
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main id="main-content" className="site-container missing-main">
      <div className="glass-panel missing-card">
        <p className="eyebrow">STUDIO / ERROR</p>
        <h1>بارگذاری این بخش با مشکل مواجه شد.</h1>
        <p>می‌توانید دوباره تلاش کنید یا به صفحه اصلی برگردید.</p>
        <div className="hero-actions">
          <button type="button" className="button-primary" onClick={reset}>تلاش مجدد</button>
          <Link href="/" className="button-quiet">صفحه اصلی</Link>
        </div>
      </div>
    </main>
  );
}
