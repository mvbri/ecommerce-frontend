"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "../hooks/useCart";
import { API_URL } from "../auth/constants";
import NumberInput from "./NumberInput";
import CartItem from "./cartItem";
import { Link } from "react-router-dom";

export default function SidebarShoppingCart({ open, setOpen }) {
  const { cart, delFromCart, updateQuantityCart } = useCart();
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-[9999]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Carrito
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart?.detail?.length > 0 ? (
                          cart?.detail.map((item, index) => (
                            <CartItem
                              key={index}
                              product={item.product}
                              quantity={item.quantity}
                              updateQuantityCart={updateQuantityCart}
                              delFromCart={delFromCart}
                            />
                          ))
                        ) : (
                          <p>No se han agregado productos al carrito.</p>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total sin I.V.A</p>
                    <p>{cart?.total_products.toFixed(2)} Bs</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-500 mb-1">
                    <p>I.V.A</p>
                    <p>
                      {(cart?.total_iva - cart?.total_products).toFixed(2)} Bs
                    </p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-1">
                    <p>Total con I.V.A</p>
                    <p>{cart?.total_iva.toFixed(2)} Bs</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-8">
                    <p>Delivery</p>
                    <p>{cart?.total_delivery.toFixed(2)} Bs</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>TOTAL</p>
                    <p>{cart?.total.toFixed(2)} Bs</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Impuestos y envíos se calculan al proceder al pago.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/compra"
                      className="flex m-auto items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                      Proceder al pago
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continuar Comprando
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
