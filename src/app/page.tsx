// import Navbar from "@/components/Navbar";
// import ProductCard from "@/components/ProductCard";
// import { getProducts } from "@/lib/products";

// export default async function Home() {
//   const products = await getProducts();

//   return (
//     <main className="min-h-screen scroll-smooth bg-white text-black">
//       <Navbar />

//       <section className="flex min-h-[75vh] flex-col items-center justify-center bg-gray-100 px-6 text-center">
//         <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
//           Designed for Everyday Movement
//         </p>

//         <h1 className="mt-6 text-6xl font-bold tracking-tight md:text-8xl">
//           SOLEA
//         </h1>

//         <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 md:text-lg">
//           Find your rhythm. Discover footwear that brings
//           comfort and confidence to every step.
//         </p>

//         <a
//           href="#collection"
//           className="mt-8 rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
//         >
//           Explore Collection
//         </a>
//       </section>

//       <section
//         id="collection"
//         className="px-6 py-16 md:px-12"
//       >
//         <div className="mb-8">
//           <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
//             Our Collection
//           </p>

//           <h2 className="mt-2 text-3xl font-semibold tracking-tight">
//             Find Your Everyday Pair
//           </h2>

//           <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
//             Discover footwear designed for comfort, style,
//             and everyday movement.
//           </p>
//         </div>

//         {products.length === 0 ? (
//           <p className="py-12 text-center text-gray-500">
//             No products available yet.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {products.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }



import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import {
  getProducts,
  getCategories,
} from "@/lib/products";

export default async function Home() {
  const [products, categories] = await Promise.all([
  getProducts(),
  getCategories(),
]);

const featuredProducts = products.slice(0, 4);

  // Use the first product image for the hero section.
  const heroProduct = products[0];

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#111111]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-[#090909] text-white">
        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-12 md:py-20">

          {/* Hero text */}
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
              GAEL / Streetwear Footwear
            </p>

            <h1 className="mt-8 text-6xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              OWN YOUR
              <br />
              EVERY
              <br />
              STEP<span className="text-gray-500">.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-gray-400 md:text-base">
              Street-ready footwear for everyday movement.
              Find your style, make your statement, and move
              with confidence.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="#collection"
                className="inline-flex items-center gap-3 bg-white px-7 py-4 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-gray-300"
              >
                Shop Collection
                <span>↗</span>
              </Link>

              <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
                Built for everyday
              </span>
            </div>
          </div>

          {/* Hero product image */}
          <div className="relative">
            <div className="absolute -right-0 -top-10 z-10 border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              GAEL
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-[#1c1c1c]">
              {heroProduct ? (
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl font-black tracking-widest text-white/20">
                    GAEL.
                  </span>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-300">
                  Move Different
                </p>

                <p className="mt-2 text-xl font-black uppercase text-white">
                  {heroProduct?.name ?? "The GAEL Collection"}
                </p>
              </div>
            </div>

            <p className="mt-4 text-right text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Style / Comfort / Movement
            </p>
          </div>
        </div>

        {/* Brand ticker */}
        <div className="overflow-hidden border-t border-white/10 py-5">
          <p className="text-center text-xs font-bold uppercase tracking-[0.35em] text-gray-400">
            OWN YOUR EVERY STEP. &nbsp; — &nbsp;
            OWN YOUR EVERY STEP.
          </p>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
              Find Your Style
            </p>

            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl">
              Shop By Category
            </h2>
          </div>

          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Explore GAEL
          </span>
        </div>

        {categories.length > 0 ? (
          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/shop?category=${encodeURIComponent(category.slug)}`}
                className="group flex min-h-32 items-end justify-between bg-[#e8e8e8] p-5 transition-colors hover:bg-[#111111] hover:text-white"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-400">
                    0{index + 1}
                  </p>

                  <h3 className="mt-3 text-sm font-black uppercase tracking-wide">
                    {category.name}
                  </h3>
                </div>

                <span className="text-xl transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-gray-500">
            Categories will appear here when products are available.
          </p>
        )}
      </section>

      {/* FEATURED PRODUCTS */}
      <section
        id="collection"
        className="bg-white px-6 py-20 md:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
                The GAEL Collection
              </p>

              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl">
                Featured Footwear
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
                Everyday essentials. Street-inspired style.
                Find your next favorite pair.
              </p>
            </div>

            <Link
              href="/shop"
              className="border-b-2 border-black pb-2 text-xs font-bold uppercase tracking-wider transition-colors hover:text-gray-500"
            >
              View All Products ↗
            </Link>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="mt-12 border border-dashed border-gray-300 py-20 text-center">
              <h3 className="text-xl font-black uppercase">
                Collection Coming Soon
              </h3>

              <p className="mt-3 text-sm text-gray-500">
                Our footwear collection will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="bg-[#090909] px-6 py-24 text-center text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
            This Is GAEL
          </p>

          <h2 className="mt-7 text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl md:text-7xl">
            OWN YOUR
            <br />
            EVERY STEP<span className="text-gray-500">.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-gray-400">
            Your style. Your pace. Your journey.
            Step into every day with confidence.
          </p>

          <Link
            href="#collection"
            className="mt-9 inline-flex border border-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition hover:bg-white hover:text-black"
          >
            Discover The Collection ↗
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#090909] px-6 pb-8 text-white md:px-12">
        <div className="mx-auto max-w-7xl border-t border-white/15 pt-12">
          <div className="grid gap-10 md:grid-cols-3">

            <div>
              <Link
                href="/"
                className="text-3xl font-black tracking-[0.2em]"
              >
                GAEL<span className="text-gray-500">.</span>
              </Link>

              <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
                Streetwear footwear for everyday movement.
                Own your every step.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest">
                Explore
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-gray-400">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>

                <Link href="/shop" className="hover:text-white">
                  Shop
                </Link>

                <Link href="/about" className="hover:text-white">
                  About GAEL
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest">
                Customer Care
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-gray-400">
                <Link
                  href="/track-order"
                  className="hover:text-white"
                >
                  Track Your Order
                </Link>

                <Link href="/cart" className="hover:text-white">
                  Shopping Cart
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-[10px] uppercase tracking-wider text-gray-500 sm:flex-row">
            <p>© 2026 GAEL. All rights reserved.</p>
            <p>OWN YOUR EVERY STEP.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
