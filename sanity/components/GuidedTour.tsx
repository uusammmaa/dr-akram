"use client";

import { useEffect, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import {
  clearTourCompleted,
  isTourCompleted,
  markTourCompleted,
  tourSteps,
} from "../help/tour";
import { HelpDeskContent } from "./HelpDeskContent";

let activeDriver: ReturnType<typeof driver> | null = null;

export function startGuidedTour(force = false): void {
  if (!force && isTourCompleted()) return;

  activeDriver?.destroy();

  activeDriver = driver({
    showProgress: true,
    allowClose: true,
    overlayOpacity: 0.65,
    stagePadding: 8,
    steps: tourSteps,
    onDestroyed: () => {
      markTourCompleted();
      activeDriver = null;
    },
  });

  activeDriver.drive();
}

export function restartGuidedTour(): void {
  clearTourCompleted();
  startGuidedTour(true);
}

/** Runs tour on first Studio visit */
export function GuidedTourMount() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const timer = window.setTimeout(() => {
      startGuidedTour(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}

/** Navbar Help tool */
export function HelpDeskTool() {
  return (
    <div style={{ minHeight: "100%", color: "inherit" }}>
      <div
        style={{
          padding: "1rem 1rem 0",
          borderBottom: "1px solid var(--card-border-color, #eee)",
        }}
      >
        <h1 style={{ fontSize: "22px", margin: 0 }}>Help</h1>
        <p
          style={{
            fontSize: "16px",
            color: "var(--card-muted-fg-color, #666)",
            marginTop: "0.5rem",
          }}
        >
          Tap a task below for step-by-step instructions.
        </p>
      </div>
      <HelpDeskContent onRestartTour={restartGuidedTour} />
    </div>
  );
}
