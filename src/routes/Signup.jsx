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
    lastName: "",
    email: "",
    password: "",
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
    lastName: Yup.string()
      .min(3, "Descripción demasiado corta")
      .max(10, "Description demasiado larga")
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/,
        "El apellido solo debe contener letras, sin espacios, números ni caracteres especiales"
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
      <div className="grid md:grid-cols-2">
        <div className="graphic hidden md:block">
          <img className="h-full object-cover" src={ImgBanner} />
        </div>
        <div>
          <div className=" w-80 md:w-96 m-auto">
            <h1 className="mb-4 md:mb-20 text-2xl md:text-4xl text-center md:text-left text-secondary">
              Registro
            </h1>

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
                <Form className="flex flex-col items-center p-6 md:p-4 md:px-8 w-80 md:w-96 m-auto mb-3 border border-secondary rounded-md">
                  <div className="w-full flex flex-col mb-4">
                    <label
                      className="mb-3 text-lg inline-block mb-1 text-secondary text-base md:text-xl
"
                      htmlFor="name"
                    >
                      Nombre
                    </label>
                    <Field
                      className="p-2 rounded-lg border-b border-secondary-accent"
                      id="name"
                      type="text"
                      placeholder="Nombre"
                      name="name"
                    />
                    {errors.name && touched.name && (
                      <ErrorMessage
                        className=" p-2 bg-tertiary text-red-800 text-secondary text-base"
                        name="name"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>
                  <div className="w-full flex flex-col mb-4">
                    <label
                      className="mb-2 text-lg mb-1 text-secondary text-secondary text-base md:text-xl"
                      htmlFor="lastName"
                    >
                      Apellido
                    </label>
                    <Field
                      className="p-2 rounded-lg border-b border-secondary-accent"
                      id="lastName"
                      type="text"
                      placeholder="Apellido"
                      name="lastName"
                    />
                    {errors.lastName && touched.lastName && (
                      <ErrorMessage
                        className=" p-2 bg-tertiary text-red-800 text-secondary text-base"
                        name="lastName"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>
                  <div className="w-full flex flex-col mb-4">
                    <label
                      className="mb-2 text-lg mb-1 text-secondary text-secondary text-base md:text-xl"
                      htmlFor="email"
                    >
                      Correo
                    </label>
                    <Field
                      className="p-2 rounded-lg border-b border-secondary-accent"
                      id="email"
                      type="email"
                      placeholder="email"
                      name="email"
                    />
                    {errors.email && touched.email && (
                      <ErrorMessage
                        className=" p-2 bg-tertiary text-red-800 text-secondary text-base"
                        name="email"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>
                  <div className="w-full flex flex-col mb-8">
                    <label
                      className="mb-2 text-lg mb-1 text-secondary text-base md:text-xl"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <Field
                      className="p-2 rounded-lg border-b border-secondary-accent"
                      id="password"
                      type="password"
                      placeholder="password"
                      name="password"
                    />
                    {errors.password && touched.password && (
                      <ErrorMessage
                        className="p-2 bg-tertiary text-red-800 text-base"
                        name="password"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>

                  <button
                    className="w-fit mt-3 m-auto bg-secondary text-white w-fit py-2 px-4 rounded-md
 hover:bg-secondary-accent font-semibold"
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
