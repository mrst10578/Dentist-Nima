
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { layers, layerIds, type LayerId } from "@/lib/visual-data";
import type { LabScene } from "./anatomy-scene";

export function AnatomyLab() {
  const [active,setActive]=useState<LayerId>("enamel");
  const [status,setStatus]=useState<"loading"|"ready"|"fallback">("loading");
  const hostRef=useRef<HTMLDivElement>(null);
  const sceneRef=useRef<LabScene|null>(null);
  useEffect(()=>{
    let cancelled=false;
    const run=async()=>{
      const host=hostRef.current;if(!host)return;
      try{
        const probe=document.createElement("canvas");
        const gl=probe.getContext("webgl2")??probe.getContext("webgl");
        if(!gl){setStatus("fallback");return;}
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        const {mountAnatomyScene}=await import("./anatomy-scene");
        if(cancelled)return;
        sceneRef.current=mountAnatomyScene(host,"enamel");
        setStatus("ready");
      }catch{if(!cancelled)setStatus("fallback");}
    };
    void run();
    return()=>{cancelled=true;sceneRef.current?.dispose();sceneRef.current=null;};
  },[]);
  const select=useCallback((id:LayerId)=>{setActive(id);sceneRef.current?.select(id);},[]);
  const reset=()=>{setActive("enamel");sceneRef.current?.reset();};
  const info=layers[active];
  return <section className="lab-layout" aria-label="کاوشگر لایه‌های دندان">
    <div className="lab-stage glass-panel">
      <div className="lab-stage-top" dir="ltr"><span>ANATOMY / INTERACTIVE CUTAWAY</span><span className="lab-led">{status==="ready"?"WEBGL ACTIVE":"SCHEMATIC VIEW"}</span></div>
      <div className="lab-viewport" role="img" aria-label={"مدل شماتیک دندان با تمرکز روی "+info.title}>
        <div ref={hostRef} className="lab-canvas" data-lab-render={status}/>
        {status!=="ready"&&<div className="lab-static" aria-hidden="true"><span className="lab-static-crown">◒</span><span className="lab-static-roots">╱ ╲</span><strong>نمای شماتیک دندان</strong></div>}
      </div>
      <div className="lab-legend" aria-label="راهنمای رنگ لایه‌ها">{layerIds.map(id=><span key={id}><i style={{background:layers[id].color}}/>{layers[id].title}</span>)}</div>
      <p className="lab-view-caption">مدل شماتیک آموزشی است؛ برای تشخیص یا آموزش آناتومی دقیق بالینی مناسب نیست.</p>
    </div>
    <aside className="lab-info glass-panel">
      <div className="eyebrow" dir="ltr">SELECT A STRUCTURAL LAYER</div>
      <h2>از سطح تا مرکز دندان</h2>
      <p className="lab-lead">یک لایه را انتخاب کن تا تمرکز نمایش سه‌بعدی و توضیح مرتبط تغییر کنند.</p>
      <div className="layer-selector" role="group" aria-label="انتخاب لایه دندان">
        {layerIds.map((id,index)=><button type="button" key={id} className={"layer-choice"+(active===id?" is-active":"")} aria-pressed={active===id} onClick={()=>select(id)}>
          <span className="layer-choice-count">0{index+1}</span><span className="layer-choice-color" style={{background:layers[id].color}}/>
          <span className="layer-choice-label">{layers[id].title}<small dir="ltr">{layers[id].latin}</small></span><span aria-hidden="true">↖</span>
        </button>)}
      </div>
      <div className="lab-detail" aria-live="polite"><div className="lab-detail-overline">{info.latin} / SELECTED</div><h3>{info.title}</h3><p>{info.description}</p><small>{info.note}</small></div>
      <button className="lab-reset" type="button" onClick={reset}>بازنشانی نما و انتخاب ↻</button>
    </aside>
  </section>;
}
