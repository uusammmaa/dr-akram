import { createImageUrlBuilder } from "@sanity/image-url";
import { getSanityClient } from "@/lib/sanity/client";
import type { SanityImage } from "@/lib/sanity/types";

type ImageOptions = {
  width?: number;
  height?: number;
};

export function sanityImageUrl(
  source: SanityImage,
  options: ImageOptions = {}
): string {
  const sanityClient = getSanityClient();
  if (!sanityClient) {
    return "";
  }

  let url = createImageUrlBuilder(sanityClient)
    .image(source)
    .auto("format")
    .quality(85);

  if (options.width) {
    url = url.width(options.width);
  }
  if (options.height) {
    url = url.height(options.height);
  }

  return url.url();
}
