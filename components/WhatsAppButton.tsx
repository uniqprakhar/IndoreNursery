import WhatsAppIcon from "./icons/WhatsAppIcon";

type Variant = "solid" | "outline" | "compact";

export default function WhatsAppButton({
  href,
  variant = "solid",
  disabled = false,
  label = "Inquire via WhatsApp",
  className = "",
}: {
  href: string;
  variant?: Variant;
  disabled?: boolean;
  label?: string;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

  const variants: Record<Variant, string> = {
    solid: "bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-3 text-sm shadow-card",
    outline: "border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-5 py-3 text-sm",
    compact: "bg-emerald-600 text-white hover:bg-emerald-700 px-3.5 py-2 text-xs",
  };

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${base} ${variants[variant]} cursor-not-allowed opacity-50 ${className}`}
      >
        <WhatsAppIcon className={variant === "compact" ? "h-4 w-4" : "h-5 w-5"} />
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon className={variant === "compact" ? "h-4 w-4" : "h-5 w-5"} />
      {label}
    </a>
  );
}
