"use client";

import { useMemo, useState } from "react";
import type { ProductView } from "@/lib/types";
import { getProductWhatsAppLink } from "@/lib/whatsapp";
import PriceTag from "./PriceTag";
import StockBadge from "./StockBadge";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductInquiryPanel({
  product,
  whatsappNumber,
  whatsappTemplate,
}: {
  product: ProductView;
  whatsappNumber: string;
  whatsappTemplate?: string;
}) {
  const hasVariants = Boolean(product.variants?.length);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedVariant = hasVariants ? product.variants![selectedIndex] : undefined;
  const activePrice = selectedVariant?.price ?? product.price;
  const activeCompareAt = hasVariants ? undefined : product.compareAtPrice;
  const activeStock = selectedVariant?.stockStatus ?? product.stockStatus;
  const isOutOfStock = activeStock === "out-of-stock";

  const whatsappLink = useMemo(
    () => getProductWhatsAppLink(whatsappNumber, product, selectedVariant, whatsappTemplate),
    [whatsappNumber, product, selectedVariant, whatsappTemplate]
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <PriceTag price={activePrice} compareAtPrice={activeCompareAt} size="lg" />
        <StockBadge status={activeStock} />
      </div>

      {hasVariants && (
        <div>
          <p className="mb-2 text-sm font-medium text-emerald-900">Size / Variant</p>
          <div className="flex flex-wrap gap-2">
            {product.variants!.map((variant, index) => (
              <button
                key={variant.label}
                type="button"
                onClick={() => setSelectedIndex(index)}
                disabled={variant.stockStatus === "out-of-stock"}
                className={`rounded-xl border px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  selectedIndex === index
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-earth-200 text-stone-600 hover:border-emerald-300"
                }`}
              >
                <span className="block font-medium">{variant.label}</span>
                <span className="block text-xs text-stone-500">₹{variant.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <WhatsAppButton
        href={whatsappLink}
        disabled={isOutOfStock}
        variant="solid"
        label={isOutOfStock ? "Currently Out of Stock" : "Inquire via WhatsApp"}
        className="w-full sm:w-auto"
      />
      <p className="text-xs text-stone-400">
        Tapping the button opens WhatsApp with your inquiry pre-filled — just hit send.
      </p>
    </div>
  );
}
