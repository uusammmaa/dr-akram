import type { DriveStep } from "driver.js";

export const TOUR_STORAGE_KEY = "dr-akram-tour-completed";

export const tourSteps: DriveStep[] = [
  {
    popover: {
      title: "Welcome",
      description: "This is where you update your website.",
      side: "over",
      align: "center",
    },
  },
  {
    element: '[data-testid="pane-item-tour-site-settings"]',
    popover: {
      title: "Site Settings",
      description: "Your photo, phone, WhatsApp, and email.",
      side: "right",
      align: "start",
    },
  },
  {
    element: '[data-testid="pane-item-tour-about-page"]',
    popover: {
      title: "About Page",
      description: "Biography and career timeline.",
      side: "right",
      align: "start",
    },
  },
  {
    element: '[data-testid="pane-item-tour-books"]',
    popover: {
      title: "Books",
      description: "My Books and Recommended Reading.",
      side: "right",
      align: "start",
    },
  },
  {
    element: '[data-testid="pane-item-tour-qa"]',
    popover: {
      title: "Q&A",
      description: "Answer visitor questions from Inbox.",
      side: "right",
      align: "start",
    },
  },
  {
    element: '[data-testid="pane-item-tour-honors"]',
    popover: {
      title: "Honors & Awards",
      description: "Upload shields and award photos.",
      side: "right",
      align: "start",
    },
  },
  {
    element: '[data-testid="pane-item-tour-lectures"]',
    popover: {
      title: "Lectures",
      description: "Paste YouTube links only.",
      side: "right",
      align: "start",
    },
  },
  {
    element: '[data-testid="pane-item-tour-help"]',
    popover: {
      title: "Help",
      description: "Come here when you need step-by-step instructions.",
      side: "right",
      align: "start",
    },
  },
  {
    popover: {
      title: "Done",
      description:
        "Save and Publish — changes go live on the site in about a minute.",
      side: "over",
      align: "center",
    },
  },
];

export function isTourCompleted(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(TOUR_STORAGE_KEY) === "true";
}

export function markTourCompleted(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOUR_STORAGE_KEY, "true");
}

export function clearTourCompleted(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOUR_STORAGE_KEY);
}
