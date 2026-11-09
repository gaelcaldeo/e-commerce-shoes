
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#090909] px-5 py-5 text-white md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-black tracking-[0.2em]"
        >
          GAEL<span className="text-gray-400">.</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-9 text-sm font-medium md:flex">
          <Link
            href="/"
            className="transition-colors hover:text-gray-400"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="transition-colors hover:text-gray-400"
          >
            Shop
          </Link>

          <Link
            href="/about"
            className="transition-colors hover:text-gray-400"
          >
            About
          </Link>

          <Link
            href="/track-order"
            className="transition-colors hover:text-gray-400"
          >
            Track Order
          </Link>
        </div>

        {/* Cart and mobile menu */}
        <div className="flex items-center gap-5">
          <Link
            href="/cart"
            className="text-sm font-semibold transition-colors hover:text-gray-400"
          >
            Cart ({cartCount})
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="mt-5 flex flex-col gap-5 border-t border-white/15 pt-5 text-sm font-medium md:hidden">
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>

          <Link href="/shop" onClick={closeMenu}>
            Shop
          </Link>

          <Link href="/about" onClick={closeMenu}>
            About
          </Link>

          <Link href="/track-order" onClick={closeMenu}>
            Track Order
          </Link>
        </div>
      )}
    </nav>
  );
}
