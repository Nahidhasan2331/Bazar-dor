import Link from "next/link";
import { notFound } from "next/navigation";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

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

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const result = await response.json();

    const products: Product[] = Array.isArray(result)
      ? result
      : Array.isArray(result.data)
        ? result.data
        : (result.data?.products ?? result.products ?? []);

    const matchedProduct = products.find((product) => product.slug === slug);

    if (!matchedProduct) return null;

    const detailResponse = await fetch(
      `${BASE_URL}/products/${matchedProduct.id}`,
      { cache: "no-store" },
    );

    if (!detailResponse.ok) return null;

    const detailResult = await detailResponse.json();

    const product =
      detailResult.data?.product ??
      detailResult.data ??
      detailResult.product ??
      detailResult;

    return product?.slug === slug ? product : null;
  } catch (error) {
    console.error("Failed to load product:", error);
    return null;
  }
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const markets = product.markets ?? [];
  const unit = unitLabels[product.unit] ?? product.unit;

  const minimum = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const maximum = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const average = markets.length
    ? markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) /
      markets.length
    : product.today;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const stats = [
    {
      label: "সর্বনিম্ন দাম",
      value: minimum,
      color: "text-[#008D42]",
      description: "সবচেয়ে কম দামের বাজার",
    },
    {
      label: "সর্বোচ্চ দাম",
      value: maximum,
      color: "text-[#E53935]",
      description: "সবচেয়ে বেশি দামের বাজার",
    },
    {
      label: "গড় দাম",
      value: average,
      color: "text-[#008D42]",
      description: "প্রতি কেজি-এর হিসাবে",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F1F6F1] px-4 pb-24 pt-5">
      <div className="mx-auto w-full max-w-[1120px]">
        <nav className="mb-7 flex items-center gap-2 text-[12px] text-[#69776C]">
          <Link href="/" className="transition hover:text-[#008D42]">
            হোম
          </Link>

          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>

          <span className="text-[#344238]">{product.nameBn}</span>
        </nav>

        <section className="flex flex-col justify-between gap-5 rounded-[16px] border border-[#E1E9E2] bg-white px-5 py-5 sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[15px] bg-[#F2F7F3] text-[38px]">
              {product.image}
            </div>

            <div>
              <h1 className="text-[24px] font-bold leading-tight text-[#202B23]">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-[12px] text-[#657367]">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className="mt-1 text-[12px] text-[#59665C]">
                শতাধিকের তুলনায় আজকের দাম বেড়েছে · {formatBn(product.today)}{" "}
                টাকা
              </p>
            </div>
          </div>

          <div className="flex min-w-[112px] flex-col items-center justify-center rounded-[14px] bg-[#F2F7F3] px-5 py-4 text-center">
            <p className="text-[11px] text-[#879389]">আজকের দাম</p>

            <p className="mt-1 text-[28px] font-bold leading-none text-[#202B23]">
              {formatBn(product.today)}
            </p>

            <p className="mt-1 text-[11px] text-[#77847A]">টাকা / {unit}</p>

            <p
              className={`mt-1 text-[11px] font-bold ${
                isUp
                  ? "text-[#E53935]"
                  : isDown
                    ? "text-[#008D42]"
                    : "text-gray-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"} {formatBn(product.change.pct)}%
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-[16px] border border-[#E1E9E2] bg-white p-5 sm:p-6">
          <h2 className="mb-4 text-[16px] font-bold text-[#202B23]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[14px] border border-[#E1E9E2] bg-white px-5 py-4"
              >
                <p className="text-[11px] text-[#647166]">{stat.label}</p>

                <p
                  className={`mt-2 text-[21px] font-bold leading-tight ${stat.color}`}
                >
                  {formatBn(stat.value)} টাকা
                </p>

                <p className="mt-1 text-[11px] text-[#77847A]">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mb-3 mt-7 text-[16px] font-bold text-[#202B23]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-[13px] border border-[#E1E9E2]">
            <table className="w-full min-w-[650px] border-collapse text-left text-[12px]">
              <thead className="bg-[#FAFCFA] text-[#647166]">
                <tr>
                  <th className="px-4 py-3 font-medium">বাজার</th>

                  <th className="px-4 py-3 font-medium">বিভাগ</th>

                  <th className="px-4 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-3 text-right font-medium">সর্বোচ্চ</th>

                  <th className="px-4 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const marketAverage = (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className={`border-t border-[#CBD5CC] ${
                        index % 2 === 0 ? "bg-white" : "bg-[#F1F6F1]"
                      }`}
                    >
                      <td className="px-4 py-[11px] text-[#253329]">
                        {market.market}
                      </td>

                      <td className="px-4 py-[11px] text-[#344238]">
                        {market.division}
                      </td>

                      <td className="px-4 py-[11px] text-right text-[#344238]">
                        {formatBn(market.min)} টাকা
                      </td>

                      <td className="px-4 py-[11px] text-right text-[#344238]">
                        {formatBn(market.max)} টাকা
                      </td>

                      <td className="px-4 py-[11px] text-right font-semibold text-[#202B23]">
                        {formatBn(marketAverage)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {markets.length === 0 && (
              <p className="p-6 text-center text-sm text-gray-500">
                বাজারের তথ্য পাওয়া যায়নি।
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
