import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";
import { useEffect, useState } from "react";
import Dropzone from "./Dropzone";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../auth/constants";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Nombre demasiado corto")
    .max(20, "Nombre demasiado largo")
    .required("El campo es obligatorio"),
  description: Yup.string()
    .min(10, "Descripción demasiado corta")
    .max(150, "Description demasiado larga")
    .required("El campo es obligatorio"),
});

const FormCreateCategory = () => {
  const [file, setFile] = useState([]);
  const [image, setImage] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof params.id != "undefined") getValues();
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    menu: false,
  });

  const dropImage = async (image) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/image/${image._id}`);

      if (res.status === 200) {
        setImage((prevImages) =>
          prevImages.filter((item) => {
            return item._id != image._id;
          })
        );
      } else {
        throw new Error(`[${res.status}] ERROR en la solicitud`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getValues = async () => {
    try {
      const res = await axiosInstance.get(`/api/admin/category/${params.id}`);

      if (res.status === 200) {
        const data = res.data.data;

        setImage(data.image);
        setInitialValues({
          name: data.name,
          description: data.description,
        });
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const data = new FormData();

          for (let index in values) {
            data.append(index, values[index]);
          }
          for (let key in file) {
            data.append(`image`, file[key]);
          }



          if (typeof params.id !== "undefined") {
            try {
              const res = await axiosInstance.put(
                `/api/admin/category/${params.id}`,
                data,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
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
                "/api/admin/category",
                data,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              if (res.status === 201) {
                navigate(`/admin/categoria/${res.data.data._id}/editar`);
              } else {
                throw Error(`[${res.status}] error en la solicitud`);
              }
            } catch (err) {
              console.log(err);
            } finally {
              setSubmitting(false);
            }
          }
        }}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="flex flex-col pt-8 p-4 md:px-8 w-full border border-gray-700 rounded-md m-auto">
            <label className="mb-3 text-base" htmlFor="name">
              Nombre
            </label>
            <Field
              className="mb-4 text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              id="name"
              type="text"
              placeholder="Nombre"
              name="name"
            />
            {errors.name && touched.name && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500 text-white"
                name="name"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-base" htmlFor="description">
              Description
            </label>
            <Field
              className="mb-4 text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              id="description"
              type="text"
              placeholder="Description"
              name="description"
            />
            {errors.description && touched.description && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500 text-white"
                name="description"
                component="div"
              ></ErrorMessage>
            )}

            <label className="mb-2 text-base" htmlFor="image">
              Imagen
            </label>
            <Dropzone
              files={file}
              setFiles={setFile}
              maxfiles={true}
              className="p-16 mt-10 cursor-pointer border border-dashed border-2 md:w-4/5 m-auto border-neutral-500 text-center mb-3"
            />
            {image.length >= 1 ? (
              <>
                <label className="mb-2 text-base" htmlFor="image">
                  Imagen Guardada
                </label>
                <ul className="flex">
                  {
                    <li className="p-4">
                      <div className="relative size-24">
                        <img
                          className="size-6 mr-3 object-cover"
                          alt="Imagen de WhatsApp 2025-03-20 a las 15.15.09_d5242c1d.jpg"
                          src={`${API_URL}/public/images/products/${image.url}`}
                        ></img>
                        <button
                          type="button"
                          className="bg-transparent absolute top-0 right-0"
                          onClick={() => dropImage(image)}
                        >
                          <span className="text-blue-500"> X</span>
                        </button>
                      </div>
                    </li>
                  }
                </ul>
              </>
            ) : null}
            {errors.image && touched.image && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500 text-white"
                name="image"
                component="div"
              ></ErrorMessage>
            )}

            <label className="mb-3 text-base" htmlFor="status">
              Mostrar en el menu

              <Field
                className="mb-4 text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                id="menu"
                type="checkbox"
                name="menu"
              />

            </label>

            <button
              className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm md:text-base rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700 my-8"
              type="submit"
            >
              Cargar nueva categoria
            </button>
            {isSubmitting ? (
              <p className="mb-3 text-center">Enviando nuevo producto</p>
            ) : null}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormCreateCategory;
