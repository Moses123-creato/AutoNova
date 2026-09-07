# Design System — AutoNova

**Version .0 (AUTONOVA) · September 2026**

A unified visual language for AutoNova — voice, chat, and avatar agents built on a high-precision, liquid-metal interactive canvas with traveling beam borders and deep Nova blue architecture.

> Source of truth. This file is the project's design system. Values below are taken from the approved `DesignSystemBoard` component — do not change them, do not improvise tokens. Page designs give the layout; this file gives the visual language. If a page design conflicts with a token here, ask before deviating.

**Font utilities:** `font-display` → Orbitron · `font-heading` → Rajdhani · `font-body` → Inter · `font-mono` for telemetry, labels, hex, kbd.

---

## 01 — Colors

### Nova Blue — Primary Interactive Scale (darker, richer "Nova Blue")

| Token | Hex | Sub |
| --- | --- | --- |
| Nova 700 | `#0B2C63` | Core Navy |
| Nova 600 | `#0F3E8C` | Base Accent |
| Nova 500 | `#1550B8` | Interactive |
| Nova 400 | `#1E66D9` | Highlight |
| Nova 300 | `#3F84EA` | Muted Tint |

### Signal Cyan — Live Accent & Glow Indicators

| Token | Hex | Sub |
| --- | --- | --- |
| Signal 500 | `#00AECF` | Live / Active |
| Signal 300 | `#5FD4E6` | Glow Edge |

### Neutral — Void, Slate & White

| Token | Hex | Text on it |
| --- | --- | --- |
| Void 950 | `#030507` | `#FFFFFF` |
| Void 900 | `#0A0E18` | `#FFFFFF` |
| Slate 700 | `#2A3348` | `#FFFFFF` |
| Slate 500 | `#5B6785` | `#FFFFFF` |
| Slate 300 | `#B7C0D6` | `#0A0E18` |
| Slate 100 | `#E4E9F4` | `#0A0E18` |
| White | `#FFFFFF` | `#0A0E18` |

---

## 02 — Typography

**Families (retain these):**

- **Orbitron** — Display 1, Display 2, Heading 1 · futuristic geometric display.
- **Rajdhani** — Heading 2, Heading 3 · high-legibility engineered UI text.
- **Inter** — Body · high-legibility engineered UI text.

### Type scale

| Style | Font | Size / LH | Weight | Use |
| --- | --- | --- | --- | --- |
| Hero Display | Orbitron | text-8xl · 96/96 | Black (900) | Hero statements, one per page |
| Display 1 | Orbitron | text-6xl · 60/64 | Bold | Page titles & key telemetry |
| Display 2 | Orbitron | text-5xl · 48/52 | Bold | Section titles & clusters |
| Heading 1 | Orbitron | text-4xl · 36/40 | Semibold | Card & module titles |
| Heading 2 | Rajdhani | text-3xl · 30/36 | Semibold | Sub-sections |
| Heading 3 | Rajdhani | text-2xl · 24/30 | Medium | Small titles, metric headers |
| Body Large | Inter | text-lg · 18/28 | Regular | Lead copy |
| Body | Inter | text-base · 16/24 | Regular | Default reading text |
| Small | Inter | text-sm · 14/20 | Regular | Secondary text, meta |

### Hero surface treatment (chrome-on-void)

- Static / subtle metal border — no excessive animation.
- Backdrop: `radial-gradient(ellipse at 30% 20%, rgba(30,102,217,0.35), transparent 60%)` at 40% opacity.
- Wordmark: uppercase, tracking-tight, leading-none, font-black, gradient text `linear-gradient(180deg, #FFFFFF 0%, #BFE0FF 35%, #3F84EA 75%, #0B2C63 100%)` clipped to text, `filter: drop-shadow(0 0 32px rgba(30,102,217,0.5))`.
- Eyebrow: `text-xs font-mono uppercase tracking-widest text-sky-400` with a pulsing `bg-sky-400` dot. Sample: "YOUR AUTONOMOUS AI TEAM".

---

## 03 — Spacing

Base unit: **4px**.

| Token | px | rem |
| --- | --- | --- |
| 4 | 4 | 0.25rem |
| 8 | 8 | 0.5rem |
| 12 | 12 | 0.75rem |
| 16 | 16 | 1rem |
| 24 | 24 | 1.5rem |
| 32 | 32 | 2rem |
| 48 | 48 | 3rem |
| 64 | 64 | 4rem |

---

## 04 — Radius & Shadows

### Radius

| Value | Tailwind code | Size |
| --- | --- | --- |
| 6px | rounded-md | xs |
| 10px | rounded-lg | sm |
| 16px | rounded-2xl | md |
| 24px | rounded-3xl | lg |
| Full | rounded-full | pill |

### Shadows

| Name | CSS |
| --- | --- |
| Panel | `0 8px 24px -8px rgba(3,5,7,0.55)` |
| Lift | `0 20px 48px -12px rgba(3,5,7,0.65)` |
| Nova Glow | `0 0 0 1px rgba(30,102,217,0.35), 0 0 32px rgba(30,102,217,0.35)` |
| Signal Glow | `0 0 0 1px rgba(0,174,207,0.4), 0 0 28px rgba(0,174,207,0.45)` |

---

## 05 — Icons (High-Tech Set)

- **Set (lucide-react):** `CircuitBoard, Cpu, Radar, Satellite, Activity, Terminal, Fingerprint, Bot, ScanLine, Orbit, ShieldCheck, Workflow`.
- **Specs:** 24×24px grid · 1.75px stroke default (`stroke-[1.75]`) · rounded joins. Interactive buttons use 2px stroke.
- **Icon buttons:** circular liquid-metal ring wrapper (`MetalFx variant="circle" preset="silver"`); button `w-10 h-10 rounded-full bg-slate-900 border border-slate-800`, icon `text-sky-400`, hover → white.

---

## 06 — Buttons (Liquid-Metal, `metal-fx` enabled)

| Variant | MetalFx | Surface | Text |
| --- | --- | --- | --- |
| Primary (Chromatic) | `preset="chromatic" strength={1}` | `h-11 px-4 rounded-xl` gradient `from-[#1550B8] to-[#0F3E8C]`, `shadow-lg shadow-blue-900/40` | white, `font-display font-bold text-xs tracking-wider uppercase` |
| Secondary (Silver) | `preset="silver" strength={0.65}` | `h-11 px-4 rounded-xl border border-slate-700 bg-slate-900/90`, hover `bg-slate-800` | `text-sky-300 font-medium text-xs` |
| Text / Ghost | `preset="silver" strength={0.4}` | none | `text-sky-400 hover:text-sky-300 font-medium text-xs`, optional `Play` icon |

Shared: `active:scale-95`. Samples: "Get Started" / "See Our Work" / "Watch Demo".

Architecture:
- Primary CTAs: strong chromatic shader with wandering halo (`preset="chromatic"`).
- Secondary controls: subtle cool silver liquid-metal treatment (`preset="silver"`).
- Real-time WebGL shader composite matching the runtime theme.

---

## 07 — Inputs

- Height 44px (`h-11`) · radius 12px (`rounded-xl`) · metal focus perimeter.
- Field wrapped in `BorderBeam size="line" colorVariant="ocean" strength={0.7}` for a traveling focus border.
- Surface: section surface + `border border-slate-700/80`; `Search` icon left; `⌘ K` kbd right (`text-[10px] font-mono bg-slate-800 border border-slate-700`).
- Sample placeholder: "Search agents or telemetry...".

---

## 08 — Badges & Chips

Metal border when active/selected:

- **Active chip:** `MetalFx preset="chromatic" strength={0.85}` wrapper; `px-3 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wider uppercase bg-blue-600/30 text-sky-200 border border-sky-400 shadow-sm shadow-cyan-500/20`.
- **Inactive chip:** `px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase bg-slate-800/80 text-slate-400 border border-slate-700 hover:text-white`.
- Chip set: `Voice AI · Chat AI · 3D Avatar`.
- **Live badge:** `LIVE NODE` — `px-2.5 py-1 rounded-md text-xs font-bold font-mono tracking-wider uppercase text-slate-950 bg-gradient-to-r from-[#5FD4E6] to-[#00AECF]`.

---

## 09 — Status

| State | Indicator |
| --- | --- |
| Processing | pulsing dot — `animate-ping bg-sky-400/75` halo + solid `bg-sky-500` core (2.5px) |
| Completed | `CheckCircle2`, `text-emerald-400` |
| Locked | `Lock`, `text-slate-500` |
| Synced | `Check`, `text-sky-400` |

---

## 10 — Progress (HUD Display)

**Circular gauge**
- SVG `viewBox="0 0 120 120"`, rotated -90°, track r=46, `strokeWidth="10"`, `text-slate-800`, `strokeLinecap="round"`.
- Progress stroke: gradient `#5FD4E6 → #0F3E8C`, `drop-shadow(0 0 6px rgba(0,174,207,0.6))`.
- Center: `text-xl font-black font-mono` percentage + `SYNC` label (`text-[10px] font-mono text-slate-500 tracking-wider`).

**Segment bar**
- 24 segments (`h-5 flex-1 rounded-sm`); lit = `round(progress/100 × 24)`.
- Lit: `linear-gradient(180deg,#5FD4E6,#0F3E8C)` + `box-shadow 0 0 8px rgba(0,174,207,0.6)`; unlit: `#1E293B`.
- Caption: `NODE {lit}/{24} ONLINE` (`text-[11px] font-mono text-slate-500 tracking-widest`).

---

## 11 — Cards (Border-Beam & Liquid Metal)

- Wrapper: `BorderBeam size="md" colorVariant="ocean" strength={0.75}` — traveling beam perimeter.
- Card: `p-5 rounded-2xl`, section surface, `border border-slate-700/60`, `min-h-[220px]`, inset highlight + deep shadow, hover `shadow-cyan-500/10`.
- Header: icon tile `w-10 h-10 rounded-xl bg-slate-950 border border-slate-800` with `text-sky-400` icon; tag chip `text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-600/15 text-sky-300 border border-blue-500/30`.
- Title: Orbitron `font-display font-bold text-base`; body `text-xs text-slate-400 leading-relaxed`.
- Footer: `border-t border-slate-800/80`; stat `font-mono text-xs text-sky-400/90`; `View` + `ChevronRight` link (`text-sky-400 hover:text-white`).
- Samples: Voice Concierge Agent (VOICE AI · 48ms latency) · Chat AI Assistant (CHAT AI · 99.9% uptime) · Avatar Agent (3D AVATAR · 60 FPS stream) · Agency Build Log (CASE STUDY · 1.2M queries).

---

## 12 — Navigation

- **Brand header bar:** `p-4 rounded-xl border border-slate-800/80 bg-slate-950/70 shadow-lg`; links `text-xs font-medium text-slate-400`, active `text-sky-400 font-semibold`, hover `text-white`.
- **Breadcrumbs:** `text-xs font-mono text-slate-400`, `/` separators, current `text-sky-400 font-semibold`.
- **Pagination:** `w-8 h-8 rounded-lg border text-xs font-semibold`; active `border-blue-500 bg-blue-600/20 text-sky-300`, inactive `border-slate-800 text-slate-400 hover:border-slate-700`; ‹ › steppers `border-slate-800 text-slate-400 hover:text-white`.

---

## 13 — Principles

1. **Clarity First** — Every screen states its status plainly, with no cognitive friction or unnecessary ornament.
2. **Modular Precision** — The same components, tokens, and liquid-metal rings hold up across every viewport.
3. **Autonomous Flow** — Interfaces get out of the way of the agent executing workflows and completing tasks.
4. **Built to Last** — High contrast, keyboard navigation, and a dual-theme system engineered for longevity.

Tile: `w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-sky-400` icon; title `text-sm font-display font-bold`; body `text-xs text-slate-400 leading-relaxed`.

---

## Dual-Theme Surfaces

| Token | Dark | Light |
| --- | --- | --- |
| Board background | `#030507` | `#F8FAFC` |
| Section surface | `bg-[#0A0E18]/80 border-slate-800/80` | `bg-white border-slate-200 shadow-sm` |
| Tag / accent text | `text-sky-400` | `text-blue-600` |
| Headings | `text-white` | `text-slate-900` |
| Body text | `text-slate-400` | `text-slate-600` |
| Base text | `text-slate-200` | `text-slate-800` |

**Theme toggle:** circular liquid-metal ring (`MetalFx variant="circle" preset="silver" strength={0.85}`), `h-10 w-10 rounded-full` — dark: `bg-slate-900 border-slate-700` + `Sun` in `text-amber-400`; light: `bg-white border-slate-300` + `Moon` in `text-blue-600`.

---

## Libraries Referenced by This Spec

- `border-beam` — `BorderBeam` (traveling beam borders: inputs `size="line"`, cards `size="md"`, `colorVariant="ocean"`).
- `metal-fx` — `MetalFx` (liquid-metal rings and button shaders; presets `chromatic` / `silver`, real-time WebGL composite, theme-aware).
- `lucide-react` — icon set (section 05).
- `AutoNovaLogo` / `AutoNovaEmblem` — brand marks (`./AutoNovaLogo.tsx`), retained as-is.
