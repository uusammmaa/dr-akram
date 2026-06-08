"use client";

import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/LanguageToggle";

export function MobileNav() {
  const t = useTranslations();
  const locale = useLocale();

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
        <SheetContent
          side="right"
          className="flex w-[min(100%,20rem)] flex-col"
        >
          <SheetHeader className="pe-12 pt-5">
            <SheetTitle
              className={cn(
                "leading-relaxed break-words",
                locale === "ur" && "font-urdu"
              )}
            >
              {t("common.siteName")}
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4">
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
          <SheetFooter className="mt-auto border-t border-border">
            <p className="mb-2 w-full text-center text-xs text-muted-foreground">
              {t("common.language")}
            </p>
            <div className="flex w-full justify-center">
              <LanguageToggle className="w-full max-w-xs justify-center" />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
