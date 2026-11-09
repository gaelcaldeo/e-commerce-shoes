
"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/products";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex];

  if (!activeImage) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Main product image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <Image
          key={activeImage.imageUrl}
          src={activeImage.imageUrl}
          alt={activeImage.altText || productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-300"
          priority
        />

        <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail images */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={`${image.imageUrl}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${image.altText || `image ${index + 1}`}`}
              aria-pressed={activeIndex === index}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-gray-100 transition ${
                activeIndex === index
                  ? "border-black"
                  : "border-transparent hover:border-gray-400"
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText || `${productName} view ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 12vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
