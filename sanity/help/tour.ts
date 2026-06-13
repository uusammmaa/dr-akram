import type { DriveStep } from "driver.js";
import {
  findStructureLink,
  navigateToStructureRoot,
  openStructureItem,
  waitForStructureLink,
} from "./find-tour-target";

export const TOUR_STORAGE_KEY = "dr-akram-tour-completed";

const highlight = (id: string) => (): Element => {
  const el = findStructureLink(id);
  if (!el && process.env.NODE_ENV === "development") {
    console.warn(`[guided-tour] Target not found: ${id}`);
  }
  return el as Element;
};

const topLevelStep = (id: string, popover: DriveStep["popover"]): DriveStep => ({
  element: highlight(id),
  popover,
});

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
    element: highlight("tour-site-settings"),
    popover: {
      title: "Site Settings",
      description: "Your photo, phone, WhatsApp, and email.",
      side: "right",
      align: "start",
      onNextClick: (_element, _step, { driver: tourDriver }) => {
        void (async () => {
          await openStructureItem("tour-site-settings");
          await waitForStructureLink("tour-about-page");
          tourDriver.moveNext();
        })();
      },
    },
  },
  {
    element: highlight("tour-about-page"),
    popover: {
      title: "About Page",
      description: "Biography and career timeline.",
      side: "right",
      align: "start",
      onNextClick: (_element, _step, { driver: tourDriver }) => {
        void (async () => {
          await navigateToStructureRoot();
          await new Promise<void>((r) => setTimeout(r, 200));
          tourDriver.moveNext();
        })();
      },
    },
  },
  topLevelStep("tour-books", {
    title: "Books",
    description: "My Books and Recommended Reading.",
    side: "right",
    align: "start",
  }),
  topLevelStep("tour-qa", {
    title: "Q&A",
    description: "Answer visitor questions from Inbox.",
    side: "right",
    align: "start",
  }),
  topLevelStep("tour-honors", {
    title: "Honors & Awards",
    description: "Upload shields and award photos.",
    side: "right",
    align: "start",
  }),
  topLevelStep("tour-lectures", {
    title: "Lectures",
    description: "Paste YouTube links only.",
    side: "right",
    align: "start",
  }),
  topLevelStep("tour-help", {
    title: "Help",
    description: "Come here when you need step-by-step instructions.",
    side: "right",
    align: "start",
  }),
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
