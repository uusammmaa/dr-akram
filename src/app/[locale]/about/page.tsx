import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PORTRAIT_SRC } from "@/lib/site-images";

type Props = {
  params: Promise<{ locale: string }>;
};

const timeline = [
  { year: "2020", key: "timeline.2020" as const },
  { year: "—", key: "timeline.textbook" as const },
  { year: "—", key: "timeline.afaq" as const },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("about.title")}
      </h1>

      <div className="relative mx-auto mt-6 aspect-[5/6] w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
        <Image
          src={PORTRAIT_SRC}
          alt={t("common.siteName")}
          fill
          sizes="(max-width: 768px) 80vw, 320px"
          className="object-cover object-[center_28%]"
        />
      </div>

      <article
        className="prose prose-lg mt-6 max-w-none text-foreground prose-headings:text-brand"
        dir={locale === "ur" ? "rtl" : "ltr"}
      >
        <p>{t("about.bio")}</p>
      </article>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-brand">
          {t("about.timelineTitle")}
        </h2>
        <ol className="mt-6 space-y-4 border-s-2 border-gold ps-6">
          {timeline.map((item) => (
            <li key={item.key} className="relative">
              <span className="absolute -start-[1.6rem] top-1 flex size-3 rounded-full bg-brand" />
              {item.year !== "—" && (
                <span className="text-sm font-semibold text-gold">
                  {item.year}
                </span>
              )}
              <p className="mt-1 text-base">{t(item.key)}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
