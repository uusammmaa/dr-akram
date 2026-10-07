export function localized<T extends Record<string, unknown>>(
  doc: T,
  field: string,
  locale: string
): string | undefined {
  const key = locale === "ur" ? `${field}Ur` : `${field}En`;
  const value = doc[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function localizedWithFallback<T extends Record<string, unknown>>(
  doc: T,
  field: string,
  locale: string
): string | undefined {
  return (
    localized(doc, field, locale) ??
    localized(doc, field, locale === "ur" ? "en" : "ur")
  );
}

export function localizedText<T extends Record<string, unknown>>(
  doc: T,
  field: string,
  locale: string
): string | undefined {
  const primary = localized(doc, field, locale);
  if (primary) return primary;
  const fallbackKey = locale === "ur" ? `${field}En` : `${field}Ur`;
  const fallback = doc[fallbackKey];
  return typeof fallback === "string" && fallback.length > 0
    ? fallback
    : undefined;
}
