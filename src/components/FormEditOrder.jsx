import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";

const FormEditOrder = () => {
  const params = useParams();
  const [details, setDetails] = useEffect;

  const [initialValues, setInitialValues] = useState({
    status: "",
  });

  useEffect(() => {
    if (typeof params.id != "undefined") getValues();
  }, []);

  const getValues = async () => {
    try {
      const res = await axiosInstance.get(
        ` /api/delivery/orders/:_id${params.id}`
      );

      if (res.status === 200) {
        const data = res.data.data;

        setInitialValues({
          status: data.status,
        });
        setDetails(data);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("El campo es obligatorio"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (typeof params.id != "undefined") {
            try {
              const res = await axiosInstance.put(
                `/api/admin/products/${params.id}`,
                JSON.stringify(values),
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              if (res.status === 201) {
                alert("actualizado");
              } else {
                throw Error(`[${res.status}] error en la solicitud`);
              }
            } catch (err) {
              console.log(err);
            } finally {
              setSubmitting(false);
            }
          }
        }}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="flex flex-col pt-8 p-4 md:px-8 w-full border m-auto">
            <label className="mb-3 text-lg" htmlFor="status">
              Estatus del Pedido
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg border-b border-secondary mb-5"
              id="status"
              type="text"
              placeholder="Nombre"
              name="name"
            />
            {errors.status && touched.status && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500 text-white"
                name="status"
                component="div"
              ></ErrorMessage>
            )}

            <button
              className="w-fit bg-secondary hover:bg-secondary-accent text-white mt-3 m-auto py-2 px-3 rounded-md font-semibold"
              type="submit"
            >
              Editar Pedido
            </button>
            {isSubmitting ? (
              <p className="mb-3 text-center">Enviando...</p>
            ) : null}
          </Form>
        )}
      </Formik>
      <article>
        <h3>Detalles del Pedido</h3>
        <div>
          <p>{details._id}</p>
          <p>{details.customer_id}</p>
          <p>{details.customer_id}</p>
          <p>{details.delivery_id}</p>
          <p>{details.cart_id}</p>
          <h4>Detalles de los Productos en el Pedido</h4>
          <p>{details.detail.product}</p>
          <p>{details.detail.quantity}</p>
          <p>{details.detail.price_total}</p>
          <p>{details.detail.price_total_iva}</p>
          <p>{details.detail.status}</p>
          <p>{details.detail.total_delivery}</p>
          <p>{details.detail.total_products}</p>
          <p>{details.detail.total_iva}</p>
          <p>{details.detail.total}</p>
        </div>
      </article>
    </div>
  );
};

export default FormEditOrder;
