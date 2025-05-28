import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
  const { setOpen,open,cart, addToCart, clearCart, delFromCart , updateQuantityCart, createOrder} =
    useContext(CartContext);


  if (cart === undefined) {
    throw new Error("Probablemente no esta en el rango de un provider");
  }

  return { setOpen, cart, open, addToCart, clearCart, delFromCart, updateQuantityCart, createOrder };
};
