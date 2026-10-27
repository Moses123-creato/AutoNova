"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BorderBeam } from "border-beam";
import { Menu, X, ArrowUpRight, Star } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Project", href: "#project" },
  ];

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-8 lg:px-12 pointer-events-none">
      <div className="w-full max-w-7xl pointer-events-auto transition-all duration-300">
        {/* BorderBeam from Libraries.dev wrapping the liquid metal capsule navbar */}
        <BorderBeam
          size="md"
          colorVariant="ocean"
          strength={0.85}
          theme="dark"
          borderRadius={9999}
          className="w-full rounded-full"
        >
          {/* Liquid Metal Capsule Surface */}
          <nav
            id="main-navbar"
            aria-label="Main Navigation"
            className="relative rounded-full px-6 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between backdrop-blur-2xl bg-[#06080F]/85 border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.35),inset_0_-1px_2px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Liquid Metal Shimmering Reflection Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full liquid-metal-chrome opacity-40 mix-blend-overlay"
            />

            {/* Brand Identity / Logo without background */}
            <Link
              href="/"
              id="nav-logo"
              className="relative z-10 group flex items-center focus:outline-none"
            >
              <img
                src="/logo-transparent.png"
                alt="AUTONOVA"
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 relative z-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    id={`nav-link-${link.label.toLowerCase()}`}
                    className={`relative px-4 py-1.5 rounded-full font-body text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 ${
                      isActive
                        ? "text-white bg-white/12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                        : "text-slate-300 hover:text-white hover:bg-white/6"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-3 relative z-10">
              {/* Star on GitHub / Source badge */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                id="nav-github-star"
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Star</span>
              </a>

              {/* Liquid Metal "Let's Talk" CTA Button */}
              <Link
                href="/contact"
                id="nav-cta-contact"
                className="relative group inline-flex items-center gap-2 px-5 sm:px-6 py-1.5 sm:py-2 rounded-full font-body text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-slate-200 via-white to-slate-300 text-black shadow-[0_4px_16px_rgba(255,255,255,0.25)] hover:shadow-[0_4px_24px_rgba(255,255,255,0.4)] transition-all duration-200 active:scale-95"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center relative z-10">
              <button
                type="button"
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </BorderBeam>

        {/* Mobile Dropdown Menu with Liquid Metal border */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu-drawer"
            className="md:hidden mt-3 rounded-2xl p-5 backdrop-blur-2xl bg-[#06080F]/95 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.9)] transition-all animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {/* Logo at Top of Mobile Sidebar Drawer */}
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/15">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center"
              >
                <img
                  src="/logo-transparent.png"
                  alt="AUTONOVA"
                  className="h-7 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl font-body text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? "text-white bg-white/15"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="h-px bg-white/10 my-2" />
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-body text-sm font-semibold text-black bg-white shadow-lg transition-transform active:scale-95"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
