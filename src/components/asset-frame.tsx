import Image from "next/image";
import { activeAssets, assetCatalog, type AssetKey } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const editions: Record<AssetKey, { group: string; edition: string }> = {
  "hero-molar": { group: "DENTAL SCIENCE", edition: "FIG / 001" },
  "research-enamel": { group: "RESEARCH", edition: "STUDY / 001" },
  "research-microscopy": { group: "RESEARCH", edition: "STUDY / 002" },
  "project-anatomy": { group: "PROJECTS", edition: "PROJECT / 001" },
  "project-biomaterial": { group: "PROJECTS", edition: "PROJECT / 002" },
  "presentation-pulp": { group: "PRESENTATIONS", edition: "TALK / 001" },
  "presentation-crown": { group: "PRESENTATIONS", edition: "TALK / 002" },
  "gallery-laboratory": { group: "ARCHIVE", edition: "PLATE / 001" },
  "gallery-model": { group: "ARCHIVE", edition: "PLATE / 002" },
  "portrait": { group: "PROFILE", edition: "PERSONAL / 001" },
};

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
  const edition = editions[asset];
  return (
    <div className={cn("asset-frame", className)}
      style={{ aspectRatio: info.ratio }}
      data-asset={asset}
      role="img"
      aria-label={src ? info.label : "جایگاه آماده‌سازی برای " + info.label}
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
        <div className="asset-placeholder editorial-asset-cover" aria-hidden="true">
          <div className="editorial-asset-upper" dir="ltr">
            <span>BIOGLASS / DOCUMENTS</span>
            <span>{edition.edition}</span>
          </div>
          <div className="editorial-asset-emblem">
            <span className="editorial-asset-axis" />
            <span className="editorial-asset-arc one" />
            <span className="editorial-asset-arc two" />
            <span className="editorial-asset-arc three" />
          </div>
          <div className="editorial-asset-bottom" dir="ltr">
            <span>{edition.group}</span>
            <span>CONTENT PENDING</span>
          </div>
        </div>
      )}
    </div>
  );
}
