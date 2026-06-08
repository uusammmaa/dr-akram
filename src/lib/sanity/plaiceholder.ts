import { getPlaiceholder } from "plaiceholder";

export async function getBlurDataUrl(src: string): Promise<string | undefined> {
  if (!src) return undefined;
  try {
    const res = await fetch(src);
    if (!res.ok) return undefined;
    const buffer = Buffer.from(await res.arrayBuffer());
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch {
    return undefined;
  }
}

export async function getBlurMap(
  items: { id: string; imageUrl?: string }[]
): Promise<Record<string, string>> {
  const entries = await Promise.all(
    items
      .filter((item) => item.imageUrl)
      .map(async (item) => {
        const blur = await getBlurDataUrl(item.imageUrl!);
        return blur ? ([item.id, blur] as const) : null;
      })
  );
  return Object.fromEntries(entries.filter(Boolean) as [string, string][]);
}
