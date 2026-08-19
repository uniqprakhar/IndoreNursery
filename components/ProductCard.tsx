import Image from "next/image";
import Link from "next/link";
import type { ProductView } from "@/lib/types";
import { getProductWhatsAppLink } from "@/lib/whatsapp";
import PriceTag from "./PriceTag";
import StockBadge from "./StockBadge";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({
  product,
  whatsappNumber,
  whatsappTemplate,
}: {
  product: ProductView;
  whatsappNumber: string;
  whatsappTemplate?: string;
}) {
  const isOutOfStock = product.stockStatus === "out-of-stock";
  const whatsappLink = getProductWhatsAppLink(whatsappNumber, product, null, whatsappTemplate);
  const image = product.images[0];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-earth-100">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-earth-300">No photo</div>
        )}
        <div className="absolute left-3 top-3">
          <StockBadge status={product.stockStatus} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
            {product.categoryTitle}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-emerald-950 hover:text-emerald-700">
              {product.name}
            </h3>
          </Link>
        </div>

        {product.shortDescription && (
          <p className="line-clamp-2 text-sm text-stone-500">{product.shortDescription}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
        </div>

        <WhatsAppButton
          href={whatsappLink}
          disabled={isOutOfStock}
          variant="compact"
          label={isOutOfStock ? "Out of Stock" : "Inquire via WhatsApp"}
          className="w-full"
        />
      </div>
    </div>
  );
}
