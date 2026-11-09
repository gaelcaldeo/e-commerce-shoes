"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { StoreProduct } from "@/lib/products";

type SizeSelectorProps = {
  product: StoreProduct;
};

export default function SizeSelector({
  product,
}: SizeSelectorProps) {
  const { addToCart } = useCart();

  const colors = [
    ...new Set(product.variants.map((variant) => variant.color)),
  ];

  const [selectedColor, setSelectedColor] = useState(
    colors[0] ?? ""
  );

  const [selectedVariantId, setSelectedVariantId] =
    useState<string | null>(null);

  const [message, setMessage] = useState("");

  const colorVariants = product.variants.filter(
    (variant) => variant.color === selectedColor
  );

  const selectedVariant = product.variants.find(
    (variant) => variant.id === selectedVariantId
  );

  const handleAddToCart = () => {
    if (!selectedVariant) {
      setMessage("Please select a size first.");
      return;
    }

    if (selectedVariant.stockQuantity < 1) {
      setMessage("This variant is out of stock.");
      return;
    }

    addToCart({
      variantId: selectedVariant.id,
      productId: product.id,
      name: product.name,
      price: selectedVariant.price,
      image: product.image,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity: 1,
      stockQuantity: selectedVariant.stockQuantity,
    });

    setMessage(`${product.name} added to cart!`);
  };

  return (
    <div>
      <p className="mb-3 text-sm font-medium">Color</p>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            aria-pressed={selectedColor === color}
            onClick={() => {
              setSelectedColor(color);
              setSelectedVariantId(null);
              setMessage("");
            }}
            className={`rounded-md border px-5 py-3 text-sm transition ${
              selectedColor === color
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-black"
            }`}
          >
            {color}
          </button>
        ))}
      </div>

      <p className="mb-3 mt-6 text-sm font-medium">Size</p>

      <div className="flex flex-wrap gap-3">
        {colorVariants.map((variant) => {
          const isOutOfStock = variant.stockQuantity < 1;

          return (
            <button
              key={variant.id}
              type="button"
              disabled={isOutOfStock}
              aria-pressed={
                selectedVariantId === variant.id
              }
              onClick={() => {
                setSelectedVariantId(variant.id);
                setMessage("");
              }}
              className={`rounded-md border px-5 py-3 text-sm transition ${
                selectedVariantId === variant.id
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              } disabled:cursor-not-allowed disabled:opacity-30`}
            >
              {variant.size}
            </button>
          );
        })}
      </div>

      {selectedVariant && (
        <div className="mt-5">
          <p className="text-sm text-gray-600">
            Selected: {selectedVariant.color} / Size{" "}
            {selectedVariant.size}
          </p>

          <p className="mt-2 text-lg font-semibold">
            ₱
            {selectedVariant.price.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {selectedVariant.stockQuantity} available
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={
          !selectedVariant ||
          selectedVariant.stockQuantity < 1
        }
        className="mt-6 w-full rounded-md bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Add to Cart
      </button>

      {message && (
        <p
          role="status"
          className="mt-3 text-sm text-gray-600"
        >
          {message}
        </p>
      )}
    </div>
  );
}