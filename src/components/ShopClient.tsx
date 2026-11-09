
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type {
  StoreProduct,
  StoreCategory,
} from "@/lib/products";

type ShopClientProps = {
  products: StoreProduct[];
  categories: StoreCategory[];
  initialCategory: string;
};

export default function ShopClient({
  products,
  categories,
  initialCategory,
}: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] =
  useState(initialCategory);

  const [sortOption, setSortOption] =
    useState("featured");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
  const category = categories.find(
    (item) => item.slug === selectedCategory
  );

  result = category
    ? result.filter(
        (product) =>
          product.category.toLowerCase() ===
          category.name.toLowerCase()
      )
    : [];
}
    if (sortOption === "price-low") {
      result.sort((a, b) => {
        const priceA = Math.min(
          ...a.variants.map((v) => v.price)
        );
        const priceB = Math.min(
          ...b.variants.map((v) => v.price)
        );
        return priceA - priceB;
      });
    }

    if (sortOption === "price-high") {
      result.sort((a, b) => {
        const priceA = Math.min(
          ...a.variants.map((v) => v.price)
        );
        const priceB = Math.min(
          ...b.variants.map((v) => v.price)
        );
        return priceB - priceA;
      });
    }

    return result;
  }, [products, selectedCategory, sortOption]);

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#111111]">
      {/* Page heading */}
      <section className="bg-[#090909] px-6 py-20 text-white md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
            GAEL / The Collection
          </p>

          <h1 className="mt-6 text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-8xl">
            THE
            <br />
            COLLECTION<span className="text-gray-500">.</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-gray-400">
            Explore street-ready footwear designed for
            everyday movement. Find your style and own
            every step.
          </p>
        </div>
      </section>

      {/* Product catalog */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-20">
        {/* Category filters */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Filter by category
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`border px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
                selectedCategory === "all"
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-black hover:border-black"
              }`}
            >
              All Products
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() =>
  setSelectedCategory(category.slug)
}
                className={`border px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  selectedCategory === category.slug
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-black hover:border-black"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results and sorting */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-gray-300 pb-5">
          <p className="text-xs font-bold uppercase tracking-wider">
            {filteredProducts.length} Products
          </p>

          <div className="flex items-center gap-3">
            <label
              htmlFor="shop-sort"
              className="text-xs text-gray-500"
            >
              Sort by:
            </label>

            <select
              id="shop-sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value)
              }
              className="border border-gray-300 bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-black"
            >
              <option value="featured">Featured</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h2 className="text-2xl font-black uppercase">
              No Products Found
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              There are currently no products in this category.
            </p>

            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className="mt-6 bg-black px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-gray-700"
            >
              View All Products
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
