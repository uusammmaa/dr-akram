import Image from "next/image";
import { BookOpen, GraduationCap, Mic } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const services = [
    {
      icon: BookOpen,
      title: t("home.dars"),
      description: t("home.darsDesc"),
    },
    {
      icon: GraduationCap,
      title: t("home.economics"),
      description: t("home.economicsDesc"),
    },
    {
      icon: Mic,
      title: t("home.speaking"),
      description: t("home.speakingDesc"),
    },
  ];

  const roles = [
    t("roles.retired"),
    t("roles.afaq"),
    t("roles.afkar"),
    t("roles.punjab"),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <section className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative mx-auto aspect-[5/6] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
          <Image
            src="/images/placeholder-portrait.svg"
            alt={t("common.siteName")}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="text-center md:text-start">
          <h1
            className={cn(
              "text-2xl font-semibold text-brand sm:text-3xl lg:text-4xl",
              locale === "ur" && "leading-relaxed"
            )}
          >
            {t("common.siteName")}
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            {t("common.tagline")}
          </p>
          <p className="mt-4 text-base leading-relaxed">{t("home.intro")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button
              render={<Link href="/contact" />}
              className="tap-target bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {t("nav.contact")}
            </Button>
            <Button
              variant="outline"
              render={<Link href="/books" />}
              className="tap-target"
            >
              {t("nav.books")}
            </Button>
            <Button
              variant="outline"
              render={<Link href="/lectures" />}
              className="tap-target"
            >
              {t("nav.lectures")}
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <h2 className="text-xl font-semibold text-brand sm:text-2xl">
          {t("home.servicesTitle")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="border-border bg-card">
              <CardHeader>
                <service.icon className="size-8 text-gold" aria-hidden />
                <CardTitle className="text-lg text-brand">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <h2 className="text-xl font-semibold text-brand sm:text-2xl">
          {t("home.rolesTitle")}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {roles.map((role) => (
            <li
              key={role}
              className="rounded-xl border border-border bg-card px-4 py-3 text-base"
            >
              {role}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
