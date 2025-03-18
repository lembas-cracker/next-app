"use client";

import { createContext, useState } from "react";
import { Product } from "../components/ProductCard";

type CartContextType = {
  cart: Product[];
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
};

const initialCartContext: CartContextType = {
  cart: [],
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
};

export const CartContext = createContext<CartContextType>(initialCartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addToCart = (product: Product) => {
    setCart((prevItems) => [...prevItems, product]);
    setTotalPrice((prevTotal) => prevTotal + product.price);
  };

  const removeFromCart = (product: Product) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== product.id));
    setTotalPrice((prevTotal) => prevTotal - product.price);
  };

  return (
    <CartContext.Provider value={{ cart, totalPrice, addToCart, removeFromCart }}>{children}</CartContext.Provider>
  );
}
