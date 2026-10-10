import { getTranslations } from "next-intl/server";

export async function CmsEmptyTab() {
  const t = await getTranslations("common");
  return (
    <p className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
      {t("noContentYet")}
    </p>
  );
}
