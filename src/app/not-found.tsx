
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main id="main-content" className="site-container missing-main">
      <div className="glass-panel missing-card v7-not-found"><Image src="/assets/bioglass/G19_not-found.webp" width={1122} height={1402} alt="اثر هنری ۴۰۴ با شیشه شکسته در آرشیو BioGlass" sizes="(max-width:700px) 100vw, 45vw"/>
        <p className="eyebrow">404 / ARCHIVE NOT FOUND</p>
        <h1>این صفحه در آرشیو پیدا نشد.</h1>
        <p>ممکن است نشانی تغییر کرده باشد یا صفحه هنوز ساخته نشده باشد.</p>
        <Link href="/" className="button-primary">بازگشت به صفحه اصلی</Link>
      </div>
    </main>
  );
}
