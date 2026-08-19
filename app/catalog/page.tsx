import type { Metadata } from "next";
import CategoryPills from "@/components/CategoryPills";
import ProductGrid from "@/components/ProductGrid";
import { getAllCategories, getAllProducts, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Catalog",
};

export default async function CatalogPage() {
  const [settings, categories, products] = await Promise.all([
    getSiteSettings(),
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <div className="container-nursery py-14 sm:py-20">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-600">Full Catalog</p>
        <h1 className="font-display text-3xl font-semibold text-emerald-950 sm:text-4xl">All Plants</h1>
        <p className="mt-2 max-w-xl text-stone-500">
          Browse every plant we currently stock. Tap "Inquire via WhatsApp" on any item to check availability
          and place an order.
        </p>
      </div>

      <div className="mb-10">
        <CategoryPills categories={categories} />
      </div>

      <ProductGrid products={products} whatsappNumber={settings.whatsappNumber} whatsappTemplate={settings.whatsappGreeting} />
    </div>
  );
}
