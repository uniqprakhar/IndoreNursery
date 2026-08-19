import { formatPriceINR } from "@/lib/whatsapp";

export default function PriceTag({
  price,
  compareAtPrice,
  size = "md",
}: {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
}) {
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const sizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-3xl",
  };

  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={`font-display font-semibold text-emerald-900 ${sizes[size]}`}>
        {formatPriceINR(price)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-stone-400 line-through">{formatPriceINR(compareAtPrice)}</span>
      )}
    </span>
  );
}
