import { useState } from "react";
import { API_URL } from "../auth/constants";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function FormPasswordChange() {
  const [errorResponse, setErrorResponse] = useState("");

  const initialValues = {
    password: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
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
          <div className="m-auto">
            {!!errorResponse && (
              <div className="bg-red-500 w-full text-center p-1 mb-2">
                {errorResponse}
              </div>
            )}
             <div className="w-full flex flex-col mb-4">
                    <h3 className="text-gray-800 text-2xl">
                      Cambio de Contraseña
                    </h3>
                  </div>
                   <div className="h-6 border-b border-slate-200 mt-1"></div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                handleSubmit(values, setSubmitting);
              }}
            >
              {({ values, isSubmitting, errors, touched }) => (
                <Form className="flex flex-col items-center md:items-start mt-4 m-auto mb-3 p-6 md:p-4 md:px-8">
                  <div className="w-64 flex flex-col mb-8">
                    <label className="mb-2 text-base mb-1" htmlFor="password">
                      Ingrese su contraseña
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

                  <button
                    className="mb-4 w-64 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
                    type="submit"
                  >
                    Enviar
                  </button>
                  {isSubmitting ? (
                    <p className="mb-3 text-center">Cargando...</p>
                  ) : null}
                </Form>
              )}
            </Formik>
          </div>
        </div>
  );
}

export default FormPasswordChange;
