
"use client";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

const SHIPPING_FEE = 150;

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const total = subtotal + SHIPPING_FEE;

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#111111]">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="bg-[#090909] px-6 py-16 text-white md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
            GAEL / Shopping Cart
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase tracking-tight sm:text-6xl">
            YOUR CART<span className="text-gray-500">.</span>
          </h1>

          <p className="mt-4 text-sm text-gray-400">
            Review your selection before checking out.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        {items.length === 0 ? (
          /* EMPTY CART */
          <div className="mx-auto max-w-xl py-20 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
              Nothing Here Yet
            </p>

            <h2 className="mt-5 text-3xl font-black uppercase">
              YOUR CART IS EMPTY.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              Looks like you haven't found your next favorite
              pair yet. Explore the GAEL collection and find
              your style.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-3 bg-[#090909] px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gray-700"
            >
              Explore Collection ↗
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_360px]">
            {/* CART ITEMS */}
            <div>
              <div className="flex items-center justify-between border-b border-gray-300 pb-5">
                <h2 className="text-sm font-black uppercase tracking-widest">
                  Your Selection
                </h2>

                <span className="text-xs text-gray-500">
                  {totalQuantity} item(s)
                </span>
              </div>

              <div>
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex gap-4 border-b border-gray-200 py-7 sm:gap-6"
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="relative aspect-square h-28 w-28 shrink-0 overflow-hidden bg-[#e8e8e8] sm:h-36 sm:w-36">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 112px, 144px"
                        className="object-cover"
                      />
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row">
                      <div>
                        <h3 className="text-sm font-black uppercase sm:text-base">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-xs text-gray-500">
                          Color: {item.color}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Size: {item.size}
                        </p>

                        <p className="mt-3 text-sm font-bold">
                          ₱
                          {item.price.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      {/* QUANTITY AND REMOVE */}
                      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-between">
                        <div className="flex items-center border border-gray-300">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="px-3 py-2 text-sm transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            −
                          </button>

                          <span className="min-w-9 text-center text-xs font-bold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                item.quantity + 1
                              )
                            }
                            disabled={
                              item.quantity >= item.stockQuantity
                            }
                            className="px-3 py-2 text-sm transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] text-gray-400">
                            {item.stockQuantity} available
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.variantId)
                            }
                            className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-600 transition hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/shop"
                className="mt-7 inline-block text-xs font-bold uppercase tracking-widest text-gray-500 transition hover:text-black"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* ORDER SUMMARY */}
            <aside className="border border-gray-200 bg-white p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                GAEL / Summary
              </p>

              <h2 className="mt-3 text-xl font-black uppercase">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal ({totalQuantity} items)
                  </span>

                  <span className="font-medium">
                    ₱
                    {subtotal.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Shipping Fee
                  </span>

                  <span className="font-medium">
                    ₱
                    {SHIPPING_FEE.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase">
                      Estimated Total
                    </span>

                    <span className="text-xl font-black">
                      ₱
                      {total.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-gray-400">
                    Shipping fee is based on the current
                    standard delivery rate.
                  </p>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-8 block w-full bg-[#090909] px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gray-700"
              >
                Proceed to Checkout ↗
              </Link>

              <p className="mt-5 text-center text-[10px] uppercase tracking-wider text-gray-400">
                Secure order processing
              </p>
            </aside>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-[#090909] px-6 py-8 text-center text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          © 2026 GAEL. Own Your Every Step.
        </p>
      </footer>
    </main>
  );
}
