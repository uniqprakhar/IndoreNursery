import Image from "next/image";
import Link from "next/link";
import type { SiteSettingsView } from "@/lib/types";

export default function Hero({ settings }: { settings: SiteSettingsView }) {
  return (
    <section className="relative overflow-hidden bg-emerald-950">
      <div className="absolute inset-0">
        {settings.heroImage && (
          <Image
            src={settings.heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/30" />
      </div>

      <div className="container-nursery relative flex min-h-[70vh] flex-col justify-center gap-6 py-24 sm:min-h-[75vh]">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
          {settings.tagline ?? "Plant Nursery"}
        </p>
        <h1 className="max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
          {settings.heroHeadline ?? "Bring nature home"}
        </h1>
        {settings.heroSubheadline && (
          <p className="max-w-xl text-balance text-lg text-emerald-100/90">{settings.heroSubheadline}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/catalog"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-emerald-900 shadow-card transition-colors hover:bg-emerald-50"
          >
            Browse the Catalog
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border border-emerald-200/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Visit the Nursery
          </Link>
        </div>
      </div>
    </section>
  );
}
