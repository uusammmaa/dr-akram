import { getTranslations } from "next-intl/server";

type EmptyStateProps = {
  titleKey: string;
};

export async function EmptyState({ titleKey }: EmptyStateProps) {
  const t = await getTranslations();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold text-brand sm:text-3xl">
        {t(titleKey)}
      </h1>
      <p className="mt-4 rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
        {t("common.comingSoon")}
      </p>
    </div>
  );
}
