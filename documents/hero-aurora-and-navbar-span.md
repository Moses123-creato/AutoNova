# Documentation: Aurora WebGL Shader, Transparent Logo & Spanned Navbar

## Overview
This document records the implementation of the Aurora GLSL WebGL shader background, transparent AutoNova logo integration, and wide spanned navigation bar layout.

## Components Created & Updated

### 1. `src/components/ui/aurora.tsx`
- **Purpose**: WebGL GLSL fragment/vertex shader component rendering an animated Aurora light wave.
- **Engine**: Powered by `ogl` (lightweight WebGL engine).
- **Parameters**:
  - `colorStops={["#7cff67", "#B497CF", "#05488e"]}` (lime green, purple, deep cyan/blue gradient ramp)
  - `blend={0.5}`
  - `amplitude={1.0}`
  - `speed={1}`

### 2. `public/logo-transparent.png`
- **Purpose**: Background-free AutoNova logo image.
- **Process**: Processed via Python script to isolate non-black pixels and render background fully transparent for dark/light themes.

### 3. `src/components/navbar.tsx`
- **Changes**:
  - Replaced logo image source with `/logo-transparent.png` (eliminating any black background rectangle).
  - Updated navbar wrapper width from `max-w-5xl` to `max-w-7xl px-4 sm:px-8 lg:px-12` to span across the viewport while maintaining balanced left/right padding.
  - Added `/logo-transparent.png` to the top of the mobile dropdown navigation drawer when open.

### 4. `src/components/hero.tsx`
- **Changes**:
  - Replaced background element with `<Aurora colorStops={["#7cff67", "#B497CF", "#05488e"]} blend={0.5} amplitude={1.0} speed={1} />`.
  - Updated section main title to: **"Building systems that move your business."**
