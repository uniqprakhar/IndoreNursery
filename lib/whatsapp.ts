import type { ProductView, Variant } from "./types";

export const DEFAULT_WHATSAPP_TEMPLATE =
  "Hello, I am interested in purchasing the {{product}} ({{variant}}) listed at {{price}}. Is it available?";

export function formatPriceINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Builds the pre-filled WhatsApp inquiry message for a product, optionally for
 * a specific size/variant. Falls back to "Standard" when the product has no variants.
 */
export function buildWhatsAppMessage(
  product: Pick<ProductView, "name" | "price">,
  variant: Pick<Variant, "label" | "price"> | null | undefined,
  template: string = DEFAULT_WHATSAPP_TEMPLATE
): string {
  const variantLabel = variant?.label ?? "Standard";
  const price = formatPriceINR(variant?.price ?? product.price);

  return template
    .replaceAll("{{product}}", product.name)
    .replaceAll("{{variant}}", variantLabel)
    .replaceAll("{{price}}", price);
}

/**
 * Builds a wa.me deep link that opens WhatsApp with the given message
 * pre-filled and URL-encoded. `whatsappNumber` must be digits only,
 * including country code (e.g. "919876543210").
 */
export function buildWhatsAppLink(whatsappNumber: string, message: string): string {
  const digitsOnly = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}

/**
 * Convenience helper combining the two steps above: given a product (and
 * optional selected variant), returns the full WhatsApp deep link.
 */
export function getProductWhatsAppLink(
  whatsappNumber: string,
  product: Pick<ProductView, "name" | "price">,
  variant?: Pick<Variant, "label" | "price"> | null,
  template?: string
): string {
  const message = buildWhatsAppMessage(product, variant, template);
  return buildWhatsAppLink(whatsappNumber, message);
}
