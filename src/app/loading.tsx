
export default function Loading() {
  return (
    <main id="main-content" className="site-container loading-main" aria-busy="true">
      <div className="skeleton-block" />
      <div className="skeleton-block skeleton-short" />
      <div className="skeleton-block skeleton-wide" />
      <span className="sr-only">در حال بارگذاری</span>
    </main>
  );
}
