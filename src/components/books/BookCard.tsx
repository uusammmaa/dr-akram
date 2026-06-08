import Image from "next/image";
import { BookOpen } from "lucide-react";
import type { Book, ReadingRecommendation } from "@/lib/sanity/types";
import { localizedText } from "@/lib/i18n/cms";
import { sanityImageUrl } from "@/lib/sanity/image";

function Cover({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width:640px) 50vw, 220px" className="object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center">
          <BookOpen className="size-12 text-brand/40" aria-hidden />
        </div>
      )}
    </div>
  );
}

export function BookCard({ item, locale }: { item: Book; locale: string }) {
  const title = localizedText(item, "title", locale);
  const description = localizedText(item, "description", locale);
  const coverUrl = item.cover ? sanityImageUrl(item.cover, { width: 440 }) : undefined;
  if (!title) return null;
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
      <Cover src={coverUrl} alt={title} />
      <div className="mt-4 flex flex-1 flex-col">
        {item.level && <span className="text-xs font-medium text-gold">{item.level}</span>}
        <h3 className="mt-1 font-semibold text-brand">{title}</h3>
        {description && <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{description}</p>}
        {item.buyLink && (
          <a href={item.buyLink} target="_blank" rel="noopener noreferrer" className="tap-target mt-4 inline-flex text-sm font-medium text-brand hover:underline">Buy</a>
        )}
      </div>
    </article>
  );
}

export function RecommendationCard({ item, locale, recommendedLabel }: { item: ReadingRecommendation; locale: string; recommendedLabel: string }) {
  const title = localizedText(item, "title", locale);
  const author = localizedText(item, "author", locale);
  const note = localizedText(item, "recommendationNote", locale);
  const coverUrl = item.cover ? sanityImageUrl(item.cover, { width: 440 }) : undefined;
  if (!title) return null;
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
      <Cover src={coverUrl} alt={title} />
      <div className="mt-4 flex flex-1 flex-col">
        <span className="inline-flex w-fit rounded-full bg-gold/15 px-2 py-0.5 text-xs font-medium text-gold">{recommendedLabel}</span>
        <h3 className="mt-2 font-semibold text-brand">{title}</h3>
        {author && <p className="mt-1 text-sm text-muted-foreground">{author}</p>}
        {item.topic && <p className="mt-1 text-xs text-gold">{item.topic}</p>}
        {note && <p className="mt-2 line-clamp-4 flex-1 text-sm text-muted-foreground">{note}</p>}
        {item.buyLink && (
          <a href={item.buyLink} target="_blank" rel="noopener noreferrer" className="tap-target mt-4 inline-flex text-sm font-medium text-brand hover:underline">Buy</a>
        )}
      </div>
    </article>
  );
}
