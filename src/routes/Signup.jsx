import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImgBanner from "../img/imagen-banner.avif";

function Signup() {
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  if (auth.isAuthenticated) return <Navigate to="/dashboard" />;

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nombre demasiado corto")
      .max(15, "Nombre demasiado largo")
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
        "El nombre solo debe contener letras y espacios, no números ni caracteres especiales"
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
    phone: Yup.string()
      .matches(/[0-9]/, "El campo solo puede contener números")
      .max(11, "El campo debe de tener máximo 11 números.")
      .required("El campo es obligatorio"),
    question: Yup.string()
      .matches(
        /^[\DáéíóúÁÉÍÓÚñÑ]+(?: [\DáéíóúÁÉÍÓÚñÑ]+)*$/,
        "La pregunta solo debe contener letras y espacios, no números"
      )
      .required("El campo es obligatorio"),
    answer: Yup.string()
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
        "La pregunta solo debe contener letras y espacios, no números ni caracteres especiales"
      )
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

      goTo("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DefaultLayout>
      <div className="grid md:grid-cols-2 pt-[4rem] gap-[2rem] md:gap-[3rem] max-w-[1400px] m-auto p-8">
        <div className="graphic hidden md:block rounded-md">
          <img className="h-full object-cover rounded-md" src={ImgBanner} />
        </div>
        <div>
          <div className="m-auto">
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
                <Form className="flex flex-col items-center p-6 md:p-4 md:px-8 m-auto mb-3 border border-gray-700 rounded-md">
                  <div className="w-full flex flex-col mb-4">
                    <h1 className="mb-4 md:mb-8 text-gray-800 text-2xl md:text-3xl text-center mt-8">
                      Registro
                    </h1>
                    <label
                      className="mb-3 text-base inline-block mb-1"
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
                      placeholder="user@example.com"
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
                    <label className="mb-2 text-base mb-1" htmlFor="password">
                      Contraseña
                    </label>
                    <Field
                      className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      id="password"
                      type="password"
                      placeholder="Contraseña"
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
                  <div className="w-full flex flex-col mb-4">
                    <label className="mb-2 text-base mb-1" htmlFor="phone">
                      Número de teléfono
                    </label>

                    <div className="relative">
                      <div className="absolute top-2 left-0 flex items-center pl-3">
                        <span
                          id="dropdownButton"
                          className="h-full text-sm flex items-center bg-transparent text-slate-700 focus:outline-none"
                        >
                          <span id="dropdownSpan">+58</span>
                        </span>
                        <div className="h-6 border-l border-slate-200 ml-2"></div>
                      </div>
                      <Field
                        className="text-sm pl-14 sm:text-base placeholder-gray-500 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        id="phone"
                        type="tel"
                        placeholder="324-456-2323"
                        name="phone"
                      />
                    </div>

                    {errors.phone && touched.phone && (
                      <ErrorMessage
                        className="p-2 bg-tertiary text-white text-base"
                        name="phone"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>
                  <div className="w-full flex flex-col mb-4">
                    <label className="mb-2 text-base mb-1" htmlFor="question">
                      Pregunta de seguridad
                    </label>
                    <Field
                      className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      id="question"
                      type="question"
                      placeholder="Ej: ¿Nombre de tu mascota?"
                      name="question"
                    />
                    {errors.question && touched.question && (
                      <ErrorMessage
                        className=" p-2 bg-tertiary text-white"
                        name="question"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>
                  <div className="w-full flex flex-col mb-4">
                    <label className="mb-2 text-base mb-1" htmlFor="answer">
                      Respuesta
                    </label>
                    <Field
                      className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      id="answer"
                      type="answer"
                      placeholder="Ej: Neko"
                      name="answer"
                    />
                    {errors.answer && touched.answer && (
                      <ErrorMessage
                        className=" p-2 bg-tertiary text-white"
                        name="answer"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>

                  <button
                    className="mb-4 w-full inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
                    type="submit"
                  >
                    Registrarse
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
    </DefaultLayout>
  );
}

export default Signup;
