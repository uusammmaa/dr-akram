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

function scrollIsLocked() {
  const locksBackground = (element: Element) => {
    const overflowY = getComputedStyle(element).overflowY;
    return overflowY === "hidden" || overflowY === "clip";
  };

  return (
    locksBackground(document.documentElement) || locksBackground(document.body)
  );
}

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
    let backgroundLocked = false;

    const onTick = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const syncBackgroundLock = () => {
      if (!lenis) return;
      const nextLocked = scrollIsLocked();
      if (nextLocked === backgroundLocked) return;
      backgroundLocked = nextLocked;
      if (nextLocked) lenis.stop();
      else lenis.start();
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const eventTarget = event.target;
      if (!(eventTarget instanceof Element)) return;
      const link = eventTarget.closest("a");
      if (!link || link.target === "_blank") return;

      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const id = decodeURIComponent(href.slice(1));
      if (!document.getElementById(id)) return;

      event.preventDefault();
      lenis.scrollTo(href);
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
        anchors: false,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      backgroundLocked = false;
      syncBackgroundLock();
      refresh();
    };

    const stop = () => {
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500, 33);
      backgroundLocked = false;
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

    const lockObserver = new MutationObserver(() => {
      if (alive) syncBackgroundLock();
    });
    lockObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    lockObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    if (!motion.matches) start();

    document.addEventListener("click", onAnchorClick, true);
    motion.addEventListener("change", onMotionChange);
    window.addEventListener("resize", refreshIfAlive);
    window.addEventListener("load", refreshIfAlive);
    void document.fonts?.ready.then(refreshIfAlive);

    return () => {
      alive = false;
      document.removeEventListener("click", onAnchorClick, true);
      motion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", refreshIfAlive);
      window.removeEventListener("load", refreshIfAlive);
      lockObserver.disconnect();
      observer.disconnect();
      stop();
    };
  }, []);

  return <>{children}</>;
}
