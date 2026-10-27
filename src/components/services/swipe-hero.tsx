"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./swipe-hero.css";

/**
 * SwipeHero — a scroll-pinned service carousel.
 *
 * Ported from `swipe-hero/SwipeHero.jsx`. The section stays pinned while you
 * scroll through the services; a hand swipes the current card away, the centre
 * icon spins, and the service name swaps in.
 *
 * Typography comes from the site design system: Orbitron for the display
 * type, Inter for the body. The source file's system-ui stack is not used.
 */

const SERVICES = [
  "AI Powered Website",
  "Business Workflow Automation",
  "Order Management Systems",
  "Inventory & Stock Management Systems",
  "Customer Support Automation",
  "Lead Generation and Follow-Up Systems"
];

/** One line per service, shown under its name. */
const DESCRIPTIONS = [
  "Sites that are built, kept and improved by agents — not by a backlog.",
  "The manual steps between your tools, replaced with flows that run themselves.",
  "From order to dispatch to reconciliation, one live record instead of five spreadsheets.",
  "Stock levels that update themselves, so you know what is available before you promise it.",
  "Answers at any hour, with the whole customer in context, not just the last message.",
  "Enquiries captured, enriched and chased, so no lead goes quiet."
];

/* Faded line icons for the side cards (one per service, same order). */
const GLYPHS = [
  // AI website: browser window with a spark
  <>
    <rect x="6" y="10" width="36" height="28" rx="4" />
    <path d="M6 18h36" />
    <path d="M24 24v8M20 28h8" />
  </>,
  // workflow: connected nodes
  <>
    <circle cx="10" cy="14" r="4" />
    <circle cx="38" cy="14" r="4" />
    <circle cx="24" cy="36" r="4" />
    <path d="M14 14h20M12 18l9 14M36 18l-9 14" />
  </>,
  // orders: receipt / cart
  <>
    <path d="M12 6h24v36l-4-3-4 3-4-3-4 3-4-3-4 3z" />
    <path d="M18 16h12M18 24h12M18 32h7" />
  </>,
  // inventory: stacked boxes
  <>
    <path d="M24 6l16 8v20l-16 8-16-8V14z" />
    <path d="M8 14l16 8 16-8M24 22v20" />
  </>,
  // support: headset
  <>
    <path d="M10 28v-4a14 14 0 0 1 28 0v4" />
    <rect x="6" y="28" width="8" height="12" rx="3" />
    <rect x="34" y="28" width="8" height="12" rx="3" />
    <path d="M38 40c0 3-4 4-10 4" />
  </>,
  // lead gen: funnel
  <>
    <path d="M6 10h36L28 26v14l-8 4V26z" />
  </>
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type SwipeHeroProps = {
  /** Fixed height of the visual box in px. */
  height?: number;
  /** Scroll distance in px per service swipe. */
  scrollPerService?: number;
  /** Asset URL for the hand image. */
  handSrc?: string;
  /** Asset URL for the centre icon. */
  iconSrc?: string;
  /** The service list. */
  services?: string[];
  /** One line per service, shown under its name. */
  descriptions?: string[];
  /** The section title. */
  title?: string;
  /** Small label under the section title. */
  eyebrow?: string;
};

export default function SwipeHero({
  height = 720,
  scrollPerService = 420,
  handSrc = "/hand-blue.webp",
  iconSrc = "/icon.svg",
  services = SERVICES,
  descriptions = DESCRIPTIONS,
  title = "Our Services",
  eyebrow = "What we build"
}: SwipeHeroProps) {
  const N = services.length;
  const wrapRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef(0);
  const [pos, setPos] = useState(0);
  const [stickyTop, setStickyTop] = useState(0);
  const [dir, setDir] = useState(1);
  const lastIndex = useRef(0);
  const reduced = useRef(false);

  const scrollLength = (N - 1) * scrollPerService;

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      // The panel's height is capped in CSS to the space between the navbar and
      // the bottom of the real viewport. Read the rendered height, then keep the
      // panel clear of the fixed navbar on short laptop viewports.
      const panelHeight = stickyRef.current?.offsetHeight ?? height;
      const navBottom =
        document.getElementById("main-navbar")?.getBoundingClientRect().bottom ?? 0;
      const top = Math.max(navBottom + 16, (window.innerHeight - panelHeight) / 2);
      setStickyTop(top);
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = top - rect.top;
      target.current = clamp(scrolled / scrollLength, 0, 1) * (N - 1);
      kick();
    };

    const tick = () => {
      const diff = target.current - current.current;
      if (Math.abs(diff) < 0.0008 || reduced.current) {
        current.current = target.current;
        setPos(current.current);
        raf.current = 0;
        return;
      }
      current.current += diff * 0.14; // smooth follow
      setPos(current.current);
      raf.current = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [height, scrollLength, N]);

  const index = clamp(Math.round(pos), 0, N - 1);
  useEffect(() => {
    if (index !== lastIndex.current) {
      setDir(index > lastIndex.current ? 1 : -1);
      lastIndex.current = index;
    }
  }, [index]);

  // Hand sits centered on each card at rest and swipes left as you scroll
  // toward the next one. It fades out right as the headline swaps.
  const s = pos - Math.round(pos);
  const handX = -s * 170;
  const handRot = s * -8;
  const handOpacity = 1 - clamp((Math.abs(s) - 0.36) / 0.14, 0, 1);

  return (
    <section
      ref={wrapRef}
      className="sh-wrap"
      style={
        {
          "--sh-height": `${height}px`,
          "--sh-scroll": `${scrollLength}px`
        } as CSSProperties
      }
      aria-label={title}
    >
      <div ref={stickyRef} className="sh-sticky" style={{ top: stickyTop }}>
        <div className="sh-stage" style={{ "--t": pos } as CSSProperties}>
          <div className="sh-bg" aria-hidden="true" />
          <div className="sh-grid" aria-hidden="true" />

          <h2 className="sh-section-title">
            {title}
            <span>{eyebrow}</span>
          </h2>

          {/* card carousel */}
          <div className="sh-track" aria-hidden="true">
            {services.map((_, i) => {
              const d = Math.min(Math.abs(i - pos), 2);
              const near = 1 - Math.min(d, 1);
              return (
                <div
                  key={i}
                  className="sh-card"
                  style={{
                    transform: `scale(${0.88 + 0.12 * near})`,
                    opacity: 0.28 + 0.5 * (1 - d / 2)
                  }}
                >
                  <svg viewBox="0 0 48 48" className="sh-glyph">
                    {GLYPHS[i % GLYPHS.length]}
                  </svg>
                </div>
              );
            })}
          </div>

          {/* center icon: spins in place with scroll */}
          <img
            className="sh-icon"
            src={iconSrc}
            alt=""
            draggable="false"
            style={{ transform: `translate(-50%, -50%) rotate(${pos * 360}deg)` }}
          />

          {/* hand */}
          <img
            className="sh-hand"
            src={handSrc}
            alt=""
            draggable="false"
            style={{
              opacity: handOpacity,
              transform: `translateX(calc(-47% + ${handX}px)) rotate(${handRot}deg)`
            }}
          />

          <div className="sh-fade" aria-hidden="true" />

          {/* name and description */}
          <div className="sh-bottom" aria-live="polite">
            <h3 className="sh-title">
              <span key={index} className={`sh-title-in ${dir > 0 ? "from-right" : "from-left"}`}>
                {services[index]}
              </span>
            </h3>
            <p className="sh-desc">
              <span
                key={`desc-${index}`}
                className={`sh-desc-in ${dir > 0 ? "from-right" : "from-left"}`}
              >
                {descriptions[index] ?? ""}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
