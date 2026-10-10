import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-sm font-semibold text-brand">{t("common.siteName")}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t("common.tagline")}</p>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-brand"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-xs text-muted-foreground">
          © {year} {t("common.siteName")}
        </p>
      </div>
    </footer>
  );
}
