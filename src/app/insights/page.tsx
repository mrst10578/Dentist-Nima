
import type { Metadata } from "next";
import { ResearchDashboard } from "@/components/research/research-dashboard";
export const metadata: Metadata = {title:"داشبورد پژوهشی | نمونه داده"};
export default function ResearchInsightsPage(){
 return <main id="main-content" className="site-container viz-page">
  <div className="eyebrow" dir="ltr">BIOGLASS STUDIO / RESEARCH EXPLORER 002</div>
  <h1>داده‌ها، <span>قابل مقایسه و کاوش.</span></h1>
  <p className="viz-intro">ابزاری برای مقایسه حوزه‌ها، مشاهده روند سالانه و دریافت داده. تا زمان ورود پروژه‌های واقعی، همه مقادیر صرفاً ساختگی‌اند.</p>
  <ResearchDashboard/>
 </main>;
}
