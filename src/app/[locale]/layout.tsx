import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { routing } from "@/i18n/routing";
import { inter, notoNastaliqUrdu } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { ContactDrawerProvider } from "@/components/ContactDrawerProvider";
import "../globals.css";

export const metadata: Metadata = {
  title: "Prof. Dr. Mian Muhammad Akram",
  description:
    "Professor of Economics, Islamic Economics, and education — bilingual website.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ur" ? "rtl" : "ltr"}
      className={`${inter.variable} ${notoNastaliqUrdu.variable}`}
    >
      <body
        className={`flex min-h-screen flex-col antialiased ${locale === "ur" ? "font-urdu" : "font-sans"}`}
      >
        <NextIntlClientProvider messages={messages}>
          <ContactDrawerProvider>
            <Header />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <Footer />
            <MobileBottomBar />
            <Toaster richColors position="top-center" />
          </ContactDrawerProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
