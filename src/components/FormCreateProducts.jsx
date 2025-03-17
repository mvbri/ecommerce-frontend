import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form>
            <label htmlFor="name">Nombre del Producto</label>
            <Field id="name" type="text" placeholder="Nombre" name="name" />
            {errors.name && touched.name && (
              <ErrorMessage name="name" component="div"></ErrorMessage>
            )}
            <label htmlFor="description">Description del Producto</label>
            <Field
              id="description"
              type="text"
              placeholder="Description"
              name="description"
            />
            {errors.description && touched.description && (
              <ErrorMessage name="description" component="div"></ErrorMessage>
            )}
            <label htmlFor="description">Imagen del Producto</label>
            <Field id="image" type="text" placeholder="Imagen" name="image" />
            {errors.image && touched.image && (
              <ErrorMessage name="image" component="div"></ErrorMessage>
            )}
            <label htmlFor="stock">Stock</label>
            <Field id="stock" type="text" placeholder="Stock" name="stock" />
            {errors.stock && touched.stock && (
              <ErrorMessage name="stock" component="div"></ErrorMessage>
            )}
            <label htmlFor="stock">Precio</label>
            <Field id="price" type="text" placeholder="Precio" name="price" />
            {errors.price && touched.price && (
              <ErrorMessage name="price" component="div"></ErrorMessage>
            )}
            <button type="submit">Cargar nuevo producto</button>
            {isSubmitting ? <p>Enviando nuevo producto</p> : null}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormCreateProducts;
