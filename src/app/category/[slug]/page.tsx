"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, PackageSearch } from "lucide-react";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type SortOption = "default" | "low" | "high";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

const categories: Record<string, { name: string; icon: string }> = {
  chal: { name: "চাল", icon: "🍚" },
  dal: { name: "ডাল", icon: "🫘" },
  tel: { name: "তেল", icon: "🛢️" },
  shobji: { name: "সবজি", icon: "🥬" },
  mach: { name: "মাছ", icon: "🐟" },
  mangsho: { name: "মাংস", icon: "🍗" },
  "dim-dudh": { name: "ডিম-দুধ", icon: "🥛" },
  moshla: { name: "মসলা", icon: "🌶️" },
};

const formatBn = (number: number) =>
  number.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });

const unitLabels: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-[14px] border border-[#E1E9E2] bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-[#EEF3EE]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-28 rounded bg-gray-200" />
          <div className="h-3 w-16 rounded bg-gray-100" />
        </div>
      </div>

      <div className="mt-5 h-3 w-20 rounded bg-gray-100" />

      <div className="mt-2 flex items-center justify-between">
        <div className="h-6 w-20 rounded bg-gray-200" />
        <div className="h-5 w-14 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const category = categories[slug];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState<SortOption>("default");

  useEffect(() => {
    if (!category) return;

    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError(false);
      setProducts([]);
      setSort("default");

      try {
        const response = await fetch(`${BASE_URL}/products`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const result = await response.json();

        const allProducts: Product[] = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : (result.data?.products ?? result.products ?? []);

        const categoryProducts = allProducts.filter(
          (product) => product.category === slug,
        );

        if (!controller.signal.aborted) {
          setProducts(categoryProducts);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Category loading error:", err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [slug, category]);

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sort === "low") {
      items.sort((a, b) => a.today - b.today);
    }

    if (sort === "high") {
      items.sort((a, b) => b.today - a.today);
    }

    return items;
  }, [products, sort]);

  if (!category) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#F1F6F1] px-4">
        <div className="text-center">
          <PackageSearch size={46} className="mx-auto mb-4 text-[#9AA99D]" />

          <h1 className="text-2xl font-bold text-[#243329]">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি নেই।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#008D42] px-5 py-3 text-sm font-semibold text-white hover:bg-[#007537]"
          >
            <ArrowLeft size={16} />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] bg-[#F1F6F1] px-4 pb-20 pt-6">
      <div className="mx-auto w-full max-w-[1120px]">
        <section className="flex items-center gap-4 rounded-[15px] border border-[#E1E9E2] bg-white px-5 py-5">
          <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-xl bg-[#F2F7F3] text-[32px]">
            {category.icon}
          </div>

          <div>
            <h1 className="text-[24px] font-bold text-[#243329]">
              {category.name}
            </h1>

            <p className="mt-1 text-[12px] text-[#7B887D]">
              {formatBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        <section className="mt-5 flex items-center justify-end gap-2 rounded-[14px] border border-[#E1E9E2] bg-white px-5 py-4">
          <label htmlFor="category-sort" className="text-[12px] text-[#748176]">
            সাজান
          </label>

          <div className="relative">
            <select
              id="category-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none rounded-lg border border-[#DDE7DE] bg-white py-2 pl-3 pr-8 text-[12px] text-[#344238] outline-none focus:border-[#008D42]"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>

            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#607164]"
            />
          </div>
        </section>

        <p className="mb-4 mt-4 text-[12px] text-[#6D7B70]">
          {loading
            ? "পণ্য লোড হচ্ছে..."
            : `মোট ${formatBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        </p>

        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}

        {/* API Error */}
        {!loading && error && (
          <div className="rounded-xl border border-[#E1E9E2] bg-white px-6 py-12 text-center">
            <h2 className="text-lg font-bold text-[#243329]">
              পণ্য লোড করা যায়নি
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-[#008D42] px-5 py-2.5 text-sm font-semibold text-white"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && sortedProducts.length === 0 && (
          <div className="rounded-xl border border-[#E1E9E2] bg-white px-6 py-14 text-center">
            <PackageSearch size={42} className="mx-auto mb-4 text-[#9AA99D]" />

            <h2 className="text-xl font-bold text-[#243329]">
              কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#008D42] px-5 py-3 text-sm font-semibold text-white hover:bg-[#007537]"
            >
              <ArrowLeft size={16} />
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}

        {!loading && !error && sortedProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => {
              const isUp = product.change?.dir === "up";
              const isDown = product.change?.dir === "down";

              const unit = unitLabels[product.unit] ?? product.unit;

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group rounded-[15px] border border-[#E1E9E2] bg-white p-4 transition hover:border-[#B6D9BE] hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2F7F3] text-[27px]">
                      {product.image}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-[16px] font-bold text-[#243329] group-hover:text-[#008D42]">
                        {product.nameBn}
                      </h2>

                      <p className="mt-0.5 text-[12px] text-[#7D897F]">
                        প্রতি {unit}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] text-[#788579]">আজকের দাম</p>

                    <div className="mt-1 flex items-end justify-between gap-2">
                      <p className="text-[21px] font-bold leading-none text-[#243329]">
                        {formatBn(product.today)}
                        <span className="ml-1 text-[13px] font-medium">
                          টাকা
                        </span>
                      </p>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          isUp
                            ? "bg-[#FFF0F0] text-[#E53935]"
                            : isDown
                              ? "bg-[#E9F7ED] text-[#008D42]"
                              : "bg-[#F1F4F1] text-[#69776C]"
                        }`}
                      >
                        {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                        {formatBn(product.change?.pct ?? 0)}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
