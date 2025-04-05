import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";
import Dropzone from "./Dropzone";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { API_URL } from "../auth/constants";

function FormCreateProducts() {
  useEffect(() => {
    if (typeof params.id != "undefined") getValues();
    else getCategory();
  }, []);

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    category: [],
    stock: "",
    price: "",
    priceIVA: "",
  });

  const dropImage = async (image) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/image/${image._id}`);

      if (res.status === 200) {
        setImages((prevImages) =>
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
      const res = await axiosInstance.get(`/api/admin/products/${params.id}`);

      if (res.status === 200) {
        const data = res.data.data;
        const category = res.data.category;

        setCategory(category);
        setImages(data.images);
        setInitialValues({
          name: data.name,
          description: data.description,
          category: data.category,
          stock: data.stock,
          price: data.price,
          priceIVA: data.priceIVA,
        });
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategory = async () => {
    try {
      const res = await axiosInstance.get(`/api/admin/category`);

      if (res.status === 200) {
        const category = res.data.data;

        setCategory(category);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Nombre demasiado corto")
      .max(20, "Nombre demasiado largo")
      .required("El campo es obligatorio"),
    description: Yup.string()
      .min(10, "Descripción demasiado corta")
      .max(150, "Description demasiado larga")
      .required("El campo es obligatorio"),
    // files: Yup.string().required("El campo es obligatorio"),
    stock: Yup.number().required("El campo es obligatorio"),
    price: Yup.number().required("El campo es obligatorio"),
    priceIVA: Yup.number().required("El campo es obligatorio"),
    category: Yup.array().required("El campo es obligatorio"),
  });
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

          for (let key in files) {
            data.append(`images[]`, files[key]);
          }

          if (typeof params.id != "undefined") {
            try {
              const res = await axiosInstance.put(
                `/api/admin/products/${params.id}`,
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
                "/api/admin/products",
                data,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
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
        }}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="flex flex-col p-4 md:px-8 max-w-5xl m-auto">
            <label className="mb-3 text-lg" htmlFor="name">
              Nombre
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="name"
              type="text"
              placeholder="Nombre"
              name="name"
            />
            {errors.name && touched.name && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="name"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg" htmlFor="description">
              Description
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="description"
              type="text"
              placeholder="Description"
              name="description"
            />
            {errors.description && touched.description && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="description"
                component="div"
              ></ErrorMessage>
            )}

            {images.length >= 1 ? (
              <>
                <label className="mb-2 text-lg" htmlFor="image">
                  Imagen(es) Guardada(s)
                </label>
                <ul className="flex ">
                  {images.map((image) => (
                    <li key={image._id} className="p-4">
                      <div className="relative size-24">
                        <img
                          className="size-full mr-3"
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
                  ))}
                </ul>
              </>
            ) : null}

            <label className="mb-2 text-lg" htmlFor="image">
              Imagen
            </label>

            <Dropzone
              files={files}
              setFiles={setFiles}
              className="p-16 mt-10 border border-neutral-200 text-center mb-3"
            />
            {errors.image && touched.image && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="image"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg" htmlFor="category">
              Categoria
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="category"
              as="select"
              multiple
              placeholder="Category"
              name="category"
            >
              {category.map((cat) => (
                <option title={cat.description} key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Field>
            {errors.category && touched.category && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="category"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg" htmlFor="stock">
              Stock
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="stock"
              type="text"
              placeholder="Stock"
              name="stock"
            />
            {errors.stock && touched.stock && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="stock"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg" htmlFor="price">
              Precio
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="price"
              type="text"
              placeholder="Precio"
              name="price"
            />
            {errors.price && touched.price && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="price"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg" htmlFor="priceIVA">
              Precio con IVA
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="priceIVA"
              type="text"
              placeholder="Precio con IVA"
              name="priceIVA"
            />
            {errors.priceIVA && touched.priceIVA && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="priceIVA"
                component="div"
              ></ErrorMessage>
            )}

            <button
              className="w-fit bg-secondary hover:bg-secondary-accent text-white mt-3 m-auto py-2 px-3 rounded-md font-semibold"
              type="submit"
            >
              Cargar nuevo producto
            </button>
            {isSubmitting ? (
              <p className="mb-3 text-center">Enviando nuevo producto</p>
            ) : null}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormCreateProducts;
