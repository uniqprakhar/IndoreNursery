import Link from "next/link";
import type { CategoryView } from "@/lib/types";

export default function CategoryPills({
  categories,
  activeSlug,
}: {
  categories: CategoryView[];
  activeSlug?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <Link
        href="/catalog"
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !activeSlug
            ? "bg-emerald-700 text-white"
            : "bg-white text-emerald-800 ring-1 ring-inset ring-earth-200 hover:bg-emerald-50"
        }`}
      >
        All Plants
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/catalog/${category.slug}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeSlug === category.slug
              ? "bg-emerald-700 text-white"
              : "bg-white text-emerald-800 ring-1 ring-inset ring-earth-200 hover:bg-emerald-50"
          }`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
}
