import Link from "next/link";
import type { SiteSettingsView } from "@/lib/types";

export default function Footer({ settings }: { settings: SiteSettingsView }) {
  return (
    <footer id="contact" className="mt-24 border-t border-earth-200 bg-emerald-950 text-emerald-50">
      <div className="container-nursery grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-semibold">{settings.businessName}</h3>
          {settings.tagline && <p className="mt-2 text-sm text-emerald-200">{settings.tagline}</p>}
          {settings.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-emerald-300 hover:text-white"
            >
              Follow us on Instagram
            </a>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Visit the Nursery</h4>
          {settings.address && <p className="mt-3 text-sm text-emerald-100">{settings.address}</p>}
          {settings.phoneDisplay && (
            <p className="mt-2 text-sm text-emerald-100">
              <a href={`tel:${settings.phoneDisplay.replace(/\s+/g, "")}`} className="hover:text-white">
                {settings.phoneDisplay}
              </a>
            </p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Browse</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-emerald-100">
            <Link href="/catalog" className="hover:text-white">
              Full Catalog
            </Link>
            <Link href="/" className="hover:text-white">
              Home
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-900 py-6">
        <p className="container-nursery text-center text-xs text-emerald-400">
          &copy; {new Date().getFullYear()} {settings.businessName}. Prices shown are indicative — confirm
          availability via WhatsApp before visiting.
        </p>
      </div>
    </footer>
  );
}
