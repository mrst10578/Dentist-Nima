import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { AssetFrame } from "@/components/asset-frame";
import type { PortfolioItem } from "@/lib/portfolio";
export function PortfolioCard({item}:{item:PortfolioItem}){
 const href="/"+item.collection+"/"+item.slug;
 return <article className="portfolio-card atlas-work-card">
   <Link href={href} className="portfolio-card-media" aria-label={"مشاهده "+item.title}><AssetFrame asset={item.asset}/></Link>
   <div className="atlas-work-meta"><span>{item.category}</span><span>قالب نمایشی</span></div>
   <h3><Link href={href}>{item.title}</Link></h3>
   <p>{item.description}</p>
   <Link href={href} className="atlas-work-link">مشاهده جزئیات <ArrowUpLeft size={17} aria-hidden="true"/></Link>
 </article>;
}