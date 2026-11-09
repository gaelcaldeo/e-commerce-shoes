// import "server-only";
// import { createClient } from "@/lib/supabase/server";

// export type ProductVariant = {
//   id: string;
//   size: number;
//   color: string;
//   price: number;
//   stockQuantity: number;
// };

// export type StoreProduct = {
//   id: string;
//   name: string;
//   slug: string;
//   category: string;
//   description: string;
//   image: string;
//   variants: ProductVariant[];
// };

// const FALLBACK_IMAGE =
//   "https://placehold.co/800x800/png?text=Solea+Shoes";

// function mapProduct(row: any): StoreProduct {
//   const category = row.categories as
//     | { name: string }
//     | null;

//   const images = (row.product_images ?? []) as {
//     image_url: string;
//     sort_order: number;
//   }[];

//   const variants = (row.product_variants ?? []) as {
//     id: string;
//     size: number;
//     color: string;
//     price: number;
//     stock_quantity: number;
//   }[];

//   const sortedImages = [...images].sort(
//     (a, b) => a.sort_order - b.sort_order
//   );

//   return {
//     id: row.id,
//     name: row.name,
//     slug: row.slug,
//     category: category?.name ?? "Footwear",
//     description: row.description ?? "",
//     image: sortedImages[0]?.image_url ?? FALLBACK_IMAGE,
//     variants: variants.map((variant) => ({
//       id: variant.id,
//       size: Number(variant.size),
//       color: variant.color,
//       price: variant.price,
//       stockQuantity: variant.stock_quantity,
//     })),
//   };
// }

// const PRODUCT_QUERY = `
//   id,
//   name,
//   slug,
//   description,
//   categories(name),
//   product_images(image_url, sort_order),
//   product_variants(id, size, color, price, stock_quantity)
// `;

// export async function getProducts(): Promise<StoreProduct[]> {
//   const supabase = createClient();

//   const { data, error } = await supabase
//     .from("products")
//     .select(PRODUCT_QUERY)
//     .eq("is_active", true)
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.error("Failed to fetch products:", error.message);
//     throw new Error("Unable to load products.");
//   }

//   return (data ?? []).map(mapProduct);
// }

// export async function getProductById(
//   id: string
// ): Promise<StoreProduct | null> {
//   const supabase = createClient();

//   const { data, error } = await supabase
//     .from("products")
//     .select(PRODUCT_QUERY)
//     .eq("id", id)
//     .eq("is_active", true)
//     .maybeSingle();

//   if (error) {
//     console.error("Failed to fetch product:", error.message);
//     throw new Error("Unable to load product.");
//   }

//   return data ? mapProduct(data) : null;
// }


import "server-only";
import { createClient } from "@/lib/supabase/server";

export type ProductVariant = {
  id: string;
  size: number;
  color: string;
  price: number;
  stockQuantity: number;
};

export type ProductImage = {
  imageUrl: string;
  altText: string;
  sortOrder: number;
};

export type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  images: ProductImage[];
  variants: ProductVariant[];
};

export type StoreCategory = {
  id: string;
  name: string;
  slug: string;
};

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/png?text=GAEL+Shoes";

function mapProduct(row: any): StoreProduct {
  const category = row.categories as
    | { name: string }
    | null;

  const productImages = (row.product_images ?? []) as {
    image_url: string;
    alt_text: string | null;
    sort_order: number;
  }[];

  const variants = (row.product_variants ?? []) as {
    id: string;
    size: number;
    color: string;
    price: number;
    stock_quantity: number;
  }[];

  const sortedImages: ProductImage[] = [...productImages]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => ({
      imageUrl: image.image_url,
      altText: image.alt_text ?? row.name,
      sortOrder: image.sort_order,
    }));

  const images =
    sortedImages.length > 0
      ? sortedImages
      : [
          {
            imageUrl: FALLBACK_IMAGE,
            altText: `${row.name} product image`,
            sortOrder: 0,
          },
        ];

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: category?.name ?? "Footwear",
    description: row.description ?? "",
    image: images[0].imageUrl,
    images,
    variants: variants.map((variant) => ({
      id: variant.id,
      size: Number(variant.size),
      color: variant.color,
      price: variant.price,
      stockQuantity: variant.stock_quantity,
    })),
  };
}

const PRODUCT_QUERY = `
  id,
  name,
  slug,
  description,
  categories(name),
  product_images(image_url, alt_text, sort_order),
  product_variants(id, size, color, price, stock_quantity)
`;

export async function getProducts(): Promise<StoreProduct[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_QUERY)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch products:", error.message);
    throw new Error("Unable to load products.");
  }

  return (data ?? []).map(mapProduct);
}

export async function getProductById(
  id: string
): Promise<StoreProduct | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_QUERY)
    .eq("id", id)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch product:", error.message);
    throw new Error("Unable to load product.");
  }

  return data ? mapProduct(data) : null;
}

export async function getCategories(): Promise<StoreCategory[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch categories:", error.message);
    throw new Error("Unable to load categories.");
  }

  return data ?? [];
}