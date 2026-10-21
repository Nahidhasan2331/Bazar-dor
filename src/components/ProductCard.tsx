import Link from "next/link";
import type { Product } from "@/types/product";

const unitLabels: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  l: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
};

const formatBn = (value: number) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });

export default function ProductCard({ product }: { product: Product }) {
  const direction = product.change.dir;

  const badgeStyles = {
    up: "bg-green-50 text-green-700",
    down: "bg-red-50 text-red-600",
    flat: "bg-gray-100 text-gray-600",
  };

  const badgeSymbol = {
    up: "▲",
    down: "▼",
    flat: "—",
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-[#E1E9E2] bg-white p-4 transition hover:border-[#008C45] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008C45]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F2F7F3] text-2xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-[#202B23]">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {unitLabels[product.unit] ?? `প্রতি ${product.unit}`}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="mt-1 text-lg font-bold text-[#202B23]">
            {formatBn(product.today)} টাকা
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${badgeStyles[direction]}`}
        >
          {badgeSymbol[direction]}
          {formatBn(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}
