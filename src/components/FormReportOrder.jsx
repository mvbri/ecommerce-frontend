import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";
import { useEffect, useState } from "react";
import Dropzone from "./Dropzone";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../auth/constants";

const validationSchema = Yup.object().shape({
  startDate: Yup.date().required("El campo es obligatorio"),
  endDate: Yup.date().required("El campo es obligatorio"),
});

const FormCreateCategory = () => {
  useEffect(() => {
    getValues();
  }, []);

  const [generatePdf, setGeneratePdf] = useState(false);

  const [orders, setOrders] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [delivery, setDelivery] = useState([]);

  const [payments, setPayments] = useState([]);

  const statuses = [
    "Pago rechazado",
    "Pago aceptado",
    "Enviado",
    "En camino",
    "Recibido por el cliente",
    "En verificación de pago",
  ];

  const [initialValues, setInitialValues] = useState({
    startDate: "",
    endDate: "",
    payment: "",
    customer: "",
    delivery: "",
    status: "",
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axiosInstance.post("/api/admin/report", values);

      setOrders(res.data.orders);
      setGeneratePdf(true);
      setInitialValues(values);
    } catch (err) {
      console.log(err);
    }
  };

  const openPdf = () => {
    window.open(
      `${API_URL}/admin/order/report/${initialValues.startDate}/${initialValues.endDate}`
    );
  };

  const getValues = async () => {
    try {
      const res = await axiosInstance.get(`/api/admin/report`);

      if (res.status === 200) {
        const data = res.data;

        setCustomers(data.customers);
        setDelivery(data.delivery);
        setPayments(data.payments);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {generatePdf && orders.length < 1 && (
        <div className="text-center mb-3 -mt-2 w-full p-2 bg-red-500 text-white">
          {" "}
          No hay resultados en el reporte{" "}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="flex flex-col pt-8 p-4 md:px-8 w-full border border-gray-700 rounded-md m-auto">
            <label className="mb-2 text-base" htmlFor="startDate">
              Fecha de Inicio
            </label>
            <Field
              className="mb-4 text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              id="startDate"
              type="date"
              placeholder="Fecha de Inicio"
              name="startDate"
            />
            {errors.startDate && touched.startDate && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500 text-white"
                name="startDate"
                component="div"
              ></ErrorMessage>
            )}

            <label className="mb-2 text-base" htmlFor="endDate">
              Fecha de Fin
            </label>
            <Field
              className="mb-4 text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              id="endDate"
              type="date"
              placeholder="Fecha de Fin"
              name="endDate"
            />
            {errors.endDate && touched.endDate && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500 text-white"
                name="startDate"
                component="div"
              ></ErrorMessage>
            )}

            <label
              className="mb-3 text-base inline-block mb-1"
              htmlFor="status"
            >
              Estado
            </label>
            <Field
              id="status"
              as="select"
              name="status"
              className="col-start-1 cursor-pointer row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Seleccione Estado</option>

              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Field>

            <label
              className="mb-3 text-base inline-block mb-1"
              htmlFor="delivery"
            >
              Delivery
            </label>
            <Field
              id="delivery"
              as="select"
              name="delivery"
              className="col-start-1 cursor-pointer row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Seleccione Delivery</option>

              {delivery &&
                delivery.length > 0 &&
                delivery.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} - {item.email} - {item.phone}
                  </option>
                ))}
            </Field>

            <label
              className="mb-3 text-base inline-block mb-1"
              htmlFor="customer"
            >
              Cliente
            </label>
            <Field
              id="customer"
              as="select"
              name="customer"
              className="col-start-1 cursor-pointer row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Seleccione Cliente</option>

              {customers &&
                customers.length > 0 &&
                customers.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} - {item.email} - {item.phone}
                  </option>
                ))}
            </Field>

            <label
              className="mb-3 text-base inline-block mb-1"
              htmlFor="payment"
            >
              Metodo de Pago
            </label>
            <Field
              id="payment"
              as="select"
              name="payment"
              className="col-start-1 cursor-pointer row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Seleccione Metodo de Pago</option>

              {payments &&
                payments.length > 0 &&
                payments.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.type} - {item.bank} - {item.number} - {item.document}
                  </option>
                ))}
            </Field>

            <button
              className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm md:text-base rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700 my-8"
              type="submit"
            >
              Generar Reporte
            </button>
          </Form>
        )}
      </Formik>

      {generatePdf && orders.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => openPdf()}
            className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm md:text-base rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700 my-8"
            type="button"
          >
            Generar Pdf
          </button>

          <table className="table-auto w-full table-auto border-collapse text-sm p-2">
            <thead>
              <tr>
                <th>Fecha de Pago</th>
                <th>Tipo de pago</th>
                <th>Referencia</th>
                <th>Banco receptor</th>
                <th>Número receptor</th>
                <th>Total pagado</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Delivery</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {orders.map((order, i) => (
                <tr key={i}>
                  <td>{order.date}</td>
                  <td>{order.type}</td>
                  <td>{order.reference}</td>
                  <td>{order.bank}</td>
                  <td>{order.number}</td>
                  <td>{order.total}</td>
                  <td>{order.customer}</td>
                  <td>{order.status}</td>
                  <td>{order.delivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FormCreateCategory;
