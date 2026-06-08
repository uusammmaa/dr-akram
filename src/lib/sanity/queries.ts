import { cache } from "react";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import type { SiteSettings } from "@/lib/sanity/types";

const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  taglineEn,
  taglineUr,
  phone,
  whatsapp,
  email,
  portrait
}`;

export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  if (!isSanityConfigured()) {
    return null;
  }

  const client = getSanityClient();
  if (!client) {
    return null;
  }

  try {
    const settings = await client.fetch<SiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return settings ?? null;
  } catch {
    return null;
  }
});
