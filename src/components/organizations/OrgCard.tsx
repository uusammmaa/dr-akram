import Image from "next/image";
import { Building2, ExternalLink } from "lucide-react";
import type { Organization } from "@/lib/sanity/types";
import { localizedText } from "@/lib/i18n/cms";
import { sanityImageUrl } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

type Props = {
  org: Organization;
  locale: string;
  labels: { current: string; former: string };
};

export function OrgCard({ org, locale, labels }: Props) {
  const name = localizedText(org, "name", locale);
  const role = localizedText(org, "role", locale);
  const logoUrl = org.logo ? sanityImageUrl(org.logo, { width: 200 }) : null;

  if (!name) return null;

  const content = (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
          {logoUrl ? (
            <Image src={logoUrl} alt="" fill sizes="56px" className="object-contain p-1" />
          ) : (
            <Building2 className="size-7 text-brand" aria-hidden />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-brand">{name}</h3>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                org.status === "current"
                  ? "bg-brand/10 text-brand"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {org.status === "current" ? labels.current : labels.former}
            </span>
          </div>
          {role && <p className="mt-1 text-sm text-muted-foreground">{role}</p>}
        </div>
        {org.url && <ExternalLink className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
      </div>
    </div>
  );

  if (org.url) {
    return (
      <a href={org.url} target="_blank" rel="noopener noreferrer" className="tap-target block h-full">
        {content}
      </a>
    );
  }

  return content;
}
