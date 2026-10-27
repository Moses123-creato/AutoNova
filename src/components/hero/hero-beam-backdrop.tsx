"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero video backdrop.
 *
 * The beam is a pre-rendered 4s loop rather than a WebGL scene. It is sized
 * against the dashboard so the fall lands on the panel's top edge, and the
 * baked background is black enough to sit invisibly on the hero.
 */
export function HeroBeamBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!media.matches);

    sync();
    media.addEventListener("change", sync);

    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (animate) {
      video.play().catch(() => {
        // The poster remains visible when autoplay is blocked.
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [animate]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 select-none">
      <video
        ref={videoRef}
        className="absolute left-[-34.8%] top-0 w-[188.2%] max-w-none -translate-y-[48.6%] object-contain mix-blend-lighten"
        src="/videos/hero-beam.mp4"
        poster="/videos/hero-beam-poster.webp"
        width={1920}
        height={1438}
        autoPlay={animate}
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
        disablePictureInPicture
      />
    </div>
  );
}

export default HeroBeamBackdrop;
