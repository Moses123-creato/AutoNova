import type { CSSProperties } from "react";

/**
 * Performance Results — the impact scorecard.
 *
 * Four decorative glass cards. The curve is ornament, not data (see
 * `design/home/home-spec.md`). All motion is CSS so this stays a server
 * component; see the `score-*` keyframes in `globals.css`.
 *
 * Colours are the Nova Blue accent from `design-system.md`.
 */

type Score = {
  /** Big value. Kept out of the curve maths — decorative only. */
  value: string;
  /** Small label sitting above the value, as in the reference. */
  label: string;
  /** Curve path in a 300x120 viewBox. */
  path: string;
  /** Peak of the curve, as a percentage of the viewBox, for the glowing node. */
  node: { x: number; y: number };
};

const SCORES: Score[] = [
  {
    value: "5+",
    label: "Hours Saved Every Week",
    path: "M0,96 C42,95 62,89 92,81 C122,73 142,41 170,29 C198,17 222,27 252,23 C273,20 287,21 300,19",
    node: { x: 56.7, y: 24.2 }
  },
  {
    value: "10+",
    label: "Workflows Simplified",
    path: "M0,93 C30,91 50,85 76,71 C102,57 122,31 152,25 C182,19 207,41 237,56 C262,69 281,75 300,77",
    node: { x: 50.7, y: 20.8 }
  },
  {
    value: "25+",
    label: "Leads Generated",
    path: "M0,101 C30,97 55,89 82,75 C106,63 126,35 153,27 C181,19 206,35 233,51 C259,66 281,73 300,75",
    node: { x: 51, y: 22.5 }
  },
  {
    value: "10+",
    label: "Business Automated",
    path: "M0,85 C36,97 64,101 94,93 C124,85 148,59 176,41 C204,23 232,19 258,25 C280,30 292,39 300,49",
    node: { x: 77.3, y: 15.8 }
  }
];

function ScoreCard({ score, index }: { score: Score; index: number }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A0E18]/70 backdrop-blur-xl transition-colors duration-500 hover:border-[#1E66D9]/50"
      style={{ boxShadow: "0 24px 60px -20px rgba(3,5,7,0.9), inset 0 1px 0 rgba(255,255,255,0.08)" }}
    >
      {/* faint Nova Blue grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={
          {
            backgroundImage:
              "linear-gradient(rgba(30,102,217,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,102,217,0.07) 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          } as CSSProperties
        }
      />

      {/* soft blue bloom at the top */}
      <div
        aria-hidden="true"
        className="score-glow pointer-events-none absolute inset-x-6 top-0 h-28 rounded-full bg-[#1550B8]/40 blur-3xl"
        style={{ animationDelay: `${index * 0.7}s` }}
      />

      {/* blue light pooling along the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1E66D9]/55 via-[#1E66D9]/12 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#5FA8FF] to-transparent"
      />

      {/* decorative curve */}
      <div className="relative mt-8 h-28 w-full px-4 sm:h-32">
        <svg
          viewBox="0 0 300 120"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`scoreStroke-${index}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1550B8" stopOpacity="0.15" />
              <stop offset="45%" stopColor="#3F84EA" />
              <stop offset="100%" stopColor="#5FD4E6" stopOpacity="0.9" />
            </linearGradient>
            <filter id={`scoreGlow-${index}`} x="-30%" y="-60%" width="160%" height="220%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={score.path}
            fill="none"
            stroke="#5FA8FF"
            strokeOpacity="0.22"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="score-curve"
            d={score.path}
            fill="none"
            stroke={`url(#scoreStroke-${index})`}
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            filter={`url(#scoreGlow-${index})`}
            style={{ animationDelay: `${index * 0.35}s` }}
          />
        </svg>

        {/* glowing node at the peak of the curve */}
        <span
          aria-hidden="true"
          className="score-node absolute h-3 w-3 rounded-full bg-[#7FC4FF] sm:h-4 sm:w-4"
          style={{
            left: `${score.node.x}%`,
            top: `${score.node.y}%`,
            boxShadow: "0 0 12px 4px rgba(95,212,230,0.75), 0 0 34px 12px rgba(30,102,217,0.5)"
          }}
        />
      </div>

      {/* label above, big value below — as in the reference */}
      <div className="relative mt-auto px-6 pb-7 pt-4 sm:px-7 sm:pb-8">
        <p className="font-body text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-slate-300/80">
          {score.label}
        </p>
        <p className="mt-1 font-display text-5xl font-black leading-none tracking-tight text-white drop-shadow-[0_2px_28px_rgba(95,212,230,0.35)] sm:text-6xl">
          {score.value}
        </p>
      </div>
    </article>
  );
}

export function PerformanceResults() {
  return (
    <section id="performance-results" className="relative w-full overflow-hidden bg-[#030509] py-20 sm:py-28">
      {/* ambient Nova Blue wash behind the heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(21,80,184,0.28),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            Performance Results
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
            Real numbers from teams already running on Autonova.
            <br className="hidden sm:block" /> Hours returned, workflows retired, pipeline created —
            measured, not promised.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {SCORES.map((score, index) => (
            <ScoreCard key={score.label} score={score} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PerformanceResults;