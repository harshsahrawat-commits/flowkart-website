"use client";

import { useEffect, useState } from "react";

export function isIOSSafari(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return isIOS;
}

export default function useIOSSafari(): boolean {
  const [ios, setIos] = useState(false);
  useEffect(() => {
    setIos(isIOSSafari());
  }, []);
  return ios;
}
