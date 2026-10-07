import { getSiteSettings } from "@/lib/sanity/queries";
import { sanityImageUrl } from "@/lib/sanity/image";

export async function getDefaultOgImageUrl(): Promise<string | undefined> {
  const settings = await getSiteSettings();
  const source = settings?.ogImage ?? settings?.portrait;
  if (!source) return undefined;
  const url = sanityImageUrl(source, { width: 1200, height: 630 });
  return url || undefined;
}
