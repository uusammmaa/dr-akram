"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { getYouTubeThumbnail, getYouTubeVideoId } from "@/lib/sanity/youtube";

type Props = {
  youtubeUrl: string;
  title: string;
  playLabel: string;
};

export function YouTubeFacade({ youtubeUrl, title, playLabel }: Props) {
  const [loaded, setLoaded] = useState(false);
  const videoId = getYouTubeVideoId(youtubeUrl);
  const thumbnail = getYouTubeThumbnail(youtubeUrl);

  if (!videoId) return null;

  if (loaded) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative aspect-video w-full overflow-hidden rounded-lg bg-muted"
      aria-label={playLabel}
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform group-hover:scale-105"
        />
      ) : null}
      <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg">
          <Play className="size-7 fill-current" aria-hidden />
        </span>
      </span>
    </button>
  );
}
