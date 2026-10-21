import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export default function PriceChangeSections({ products }: Props) {
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 md:px-6">
      {/* Price increased */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-[#202B23]">
          <span className="text-green-600">▲</span> আজ দাম বেড়েছে
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Price decreased */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-[#202B23]">
          <span className="text-red-600">▼</span> আজ দাম কমেছে
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All products */}
      <section id="সব-পণ্য" className="scroll-mt-28">
        <h2 className="text-xl font-bold text-[#202B23]">সব পণ্য</h2>

        <p className="mb-5 mt-2 text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
