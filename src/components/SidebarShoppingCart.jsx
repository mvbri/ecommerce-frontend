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

export default function SidebarShoppingCart({ open, setOpen }) {
  const { cart, delFromCart } = useCart();
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
                          cart?.detail.map((item, i) => (
                            <li key={i} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={item.product.name}
                                  src={`${API_URL}/public/images/products/${item.product.images[0].url}`}
                                  className="size-full object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={item.product.slug}>
                                        {item.product.name}
                                      </a>
                                    </h3>
                                    <div className="text-sm">
                                      <p className="ml-4">
                                        Precio sin I.V.A {item.product.price}$
                                      </p>
                                      <p className="ml-4">
                                        Precio con I.V.A {item.product.priceIVA}
                                        $
                                      </p>
                                      <p className="ml-4">
                                        {item.product.priceIVA} Bs x
                                        {item.quantity} ={" "}
                                        {item.product.priceIVA * item.quantity}{" "}
                                        Bs
                                      </p>
                                    </div>
                                  </div>
                                  <p className="ml-1 text-base font-medium text-gray-500">
                                    {item.product.description}
                                  </p>
                                  {item.product.category.map((cat, i) => {
                                    return (
                                      <span
                                        className="ml-1 text-base font-medium text-gray-500"
                                        key={i}
                                      >
                                        {cat.name}
                                      </span>
                                    );
                                  })}
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Cantidad: {item.quantity}
                                  </p>

                                  <div className="flex">
                                    <button
                                      onClick={() =>
                                        delFromCart(item.product._id, true)
                                      }
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Eliminar
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
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
                      IVA :{" "}
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
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                      Proceder al pago
                    </a>
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
