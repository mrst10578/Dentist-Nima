import Image from "next/image";
const sources = [
  {id:"S01",filename:"S01.webp",name:"مقطع بافت مینا و عاج",creator:"Dozenist",license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/",source:"https://commons.wikimedia.org/wiki/File:EnamelLayer04-11-07.jpg"},
  {id:"S02",filename:"S02.webp",name:"بافت‌شناسی پالپ دندان",creator:"Dododopamine / University of Dundee credit",license:"CC BY-SA 4.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",source:"https://commons.wikimedia.org/wiki/File:Pulp_Histology_.png"},
  {id:"S03",filename:"S03.webp",name:"مقطع هیستولوژیک دندان",creator:"Josef Reischig",license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/",source:"https://commons.wikimedia.org/wiki/File:Tooth_(248_15)_Histologic_section_of_tooth.jpg"},
  {id:"S04",filename:"S04.webp",name:"طرح تاریخی ساختار دندان",creator:"Bunker / Turner (1924)",license:"مالکیت عمومی",licenseUrl:"https://commons.wikimedia.org/wiki/Commons:Licensing",source:"https://commons.wikimedia.org/wiki/File:Diagram_of_tooth_structure.jpg"},
  {id:"S05",filename:"S05.webp",name:"پالپ دندان رنگ‌آمیزی و دکلسیفیه‌شده",creator:"Natdental",license:"CC BY-SA 4.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",source:"https://commons.wikimedia.org/wiki/File:Dental_Pulp_of_a_stained_and_decalcified_tooth.png"},
  {id:"S06",filename:"S06.webp",name:"تصویر اطلس آناتومی مولر",creator:"Henry Vandyke Carter",license:"مالکیت عمومی",licenseUrl:"https://commons.wikimedia.org/wiki/Commons:Licensing",source:"https://commons.wikimedia.org/wiki/File:Gray1006.png"},
  {id:"S07",filename:"S07.svg",name:"برش شماره‌گذاری‌شده دندان",creator:"Jak, derived from Asbestos",license:"مالکیت عمومی طبق صفحه منبع",licenseUrl:"https://commons.wikimedia.org/wiki/File:Tooth_Section_numbered.svg",source:"https://commons.wikimedia.org/wiki/File:Tooth_Section_numbered.svg"}
] as const;

export function ScienceGallery() {
 return <section className="v7-sources" aria-labelledby="v7-sources-title">
  <div className="v7-sources-heading"><span dir="ltr">REFERENCE LIBRARY / OPEN-LICENSE ORIGINALS</span><h2 id="v7-sources-title">منابع تصویری علمی</h2><p>تصاویر زیر از منابع خارجی دریافت شده‌اند و آثار یا آزمایش‌های شخصی صاحب BioGlass نیستند. نسخه‌های وب برای نمایش بهینه شده‌اند. حقوق و اعتبار هر تصویر متعلق به صاحب اثر مربوط است.</p></div>
  <div className="v7-sources-grid">
   {sources.map(s=><figure key={s.id} className="v7-source-card">
    <div className="v7-source-art"><Image src={"/assets/bioglass/science/"+s.filename} width={1200} height={900} alt={s.name+"، اثر "+s.creator} sizes="(max-width:640px) 90vw, (max-width:1100px) 45vw, 27vw" loading="lazy"/></div>
    <figcaption>
     <span dir="ltr">{s.id} / SCIENTIFIC REFERENCE</span>
     <strong>{s.name}</strong>
     <small>اثر: {s.creator}</small>
     <div><a href={s.source} target="_blank" rel="noopener noreferrer">صفحه منبع</a><a href={s.licenseUrl} target="_blank" rel="noopener noreferrer">{s.license}</a></div>
     <small>تغییر: تبدیل به WebP و کوچک‌سازی در صورت لزوم؛ برش شماره‌گذاری‌شده بدون تغییر</small>
    </figcaption>
   </figure>)}
  </div>
 </section>;
}
