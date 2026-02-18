"use client";

import useIOSSafari from "@/hooks/useIOSSafari";

export default function NoiseOverlay() {
  const isIOS = useIOSSafari();

  // iOS Safari: skip SVG feTurbulence (CPU-rendered, causes frame drops)
  if (isIOS) return null;

  return (
    <svg className="noise-overlay" aria-hidden="true">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}
