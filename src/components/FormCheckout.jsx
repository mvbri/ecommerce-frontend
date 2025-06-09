import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Dropzone from "./Dropzone";

const FormCheckout = () => {
  const { cart, createOrder, setOpen } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [file, setFile] = useState("");
  const [payment, setPayment] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false), getData();
  }, []);

  const getData = async () => {
    try {
      const data = await axiosInstance.get("/api/checkout");
      setAddresses(data.data.addresses);
      setPayments(data.data.payments);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = (_id) => {
    if (_id !== "") {
      setPayment(payments.find((element) => element._id === _id));
    } else setPayment({});
  };

  const [initialValues] = useState({
    address: "",
    payment: "",
    date: "",
    reference: "",
  });

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("El campo es obligatorio"),
    payment: Yup.string().required("El campo es obligatorio"),
    date: Yup.string().required("El campo es obligatorio"),
    reference: Yup.string().required("El campo es obligatorio"),
  });

  const handleSubmit = async (values, setSubmitting) => {
    const data = new FormData();

    for (let index in values) {
      data.append(index, values[index]);
    }

    data.append(`_id`, cart._id);

    for (let key in file) {
      data.append(`image`, file[key]);
    }

    try {
      const res = await axiosInstance.post(`/api/orders`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        const newdata = res.data.cart;

        createOrder(newdata);

        navigate(`/compras/${res.data.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <div className="m-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            {({ values, isSubmitting, errors, touched, setFieldValue }) => (
              <Form className="flex flex-col items-center p-6 md:p-4 md:px-8  m-auto mb-3  rounded-md">
                <div className="flex w-full gap-2 mb-4 pt-4">
                  <div className="flex flex-col flex-wrap gap-4 md:gap-8 w-full justify-center items-center">
                    <div className="flex flex-col gap-3">
                      <div className="md:min-w-[30rem] flex flex-col mb-1">
                        {addresses.length > 0 ? (
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="address"
                              className="block text-sm/6 font-semibold text-gray-900"
                            >
                              Dirección
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                              <Field
                                id="address"
                                as="select"
                                name="address"
                                className="col-start-1 cursor-pointer row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                              >
                                <option value="">Seleccione dirección</option>

                                {addresses.map((address) => (
                                  <option key={address._id} value={address._id}>
                                    {address.address}
                                  </option>
                                ))}
                              </Field>
                              {errors.address && touched.address && (
                                <ErrorMessage
                                  className="p-2 bg-tertiary text-white text-base"
                                  name="address"
                                  component="div"
                                ></ErrorMessage>
                              )}
                            </div>
                          </div>
                        ) : (
                          <Link to="/direcciones/crear">Crear dirección</Link>
                        )}
                      </div>
                      <div className="md:min-w-[30rem] flex flex-col mb-1">
                        <label
                          htmlFor="address"
                          className="block text-sm/6 font-semibold text-gray-900"
                        >
                          Método de pago
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                          <Field
                            id="payment"
                            as="select"
                            name="payment"
                            className="col-start-1 cursor-pointer row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              // Llama a tu función personalizada con el valor seleccionado
                              handlePayment(selectedValue);
                              // Llama a setFieldValue para actualizar el estado de Formik
                              setFieldValue("payment", selectedValue);
                            }}
                          >
                            <option value="">Seleccione método de pago</option>
                            {payments.map((payment) => (
                              <option key={payment._id} value={payment._id}>
                                {payment.type} - {payment.bank} - {payment.type}
                              </option>
                            ))}
                          </Field>
                          {errors.payment && touched.payment && (
                            <ErrorMessage
                              className="p-2 bg-tertiary text-white text-base"
                              name="payment"
                              component="div"
                            />
                          )}
                        </div>
                      </div>
                      {payment.bank ? (
                        <div>
                          <p>Datos de pago</p>
                          <p>Banco: {payment.bank}</p>
                          <p>Documento: {payment.document}</p>
                          <p>Numero: {payment.number}</p>
                          <p>Tipo: {payment.type}</p>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="flex">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="message"
                          className="block text-sm/6 font-semibold text-gray-900"
                        >
                          Comprobante de pago (capture)
                        </label>
                        <div className="mt-2.5">
                          <Dropzone
                            required
                            maxfiles={true}
                            files={file}
                            setFiles={setFile}
                            className="p-16 mt-10 cursor-pointer border border-dashed border-2 md:w-4/5 m-auto border-neutral-500 text-center mb-3"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="md:min-w-[30rem] flex flex-col mb-1">
                      <label
                        htmlFor="paymentDate"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        Ingrese fecha de pago
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <Field
                          id="date"
                          type="date"
                          name="date"
                          className="col-start-1 cursor-pointer row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        ></Field>
                        {errors.date && touched.date && (
                          <ErrorMessage
                            className="p-2 bg-tertiary text-white text-base"
                            name="date"
                            component="div"
                          ></ErrorMessage>
                        )}
                      </div>
                    </div>
                    <div className="md:min-w-[30rem] flex flex-col mb-1">
                      <label
                        htmlFor="reference"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        Ingrese número de referecnia
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <Field
                          id="reference"
                          type="text"
                          name="reference"
                          className="col-start-1 cursor-pointer row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        ></Field>
                        {errors.reference && touched.reference && (
                          <ErrorMessage
                            className="p-2 bg-tertiary text-white text-base"
                            name="reference"
                            component="div"
                          ></ErrorMessage>
                        )}
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
                          {(cart?.total_iva - cart?.total_products).toFixed(2)}{" "}
                          Bs
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
                        disabled={!addresses.length}
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Proceder al pago
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FormCheckout;
