import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router";
import { axiosInstance } from "../services/axios.config";

const FormCreateDelivery = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof params.id != "undefined") getValues();
  }, []);

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const getValues = async () => {
    try {
      const res = await axiosInstance.get(`/api/admin/products/${params.id}`);

      if (res.status === 200) {
        const data = res.data.data;
        setInitialValues({
          name: data.name,
          email: data.email,
          number: data.number,
          password: data.password,
        });
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nombre demasiado corto")
      .max(15, "Nombre demasiado largo")
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/,
        "El nombre solo debe contener letras, no números ni caracteres especiales"
      )
      .required("El campo es obligatorio"),
    email: Yup.string()
      .email("Formato Invalido de correo")
      .required("El campo es obligatorio"),
    password: Yup.string()
      .min(6, "Debe tener al menos 6 caracteres")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Debe contener al menos un caracter especial"
      )
      .matches(/\d/, "Debe contener al menos un numero")
      .required("El campo es obligatorio"),
    number: Yup.number()
      .max(6, "Debe tener máximo 6 caracteres")
      .required("El campo es obligatorio"),
  });

  async function handleSubmit(values, setSubmitting) {
    if (typeof params.id != "undefined") {
      try {
        const res = await axiosInstance.put(
          `/api/admin/users/delivery/${params.id}`,
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json",
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
    } else {
      try {
        const res = await axiosInstance.post(
          "/api/admin/users/delivery",
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 201) {
          navigate(`/admin/product/${res.data.data._id}/edit`);
        } else {
          throw Error(`[${res.status}] error en la solicitud`);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    }
  }

  return (
    <div className="grid">
      <div>
        <div className=" w-full m-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
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
                      className=" p-2 bg-tertiary text-white"
                      name="name"
                      component="div"
                    ></ErrorMessage>
                  )}
                </div>
                <div className="w-full flex flex-col mb-4">
                  <label className="mb-2 text-base mb-1" htmlFor="email">
                    Correo
                  </label>
                  <Field
                    className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    id="email"
                    type="email"
                    placeholder="email"
                    name="email"
                  />
                  {errors.email && touched.email && (
                    <ErrorMessage
                      className=" p-2 bg-tertiary text-white"
                      name="email"
                      component="div"
                    ></ErrorMessage>
                  )}
                </div>
                <div className="w-full flex flex-col mb-4">
                  <label className="mb-2 text-base mb-1" htmlFor="number">
                    Número de telefono
                  </label>
                  <Field
                    className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    id="number"
                    type="text"
                    placeholder="Número de Telefono"
                    name="number"
                  />
                  {errors.number && touched.number && (
                    <ErrorMessage
                      className=" p-2 bg-tertiary text-white"
                      name="number"
                      component="div"
                    ></ErrorMessage>
                  )}
                </div>
                <div className="w-full flex flex-col mb-8">
                  <label className="mb-2 text-base mb-1" htmlFor="password">
                    Contraseña
                  </label>
                  <Field
                    className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    id="password"
                    type="password"
                    placeholder="password"
                    name="password"
                  />
                  {errors.password && touched.password && (
                    <ErrorMessage
                      className="p-2 bg-tertiary text-white text-base"
                      name="password"
                      component="div"
                    ></ErrorMessage>
                  )}
                </div>

                <button
                  className="w-full inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm md:text-base rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
                  type="submit"
                >
                  Registrar
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

export default FormCreateDelivery;
