import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";
import { useNavigate, useParams } from "react-router-dom";

const FormUserAddresses = () => {
  const [errorResponse, setErrorResponse] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof params.id != "undefined") getValues();
  }, []);

  const [initialValues, setInitialValues] = useState({
    name: "",
    address: "",
    phone: "",
    parish: "",
  });

  const parishes = [
    "Catedral",
    "Zea",
    "Orinoco",
    "José Antonio Páez",
    "Marhuanta",
    "Agua Salada",
    "Vista Hermosa",
    "La Sabanita",
    "Panapana",
  ];

  const getValues = async () => {
    try {
      const res = await axiosInstance.get(`/api/address/${params.id}`);

      if (res.status === 200) {
        const data = res.data.data;
        setInitialValues({
          name: data.name,
          address: data.address,
          phone: data.phone,
          parish: data.parish,
        });
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      setErrorResponse(err);
      console.log(err);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "El campo es demasiado corto")
      .required("El campo es obligatorio"),
    phone: Yup.string()
      .matches(/[0-9]/, "El campo solo puede contener números")
      .max(11, "El campo debe de tener máximo 11 números.")
      .required("El campo es obligatorio"),
    parish: Yup.string().required("El campo es obligatorio"),
    address: Yup.string()
      .min(2, "El campo es demasiado corto")
      .required("El campo es obligatorio"),
  });

  const handleSubmit = async (values, setSubmitting) => {
    if (typeof params.id != "undefined") {
      try {
        const res = await axiosInstance.put(
          `/api/address/${params.id}`,
          values
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
    } else {
      try {
        const res = await axiosInstance.post("/api/address", values);

        if (res.status === 201) {
          alert("Nueva dirección creada");
          navigate(`/direcciones/${res.data.data._id}/editar`);
        } else {
          throw Error(`[${res.status}] error en la solicitud`);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="m-auto">
          <div className="h-6 border-b border-slate-200 mt-2"></div>

          {!!errorResponse && (
            <div className="bg-red-500 w-full text-center p-1 mb-2">
              {errorResponse}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            {({ values, isSubmitting, errors, touched }) => (
              <Form className="flex flex-col items-center p-6 md:p-4 md:px-8  m-auto mb-3  rounded-md">
                <div className="flex w-full gap-2 mb-4 pt-4">
                  <div className="flex flex-wrap gap-4 md:gap-8 w-full justify-center items-center">
                    <div className="md:min-w-[30rem] flex flex-col mb-1">
                      <label
                        className="text-sm inline-block mb-1 
        "
                        htmlFor="name"
                      >
                        Nombre
                      </label>
                      <Field
                        className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        name="name"
                      />
                      {errors.name && touched.name && (
                        <ErrorMessage
                          className="p-2 bg-tertiary text-white text-base"
                          name="name"
                          component="div"
                        ></ErrorMessage>
                      )}
                    </div>
                    <div className="md:min-w-[30rem] flex flex-col mb-1">
                      <label className="text-sm mb-1" htmlFor="parish">
                        Parroquia
                      </label>
                      <Field
                        className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        id="parish"
                        as="select"
                        placeholder="parish"
                        name="parish"
                      >
                        <option value="">Seleccione parroquía</option>
                        {parishes.map((parish) => (
                          <option key={parish} value={parish}>
                            {parish}
                          </option>
                        ))}
                      </Field>

                      {errors.parish && touched.parish && (
                        <ErrorMessage
                          className="p-2 bg-tertiary text-white text-base"
                          name="parish"
                          component="div"
                        ></ErrorMessage>
                      )}
                    </div>
                    <div className="md:min-w-[30rem]  flex flex-col mb-1">
                      <label className="text-sm mb-1" htmlFor="address">
                        Dirección
                      </label>
                      <Field
                        className="text-gray-800 text-sm sm:text-base placeholder-gray-800 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400"
                        id="address"
                        as="textarea"
                        placeholder="address"
                        name="address"
                      />
                      {errors.address && touched.address && (
                        <ErrorMessage
                          className="p-2 bg-tertiary text-white text-base"
                          name="address"
                          component="div"
                        ></ErrorMessage>
                      )}
                    </div>
                    <div className="md:min-w-[30rem] flex flex-col mb-4">
                      <label className="text-sm mb-1" htmlFor="phone">
                        Número de teléfono
                      </label>
                      <Field
                        className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        id="phone"
                        type="phone"
                        placeholder="phone"
                        name="phone"
                      />
                      {errors.phone && touched.phone && (
                        <ErrorMessage
                          className="p-2 bg-tertiary text-white text-base"
                          name="phone"
                          component="div"
                        ></ErrorMessage>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  className="mb-4 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 md:px-8 shadow-sm hover:shadow-md bg-red-500 border-red-500 text-slate-50 hover:bg-red-400 hover:border-red-400"
                  type="submit"
                >
                  {typeof params.id != "undefined"
                    ? "ACTUALIZAR DIRECCIÓN"
                    : "REGISTRAR NUEVA DIRECCIÓN"}
                </button>
                {isSubmitting ? (
                  <p className="mb-3 text-center">Cargando...</p>
                ) : null}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FormUserAddresses;
