"use client";

import "lenis/dist/lenis.css";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function measureChrome() {
  const header = document.querySelector("header");
  if (header) {
    document.documentElement.style.setProperty(
      "--site-header-height",
      `${header.getBoundingClientRect().height}px`
    );
  }

  const bar = document.querySelector("[data-mobile-bottom-bar]");
  const barHeight =
    bar && getComputedStyle(bar).display !== "none"
      ? bar.getBoundingClientRect().height
      : 0;
  document.documentElement.style.setProperty(
    "--mobile-bar-height",
    `${barHeight}px`
  );
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const motion = window.matchMedia(REDUCED_MOTION);
    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector("header");
    const bar = document.querySelector("[data-mobile-bottom-bar]");
    const observer = new ResizeObserver(() => measureChrome());
    if (header) observer.observe(header);
    if (bar) observer.observe(bar);
    measureChrome();

    let lenis: Lenis | null = null;

    const onTick = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const refresh = () => {
      measureChrome();
      ScrollTrigger.refresh();
    };

    const start = () => {
      if (motion.matches || lenis) return;

      lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      refresh();
    };

    const stop = () => {
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.destroy();
      lenis = null;
      ScrollTrigger.refresh();
    };

    const onMotionChange = () => {
      if (motion.matches) stop();
      else start();
    };

    let alive = true;
    const refreshIfAlive = () => {
      if (alive) refresh();
    };

    if (!motion.matches) start();

    motion.addEventListener("change", onMotionChange);
    window.addEventListener("resize", refreshIfAlive);
    window.addEventListener("load", refreshIfAlive);
    void document.fonts?.ready.then(refreshIfAlive);

    return () => {
      alive = false;
      motion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", refreshIfAlive);
      window.removeEventListener("load", refreshIfAlive);
      observer.disconnect();
      stop();
    };
  }, []);

  return <>{children}</>;
}
