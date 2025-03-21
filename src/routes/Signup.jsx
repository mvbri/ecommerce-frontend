import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
        body: JSON.stringify({
          values,
        }),
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
      <h1 className="mb-20 text-center">Registro</h1>

      {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="flex flex-col items-center p-6 md:p-4 md:px-8 w-96 m-auto">
            <div className="w-full flex flex-col mb-4">
              <label className="mb-3 text-lg inline-block mb-1" htmlFor="name">
                Nombre
              </label>
              <Field
                className="p-2 rounded-lg"
                id="name"
                type="text"
                placeholder="Nombre"
                name="name"
              />
              {errors.name && touched.name && (
                <ErrorMessage
                  className=" -mt-2 p-2 bg-red-500"
                  name="name"
                  component="div"
                ></ErrorMessage>
              )}
            </div>
            <div className="w-full flex flex-col mb-4">
              <label className="mb-2 text-lg mb-1" htmlFor="lastName">
                Apellido
              </label>
              <Field
                className="p-2 rounded-lg"
                id="lastName"
                type="text"
                placeholder="Apellido"
                name="lastName"
              />
              {errors.lastName && touched.lastName && (
                <ErrorMessage
                  className="-mt-2 p-2 bg-red-500"
                  name="lastName"
                  component="div"
                ></ErrorMessage>
              )}
            </div>
            <div className="w-full flex flex-col mb-4">
              <label className="mb-2 text-lg mb-1" htmlFor="email">
                Correo
              </label>
              <Field
                className="p-2 rounded-lg"
                id="email"
                type="email"
                placeholder="email"
                name="email"
              />
              {errors.email && touched.email && (
                <ErrorMessage
                  className="-mt-2 p-2 bg-red-500"
                  name="email"
                  component="div"
                ></ErrorMessage>
              )}
            </div>
            <div className="w-full flex flex-col mb-8">
              <label className="mb-2 text-lg mb-1" htmlFor="password">
                Contraseña
              </label>
              <Field
                className="p-2 rounded-lg"
                id="password"
                type="password"
                placeholder="password"
                name="password"
              />
              {errors.password && touched.password && (
                <ErrorMessage
                  className="-mt-2 p-2 bg-red-500"
                  name="password"
                  component="div"
                ></ErrorMessage>
              )}
            </div>

            <button className="w-fit mt-3 m-auto" type="submit">
              Registrarse
            </button>
            {isSubmitting ? (
              <p className="mb-3 text-center">Cargando productos</p>
            ) : null}
          </Form>
        )}
      </Formik>
    </DefaultLayout>
  );
}

export default Signup;
