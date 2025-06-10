import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

const FormEditOrder = ({ status }) => {
  const goTo = useNavigate();

  const initialValues = {
    status: status,
  };

  const params = useParams();

  const statuses = ["Enviado", "En camino", "Recibido por el cliente"];

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("El campo es obligatorio"),
  });

  const notifySuccess = (noty, options = {}) => toast.success(noty, options);

  const notifyError = (noty, options = {}) => toast.error(noty, options);

  async function handleSubmit(values, setSubmitting) {
    try {
      const res = await axiosInstance.put(
        `/api/delivery/orders/${params.id}`,
        values
      );

      if (res.status === 200 || res.status === 201) {
        notifySuccess("¡Orden actualizada con éxito!", {
          position: "top-center",
        });

        setTimeout(() => {
          goTo("/delivery/ordenes/");
        }, 2000);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      notifyError("Ocurrió un error", {
        position: "top-center",
      });
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  }

  const checkStatus = (status) => {
    switch (initialValues.status) {
      case "Enviado":
        if (status == "Enviado") return true;
        return false;
      case "En camino":
        if (status == "Enviado") return true;
        if (status == "En camino") return true;
        return false;
      case "Recibido por el cliente":
        if (status == "Enviado") return true;
        if (status == "En camino") return true;
        if (status == "Recibido por el cliente") return true;
        return false;

      default:
        return false;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        handleSubmit(values, setSubmitting);
      }}
    >
      {({ values, isSubmitting, errors, touched }) => (
        <Form className="flex flex-col items-center py-8 p-6 md:p-8 md:px-8 m-auto mb-3 border border-gray-700 rounded-md">
          <div className="w-full flex flex-col mb-4">
            <label
              className="mb-3 text-base inline-block mb-1 
"
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
              <option disabled value="">
                Seleccione Estado
              </option>

              {statuses.map((status) => (
                <option
                  disabled={checkStatus(status)}
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </Field>
            {errors.status && touched.status && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500 text-white"
                name="status"
                component="div"
              ></ErrorMessage>
            )}
          </div>
          <button
            className="w-full inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm md:text-base rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
            type="submit"
            disabled={checkStatus("Recibido por el cliente")}
          >
            Actualizar
          </button>
          {isSubmitting ? (
            <p className="mb-3 text-center">Cargando...</p>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

export default FormEditOrder;
