"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeCredentials } from "@/components/home/HomeCredentials";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeTimeline } from "@/components/home/HomeTimeline";
import { HomeCtaBand } from "@/components/home/HomeCtaBand";
import { HomeFeaturedGrid } from "@/components/home/HomeFeaturedGrid";
import { HomeLatestSection } from "@/components/home/HomeLatestSection";
import { HomeContactCta } from "@/components/home/HomeContactCta";

type HomeMotionShellProps = {
  locale: string;
  tagline?: string;
  portraitSrc?: string;
};

export function HomeMotionShell({
  locale,
  tagline,
  portraitSrc,
}: HomeMotionShellProps) {
  return (
    <LenisProvider>
      <ParallaxProvider>
        <div className="overflow-x-hidden">
          <HomeHero
            locale={locale}
            tagline={tagline}
            portraitSrc={portraitSrc}
          />
          <HomeCredentials portraitSrc={portraitSrc} />
          <HomeServices />
          <HomeTimeline />
          <HomeCtaBand />
          <HomeFeaturedGrid />
          <HomeLatestSection />
          <HomeContactCta />
        </div>
      </ParallaxProvider>
    </LenisProvider>
  );
}
