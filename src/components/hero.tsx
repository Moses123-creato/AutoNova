"use client";

import { useState } from "react";
import { HeroBeamBackdrop } from "@/components/hero/hero-beam-backdrop";
import { GlowButton } from "@/components/hero/glow-button";
import LogoLoop, { LogoItem } from "@/components/ui/logo-loop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiDocker,
  SiGithub,
  SiPostgresql
} from "react-icons/si";
import {
  CheckCircle2,
  Clock,
  Inbox,
  Kanban,
  Compass,
  Radio,
  Sliders
} from "lucide-react";

const techLogos: LogoItem[] = [
  { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-white" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiPython className="text-[#3776AB]" />, title: "Python", href: "https://www.python.org" },
  { node: <SiDocker className="text-[#2496ED]" />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiGithub className="text-white" />, title: "GitHub", href: "https://github.com" },
  { node: <SiPostgresql className="text-[#4169E1]" />, title: "PostgreSQL", href: "https://www.postgresql.org" }
];

export function Hero() {
  const [activeTab, setActiveTab] = useState<"tracker" | "issues" | "inbox">("issues");
  const [activeIssueCategory, setActiveIssueCategory] = useState<"all" | "backlog" | "todo" | "in_progress" | "done">("todo");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sampleTasks = [
    {
      id: "task-1",
      title: "Set up docker monitoring",
      status: "backlog",
      priority: "High",
      category: "infra",
      assignee: "Alex K.",
      time: "2h ago"
    },
    {
      id: "task-2",
      title: "Sales planning and marketing",
      status: "todo",
      priority: "Urgent",
      category: "growth",
      assignee: "Sarah M.",
      time: "10m ago"
    },
    {
      id: "task-3",
      title: "Pick the marketplace for the businesses",
      status: "in_progress",
      priority: "Medium",
      category: "product",
      assignee: "David R.",
      time: "45m ago"
    },
    {
      id: "task-4",
      title: "Liquid metal shader pipeline integration",
      status: "done",
      priority: "High",
      category: "engine",
      assignee: "Nova AI",
      time: "Just now"
    }
  ];

  const filteredTasks = sampleTasks.filter((t) => {
    if (activeIssueCategory === "all") return true;
    return t.status === activeIssueCategory;
  });

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 overflow-hidden bg-[#030509]"
    >
      {/* SVG Liquid Distortion Filter for Liquid Metal Effects */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-refraction">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* 1. HERO CONTENT: HEADLINE, NARRATIVE & CTA                                 */}
      {/* Left-aligned copy block — the beam owns the centre-right of the frame.    */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
        <div className="max-w-2xl text-left flex flex-col items-start">
          {/* Main Title: Building systems that move your business. */}
          <h1
            id="hero-main-title"
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-5 sm:mb-6 text-left"
          >
            <span className="block text-white drop-shadow-[0_2px_24px_rgba(255,255,255,0.3)]">
              Building systems
            </span>
            <span className="block text-slate-100 font-light mt-1">
              that move your business.
            </span>
          </h1>

          {/* Subtitle matching video copy */}
          <p
            id="hero-description"
            className="font-body text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl mb-8 font-normal text-left"
          >
            Autonova, an open-source autonomous platform, serves as an all-in-one replacement of Linear, Jira, Slack, and Notion.
          </p>

          {/* Action CTA Button */}
          <div className="flex flex-wrap items-center gap-4">
            <GlowButton href="/contact" id="hero-cta-action">
              See in Action
            </GlowButton>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE APP CARD / MONITORING DASHBOARD                             */}
      {/* Recreating the Tracker / Issues / Inbox dock spanning wide on desktop/tablet */}
      {/* The pre-rendered beam lands on this panel's top edge and runs its right.  */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-16 sm:mt-24">
        <div className="relative">
          <HeroBeamBackdrop />

          <div
            id="interactive-app-card"
            className="relative z-10 w-full rounded-2xl bg-[#080B14]/90 backdrop-blur-2xl border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)] overflow-hidden"
          >
            {/* Dock Navigation & Controls */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-white/[0.02]">
              {/* Primary Dock Tabs */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  id="tab-tracker"
                  onClick={() => setActiveTab("tracker")}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    activeTab === "tracker"
                      ? "text-white bg-white/15 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-orange-400" />
                  <span>Tracker</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] text-slate-300">56+</span>
                </button>

                <button
                  type="button"
                  id="tab-issues"
                  onClick={() => setActiveTab("issues")}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    activeTab === "issues"
                      ? "text-white bg-white/15 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Kanban className="w-3.5 h-3.5 text-sky-400" />
                  <span>Issues</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px]">18</span>
                </button>

                <button
                  type="button"
                  id="tab-inbox"
                  onClick={() => setActiveTab("inbox")}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    activeTab === "inbox"
                      ? "text-white bg-white/15 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5 text-purple-400" />
                  <span>Inbox</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </button>
              </div>

              {/* Status Audio / Sync Indicator like in the video */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>Sync live</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 hover:text-white cursor-pointer transition-colors p-1">
                  <Sliders className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Dock Content Body */}
            <div className="p-4 sm:p-6">
              {/* Category Filter Pills (when in Issues tab) */}
              {activeTab === "issues" && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {(["all", "backlog", "todo", "in_progress", "done"] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          id={`filter-${cat}`}
                          onClick={() => setActiveIssueCategory(cat)}
                          className={`px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider transition-all ${
                            activeIssueCategory === cat
                              ? "bg-white text-black font-semibold shadow"
                              : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {cat.replace("_", " ")}
                        </button>
                      ))}
                    </div>

                    <div className="text-xs text-slate-400 hidden sm:block">
                      Showing {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Task Grid Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {filteredTasks.map((task) => {
                      const isChecked = completedTasks[task.id] || task.status === "done";
                      return (
                        <div
                          key={task.id}
                          id={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isChecked
                              ? "bg-emerald-950/20 border-emerald-500/30"
                              : "bg-white/[0.04] border-white/10 hover:border-white/25 hover:bg-white/[0.07]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 px-1.5 py-0.5 rounded bg-white/5">
                              {task.category}
                            </span>
                            <span
                              className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                                task.priority === "Urgent"
                                  ? "bg-rose-500/20 text-rose-300"
                                  : task.priority === "High"
                                  ? "bg-amber-500/20 text-amber-300"
                                  : "bg-sky-500/20 text-sky-300"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>

                          <h4 className={`text-xs sm:text-sm font-medium mb-3 line-clamp-2 ${isChecked ? "text-slate-400 line-through" : "text-white"}`}>
                            {task.title}
                          </h4>

                          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className={`w-3.5 h-3.5 ${isChecked ? "text-emerald-400 fill-emerald-400/20" : "text-slate-500"}`} />
                              <span>{task.assignee}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              <span>{task.time}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tracker View */}
              {activeTab === "tracker" && (
                <div className="py-6 px-4 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-3">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">Autonomous Project Tracker</h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-4">
                    Real-time cross-functional velocity tracking connected to your agents and automated sprints.
                  </p>
                  <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xl font-bold text-white">99.4%</div>
                      <div className="text-[11px] text-slate-400">Sprint On-Time</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xl font-bold text-sky-400">42m</div>
                      <div className="text-[11px] text-slate-400">Mean Resolution</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xl font-bold text-emerald-400">0</div>
                      <div className="text-[11px] text-slate-400">Blockers</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Inbox View */}
              {activeTab === "inbox" && (
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                        RR
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-white">Richard Reynolds</div>
                        <div className="text-[11px] text-slate-400">Updated status on &quot;Set up docker monitoring&quot; to Backlog</div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500">2m ago</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-white">
                        SH
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-white">Sonja Holt</div>
                        <div className="text-[11px] text-slate-400">Merged PR #104: Autonomous dispatch loop update</div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500">18m ago</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Fade the beam's right edge into the page below the panel. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-full z-[1] h-[420px] bg-gradient-to-b from-transparent via-[#030509] to-[#030509]"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LOGO LOOP MARQUEE SECTION                                              */}
      {/* React Bits LogoLoop TS/TW spanning wide through the website                */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-16 sm:mt-20">
        <div className="text-center mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
            Powered by enterprise-grade autonomous stack
          </p>
        </div>
        <LogoLoop
          logos={techLogos}
          speed={45}
          direction="left"
          logoHeight={52}
          gap={32}
          scaleOnHover
          fadeOut
          fadeOutColor="#030509"
          ariaLabel="Technology partners"
        />
      </div>
    </section>
  );
}
