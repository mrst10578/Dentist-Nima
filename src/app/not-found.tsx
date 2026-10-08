
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="site-container missing-main">
      <div className="glass-panel missing-card">
        <p className="eyebrow">404 / ARCHIVE NOT FOUND</p>
        <h1>این صفحه در آرشیو پیدا نشد.</h1>
        <p>ممکن است نشانی تغییر کرده باشد یا صفحه هنوز ساخته نشده باشد.</p>
        <Link href="/" className="button-primary">بازگشت به صفحه اصلی</Link>
      </div>
    </main>
  );
}
