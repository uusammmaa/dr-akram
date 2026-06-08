import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ContactForm } from "@/components/ContactForm";
import { ContactFormMobile } from "@/components/ContactFormMobile";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t("title")}
      </h1>

      <div className="mt-6 space-y-2 rounded-xl border border-border bg-card p-6">
        <p className="text-base">
          <span className="font-medium text-brand">{t("phone")}: </span>
          <span className="text-muted-foreground">{t("phonePlaceholder")}</span>
        </p>
        <p className="text-base">
          <span className="font-medium text-brand">{t("email")}: </span>
          <span className="text-muted-foreground">{t("emailPlaceholder")}</span>
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
