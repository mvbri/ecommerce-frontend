import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";

// eslint-disable-next-line react/prop-types
function FormEditProduct({ data, updateItem, closeModal }) {
  const arr = data.split(",");
  const [id, name, description, image, category, stock, price, priceIVA] = arr;

  const initialValues = {
    id: id || "",
    name: name || "",
    description: description || "",
    image: image || "",
    category: category || "",
    stock: stock || "",
    price: price || "",
    priceIVA: priceIVA || "",
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
      <h2 className="text-gray-950 text-center text-2xl font-semibold pt-3">
        Editar Producto
      </h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          axiosInstance
            .put(`/stockProducts/${id}`, values)
            .then((res) => {
              if (res.status === 200) {
                updateItem(res.data);
                closeModal();
              } else {
                throw Error(`[${res.status}] error en la solicitud`);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => setSubmitting(false))
        }
      >
        {({ values, isSubmitting, errors, touched, handleChange }) => (
          <Form className="flex flex-col p-4 md:px-8 max-w-5xl m-auto">
            <label className="mb-3 text-lg text-gray-950" htmlFor="name">
              id
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="name"
              type="text"
              placeholder="Nombre"
              name="id"
              readOnly
              disabled
            />
            <label className="mb-3 text-lg text-gray-950" htmlFor="name">
              Nombre
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="name"
              type="text"
              placeholder="Nombre"
              name="name"
              onChange={handleChange}
            />
            {errors.name && touched.name && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="name"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg text-gray-950" htmlFor="description">
              Description
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="description"
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleChange}
            />
            {errors.description && touched.description && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="description"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg text-gray-950" htmlFor="image">
              Imagen
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="image"
              type="text"
              placeholder="Imagen"
              name="image"
              onChange={handleChange}
            />
            {errors.image && touched.image && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="image"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg text-gray-950" htmlFor="category">
              Categoria
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg "
              id="category"
              type="text"
              placeholder="Category"
              name="category"
              onChange={handleChange}
            />
            {errors.category && touched.category && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="category"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg text-gray-950" htmlFor="stock">
              Stock
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="stock"
              type="text"
              placeholder="Stock"
              name="stock"
              onChange={handleChange}
            />
            {errors.stock && touched.stock && (
              <ErrorMessage
                className="md:mb-3 -mt-2 w-full p-2 bg-red-500"
                name="stock"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg text-gray-950" htmlFor="price">
              Precio
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="price"
              type="text"
              placeholder="Precio"
              name="price"
              onChange={handleChange}
            />
            {errors.price && touched.price && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="price"
                component="div"
              ></ErrorMessage>
            )}
            <label className="mb-2 text-lg text-gray-950" htmlFor="priceIVA">
              Precio con IVA
            </label>
            <Field
              className="mb-3 p-2 w-full rounded-lg"
              id="priceIVA"
              type="text"
              placeholder="Precio con IVA"
              name="priceIVA"
              onChange={handleChange}
            />
            {errors.priceIVA && touched.priceIVA && (
              <ErrorMessage
                className="mb-3 -mt-2 w-full p-2 bg-red-500"
                name="priceIVA"
                component="div"
              ></ErrorMessage>
            )}

            <button className="w-fit mt-3 m-auto" type="submit">
              Actualizar producto
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

export default FormEditProduct;
