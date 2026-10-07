import { createClient, type SanityClient } from "@sanity/client";
import { isSanityConfigured } from "@/lib/sanity/client";

let writeClient: SanityClient | null = null;

export function isSanityWriteConfigured(): boolean {
  return isSanityConfigured() && Boolean(process.env.SANITY_API_TOKEN);
}

export function getSanityWriteClient(): SanityClient | null {
  if (!isSanityWriteConfigured()) {
    return null;
  }

  if (!writeClient) {
    writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2024-01-01",
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });
  }

  return writeClient;
}
