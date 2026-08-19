import Link from "next/link";
import type { SiteSettingsView } from "@/lib/types";
import WhatsAppButton from "./WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Header({ settings }: { settings: SiteSettingsView }) {
  const generalInquiryLink = buildWhatsAppLink(
    settings.whatsappNumber,
    `Hello, I'd like to know more about the plants available at ${settings.businessName}.`
  );

  return (
    <header className="sticky top-0 z-40 border-b border-earth-200/70 bg-cream/90 backdrop-blur">
      <div className="container-nursery flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-emerald-900 sm:text-2xl">
            {settings.businessName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          <Link href="/" className="text-sm font-medium text-emerald-900/80 hover:text-emerald-700">
            Home
          </Link>
          <Link href="/catalog" className="text-sm font-medium text-emerald-900/80 hover:text-emerald-700">
            Catalog
          </Link>
          <Link href="/#contact" className="text-sm font-medium text-emerald-900/80 hover:text-emerald-700">
            Visit Us
          </Link>
        </nav>

        <WhatsAppButton href={generalInquiryLink} variant="solid" label="Chat With Us" className="hidden sm:inline-flex" />
        <WhatsAppButton href={generalInquiryLink} variant="compact" label="Chat" className="sm:hidden" />
      </div>
    </header>
  );
}
