import { CrystalizedBall } from "@/components/ui/crystalized-ball";

/**
 * The sync section — a two-column band on the homepage.
 *
 * Left: the live CrystalizedBall (WebGL2, `ogl`). It is interactive — the rim heats
 * toward the cursor, the dust stirs in its wake, and a click shakes it.
 * Right: a short write-up of Autonova.
 *
 * Nova Blue throughout, per `design-system.md`.
 */

const POINTS = [
  {
    title: "Shared state",
    body: "Your team and your agents read and write the same live record. There is no second copy to reconcile."
  },
  {
    title: "No handoffs",
    body: "Work passes between people and agents without being copied, summarised or retold on the way."
  },
  {
    title: "Always current",
    body: "The control plane shows what is true right now — not a status report written an hour ago."
  }
];

export function SyncSection() {
  return (
    <section id="sync-section" className="relative w-full overflow-hidden bg-[#030509] py-20 sm:py-28">
      {/* ambient Nova Blue wash behind the ball */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_60%_at_28%_50%,rgba(21,80,184,0.22),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left — the live component */}
        <div className="relative order-1">
          <div
            className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/10 bg-[#0A0E18]/60 backdrop-blur-xl"
            style={{ boxShadow: "0 30px 80px -30px rgba(3,5,7,0.95), inset 0 1px 0 rgba(255,255,255,0.06)" }}
          >
            {/* faint grid behind the ball */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(30,102,217,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,102,217,0.06) 1px, transparent 1px)",
                backgroundSize: "34px 34px"
              }}
            />
            <CrystalizedBall
              preset="abyss"
              color="#1E66D9"
              size={0.68}
              fill={0.78}
              motion="orbit"
              particleShape="round"
              depth={0.8}
              sway={0.7}
              twinkle={0.55}
              haze={0.6}
              glow={0.95}
              flares={0.6}
              sparks={0.45}
              crackle={0.55}
              strands={5}
              speed={1}
              dustSpeed={0.9}
              interactive
              hoverStrength={0.75}
              intro
              theme="dark"
            />
          </div>

          {/* live indicator, tied to the component's own language */}
          <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0E18]/70 px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00AECF] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00AECF]" />
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              Live sync
            </span>
          </div>
        </div>

        {/* Right — the write-up */}
        <div className="order-2">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5FD4E6]">
            One live system
          </p>
          <h2 className="mt-4 font-display text-3xl font-black uppercase leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything stays
            <br className="hidden sm:block" /> in sync
          </h2>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-slate-300 sm:text-lg">
            Autonova runs your work and your agents off the same live state. Issues, documents,
            decisions and messages land in one place, so nothing waits on a handoff and nothing
            drifts out of date.
          </p>

          <dl className="mt-10 space-y-6">
            {POINTS.map((point) => (
              <div key={point.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E66D9] shadow-[0_0_12px_2px_rgba(30,102,217,0.55)]"
                />
                <div>
                  <dt className="font-display text-sm font-bold uppercase tracking-wider text-white">
                    {point.title}
                  </dt>
                  <dd className="mt-1.5 font-body text-sm leading-relaxed text-slate-400">{point.body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default SyncSection;
