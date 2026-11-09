
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: number[];
};

const products: Product[] = [
  {
    id: 1,
    name: "Classic Runner",
    category: "Running",
    price: 3499,
    image: "https://placehold.co/800x800/png?text=Classic+Runner",
    description:
      "Lightweight running shoes designed to provide everyday comfort and support during your daily activities.",
    sizes: [8, 9, 10],
  },
  {
    id: 2,
    name: "Urban Street",
    category: "Sneakers",
    price: 2899,
    image: "https://placehold.co/800x800/png?text=Urban+Street",
    description:
      "A versatile everyday sneaker with a clean streetwear-inspired look, perfect for casual outfits.",
    sizes: [8, 9, 10],
  },
  {
    id: 3,
    name: "Everyday Comfort",
    category: "Casual",
    price: 1999,
    image: "https://placehold.co/800x800/png?text=Everyday+Comfort",
    description:
      "Simple and comfortable casual footwear designed for daily errands, relaxed outings, and everyday use.",
    sizes: [8, 9, 10],
  },
  {
    id: 4,
    name: "Solea Daily Walk",
    category: "Casual",
    price: 2499,
    image: "https://placehold.co/800x800/png?text=Solea+Daily+Walk",
    description:
      "A casual everyday shoe designed for easy styling and comfortable movement throughout the day.",
    sizes: [8, 9, 10],
  },
];

export default products;
