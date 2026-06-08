import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MobileNav } from "@/components/MobileNav";

export async function Header() {
  const t = await getTranslations();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="min-w-0 text-sm font-semibold leading-tight text-brand sm:text-base"
        >
          <span className="line-clamp-2">{t("common.siteName")}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex lg:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-accent lg:px-3"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
