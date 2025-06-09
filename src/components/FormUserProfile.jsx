import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";
import { ToastContainer, toast } from "react-toastify";

const FormUserProfile = () => {
  const auth = useAuth();

  // Define un estado para los valores iniciales
  const [initialValues, setInitialValues] = useState({
    name: "", // Asegúrate de que sean strings vacíos, no undefined
    email: "",
    phone: "",
    question: "",
    answer: "",
    password: "",
    passwordConfirmation: "",
    newPassword: "",
    answerConfirmation: "",
  });

  // Usa useEffect para actualizar los initialValues una vez que auth.getUser() tenga datos
  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      setInitialValues({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        question: user.question || "",
        answer: "", // La respuesta no debe precargarse por seguridad
        password: "",
        passwordConfirmation: "",
        newPassword: "",
        answerConfirmation: "",
      });
    }
  }, [auth]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nombre demasiado corto")
      .max(15, "Nombre demasiado largo")
      .required("El campo es obligatorio"),
    email: Yup.string()
      .email("Formato Invalido de correo")
      .required("El campo es obligatorio"),
    phone: Yup.string()
      .matches(/[0-9]/, "El campo solo puede contener números")
      .max(11, "El campo debe de tener máximo 11 números.")
      .required("El campo es obligatorio"),
    password: Yup.string().required("El campo es obligatorio"),
    newPassword: Yup.string()
      .min(6, "Debe tener al menos 6 caracteres")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Debe contener al menos un caracter especial"
      )
      .matches(/\d/, "Debe contener al menos un numero"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "El campo debe de ser igual a la nueva contraseña."
    ),
    question: Yup.string().required("El campo es obligatorio"),
    answer: Yup.string(),
    answerConfirmation: Yup.string().oneOf(
      [Yup.ref("answer"), null],
      "El campo debe de ser igual a la respuesta de seguridad."
    ),
  });

  const notifySuccess = (noty, options = {}) => toast.success(noty, options);

  const notifyError = (noty, options = {}) => toast.error(noty, options);

  const handleSubmit = async (values, setSubmitting) => {
    try {
      const res = await axiosInstance.post("/api/user/update", values);

      auth.saveUser(res.data);

      if (res.status !== 200 && res.status !== 201) throw Error(res.statusText);

      notifySuccess("¡Usuario actualizado correctamente!", {
        position: "top-center",
      });
    } catch (err) {
      notifyError(err.response.data.message, {
        position: "top-center",
      });
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div>
        <ToastContainer />
        <div className="m-auto">
          <div className="h-6 border-b border-slate-200 mt-2"></div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
            enableReinitialize={true}
          >
            {({ values, isSubmitting, errors, touched }) => (
              <Form className="flex flex-col items-center p-6 md:p-4 md:px-8  m-auto mb-3  rounded-md">
                <div className="flex w-full gap-2 mb-4 pt-4">
                  <div className="flex w-fit m-auto flex-wrap gap-8 w-full justify-center md:justify-start items-center">
                    <div className="flex gap-4 md:gap-8 items-center justify-center flex-wrap">
                      <div className="max-w-[20rem] min-w-[15rem] flex flex-col mb-2 relative">
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
                            className="p-2 absolute w-full bottom-[-2.5rem] letf-0 bg-tertiary text-white text-base"
                            name="name"
                            component="div"
                          ></ErrorMessage>
                        )}
                      </div>
                      <div className="max-w-[20rem] min-w-[15rem] flex flex-col mb-2 relative">
                        <label className="text-sm mb-1" htmlFor="phone">
                          Número de teléfono
                        </label>
                        <Field
                          className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          id="phone"
                          type="phone"
                          placeholder="Número de teléfono"
                          name="phone"
                        />
                        {errors.phone && touched.phone && (
                          <ErrorMessage
                            className="p-2 absolute w-full bottom-[-3rem] letf-0 bg-tertiary text-white text-base"
                            name="phone"
                            component="div"
                          ></ErrorMessage>
                        )}
                      </div>
                      <div className="max-w-[20rem] min-w-[15rem]  flex  flex-col mb-4 relative">
                        <label className="text-sm mb-1" htmlFor="email">
                          Correo
                        </label>
                        <Field
                          className="text-gray-400 text-sm sm:text-base placeholder-gray-400 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400"
                          id="email"
                          type="email"
                          placeholder="email"
                          name="email"
                        />
                        {errors.email && touched.email && (
                          <ErrorMessage
                            className="p-2 absolute w-full bottom-[-2.5rem] letf-0 bg-tertiary text-white text-base"
                            name="email"
                            component="div"
                          ></ErrorMessage>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4 md:gap-8 items-center justify-center flex-wrap">
                      <div className="w-64 flex flex-col mb-2 md:mb-8 relative">
                        <label
                          className="mb-2 text-base mb-1"
                          htmlFor="password"
                        >
                          Ingrese su contraseña actual
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
                            className="p-2 absolute w-full bottom-[-2.5rem] letf-0 bg-tertiary text-white text-base"
                            name="password"
                            component="div"
                          ></ErrorMessage>
                        )}
                      </div>
                      <div className="w-64 flex flex-col mb-2 md:mb-8">
                        <label
                          className="mb-2 text-base mb-1"
                          htmlFor="newPassword"
                        >
                          Nueva contraseña
                        </label>
                        <Field
                          className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          id="newPassword"
                          type="password"
                          placeholder="Nueva contraseña"
                          name="newPassword"
                        />
                      </div>
                      <div className="w-64 flex flex-col mb-2 md:mb-8 relative">
                        <label
                          className="mb-2 text-base mb-1"
                          htmlFor="passwordConfirmation"
                        >
                          Confirmar nueva contraseña
                        </label>
                        <Field
                          className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          id="passwordConfirmation"
                          type="password"
                          placeholder="Confirmar nueva contraseña"
                          name="passwordConfirmation"
                        />
                        {errors.passwordConfirmation &&
                          touched.passwordConfirmation && (
                            <ErrorMessage
                              className="p-2 absolute w-full bottom-[-3.5rem] letf-0 bg-tertiary text-white text-base"
                              name="passwordConfirmation"
                              component="div"
                            ></ErrorMessage>
                          )}
                      </div>
                    </div>

                    <div className="flex gap-4 md:gap-8 justify-center items-center flex-wrap">
                      <div className="w-64 flex flex-col mb-2 md:mb-8 relative">
                        <label
                          className="mb-2 text-base mb-1"
                          htmlFor="question"
                        >
                          Pregunta de seguridad
                        </label>
                        <Field
                          className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          id="question"
                          type="text"
                          placeholder="Pregunta de seguridad"
                          name="question"
                        />

                        {errors.question && touched.question && (
                          <ErrorMessage
                            className="p-2 absolute w-full bottom-[-2.5rem] letf-0 bg-tertiary text-white text-base"
                            name="question"
                            component="div"
                          ></ErrorMessage>
                        )}
                      </div>

                      <div className="w-64 flex flex-col mb-4 md:mb-8">
                        <label className="mb-2 text-base mb-1" htmlFor="answer">
                          Nueva respuesta de seguridad
                        </label>
                        <Field
                          className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          id="answer"
                          type="password"
                          placeholder="Nueva respuesta de seguridad"
                          name="answer"
                        />
                      </div>

                      <div className="w-64 flex flex-col mb-8 relative">
                        <label
                          className="mb-2 text-base mb-1"
                          htmlFor="answerConfirmation"
                        >
                          Confirmar respuesta de seguridad
                        </label>
                        <Field
                          className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                          id="answerConfirmation"
                          type="password"
                          placeholder="Confirmar respuesta de seguridad"
                          name="answerConfirmation"
                        />
                        {errors.answerConfirmation &&
                          touched.answerConfirmation && (
                            <ErrorMessage
                              className="p-2 absolute w-full bottom-[-2.5rem] letf-0 bg-tertiary text-white text-base"
                              name="password"
                              component="div"
                            ></ErrorMessage>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  disabled={isSubmitting}
                  className="mb-4 inline-flex items-center m-auto self-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-8 shadow-sm hover:shadow-md bg-red-500 border-red-500 text-slate-50 hover:bg-red-400 hover:border-red-400"
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
