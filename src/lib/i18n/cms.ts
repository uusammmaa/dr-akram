export function localized<T extends Record<string, unknown>>(
  doc: T,
  field: string,
  locale: string
): string | undefined {
  const key = locale === "ur" ? `${field}Ur` : `${field}En`;
  const value = doc[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
