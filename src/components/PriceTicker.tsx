"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

type Product = {
  id: number;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
};

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();

        const productList = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : (result.data?.products ?? result.products ?? []);

        setProducts(Array.isArray(productList) ? productList : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const formatBn = (value: number) => value.toLocaleString("bn-BD");

  if (products.length === 0) return null;

  return (
    <div className="overflow-hidden border-y border-gray-100 bg-[#F4FAF5] py-3">
      <div className="price-ticker-track flex w-max items-center gap-10">
        {[...products, ...products].map((product, index) => {
          const isUp = product.change.dir === "up";

          return (
            <div
              key={`${product.id}-${index}`}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
            >
              <span className="font-semibold text-gray-800">
                {product.nameBn}
              </span>

              <span className="text-gray-700">
                ৳{formatBn(product.today)}/{product.unit}
              </span>

              <span
                className={`flex items-center gap-1 font-medium ${
                  isUp ? "text-red-600" : "text-green-600"
                }`}
              >
                {isUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {formatBn(product.change.pct)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
