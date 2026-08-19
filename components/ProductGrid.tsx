import type { ProductView } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  whatsappNumber,
  whatsappTemplate,
}: {
  products: ProductView[];
  whatsappNumber: string;
  whatsappTemplate?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-earth-300 bg-white/60 py-16 text-center">
        <p className="text-stone-500">No plants here yet — check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          whatsappNumber={whatsappNumber}
          whatsappTemplate={whatsappTemplate}
        />
      ))}
    </div>
  );
}
