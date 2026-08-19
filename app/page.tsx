import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getAllCategories, getFeaturedProducts, getSiteSettings } from "@/lib/data";

export default async function HomePage() {
  const [settings, featuredProducts, categories] = await Promise.all([
    getSiteSettings(),
    getFeaturedProducts(),
    getAllCategories(),
  ]);

  return (
    <>
      <Hero settings={settings} />

      <section className="container-nursery py-16 sm:py-24">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-600">Handpicked</p>
            <h2 className="font-display text-3xl font-semibold text-emerald-950 sm:text-4xl">
              Featured Plants
            </h2>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">
            View full catalog &rarr;
          </Link>
        </div>
        <ProductGrid
          products={featuredProducts}
          whatsappNumber={settings.whatsappNumber}
          whatsappTemplate={settings.whatsappGreeting}
        />
      </section>

      <section className="bg-earth-50 py-16 sm:py-24">
        <div className="container-nursery">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-600">Explore</p>
            <h2 className="font-display text-3xl font-semibold text-emerald-950 sm:text-4xl">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/catalog/${category.slug}`}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-emerald-900 shadow-card transition-shadow hover:shadow-card-hover"
              >
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-lg font-semibold text-white">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-nursery py-16 sm:py-24">
        <div className="grid gap-10 sm:grid-cols-3">
          {[
            {
              title: "Hand-selected quality",
              body: "Every plant is checked for health and vigour before it reaches the catalog.",
            },
            {
              title: "Order via WhatsApp",
              body: "No confusing checkout — just message us and we'll confirm availability and delivery.",
            },
            {
              title: "Local & fresh",
              body: "Grown and nurtured close to home, so your plants settle in fast.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-xl font-semibold text-emerald-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
