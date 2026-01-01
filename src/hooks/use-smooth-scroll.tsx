"use client";
import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  // Memoized anchor click handler
  const handleAnchorClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]');
    if (anchor && lenisRef.current) {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      if (href && href !== "#") {
        const element = document.querySelector(href);
        if (element) {
          lenisRef.current.scrollTo(element as HTMLElement, { offset: -80 });
        }
      } else if (href === "#") {
        lenisRef.current.scrollTo(0);
      }
    }
  }, []);

  useEffect(() => {
    // Skip on mobile for better native scroll performance
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || prefersReducedMotion) {
      // Still handle anchor clicks for smooth navigation
      document.addEventListener("click", handleAnchorClick);
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);
    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleAnchorClick]);

  return lenisRef;
};

export default useSmoothScroll;
