import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImgBanner from "../img/imagen-banner.avif";
import { axiosInstance } from "../services/axios.config";

function Signup() {
  const [errorResponse, setErrorResponse] = useState("");
  const [step, setStep] = useState(1);

  const auth = useAuth();
  const goTo = useNavigate();

  if (auth.isAuthenticated) return <Navigate to="/" />;

  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    question: "",
    answer: "",
  });

  const stepOneValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Formato Invalido de correo")
      .required("El campo es obligatorio"),
  });

  const stepTwoValidationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email("Formato Invalido de correo")
    //   .required("El campo es obligatorio"),
    // password: Yup.string()
    //   .min(6, "Debe tener al menos 6 caracteres")
    //   .matches(
    //     /[!@#$%^&*(),.?":{}|<>]/,
    //     "Debe contener al menos un caracter especial"
    //   )
    //   .matches(/\d/, "Debe contener al menos un numero")
    //   .required("El campo es obligatorio"),
    // password: Yup.string()
    //   .min(6, "Debe tener al menos 6 caracteres")
    //   .matches(
    //     /[!@#$%^&*(),.?":{}|<>]/,
    //     "Debe contener al menos un caracter especial"
    //   )
    //   .matches(/\d/, "Debe contener al menos un numero")
    //   .required("El campo es obligatorio"),
    answer: Yup.string()
      .required("El campo es obligatorio"),
  });

  const stepThreeValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Debe tener al menos 6 caracteres")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Debe contener al menos un caracter especial"
      )
      .matches(/\d/, "Debe contener al menos un numero")
      .required("El campo es obligatorio"),
    passwordConfirmation: Yup.string()
          .oneOf([Yup.ref("password"), null], "El campo debe de ser igual a la contraseña.")
          .required("El campo es obligatorio"),
  });

  const stepOne = async (values, setSubmitting) => {
    try {
      const res = await axiosInstance.post(
        "/api/user/reset/1",
        values,
      );

      setErrorResponse("");
      setInitialValues(res.data.data);
      setStep(2);

    } catch (err) {
      console.log(err);
      setErrorResponse(err.response.data.message);
    } finally {
      setSubmitting(false);
    }

  }

  const stepTwo = async (values, setSubmitting) => {
    try {
      const res = await axiosInstance.post(
        "/api/user/reset/2",
        values,
      );

      setErrorResponse("");
      setInitialValues(res.data.data);
      setStep(3);

    } catch (err) {
      console.log(err);
      setErrorResponse(err.response.data.message);
    } finally {
      setSubmitting(false);
    }

  }

  const stepThree = async (values, setSubmitting) => {
    try {
      const res = await axiosInstance.post(
        "/api/user/reset/3",
        values,
      );

      setErrorResponse("");
      setInitialValues(res.data.data);      
      goTo("/login")

    } catch (err) {
      console.log(err);
      setErrorResponse(err.response.data.message);
    } finally {
      setSubmitting(false);
    }

  }


  return (
    <DefaultLayout>
      <div className="grid md:grid-cols-2 pt-[4rem] gap-[6rem] max-w-[1400px] m-auto p-8">
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


            {step == 1 && (
              <Formik
                initialValues={initialValues}
                validationSchema={stepOneValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  stepOne(values, setSubmitting);
                }}
              >
                {({ values, isSubmitting, errors, touched }) => (
                  <Form className="flex flex-col items-center p-6 md:p-4 md:px-8  m-auto mb-3 border border-gray-700 rounded-md">
                    <div className="w-full flex flex-col mb-4">
                      <h1 className="mb-4 md:mb-8 text-gray-800 text-2xl md:text-3xl text-center mt-8">
                        Recuperar Acceso
                      </h1>
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
                    {isSubmitting ? (
                      <p className="mb-3 text-center">Cargando...</p>
                    ) : null}

                    <button
                      disabled={isSubmitting}
                      className="mb-4 w-full inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
                      type="submit"
                    >
                      Verificar
                    </button>

                  </Form>
                )}
              </Formik>

            )}

            {step == 2 && (
              <Formik
                initialValues={initialValues}
                validationSchema={stepTwoValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  stepTwo(values, setSubmitting);
                }}
              >
                {({ values, isSubmitting, errors, touched }) => (
                  <Form className="flex flex-col items-center p-6 md:p-4 md:px-8  m-auto mb-3 border border-gray-700 rounded-md">
                    <div className="w-full flex flex-col mb-4">
                      <h1 className="mb-4 md:mb-8 text-gray-800 text-2xl md:text-3xl text-center mt-8">
                        Recuperar Acceso
                      </h1>
                    </div>

                    <div className="w-full flex flex-col mb-4">
                      <h3 className="mb-4 md:mb-8 text-gray-800 text-2xl md:text-1xl text-center mt-8">
                        Pregunta de Seguridad : {initialValues.question}
                      </h3>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                      <label className="mb-2 text-base mb-1" htmlFor="answer">
                        Respuesta
                      </label>
                      <Field
                        className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        id="answer"
                        type="password"
                        placeholder="Respuesta"
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
                    {isSubmitting ? (
                      <p className="mb-3 text-center">Cargando...</p>
                    ) : null}

                    <button
                      disabled={isSubmitting}
                      className="mb-4 w-full inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
                      type="submit"
                    >
                      Verificar
                    </button>

                  </Form>
                )}
              </Formik>

            )}

            {step == 3 && (
              <Formik
                initialValues={initialValues}
                validationSchema={stepThreeValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  stepThree(values, setSubmitting);
                }}
              >
                {({ values, isSubmitting, errors, touched }) => (
                  <Form className="flex flex-col items-center p-6 md:p-4 md:px-8  m-auto mb-3 border border-gray-700 rounded-md">
                    <div className="w-full flex flex-col mb-4">
                      <h1 className="mb-4 md:mb-8 text-gray-800 text-2xl md:text-3xl text-center mt-8">
                        Recuperar Acceso
                      </h1>
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
                      <label className="mb-2 text-base mb-1" htmlFor="passwordConfirmation">
                        Confirmar Contraseña
                      </label>
                      <Field
                        className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Confirmar Contraseña"
                        name="passwordConfirmation"
                      />
                      {errors.passwordConfirmation && touched.passwordConfirmation && (
                        <ErrorMessage
                          className="p-2 bg-tertiary text-white text-base"
                          name="passwordConfirmation"
                          component="div"
                        ></ErrorMessage>
                      )}
                    </div>
                    {isSubmitting ? (
                      <p className="mb-3 text-center">Cargando...</p>
                    ) : null}

                    <button
                      disabled={isSubmitting}
                      className="mb-4 w-full inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
                      type="submit"
                    >
                      Verificar
                    </button>

                  </Form>
                )}
              </Formik>

            )}


          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Signup;
