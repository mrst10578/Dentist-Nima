
import Image from "next/image";
import { ImagePlus, Orbit } from "lucide-react";

import { activeAssets, assetCatalog, type AssetKey } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export function AssetFrame({
  asset,
  className,
  priority = false,
}: {
  asset: AssetKey;
  className?: string;
  priority?: boolean;
}) {
  const info = assetCatalog[asset];
  const src = activeAssets[asset];

  return (
    <div
      className={cn("asset-frame", className)}
      style={{ aspectRatio: info.ratio }}
      data-asset={asset}
      aria-label={src ? info.label : "جایگاه رزروشده برای " + info.label}
      role="img"
    >
      {src ? (
        <Image
          src={src}
          alt={info.label}
          fill
          priority={priority}
          sizes={asset === "hero-molar" ? "(max-width: 820px) 100vw, 45vw" : "(max-width: 640px) 100vw, 33vw"}
          className="asset-image"
        />
      ) : (
        <div className="asset-placeholder" aria-hidden="true">
          <div className="asset-grid" />
          <div className="asset-aura" />
          <div className="asset-ring asset-ring-one" />
          <div className="asset-ring asset-ring-two" />
          <div className="asset-orb"><Orbit size={44} strokeWidth={0.8} /></div>
          <span className="asset-target">BG / {asset.toUpperCase()}</span>
          <span className="asset-bottom">
            <ImagePlus size={14} />
            اَسِت اختصاصی در مرحله بعد
          </span>
        </div>
      )}
    </div>
  );
}
