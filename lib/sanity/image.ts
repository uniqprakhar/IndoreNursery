import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlForImage(source?: SanityImageSource | null) {
  if (!source) return undefined;
  return builder.image(source);
}
