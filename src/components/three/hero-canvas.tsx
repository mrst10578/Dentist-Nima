"use client";

import { useEffect, useRef, useState } from "react";
import { AssetFrame } from "@/components/asset-frame";

type VisualState = "loading" | "ready" | "fallback";

export function HeroCanvas() {
  const target = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<VisualState>("loading");

  useEffect(() => {
    const host = target.current;
    if (!host) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    let triggered = false;

    const activate = async () => {
      if (triggered || cancelled) return;
      triggered = true;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
      if (reduced || connection.connection?.saveData) {
        setState("fallback");
        return;
      }

      // Lightweight capability probe: no imported 3D code until needed.
      const probe = document.createElement("canvas");
      let hasWebGL = false;
      try {
        const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
        hasWebGL = Boolean(gl);
        const ext = gl?.getExtension("WEBGL_lose_context");
        ext?.loseContext();
      } catch {
        hasWebGL = false;
      }
      if (!hasWebGL) {
        setState("fallback");
        return;
      }

      try {
        const sceneModule = await import("./scene");
        if (cancelled || !target.current) return;
        dispose = sceneModule.mountBioGlassScene(target.current);
        setState("ready");
      } catch (error) {
        console.warn("BioGlass 3D preview unavailable; using static art.", error);
        if (!cancelled) setState("fallback");
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        void activate();
      }
    }, { rootMargin: "180px" });
    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      dispose?.();
    };
  }, []);

  return (
    <div className="hero-three-stage" data-hero-visual={state}>
      <div
        ref={target}
        className="hero-three-mount"
        role="img"
        aria-label="مجسمه هنری سه‌بعدی دندان آسیای شناور، با نورپردازی فیروزه‌ای؛ مدل آموزشی یا تشخیصی دقیق نیست"
      />
      {state !== "ready" && (
        <AssetFrame asset="hero-molar" className="hero-three-fallback" priority />
      )}
      <div className="hero-three-hud" aria-hidden="true">
        <span className="hero-three-index">FIGURE · 001</span>
        <span className="hero-three-status">
          <span className="pulse-dot" />
          {state === "ready" ? "INTERACTIVE STUDY" : "STATIC VISUAL"}
        </span>
      </div>
      {state === "ready" && (
        <div className="hero-three-instruction">برای چرخاندن، با ماوس بکشید</div>
      )}
    </div>
  );
}
