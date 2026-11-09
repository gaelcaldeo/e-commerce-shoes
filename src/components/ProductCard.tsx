// import Image from "next/image";
// import Link from "next/link";
// import type { StoreProduct } from "@/lib/products";

// type ProductCardProps = {
//   product: StoreProduct;
// };

// export default function ProductCard({
//   product,
// }: ProductCardProps) {
//   const prices = product.variants.map(
//     (variant) => variant.price
//   );

//   const lowestPrice =
//     prices.length > 0 ? Math.min(...prices) : 0;

//   const isAvailable = product.variants.some(
//     (variant) => variant.stockQuantity > 0
//   );

//   return (
//     <Link
//       href={`/products/${product.id}`}
//       className="group block"
//     >
//       <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
//         <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           sizes="(max-width: 768px) 100vw, 33vw"
//           className="object-cover transition-transform duration-500 group-hover:scale-105"
//         />

//         {!isAvailable && (
//           <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600">
//             Out of Stock
//           </span>
//         )}
//       </div>

//       <p className="mt-4 text-xs uppercase tracking-wider text-gray-500">
//         {product.category}
//       </p>

//       <h2 className="mt-2 font-medium transition-colors group-hover:text-gray-500">
//         {product.name}
//       </h2>

//       <p className="mt-1 text-sm text-gray-600">
//         ₱
//         {lowestPrice.toLocaleString("en-PH", {
//           minimumFractionDigits: 2,
//         })}
//       </p>
//     </Link>
//   );
// }


import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "@/lib/products";

type ProductCardProps = {
  product: StoreProduct;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const prices = product.variants.map(
    (variant) => variant.price
  );

  const lowestPrice =
    prices.length > 0 ? Math.min(...prices) : 0;

  const isAvailable = product.variants.some(
    (variant) => variant.stockQuantity > 0
  );

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
    >
      {/* Product image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#eaeaea]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {!isAvailable && (
          <span className="absolute left-3 top-3 bg-black px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
            Sold Out
          </span>
        )}

        {isAvailable && (
          <span className="absolute bottom-3 right-3 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View Product ↗
          </span>
        )}
      </div>

      {/* Product information */}
      <div className="pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
          {product.category}
        </p>

        <div className="mt-2 flex items-start justify-between gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#111111] transition-colors group-hover:text-gray-500 sm:text-base">
            {product.name}
          </h2>

          <p className="shrink-0 text-sm font-semibold text-[#111111]">
            ₱{lowestPrice.toLocaleString("en-PH")}
          </p>
        </div>

        {!isAvailable && (
          <p className="mt-2 text-xs font-medium text-red-600">
            Currently unavailable
          </p>
        )}
      </div>
    </Link>
  );
}
