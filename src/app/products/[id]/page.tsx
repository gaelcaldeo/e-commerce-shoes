
import Link from "next/link";
import { notFound } from "next/navigation";
import SizeSelector from "@/components/SizeSelector";
import ProductGallery from "@/components/ProductGallery";
import { getProductById } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const prices = product.variants.map(
    (variant) => variant.price
  );

  const lowestPrice =
    prices.length > 0 ? Math.min(...prices) : 0;

  return (
    <main className="min-h-screen px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-gray-500 transition-colors hover:text-black"
        >
          ← Back to Shop
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Product image gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          {/* Product information */}
          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-bold md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-xl font-semibold">
              ₱
              {lowestPrice.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
              })}
            </p>

            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>

            <div className="mt-8">
              <h2 className="mb-4 text-sm font-semibold">
                Select Your Variant
              </h2>

              <SizeSelector product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
