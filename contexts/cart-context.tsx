"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type {
  CartItem,
  Frame,
  LensType,
  LensFeature,
  Prescription,
} from "@/types";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  hasPreorderItems: boolean;
  hasOrderItems: boolean;
  addItem: (params: {
    frame: Frame;
    lensType?: LensType | null;
    lensFeature?: LensFeature | null;
    prescription?: Prescription | null;
    quantity?: number;
    selectedColor?: string | null;
    isPreorder?: boolean;
  }) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

function calculateUnitPrice(
  frame: Frame,
  lensType?: LensType | null,
  lensFeature?: LensFeature | null,
): number {
  let price = frame.basePrice || 0;
  if (lensType) price += lensType.extraPrice || 0;
  if (lensFeature) price += lensFeature.extraPrice || 0;
  return price;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as CartItem[];
          // Migration: default isPreorder to false for old items
          setItems(
            parsed.map((item) => ({
              ...item,
              isPreorder: item.isPreorder ?? false,
            })),
          );
        } catch {
          // ignore corrupt data
        }
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  const addItem = useCallback(
    ({
      frame,
      lensType = null,
      lensFeature = null,
      prescription = null,
      quantity = 1,
      selectedColor = null,
      isPreorder = false,
    }: {
      frame: Frame;
      lensType?: LensType | null;
      lensFeature?: LensFeature | null;
      prescription?: Prescription | null;
      quantity?: number;
      selectedColor?: string | null;
      isPreorder?: boolean;
    }) => {
      const unitPrice = calculateUnitPrice(frame, lensType, lensFeature);
      const newItem: CartItem = {
        cartItemId: generateId(),
        frame,
        lensType,
        lensFeature,
        prescription,
        quantity,
        selectedColor,
        unitPrice,
        isPreorder,
      };
      setItems((prev) => [...prev, newItem]);
    },
    [],
  );

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const hasPreorderItems = items.some((item) => item.isPreorder);
  const hasOrderItems = items.some((item) => !item.isPreorder);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        hasPreorderItems,
        hasOrderItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
