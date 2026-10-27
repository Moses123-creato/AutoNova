"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent } from "react";

const REST_INSET = 6;
const RETURN_DELAY = 1000;

/**
 * Huly-style pill CTA: a light surface with a springy blue glow that follows
 * the pointer and crossfades the blurred edge rings left/right.
 */
export function GlowButton({ href, children, id }: { href: string; children: string; id?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setGlow = useCallback((x: number) => {
    const root = rootRef.current;
    if (!root) return;

    const half = Math.max(1, (linkRef.current?.clientWidth ?? 0) / 2);
    const normalized = Math.max(-1, Math.min(1, x / half));

    root.style.setProperty("--glow-x", `${x}px`);
    root.style.setProperty("--edge-left", String(Math.max(0, -normalized)));
    root.style.setProperty("--edge-right", String(Math.max(0, normalized)));
  }, []);

  const returnToRest = useCallback(() => {
    if (returnTimer.current) {
      clearTimeout(returnTimer.current);
      returnTimer.current = null;
    }
    const width = linkRef.current?.clientWidth ?? 0;
    setGlow(width / 2 - REST_INSET);
  }, [setGlow]);

  useEffect(() => {
    returnToRest();
    return () => {
      if (returnTimer.current) clearTimeout(returnTimer.current);
    };
  }, [returnToRest]);

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;

    if (returnTimer.current) {
      clearTimeout(returnTimer.current);
      returnTimer.current = null;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setGlow(event.clientX - rect.left - rect.width / 2);
  };

  const handlePointerEnter = () => {
    if (returnTimer.current) {
      clearTimeout(returnTimer.current);
      returnTimer.current = null;
    }
  };

  const handlePointerLeave = () => {
    if (returnTimer.current) clearTimeout(returnTimer.current);
    returnTimer.current = setTimeout(returnToRest, RETURN_DELAY);
  };

  return (
    <span
      ref={rootRef}
      className="relative isolate inline-flex items-center"
      style={{ "--glow-x": "84px", "--edge-right": "1" } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[190px] w-[210px] rounded-full transition-transform duration-150 ease-out motion-reduce:transition-none"
        style={{ transform: "translate3d(calc(-50% + var(--glow-x)), -50%, 0)" }}
      >
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,#FFFFFF_3.5%,#CFE4FF_24%,#7FB6FF_42%,rgba(63,132,234,0.45)_58%,transparent_76%)] blur-[22px]" />
        <span className="absolute inset-[25%] rounded-full bg-[radial-gradient(ellipse_at_center,#FFFFFF_8%,#B9D8FF_38%,rgba(30,102,217,0.35)_64%,transparent_84%)] blur-[9px]" />
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] rounded-full border border-[#8CC4FF] blur-[5px] transition-opacity duration-300 motion-reduce:transition-none"
        style={{ opacity: "var(--edge-left, 0)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] rounded-full border border-[#8CC4FF] blur-[5px] transition-opacity duration-300 motion-reduce:transition-none"
        style={{ opacity: "var(--edge-right, 1)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-3px] -z-[6] rounded-full border-2 border-[#3F84EA]/80 blur-[13px] transition-opacity duration-300 motion-reduce:transition-none"
        style={{ opacity: "var(--edge-left, 0)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-3px] -z-[6] rounded-full border-2 border-[#3F84EA]/80 blur-[13px] transition-opacity duration-300 motion-reduce:transition-none"
        style={{ opacity: "var(--edge-right, 1)" }}
      />

      <Link
        ref={linkRef}
        id={id}
        href={href}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        className="group relative z-10 inline-flex h-10 items-center justify-center gap-2.5 overflow-hidden rounded-full border border-white/70 bg-[#DCE7F7] px-7 font-display text-xs font-bold uppercase tracking-[0.12em] text-[#0B2C63] shadow-[0_0_26px_rgba(30,102,217,0.28)] transition-[background-color,box-shadow,border-color,transform] duration-300 hover:border-white hover:bg-white hover:shadow-[0_0_38px_rgba(30,102,217,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FD4E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030509] active:scale-[0.98] sm:px-16"
      >
        <span className="relative z-10 whitespace-nowrap">{children}</span>
        <svg
          aria-hidden="true"
          width="17"
          height="9"
          viewBox="0 0 17 9"
          fill="none"
          className="relative z-10 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path d="M0 4.5H16M12 1L16 4.5L12 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </span>
  );
}

export default GlowButton;
