"use client";

import { lazy, Suspense, useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { LaserErrorBoundary } from "./laser-error-boundary";

/**
 * Hero background — poster-first, then upgrade.
 *
 * The laser is a heavy WebGL2 effect. It must never be the reason the hero
 * looks empty, so:
 *
 *  1. A static poster is painted in the server HTML. It is the same blue beam
 *     in the same box, so the section reads correctly with JavaScript disabled
 *     and before the heavy chunk has even been requested.
 *  2. The live component lives in its own chunk and is only requested once the
 *     page is interactive and the hero is on screen.
 *  3. Devices that cannot afford it never request the chunk at all.
 *  4. The poster cross-fades out only after the live component has drawn its
 *     first frame, so there is never a flash of nothing.
 */

const LaserFlow = lazy(() =>
  import("@/components/ui/laser-flow").then((m) => ({ default: m.LaserFlow }))
);

type Plan = {
  /**
   * "poster"   — static placeholder only, the live effect is never requested.
   * "degraded" — live effect, reduced resolution.
   * "full"     — live effect, full resolution.
   */
  tier: "poster" | "degraded" | "full";
  /** Why, for the console and for debugging. */
  reason: string;
  /** Device pixel ratio cap for the live canvas. */
  dpr: number;
};

const POSTER_BEAM = 72; // must match `beamPosition` in hero.tsx

const readPlan = (): Plan => {
  const poster = (reason: string): Plan => ({ tier: "poster", reason, dpr: 1 });

  if (typeof window === "undefined") return poster("server");

  // Explicit user intent and hard blockers: no live effect at all.
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (reduce) return poster("prefers-reduced-motion");

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  const conn = nav.connection;
  if (conn?.saveData) return poster("save-data");
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") {
    return poster(`effective-type-${conn.effectiveType}`);
  }

  const memory = nav.deviceMemory;
  if (typeof memory === "number" && memory < 2) return poster(`device-memory-${memory}`);

  let gl: WebGL2RenderingContext | null = null;
  try {
    gl = document.createElement("canvas").getContext("webgl2");
  } catch {
    gl = null;
  }
  if (!gl) return poster("no-webgl2");

  // Mid-range devices still get the effect, just cheaper. The shader is
  // fill-rate bound, so resolution is the lever that actually matters.
  const cores = navigator.hardwareConcurrency;
  const tight =
    (typeof cores === "number" && cores < 4) ||
    (typeof memory === "number" && memory < 4) ||
    conn?.effectiveType === "3g";

  if (tight) {
    const why =
      (typeof cores === "number" && cores < 4 ? `cores-${cores}` : "") ||
      (typeof memory === "number" && memory < 4 ? `memory-${memory}` : "") ||
      `effective-type-${conn?.effectiveType}`;
    return { tier: "degraded", reason: why, dpr: 1 };
  }

  const cap = typeof memory === "number" && memory < 8 ? 1.5 : 2;
  return { tier: "full", reason: "ok", dpr: Math.min(window.devicePixelRatio || 1, cap) };
};

// The plan is a browser-only value that cannot change while the page is open,
// so it is read once and cached. `useSyncExternalStore` keeps the server pass
// and the client hydration consistent without a setState-in-effect.
const SERVER_PLAN: Plan = { tier: "poster", reason: "server", dpr: 1 };
let cachedPlan: Plan | null = null;
const getPlan = () => {
  if (!cachedPlan) cachedPlan = readPlan();
  return cachedPlan;
};
const getServerPlan = () => SERVER_PLAN;
const subscribeToNothing = () => () => {};

const idle = (callback: () => void) => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback(callback, { timeout: 2000 });
    return;
  }
  setTimeout(callback, 400);
};

export function HeroLaserBackdrop({ surfaceRef }: { surfaceRef: RefObject<HTMLElement | null> }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const plan = useSyncExternalStore(subscribeToNothing, getPlan, getServerPlan);
  const [inView, setInView] = useState(false);
  const [idleDone, setIdleDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Wait for the page to be interactive before asking for the heavy chunk.
  useEffect(() => {
    if (plan.tier === "poster") return;
    let cancelled = false;
    idle(() => {
      if (!cancelled) setIdleDone(true);
    });
    return () => {
      cancelled = true;
    };
  }, [plan.tier]);

  // Only mount the live effect while the hero is on screen. The shader is
  // fill-rate bound, so there is no point paying for it off-screen.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "200px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const mounted = plan.tier !== "poster" && inView && idleDone && !failed;

  // Watchdog. If the live component has not produced a frame in time, stay on
  // the poster rather than leaving a hole where the beam should be.
  useEffect(() => {
    if (!mounted || ready || failed) return;
    const timer = setTimeout(() => setFailed(true), 8000);
    return () => clearTimeout(timer);
  }, [mounted, ready, failed]);

  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => setFailed(true), []);

  return (
    <div ref={hostRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {/* Poster — always in the server HTML. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className="absolute inset-y-0 w-[3px] -translate-x-1/2"
          style={{ left: `${POSTER_BEAM}%`, top: "-10%", height: "78%" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-[#7FC4FF]/85 to-[#1E66D9]/0" />
          <div className="absolute inset-x-[-18px] inset-y-0 bg-gradient-to-b from-[#1E66D9]/40 via-[#1E66D9]/14 to-transparent blur-2xl" />
        </div>
        <div
          className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(95,168,255,0.42),transparent_68%)] blur-3xl"
          style={{ left: `${POSTER_BEAM}%`, top: "66%" }}
        />
      </div>

      {/* Live component — separate chunk, mounted only when it is affordable. */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {mounted && (
          <LaserErrorBoundary onError={handleError}>
            <Suspense fallback={null}>
              <LaserFlow
                surfaceRef={surfaceRef}
                color="#1E66D9"
                beamPosition={POSTER_BEAM / 100}
                intensity={2.4}
                beamWidth={1.5}
                flare={2.4}
                spread={2.4}
                spill={1.4}
                fog={0.45}
                dust={2.2}
                streaks={2.4}
                dots={1.2}
                pulse={2.8}
                speed={1.9}
                seed={3}
                mouseInteraction
                intro={false}
                theme="dark"
                dpr={plan.dpr}
                onReady={handleReady}
              />
            </Suspense>
          </LaserErrorBoundary>
        )}
      </div>

      {/* Atmospheric vignette — kept light so the beam and its fog stay readable. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030509]/45 via-transparent to-[#030509]/90" />
    </div>
  );
}

export default HeroLaserBackdrop;
