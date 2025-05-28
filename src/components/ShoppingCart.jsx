import "../components/css/ShoppingCart.css";
import CartItem from "./cartItem";
import FormUserAddresses from "./FormUserAddresses";
import { useCart } from "../hooks/useCart";
import StandardSection from "./StandardSection";
import { Field, Label } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios.config";
import Dropzone from "./Dropzone";
import FormCheckout from "./FormCheckout";

const ShoppingCart = () => {
  const { cart} =
    useCart();

  return (
    <StandardSection>
      
      {cart?.detail?.length === 0 ? (
        <div className="p-3 max-w-[1400px] m-auto">
          <article className="box flex flex-col">
            <p>No hay productos en el carrito</p>
          </article>
        </div>
      ) : (
        
        <FormCheckout />
      )
      }
    </StandardSection >
  );
};

export default ShoppingCart;
