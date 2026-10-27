"use client";

import React, { useState } from "react";

export interface LogoItemNode {
  node: React.ReactNode;
  title?: string;
  href?: string;
}

export interface LogoItemImage {
  src: string;
  alt: string;
  href?: string;
  title?: string;
}

export type LogoItem = LogoItemNode | LogoItemImage;

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // duration in seconds or speed factor
  direction?: "left" | "right" | "up" | "down";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string; // hex or CSS color
  ariaLabel?: string;
  useCustomRender?: boolean;
  className?: string;
}

export function LogoLoop({
  logos,
  speed = 40,
  direction = "left",
  logoHeight = 48,
  gap = 48,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = "#030509",
  ariaLabel = "Technology partners and stack",
  className = ""
}: LogoLoopProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Repeat logos array to ensure continuous seamless infinite loop
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  const isVertical = direction === "up" || direction === "down";

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full overflow-hidden select-none py-4 ${className}`}
      style={{
        maskImage: fadeOut
          ? `linear-gradient(${
              isVertical ? "to bottom" : "to right"
            }, transparent 0%, black 12%, black 88%, transparent 100%)`
          : undefined,
        WebkitMaskImage: fadeOut
          ? `linear-gradient(${
              isVertical ? "to bottom" : "to right"
            }, transparent 0%, black 12%, black 88%, transparent 100%)`
          : undefined,
      }}
    >
      {/* Edge Gradient Overlay fallback */}
      {fadeOut && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`
            }}
          />
        </>
      )}

      {/* Marquee Track Container */}
      <div
        className={`flex ${isVertical ? "flex-col" : "flex-row"} w-max items-center transition-all duration-300`}
        style={{
          gap: `${gap}px`,
          animation: `${isVertical ? "marquee-vertical" : "marquee-horizontal"} ${speed}s linear infinite`,
          animationPlayState: isHovered ? "paused" : "running"
        }}
      >
        {repeatedLogos.map((logo, idx) => {
          const isNode = "node" in logo;
          const key = `logo-${idx}`;

          const content = (
            <div
              className={`flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-300 ${
                scaleOnHover ? "hover:scale-110 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]" : ""
              }`}
              style={{ height: `${logoHeight}px` }}
            >
              {isNode ? (
                <div className="text-white text-2xl sm:text-3xl flex items-center justify-center">
                  {(logo as LogoItemNode).node}
                </div>
              ) : (
                <img
                  src={(logo as LogoItemImage).src}
                  alt={(logo as LogoItemImage).alt}
                  className="h-full w-auto object-contain"
                />
              )}

              {logo.title && (
                <span className="font-display font-medium text-xs sm:text-sm text-slate-200 tracking-wide">
                  {logo.title}
                </span>
              )}
            </div>
          );

          if (logo.href) {
            return (
              <a
                key={key}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none"
              >
                {content}
              </a>
            );
          }

          return <div key={key}>{content}</div>;
        })}
      </div>

      {/* CSS Keyframes for marquee */}
      <style jsx global>{`
        @keyframes marquee-horizontal {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-vertical {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default LogoLoop;
