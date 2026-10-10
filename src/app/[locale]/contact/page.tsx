import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildStaticPageMetadata } from "@/lib/seo/page-metadata";
import { ContactForm } from "@/components/ContactForm";
import { ContactFormMobile } from "@/components/ContactFormMobile";
import { telHref, whatsappHref } from "@/lib/contact-links";
import { getSiteSettings } from "@/lib/sanity/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale as "en" | "ur", "/contact", "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const settings = await getSiteSettings();

  const phone = settings?.phone?.trim();
  const email = settings?.email?.trim();
  const whatsapp = settings?.whatsapp?.trim();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("title")}
      </h1>

      <div className="mt-6 space-y-3 rounded-xl border border-border bg-card p-6">
        <p className="text-base">
          <span className="font-medium text-brand">{t("phone")}: </span>
          {phone ? (
            <a
              href={telHref(phone)}
              className="text-brand underline-offset-4 hover:underline"
            >
              {phone}
            </a>
          ) : (
            <span className="text-muted-foreground">{t("phonePlaceholder")}</span>
          )}
        </p>
        {whatsapp && (
          <p className="text-base">
            <span className="font-medium text-brand">WhatsApp: </span>
            <a
              href={whatsappHref(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline-offset-4 hover:underline"
            >
              {whatsapp}
            </a>
          </p>
        )}
        <p className="text-base">
          <span className="font-medium text-brand">{t("email")}: </span>
          {email ? (
            <a
              href={`mailto:${email}`}
              className="text-brand underline-offset-4 hover:underline"
            >
              {email}
            </a>
          ) : (
            <span className="text-muted-foreground">{t("emailPlaceholder")}</span>
          )}
        </p>
      </div>

      <div className="mt-8 md:hidden">
        <ContactFormMobile />
      </div>

      <div className="mt-8 hidden md:block">
        <h2 className="text-lg font-semibold text-brand">{t("formTitle")}</h2>
        <div className="mt-4 rounded-xl border border-border bg-card p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
