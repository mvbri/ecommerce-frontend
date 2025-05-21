import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const FormUserProfile = () => {
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();

  const initialValues = {
    name: auth.getUser()?.name,
    email: auth.getUser()?.email,
    phone: auth.getUser()?.phone,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nombre demasiado corto")
      .max(15, "Nombre demasiado largo")
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/,
        "El nombre solo debe contener letras, sin espacios, números ni caracteres especiales"
      )
      .required("El campo es obligatorio"),
    email: Yup.string()
      .email("Formato Invalido de correo")
      .required("El campo es obligatorio"),
    phone: Yup.string()
      .matches(/[0-9]/, "El campo solo puede contener números")
      .max(11, "El campo debe de tener máximo 11 números.")
      .required("El campo es obligatorio"),
  });

  async function handleSubmit(values, setSubmitting) {
    console.log(values);

    try {
      let response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.log("Something Went Wrong");
        const json = await response.json();
        setErrorResponse(json.body.error);

        return;
      }
      setErrorResponse("");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div>
        <div className="m-auto">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <h3 className="text-gray-800 text-2xl md:text-3xl">Mi Perfil</h3>

            <Link
              to="/contraseña"
              className="text-blue-400 text-sm md:text-base whitespace-nowrap font-semibold mr-2 hover:text-blue-300 transition ease"
            >
              CAMBIAR CONTRASEÑA
            </Link>
          </div>

          <div className="h-6 border-b border-slate-200 mt-2"></div>

          {!!errorResponse && (
            <div className="bg-red-500 w-full text-center p-1 mb-2">
              {errorResponse}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              handleSubmit(values, setSubmitting);
            }}
          >
            {({ values, isSubmitting, errors, touched }) => (
              <Form className="flex flex-col items-center p-6 md:p-4 md:px-8  m-auto mb-3  rounded-md">
                <div className="flex w-full gap-2 mb-4 pt-4">
                  <div className="flex flex-wrap gap-8 w-full justify-center md:justify-start items-center">
                    <div className="max-w-[20rem] flex flex-col mb-2">
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
                    <div className="max-w-[20rem] flex flex-col mb-2">
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
                    <div className="max-w-[20rem]  flex flex-col mb-4">
                      <label className="text-sm mb-1" htmlFor="email">
                        Correo
                      </label>
                      <Field
                        className="text-gray-400 text-sm sm:text-base placeholder-gray-400 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400"
                        id="email"
                        readOnly
                        type="email"
                        placeholder="email"
                        name="email"
                      />
                      {errors.email && touched.email && (
                        <ErrorMessage
                          className="p-2 bg-tertiary text-white text-base"
                          name="email"
                          component="div"
                        ></ErrorMessage>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  className="mb-4 inline-flex items-center md:self-start self-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-8 shadow-sm hover:shadow-md bg-red-500 border-red-500 text-slate-50 hover:bg-red-400 hover:border-red-400"
                  type="submit"
                >
                  ACTUALIZAR DATOS
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

export default FormUserProfile;
