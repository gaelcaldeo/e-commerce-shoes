"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartItem = {
  variantId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: number;
  color: string;
  quantity: number;
  stockQuantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (
    variantId: string,
    quantity: number
  ) => void;
  removeFromCart: (variantId: string) => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartContext = createContext<
  CartContextType | undefined
>(undefined);

function isValidCartItem(item: unknown): item is CartItem {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const value = item as Record<string, unknown>;

  return (
    typeof value.variantId === "string" &&
    value.variantId.length > 0 &&
    typeof value.productId === "string" &&
    value.productId.length > 0 &&
    typeof value.name === "string" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    typeof value.image === "string" &&
    typeof value.size === "number" &&
    Number.isFinite(value.size) &&
    typeof value.color === "string" &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    typeof value.stockQuantity === "number" &&
    Number.isInteger(value.stockQuantity) &&
    value.stockQuantity >= 0
  );
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved cart.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("solea-cart");

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setItems(
            parsedCart
              .filter(isValidCartItem)
              .map((item) => ({
                ...item,
                quantity: Math.min(
                  item.quantity,
                  item.stockQuantity
                ),
              }))
              .filter((item) => item.quantity > 0)
          );
        }
      }
    } catch (error) {
      console.error("Unable to load saved cart:", error);
      localStorage.removeItem("solea-cart");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes after initial loading.
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "solea-cart",
      JSON.stringify(items)
    );
  }, [items, isLoaded]);

  // Add an item or increase its quantity.
  const addToCart = (newItem: CartItem) => {
    if (!isValidCartItem(newItem)) return;

    if (newItem.stockQuantity < 1) return;

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.variantId === newItem.variantId
      );

      if (existingItem) {
        return currentItems.map((item) => {
          if (item.variantId !== newItem.variantId) {
            return item;
          }

          return {
            ...item,
            quantity: Math.min(
              item.quantity + newItem.quantity,
              newItem.stockQuantity
            ),
            stockQuantity: newItem.stockQuantity,
          };
        });
      }

      return [
        ...currentItems,
        {
          ...newItem,
          quantity: Math.min(
            newItem.quantity,
            newItem.stockQuantity
          ),
        },
      ];
    });
  };

  // Update quantity using the variant UUID.
  const updateQuantity = (
    variantId: string,
    quantity: number
  ) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.variantId === variantId
          ? {
              ...item,
              quantity: Math.min(
                quantity,
                item.stockQuantity
              ),
            }
          : item
      )
    );
  };

  // Remove a specific variant.
  const removeFromCart = (variantId: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.variantId !== variantId
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  return context;
}