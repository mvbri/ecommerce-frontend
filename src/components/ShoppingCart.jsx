import "../components/css/ShoppingCart.css";
import CartItem from "./cartItem";
import { useCart } from "../hooks/useCart";
import StandardSection from "./StandardSection";
import { Field, Label } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState, useEffect } from "react";
import { axiosInstance } from "../services/axios.config";
import Dropzone from "./Dropzone";

const ShoppingCart = () => {
  const { cart, createOrder } =
    useCart();
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);  
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [dataPayment, setDataPayment] = useState("");
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
 

  useEffect(() => { getData() }, [])

  const getData = async () => {
    try {
      const data = await axiosInstance.get('/api/checkout');
      setAddresses(data.data.addresses);
      setPayments(data.data.payments);
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <StandardSection>
      {cart?.detail?.length === 0 ? (
        <div className="p-3 max-w-[1400px] m-auto">
          <article className="box flex flex-col">
            <p>No hay productos en el carrito</p>
          </article>
        </div>
      ) : (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Contact sales</h2>
            <p className="mt-2 text-lg/8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
          </div>
          <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {addresses.length > 0 ? (
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm/6 font-semibold text-gray-900">
                    Dirección
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      value={address}
                      autoComplete="address"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option disabled >Seleccione dirección </option>

                      {addresses.map((address) => (
                        <option key={address._id} value={address._id}>{address.address}</option>
                      ))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>
              ) : (<div> colocar aqui el formulario de direcciones </div>)}

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm/6 font-semibold text-gray-900">
                  Metodo de pago
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    value={payment}
                    onChange={() => getdataPayment(payment)}
                    autoComplete="address"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option  >Seleccione metodo de pago </option>

                    {payments.map((payment) => (
                      <option key={payment._id} value={payment._id}>{payment.name}</option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                  {dataPayment ? (
                    <div>
                      <p>Datos de pago</p>
                      <p>Banco: {dataPayment.bank}</p>
                    </div>
                  ) : (
                    <div></div>

                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                  Comprobante de pago (capture)
                </label>
                <div className="mt-2.5">
                  <Dropzone
                  required
                    maxfiles={1}
                    files={file}
                    setFiles={setFile}
                    className="p-16 mt-10 cursor-pointer border border-dashed border-2 md:w-4/5 m-auto border-neutral-500 text-center mb-3"
                  />
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

            </div>
            <div className="mt-10">
              <button
                type="button"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Proceder al pago
              </button>
            </div>

          </div>


        </div>
      )
      }
    </StandardSection >
  );
};

export default ShoppingCart;
