
/* No real study outcomes or student records: deterministic synthetic fixture. */
(()=>{
 const raw=[
  [1402,"anatomy",3,2,1],[1402,"materials",2,1,1],[1402,"histology",4,1,1],
  [1403,"anatomy",4,3,2],[1403,"materials",3,2,1],[1403,"histology",3,2,1],
  [1404,"anatomy",5,4,3],[1404,"materials",5,3,2],[1404,"histology",4,3,2],
  [1405,"anatomy",6,5,3],[1405,"materials",4,3,2],[1405,"histology",5,4,3],
 ];
 const topics=[["anatomy","آناتومی","#168ca6"],["materials","بیومتریال","#e5a84f"],["histology","بافت‌شناسی","#a98bd2"]];
 const labels={planned:"طرح‌های تعریف‌شده",active:"در جریان",reviewed:"مرورشده"};
 const index={planned:2,active:3,reviewed:4};
 const year=document.getElementById("research-year"),topic=document.getElementById("research-topic"),metric=document.getElementById("research-metric");
 if(!year||!topic||!metric)return;
 function restore(){
  const p=new URLSearchParams(location.search);
  if(["1402","1403","1404","1405"].includes(p.get("year")))year.value=p.get("year");
  if(["all","anatomy","materials","histology"].includes(p.get("topic")))topic.value=p.get("topic");
  if(Object.keys(index).includes(p.get("metric")))metric.value=p.get("metric");
  draw();
 }
 function draw(){
  const y=Number(year.value),t=topic.value,m=metric.value,idx=index[m];
  const bars=topics.map(([id,label,color])=>({id,label,color,value:raw.filter(r=>r[0]===y&&r[1]===id).reduce((sum,r)=>sum+r[idx],0)}));
  const shown=t==="all"?bars.reduce((sum,b)=>sum+b.value,0):bars.find(b=>b.id===t).value;
  document.getElementById("research-summary").textContent=new Intl.NumberFormat("fa-IR").format(shown);
  document.getElementById("research-summary-label").textContent=labels[m]+" • "+(t==="all"?"همه حوزه‌ها":topics.find(x=>x[0]===t)[1]);
  document.getElementById("research-summary-year").textContent="DEMO SUMMARY / "+y;
  document.getElementById("research-bar-heading").textContent="مقایسه حوزه‌ها در "+y;
  document.getElementById("research-trend-label").textContent="روند چهار دوره آزمایشی • "+labels[m];
  const max=Math.max(1,...bars.map(b=>b.value));
  const barTarget=document.getElementById("research-bars");
  barTarget.replaceChildren();
  for(const b of bars){
   const outer=document.createElement("div");outer.className="bar-line"+(t!=="all"&&t!==b.id?" is-muted":"");
   const header=document.createElement("div");header.className="bar-line-head";
   const title=document.createElement("b");title.textContent=b.label;
   const number=document.createElement("strong");number.textContent=new Intl.NumberFormat("fa-IR").format(b.value);
   header.append(title,number);
   const track=document.createElement("div");track.className="bar-track";
   const fill=document.createElement("div");fill.className="bar-fill";fill.style.width=(b.value/max*100)+"%";fill.style.background=b.color;
   track.append(fill);outer.append(header,track);barTarget.append(outer);
  }
  const trend=[1402,1403,1404,1405].map(y=>({year:y,value:raw.filter(r=>r[0]===y&&(t==="all"||r[1]===t)).reduce((sum,r)=>sum+r[idx],0)}));
  const trendMax=Math.max(1,...trend.map(r=>r.value));
  const svg=document.getElementById("research-trend");
  svg.replaceChildren();
  const NS="http://www.w3.org/2000/svg";
  function node(tag,attrs,text){
   const element=document.createElementNS(NS,tag);
   for(const [key,value] of Object.entries(attrs))element.setAttribute(key,String(value));
   if(text!==undefined)element.textContent=String(text);
   svg.append(element);
   return element;
  }
  node("title",{},"روند داده آزمایشی");node("desc",{},"جدول پایین تمام مقادیر را به صورت متنی نمایش می‌دهد.");
  for(const gy of [58,118,178])node("line",{x1:30,x2:383,y1:gy,y2:gy,stroke:"#cae4ea","stroke-dasharray":"4 6"});
  node("polyline",{points:trend.map((r,i)=>(48+i*104)+","+(178-r.value/trendMax*120)).join(" "),fill:"none",stroke:"#1998ad","stroke-width":3.5,"stroke-linejoin":"round","stroke-linecap":"round"});
  for(let i=0;i<trend.length;i++){
   const v=trend[i],x=48+i*104,z=178-v.value/trendMax*120;
   node("circle",{cx:x,cy:z,r:6,fill:"#fff",stroke:"#168ca6","stroke-width":3});
   node("text",{x,y:216,"text-anchor":"middle","font-size":13,fill:"#547b90"},v.year);
   node("text",{x,y:z-13,"text-anchor":"middle","font-size":12,"font-weight":"700",fill:"#146c86"},v.value);
  }
  const tbody=document.getElementById("research-tbody");tbody.replaceChildren();
  for(const r of raw.filter(r=>r[0]===y&&(t==="all"||r[1]===t))){
   const tr=document.createElement("tr");
   for(const [i,val] of [r[0],topics.find(x=>x[0]===r[1])[1],r[2],r[3],r[4]].entries()){
    const td=document.createElement(i===1?"th":"td");if(i===1)td.scope="row";td.textContent=String(val);tr.append(td);
   }
   tbody.append(tr);
  }
  const u=new URL(location.href);u.searchParams.set("year",year.value);u.searchParams.set("topic",topic.value);u.searchParams.set("metric",metric.value);
  history.replaceState(null,"",u.pathname+"?"+u.searchParams.toString());
 }
 [year,topic,metric].forEach(x=>x.addEventListener("change",draw));
 window.addEventListener("popstate",restore);
 document.getElementById("research-export").addEventListener("click",()=>{
  const csv="year,topic,planned,active,reviewed\n"+raw.map(r=>r.join(",")).join("\n");
  const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
  const href=URL.createObjectURL(blob),a=document.createElement("a");a.href=href;a.download="bioglass-synthetic-demo.csv";a.click();
  setTimeout(()=>URL.revokeObjectURL(href),1000);
 });
 restore();
})();
