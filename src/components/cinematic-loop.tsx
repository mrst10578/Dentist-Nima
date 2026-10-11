"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * G03 is a conceptual six-second motion plate, not footage of a real study.
 * Never auto-play for reduced-motion visitors or when Save-Data is enabled.
 * Playback starts only when the artwork enters the viewport.
 */
export function CinematicLoop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let inView = false;
    const update = () => {
      const enabled = !reduced.matches && !connection?.saveData;
      setAllowed(enabled);
      if (!enabled || !inView || document.hidden) {
        video.pause();
        setPlaying(false);
        return;
      }
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: 0.18 });
    observer.observe(video);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="v8-motion-video-wrap" data-g03-motion>
      <Image
        src="/assets/bioglass/G03_hero-loop-keyframe.webp"
        width={1122}
        height={1402}
        sizes="(max-width:700px) 95vw, 48vw"
        loading="lazy"
        className="v8-motion-poster"
        alt="مطالعه هنری شیشه زیستی و بافت مینا، نمای ثابت"
      />
      <video
        ref={videoRef}
        className="v8-motion-video"
        muted
        playsInline
        loop
        preload="none"
        poster="/assets/bioglass/G03_hero-loop-keyframe.webp"
        aria-label="لوپ هنری شش‌ثانیه‌ای حرکت دوربین و تغییر ظریف نور روی فرم‌های شیشه‌ای"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/assets/bioglass/G03_cinematic-loop.webm" type="video/webm" />
        <source src="/assets/bioglass/G03_cinematic-loop.mp4" type="video/mp4" />
      </video>
      <span className="v8-motion-mark" dir="ltr">G03 / MATERIAL MOTION</span>
      {allowed && (
        <button type="button" className="v8-motion-toggle"
          onClick={toggle} aria-label={playing ? "توقف حرکت تصویر" : "پخش حرکت تصویر"}>
          {playing ? "توقف حرکت" : "پخش حرکت"}
        </button>
      )}
    </div>
  );
}
