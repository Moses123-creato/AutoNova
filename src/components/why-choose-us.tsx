"use client";

import React from "react";
import { BorderBeam } from "border-beam";
import { Cpu, ShieldCheck, Zap, Globe2, Sparkles, CheckCircle2 } from "lucide-react";

export function WhyChooseUs() {
  const cardsLeft = [
    {
      id: "card-autonomous",
      icon: Cpu,
      badge: "24/7 Execution",
      title: "Autonomous Agent Dispatch",
      description:
        "Continuous AI-driven execution across codebases, infrastructure pipelines, and automated sprint workflows without human bottleneck.",
      beamVariant: "sunset" as const,
      iconColor: "text-amber-400"
    },
    {
      id: "card-unified",
      icon: Zap,
      badge: "Zero Context Switching",
      title: "Unified Platform Velocity",
      description:
        "Consolidates project management, task tracking, team chat, and documentation into one lightning-fast platform replacing 4 fragmented tools.",
      beamVariant: "ocean" as const,
      iconColor: "text-cyan-400"
    }
  ];

  const cardsRight = [
    {
      id: "card-security",
      icon: ShieldCheck,
      badge: "Bank-Grade Privacy",
      title: "Enterprise Isolation",
      description:
        "Isolated sandboxed runtime environments with zero data leakage, hardware-level encryption, and sovereign key management.",
      beamVariant: "colorful" as const,
      iconColor: "text-emerald-400"
    },
    {
      id: "card-scale",
      icon: Globe2,
      badge: "Sub-10ms Latency",
      title: "Global Scale & Instant Sync",
      description:
        "Distributed multi-region edge deployment ensuring instant real-time synchronization for global teams across every continent.",
      beamVariant: "ocean" as const,
      iconColor: "text-purple-400"
    }
  ];

  return (
    <section
      id="why-choose-us"
      className="relative py-24 sm:py-32 bg-[#030509] overflow-hidden select-none"
    >
      {/* Background ambient celestial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/25 via-[#081028]/20 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Title & Subtitle */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-[0.2em] text-cyan-300 uppercase mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>GLOBAL ENTERPRISE PLATFORM</span>
          </div>

          <h2
            id="why-choose-us-title"
            className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight mb-5"
          >
            Why Choose Us
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover why hyper-growth teams and forward-thinking enterprises rely on Autonova to power their autonomous engineering workflows.
          </p>
        </div>

        {/* Main Grid: Left Floating Cards | Central 3D Earth Video | Right Floating Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Corner Floating Cards (2 Cards) */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
            {cardsLeft.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.id} className="relative group">
                  <BorderBeam
                    size="md"
                    colorVariant={card.beamVariant}
                    strength={0.8}
                    theme="dark"
                    borderRadius={16}
                    className="w-full rounded-2xl"
                  >
                    <div className="relative rounded-2xl p-6 backdrop-blur-2xl bg-[#06080F]/85 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.3)] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                      {/* Liquid Metal Shimmer Reflection Overlay */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-2xl liquid-metal-chrome opacity-30 mix-blend-overlay"
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${card.iconColor}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                            {card.badge}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2">
                          {card.title}
                        </h3>

                        <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </BorderBeam>
                </div>
              );
            })}
          </div>

          {/* Center 3D Earth Video Container */}
          <div className="lg:col-span-4 relative flex items-center justify-center order-1 lg:order-2 my-6 lg:my-0">
            {/* Glowing atmosphere halo around Earth */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-indigo-500/20 blur-3xl scale-125" />

            <div className="relative z-10 w-full max-w-[380px] sm:max-w-[440px] aspect-square rounded-full overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(6,182,212,0.3)]">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/earth img.png"
                className="w-full h-full object-cover object-center rounded-full scale-105"
              >
                <source src="/Earth.mp4" type="video/mp4" />
              </video>

              {/* Edge atmospheric shading */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]" />
            </div>
          </div>

          {/* Right Corner Floating Cards (2 Cards) */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-3">
            {cardsRight.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.id} className="relative group">
                  <BorderBeam
                    size="md"
                    colorVariant={card.beamVariant}
                    strength={0.8}
                    theme="dark"
                    borderRadius={16}
                    className="w-full rounded-2xl"
                  >
                    <div className="relative rounded-2xl p-6 backdrop-blur-2xl bg-[#06080F]/85 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.3)] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                      {/* Liquid Metal Shimmer Reflection Overlay */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-2xl liquid-metal-chrome opacity-30 mix-blend-overlay"
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${card.iconColor}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                            {card.badge}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2">
                          {card.title}
                        </h3>

                        <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </BorderBeam>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Highlights Strip */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">99.99% Uptime Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">SOC2 Type II Certified</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">Sub-10ms Edge Sync</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">Zero Config Setup</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
