import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-nursery flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald-600">404</p>
      <h1 className="font-display text-3xl font-semibold text-emerald-950">We couldn't find that page</h1>
      <p className="max-w-md text-stone-500">
        The plant or page you're looking for may have been moved or is no longer available.
      </p>
      <Link
        href="/catalog"
        className="mt-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700"
      >
        Browse the Catalog
      </Link>
    </div>
  );
}
