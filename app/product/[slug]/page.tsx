import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import ProductInquiryPanel from "@/components/ProductInquiryPanel";
import { getAllProducts, getProductBySlug, getRelatedProducts, getSiteSettings } from "@/lib/data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const [settings, product] = await Promise.all([getSiteSettings(), getProductBySlug(params.slug)]);

  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.categorySlug, product.slug);

  const infoTags = [
    product.careLevel && { label: "Care Level", value: product.careLevel },
    product.lightRequirement && { label: "Light", value: product.lightRequirement },
    product.petFriendly !== undefined && { label: "Pet Friendly", value: product.petFriendly ? "Yes" : "No" },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <div className="container-nursery py-10 sm:py-16">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-stone-400">
        <Link href="/catalog" className="hover:text-emerald-700">
          Catalog
        </Link>
        <span>/</span>
        <Link href={`/catalog/${product.categorySlug}`} className="hover:text-emerald-700">
          {product.categoryTitle}
        </Link>
        <span>/</span>
        <span className="text-stone-600">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-earth-100">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-earth-300">No photo</div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(1).map((src, index) => (
                <div key={src + index} className="relative aspect-square overflow-hidden rounded-xl bg-earth-100">
                  <Image src={src} alt={`${product.name} photo ${index + 2}`} fill sizes="20vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-600">{product.categoryTitle}</p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-emerald-950 sm:text-4xl">{product.name}</h1>
            {product.shortDescription && <p className="mt-3 text-stone-500">{product.shortDescription}</p>}
          </div>

          <ProductInquiryPanel
            product={product}
            whatsappNumber={settings.whatsappNumber}
            whatsappTemplate={settings.whatsappGreeting}
          />

          {infoTags.length > 0 && (
            <div className="grid grid-cols-3 gap-3 border-y border-earth-200 py-5">
              {infoTags.map((tag) => (
                <div key={tag.label}>
                  <p className="text-xs uppercase tracking-wide text-stone-400">{tag.label}</p>
                  <p className="mt-1 text-sm font-medium text-emerald-900">{tag.value}</p>
                </div>
              ))}
            </div>
          )}

          {product.description && (
            <div>
              <h2 className="font-display text-lg font-semibold text-emerald-950">About this plant</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-stone-500">{product.description}</p>
            </div>
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-earth-100 px-3 py-1 text-xs font-medium text-earth-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-2xl font-semibold text-emerald-950">You may also like</h2>
          <ProductGrid
            products={relatedProducts}
            whatsappNumber={settings.whatsappNumber}
            whatsappTemplate={settings.whatsappGreeting}
          />
        </section>
      )}
    </div>
  );
}
