"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeCredentials } from "@/components/home/HomeCredentials";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeTimeline } from "@/components/home/HomeTimeline";
import { HomeCtaBand } from "@/components/home/HomeCtaBand";
import { HomeFeaturedGrid } from "@/components/home/HomeFeaturedGrid";
import { HomeLatestSection } from "@/components/home/HomeLatestSection";
import { HomeContactCta } from "@/components/home/HomeContactCta";
import type {
  CareerMilestoneItem,
  FeaturedHomeItem,
  Lecture,
} from "@/lib/sanity/types";

type HomeMotionShellProps = {
  locale: string;
  tagline?: string;
  portraitSrc?: string;
  portraitBlur?: string;
  milestones?: CareerMilestoneItem[];
  featuredItems?: FeaturedHomeItem[];
  featuredBlurs?: Record<string, string>;
  latestLectures?: Lecture[];
};

export function HomeMotionShell({
  locale,
  tagline,
  portraitSrc,
  portraitBlur,
  milestones,
  featuredItems,
  featuredBlurs,
  latestLectures,
}: HomeMotionShellProps) {
  return (
    <ParallaxProvider>
      <div className="overflow-x-hidden">
        <HomeHero
          locale={locale}
          tagline={tagline}
          portraitSrc={portraitSrc}
          portraitBlur={portraitBlur}
        />
        <HomeCredentials portraitSrc={portraitSrc} />
        <HomeServices />
        <HomeTimeline locale={locale} milestones={milestones} />
        <HomeCtaBand />
        <HomeFeaturedGrid items={featuredItems} imageBlurs={featuredBlurs} />
        <HomeLatestSection locale={locale} lectures={latestLectures} />
        <HomeContactCta />
      </div>
    </ParallaxProvider>
  );
}
