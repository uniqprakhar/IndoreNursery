import type { StockStatus } from "@/lib/types";

const CONFIG: Record<StockStatus, { label: string; className: string }> = {
  "in-stock": {
    label: "In Stock",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
  },
  "limited-stock": {
    label: "Limited Stock",
    className: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
  },
  "out-of-stock": {
    label: "Out of Stock",
    className: "bg-stone-100 text-stone-500 ring-1 ring-inset ring-stone-400/20",
  },
};

export default function StockBadge({ status }: { status: StockStatus }) {
  const config = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "in-stock" ? "bg-emerald-500" : status === "limited-stock" ? "bg-amber-500" : "bg-stone-400"
        }`}
      />
      {config.label}
    </span>
  );
}
