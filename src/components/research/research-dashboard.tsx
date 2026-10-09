
"use client";
import { useCallback, useEffect, useState } from "react";
import {demoYears,demoTopics,demoRows,demoCSV,groupByTopic,trendByYear,metricLabels,type DemoYear,type DemoTopic,type Metric} from "@/lib/visual-data";
const isMetric=(v:string|null):v is Metric=>v==="planned"||v==="active"||v==="reviewed";
const isTopic=(v:string|null):v is DemoTopic|"all"=>v==="all"||demoTopics.some(t=>t.id===v);
const isYear=(v:string|null)=>Boolean(v&&demoYears.some(y=>String(y)===v));
export function ResearchDashboard(){
 const [year,setYear]=useState<DemoYear>(1405);
 const [topic,setTopic]=useState<DemoTopic|"all">("all");
 const [metric,setMetric]=useState<Metric>("active");
 useEffect(()=>{
  const parse=()=>{
    const p=new URLSearchParams(window.location.search);
    if(isYear(p.get("year")))setYear(Number(p.get("year")) as DemoYear);
    if(isTopic(p.get("topic")))setTopic(p.get("topic") as DemoTopic|"all");
    if(isMetric(p.get("metric")))setMetric(p.get("metric") as Metric);
  };
  parse();window.addEventListener("popstate",parse);
  return()=>window.removeEventListener("popstate",parse);
 },[]);
 const update=useCallback((next:{year?:DemoYear;topic?:DemoTopic|"all";metric?:Metric})=>{
   const y=next.year??year,t=next.topic??topic,m=next.metric??metric;
   setYear(y);setTopic(t);setMetric(m);
   const u=new URL(window.location.href);
   u.searchParams.set("year",String(y));u.searchParams.set("topic",t);u.searchParams.set("metric",m);
   window.history.replaceState(null,"",u.pathname+"?"+u.searchParams.toString());
 },[year,topic,metric]);
 const bars=groupByTopic(year,metric);
 const trend=trendByYear(topic,metric);
 const total=bars.reduce((sum,row)=>sum+row.value,0);
 const shown=topic==="all"?total:(bars.find(row=>row.id===topic)?.value??0);
 const max=Math.max(1,...bars.map(row=>row.value));
 const trendMax=Math.max(1,...trend.map(row=>row.value));
 const points=trend.map((row,i)=>String(48+i*104)+","+String(178-row.value/trendMax*120)).join(" ");
 const exportCSV=()=>{
   const blob=new Blob(["\uFEFF"+demoCSV()],{type:"text/csv;charset=utf-8"});
   const href=URL.createObjectURL(blob),a=document.createElement("a");a.href=href;
   a.download="bioglass-synthetic-demo.csv";a.click();setTimeout(()=>URL.revokeObjectURL(href),1000);
 };
 return <div className="research-shell" data-dashboard="synthetic">
   <div className="research-warning"><strong>داده‌های شبیه‌سازی‌شده</strong> این اعداد برای آزمایش تعاملات و طراحی داشبورد ساخته شده‌اند، نه نتایج پژوهش یا سوابق علمی واقعی.</div>
   <div className="research-filter glass-panel">
    <label>سال نمایشی<select aria-label="سال نمایشی" value={year} onChange={e=>update({year:Number(e.target.value) as DemoYear})}>{demoYears.map(y=><option key={y} value={y}>{y}</option>)}</select></label>
    <label>حوزه<select aria-label="حوزه پژوهشی" value={topic} onChange={e=>update({topic:e.target.value as DemoTopic|"all"})}><option value="all">همه حوزه‌ها</option>{demoTopics.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select></label>
    <label>شاخص<select aria-label="شاخص پژوهشی" value={metric} onChange={e=>update({metric:e.target.value as Metric})}><option value="planned">طرح‌های تعریف‌شده</option><option value="active">در جریان</option><option value="reviewed">مرورشده</option></select></label>
    <button type="button" onClick={exportCSV} className="research-export">دریافت داده آزمایشی CSV ↓</button>
   </div>
   <div className="research-insight glass-panel" aria-live="polite">
    <span dir="ltr">DEMO SUMMARY / {year}</span><strong>{shown.toLocaleString("fa-IR")}</strong>
    <div>{metricLabels[metric]} • {topic==="all"?"همه حوزه‌ها":demoTopics.find(t=>t.id===topic)?.label}</div>
    <small>جمع داده ساختگی برای فیلترهای فعلی؛ بدون ادعای نتیجه واقعی</small>
   </div>
   <div className="research-charts">
    <section className="research-chart glass-panel" aria-label="مقایسه حوزه‌های آموزشی">
     <div className="chart-head"><span dir="ltr">01 / CATEGORY VIEW</span><h2>مقایسه حوزه‌ها در {year}</h2><p>طول نوارها تعداد {metricLabels[metric]} در داده آزمایشی را نشان می‌دهد.</p></div>
     <div className="bar-lines">{bars.map(bar=><div key={bar.id} className={"bar-line"+(topic!=="all"&&topic!==bar.id?" is-muted":"")}><div className="bar-line-head"><b>{bar.label}</b><strong>{bar.value.toLocaleString("fa-IR")}</strong></div><div className="bar-track"><div className="bar-fill" style={{width:String(bar.value/max*100)+"%",background:bar.color}}/></div></div>)}</div>
    </section>
    <section className="research-chart glass-panel" aria-label="روند سال‌های نمایشی">
     <div className="chart-head"><span dir="ltr">02 / TIME SERIES</span><h2>روند چهار دوره آزمایشی</h2><p>{metricLabels[metric]} در چهار سال نمایشی؛ با فیلتر حوزه انتخاب‌شده.</p></div>
     <svg className="trend-plot" viewBox="0 0 410 235" role="img" aria-labelledby="trend-title trend-desc">
      <title id="trend-title">نمودار روند داده ساختگی</title><desc id="trend-desc">روند چهار دوره از ۱۴۰۲ تا ۱۴۰۵. مقادیر در جدول داده نیز قابل بررسی‌اند.</desc>
      {[58,118,178].map(y=><line key={y} x1="30" x2="383" y1={y} y2={y} stroke="#cae4ea" strokeDasharray="4 6"/>)}
      <polyline points={points} fill="none" stroke="#1998ad" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"/>
      {trend.map((row,i)=><g key={row.year}><circle cx={48+i*104} cy={178-row.value/trendMax*120} r="6" fill="#fff" stroke="#168ca6" strokeWidth="3"/><text x={48+i*104} y="216" textAnchor="middle" fontSize="13" fill="#547b90">{row.year}</text><text x={48+i*104} y={164-row.value/trendMax*120} textAnchor="middle" fontSize="12" fontWeight="700" fill="#146c86">{row.value}</text></g>)}
     </svg>
    </section>
   </div>
   <section className="research-table glass-panel"><div className="chart-head"><span dir="ltr">SOURCE / SYNTHETIC FIXTURE</span><h2>جدول داده‌های قابل بررسی</h2><p>همان مقادیر نمودارها، بدون نیاز به رنگ یا حرکت.</p></div>
    <div className="table-scroll"><table><thead><tr><th scope="col">سال</th><th scope="col">حوزه</th><th scope="col">تعریف‌شده</th><th scope="col">در جریان</th><th scope="col">مرورشده</th></tr></thead><tbody>{demoRows.filter(r=>r.year===year&&(topic==="all"||r.topic===topic)).map(r=><tr key={r.year+r.topic}><td>{r.year}</td><th scope="row">{demoTopics.find(t=>t.id===r.topic)?.label}</th><td>{r.planned}</td><td>{r.active}</td><td>{r.reviewed}</td></tr>)}</tbody></table></div>
   </section>
 </div>;
}
