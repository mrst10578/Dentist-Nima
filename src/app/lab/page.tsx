
import type { Metadata } from "next";
import { AnatomyLab } from "@/components/lab/anatomy-lab";
export const metadata: Metadata = {title:"آزمایشگاه سه‌بعدی آناتومی"};
export default function LabPage(){
 return <main id="main-content" className="site-container viz-page">
  <div className="eyebrow" dir="ltr">BIOGLASS STUDIO / ANATOMY LAB 001</div>
  <h1>لایه‌های دندان، <span>در یک نگاه عمیق‌تر.</span></h1>
  <p className="viz-intro">مینا، عاج، پالپ و ریشه را در یک مدل سه‌بعدی شماتیک کاوش کن. رنگ‌ها و ابعاد آموزشی و ساده‌شده‌اند.</p>
  <AnatomyLab/>
 </main>;
}
