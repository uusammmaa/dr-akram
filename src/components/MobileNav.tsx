"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/LanguageToggle";

export function MobileNav() {
  const t = useTranslations();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              className="tap-target"
              aria-label={t("common.menu")}
            >
              <Menu className="size-5" />
            </Button>
          }
        />
        <SheetContent side="right" className="w-[min(100%,20rem)]">
          <SheetHeader>
            <SheetTitle className={t("common.siteName") ? "font-urdu" : ""}>
              {t("common.siteName")}
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="tap-target justify-start rounded-lg px-3 text-base font-medium text-foreground hover:bg-accent"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
          <div className="mt-6">
            <LanguageToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
