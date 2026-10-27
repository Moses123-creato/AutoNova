"use client";

import React, { useEffect, useRef } from "react";
import createGlobe, { Marker, Arc } from "cobe";

export interface GlobeProps {
  className?: string;
  speed?: number;
  glowColor?: [number, number, number];
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  arcColor?: [number, number, number];
  markers?: Marker[];
  arcs?: Arc[];
}

export function Globe({
  className = "",
  speed = 0.004,
  glowColor = [0.1, 0.4, 0.9],
  baseColor = [0.05, 0.08, 0.22],
  markerColor = [0.2, 0.85, 1.0],
  arcColor = [0.3, 0.75, 1.0],
  markers = [
    { location: [37.7749, -122.4194], size: 0.08, id: "sf" },
    { location: [51.5074, -0.1278], size: 0.07, id: "london" },
    { location: [35.6762, 139.6503], size: 0.08, id: "tokyo" },
    { location: [1.3521, 103.8198], size: 0.06, id: "singapore" },
    { location: [-33.8688, 151.2093], size: 0.07, id: "sydney" },
    { location: [-23.5505, -46.6333], size: 0.06, id: "saopaulo" },
    { location: [6.5244, 3.3792], size: 0.07, id: "lagos" },
    { location: [25.2048, 55.2708], size: 0.07, id: "dubai" }
  ],
  arcs = [
    { from: [37.7749, -122.4194], to: [51.5074, -0.1278] }, // SF -> London
    { from: [51.5074, -0.1278], to: [35.6762, 139.6503] }, // London -> Tokyo
    { from: [35.6762, 139.6503], to: [1.3521, 103.8198] }, // Tokyo -> Singapore
    { from: [1.3521, 103.8198], to: [-33.8688, 151.2093] }, // Singapore -> Sydney
    { from: [37.7749, -122.4194], to: [35.6762, 139.6503] }, // SF -> Tokyo
    { from: [51.5074, -0.1278], to: [25.2048, 55.2708] } // London -> Dubai
  ]
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const widthRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    let animationFrameId: number;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      width: (widthRef.current || 600) * 2,
      height: (widthRef.current || 600) * 2,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 14000,
      mapBrightness: 5,
      baseColor: baseColor,
      markerColor: markerColor,
      glowColor: glowColor,
      opacity: 0.85,
      markers: markers,
      arcs: arcs,
      arcColor: arcColor,
      arcWidth: 1.2,
      arcHeight: 0.35,
      markerElevation: 0.05
    });

    const animate = () => {
      if (!pointerInteracting.current) {
        phiRef.current += speed;
      }
      globe.update({
        phi: phiRef.current + pointerInteractionMovement.current,
        width: (widthRef.current || 600) * 2,
        height: (widthRef.current || 600) * 2
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [arcColor, arcs, baseColor, glowColor, markerColor, markers, speed]);

  return (
    <div
      className={`relative w-full max-w-[700px] aspect-square mx-auto flex items-center justify-center ${className}`}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
        className="w-full h-full opacity-0 transition-opacity duration-700 ease-out cursor-grab touch-none"
      />
    </div>
  );
}
