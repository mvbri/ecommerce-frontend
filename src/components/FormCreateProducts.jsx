import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";

function FormCreateProducts() {
  const initialValues = {
    name: "",
    description: "",
    image: "",
    stock: "",
    price: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Nombre demasiado corto")
      .max(20, "Nombre demasiado largo")
      .required("El campo es obligatorio"),
    description: Yup.string()
      .min(10, "Descripción demasiado corta")
      .max(150, "Description demasiado larga")
      .required("El campo es obligatorio"),
    image: Yup.string().required("El campo es obligatorio"),
    stock: Yup.number().required("El campo es obligatorio"),
    price: Yup.number().required("El campo es obligatorio"),
    priceIVA: Yup.number().required("El campo es obligatorio"),
    category: Yup.string()
      .min(4, "Nombre demasiado corto")
      .max(20, "Nombre demasiado largo")
      .required("El campo es obligatorio"),
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { isSubmitting }) =>
          axiosInstance
            .post("/", values)
            .then((res) => {
              if (res.status === 201) {
                console.log(res);
                isSubmitting(false);
              } else {
                throw Error(`[${res.status}] error en la solicitud`);
              }
            })
            .catch((err) => console.log(err))
        }
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
            <label className="mb-2 text-lg" htmlFor="image">
              Imagen
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="image"
              type="text"
              placeholder="Imagen"
              name="image"
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
              type="text"
              placeholder="Category"
              name="category"
            />
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
              className="mb-8 p-2 w-full rounded-lg"
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

            <button className="w-fit mt-3 m-auto" type="submit">
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
