import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPills from "@/components/CategoryPills";
import ProductGrid from "@/components/ProductGrid";
import { getAllCategories, getProductsByCategory, getSiteSettings } from "@/lib/data";

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === params.category);
  return { title: category?.title ?? "Catalog" };
}

export default async function CategoryPage({ params }: Props) {
  const [settings, categories] = await Promise.all([getSiteSettings(), getAllCategories()]);
  const category = categories.find((c) => c.slug === params.category);

  if (!category) notFound();

  const products = await getProductsByCategory(category.slug);

  return (
    <div className="container-nursery py-14 sm:py-20">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-600">Category</p>
        <h1 className="font-display text-3xl font-semibold text-emerald-950 sm:text-4xl">{category.title}</h1>
        {category.description && <p className="mt-2 max-w-xl text-stone-500">{category.description}</p>}
      </div>

      <div className="mb-10">
        <CategoryPills categories={categories} activeSlug={category.slug} />
      </div>

      <ProductGrid products={products} whatsappNumber={settings.whatsappNumber} whatsappTemplate={settings.whatsappGreeting} />
    </div>
  );
}
