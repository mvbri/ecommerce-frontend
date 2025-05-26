import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router";
import { axiosInstance } from "../services/axios.config";

const FormCreateDelivery = () => {
   const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    question: "",
    answer: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof params.id != "undefined") getValues();
    
  }, []);


  const getValues = async () => {
    try {
      const res = await axiosInstance.get(`/api/admin/users/delivery/${params.id}`);

        const data = res.data.data;
        
        setInitialValues({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          question: data.question,
          answer: data.answer
        });

    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nombre demasiado corto")
      // .max(15, "Nombre demasiado largo")
      // .matches(
      //   /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/,
      //   "El nombre solo debe contener letras, no números ni caracteres especiales"
      // )
      .required("El campo es obligatorio") 
      ,
    email: Yup.string()
      .email("Formato Invalido de correo")
      .required("El campo es obligatorio"),
    password: Yup.string()
      .min(6, "Debe tener al menos 6 caracteres")
      // .matches(
      //   /[!@#$%^&*(),.?":{}|<>]/,
      //   "Debe contener al menos un caracter especial"
      // )
      // .matches(/\d/, "Debe contener al menos un numero")
      .required("El campo es obligatorio"),
    phone: Yup.string()
      .max(11, "Debe tener máximo 11 caracteres")
      .min(11, "Debe tener al menos 11 caracteres")
      .matches(/^[0-9]+$/, "Solo se admiten números")
      .required("El campo es obligatorio"),
      question: Yup.string()
      .required("El campo es obligatorio"),
      answer: Yup.string()
      .required("El campo es obligatorio")
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
                  <label className="mb-2 text-base mb-1" htmlFor="phone">
                    Número de telefono
                  </label>
                  <Field
                    className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    id="phone"
                    type="text"
                    placeholder="Número de Telefono"
                    name="phone"
                  />
                  {errors.phone && touched.phone && (
                    <ErrorMessage
                      className=" p-2 bg-tertiary text-white"
                      name="phone"
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
                <div className="w-full flex flex-col mb-8">
                  <label className="mb-2 text-base mb-1" htmlFor="question">
                    Pregunta de seguridad
                  </label>
                  <Field
                    className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    id="question"
                    type="question"
                    placeholder="ej: ¿Nombre de tu mascota?"
                    name="question"
                  />
                  {errors.question && touched.question && (
                    <ErrorMessage
                      className="p-2 bg-tertiary text-white text-base"
                      name="question"
                      component="div"
                    ></ErrorMessage>
                  )}
                </div>
                 <div className="w-full flex flex-col mb-8">
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
                      className="p-2 bg-tertiary text-white text-base"
                      name="answer"
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
