import Image from "next/image";
import { activeAssets,assetCatalog,type AssetKey } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
const editions:Record<AssetKey,{series:string;number:string;label:string}>={
 "hero-molar":{series:"STUDY IN FORM",number:"01",label:"PORCELAIN / FORM"},
 "research-enamel":{series:"RESEARCH NOTES",number:"01",label:"ENAMEL / STUDY"},
 "research-microscopy":{series:"RESEARCH NOTES",number:"02",label:"HISTOLOGY / STUDY"},
 "project-anatomy":{series:"FIELD DOCUMENT",number:"01",label:"ANATOMY / PROJECT"},
 "project-biomaterial":{series:"FIELD DOCUMENT",number:"02",label:"MATERIAL / PROJECT"},
 "presentation-pulp":{series:"PRESENTATION",number:"01",label:"PULP / TALK"},
 "presentation-crown":{series:"PRESENTATION",number:"02",label:"CROWN / SLIDES"},
 "gallery-laboratory":{series:"VISUAL ARCHIVE",number:"01",label:"LAB / IMAGE"},
 "gallery-model":{series:"VISUAL ARCHIVE",number:"02",label:"MODEL / IMAGE"},
 "portrait":{series:"PERSONAL ARCHIVE",number:"01",label:"PORTRAIT / PENDING"},
};
export function AssetFrame({asset,className,priority=false}:{asset:AssetKey;className?:string;priority?:boolean}){
 const info=assetCatalog[asset],src=activeAssets[asset],mark=editions[asset];
 return <div className={cn("asset-frame atlas-asset",className)}
  style={{aspectRatio:info.ratio}} data-asset={asset}
  role="img" aria-label={src?info.label:"جلد آزمایشی برای "+info.label}>
  {src?<Image src={src} alt={info.label} fill priority={priority} sizes={asset==="hero-molar"?"(max-width:820px) 100vw, 45vw":"(max-width:640px) 100vw, 33vw"} className="asset-image"/>:
  <div className="atlas-poster" aria-hidden="true">
   <div className="atlas-poster-top" dir="ltr"><span>BG / {mark.series}</span><span>{mark.number.padStart(3,"0")}</span></div>
   <div className="atlas-poster-sculpt"><span className="atlas-poster-plane one"/><span className="atlas-poster-plane two"/><span className="atlas-poster-plane three"/></div>
   <div className="atlas-poster-bottom" dir="ltr"><span>{mark.label}</span><span>PREVIEW ONLY</span></div>
  </div>}
 </div>;
}