'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Attach to window for global access (e.g. chromatic canvas or scroll listeners)
    if (typeof window !== 'undefined') {
      (window as unknown as { lenis?: Lenis }).lenis = lenis;
    }

    // Sync Lenis with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Drive Lenis from GSAP ticker for synchronized animation loop
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;

      if (typeof window !== 'undefined') {
        const win = window as unknown as { lenis?: Lenis };
        if (win.lenis === lenis) {
          delete win.lenis;
        }
      }
    };
  }, []);

  return <>{children}</>;
}
