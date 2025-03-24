import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
  const cart = useContext(CartContext);

  if (cart === undefined) {
    throw new Error("Probablemente no esta en el rango de un provider");
  }
};
