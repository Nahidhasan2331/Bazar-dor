import Hero from "@/components/Hero";
import PriceTicker from "@/components/PriceTicker";
import PriceChangeSections from "@/components/PriceChangeSections";
import type { Product, ProductResponse } from "@/types/product";
export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const result: ProductResponse = await response.json();

    if (Array.isArray(result)) {
      return result;
    }

    if ("products" in result) {
      return result.products;
    }

    if (Array.isArray(result.data)) {
      return result.data;
    }

    return result.data.products ?? [];
  } catch (error) {
    console.error("Product API error:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#F2F7F3]">
      <PriceTicker />
      <Hero />
      <PriceChangeSections products={products} />
    </main>
  );
}
