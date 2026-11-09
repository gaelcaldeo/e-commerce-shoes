
import Navbar from "@/components/Navbar";
import ShopClient from "@/components/ShopClient";
import { getProducts, getCategories } from "@/lib/products";

export const metadata = {
  title: "Shop",
  description: "Explore the GAEL streetwear footwear collection.",
};

type ShopPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const { category } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />

      <ShopClient
        products={products}
        categories={categories}
        initialCategory={category ?? "all"}
      />

      <footer className="bg-[#090909] px-6 py-8 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-[0.2em]">
          © 2026 GAEL. Own Your Every Step.
        </p>
      </footer>
    </>
  );
}
