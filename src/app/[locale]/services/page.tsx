import type { Metadata } from "next";
import { BookOpen, GraduationCap, Mic } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { FadeIn, FadeInItem, FadeInStagger } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import { buildStaticPageMetadata } from "@/lib/seo/page-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale as "en" | "ur", "/services", "services");
}

const sections = [
  { id: "dars", icon: BookOpen, titleKey: "darsTitle", descKey: "darsDesc" },
  {
    id: "economics",
    icon: GraduationCap,
    titleKey: "economicsTitle",
    descKey: "economicsDesc",
    linkKey: "economicsLink",
    href: "/books?tab=recommendations" as const,
  },
  { id: "speaking", icon: Mic, titleKey: "speakingTitle", descKey: "speakingDesc" },
] as const;

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <FadeIn>
        <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-muted-foreground">{t("intro")}</p>
      </FadeIn>

      <FadeInStagger className="mt-10 space-y-8">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <FadeInItem key={section.id}>
            <section
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent">
                  <Icon className="size-6 text-gold" aria-hidden />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-brand">
                    {t(section.titleKey)}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(section.descKey)}
                  </p>
                  {"linkKey" in section && section.href && (
                    <Link
                      href={section.href}
                      className="tap-target mt-4 inline-flex text-sm font-medium text-brand hover:underline"
                    >
                      {t(section.linkKey)}
                    </Link>
                  )}
                </div>
              </div>
            </section>
            </FadeInItem>
          );
        })}
      </FadeInStagger>

      <FadeIn className="mt-10 text-center">
        <Button render={<Link href="/contact" />} className="tap-target">
          {t("contactCta")}
        </Button>
      </FadeIn>
    </div>
  );
}
