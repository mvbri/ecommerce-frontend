import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../services/axios.config";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

const FormPayment = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof params.id != "undefined") getValues();
  }, []);

  const [initialValues, setInitialValues] = useState({
    status: true,
    name: "",
    document: "",
    bank: "",
    number: "",
    type: "",
  });

  const banks = [
    "0102 - BANCO DE VENEZUELA",
    "0156 - 100% BANCO",
    "0172 - BANCA AMIGA BANCO UNIVERSAL, C.A",
    "0114 - BANCARIBE",
    "0171 - BANCO ACTIVO",
    "0128 - BANCO CARONÍ",
    "0163 - BANCO DEL TESORO",
    "0175 - BANCO DIGITAL DE LOS TRABAJADORES, BANCO UNIVERSAL",
    "0115 - BANCO EXTERIOR",
    "0151 - BANCO FONDO COMÚN",
    "0173 - BANCO INTERNACIONAL DEL DESARROLLO",
    "0105 - BANCO MERCANTIL",
    "0191 - BANCO NACIONAL DEL CREDITO",
    "0138 - BANCO PLAZA",
    "0137 - BANCO SOFITASA",
    "0104 - BANCO VENEZOLANO DE CREDITO",
    "0168 - BANCRECER",
    "0134 - BANESCO",
    "0177 - BANFANB",
    "0146 - BANGENTE",
    "0174 - BANPLUS",
    "0108 - BBVA PROVINCIAL",
    "0157 - DELSUR BANCO UNIVERSAL",
    "0601 - INSTITUTO MUNICIPAL DE CREDITO POPULAR",
  ];

  const getValues = async () => {
    try {
      const res = await axiosInstance.get(`/api/admin/payments/${params.id}`);

      if (res.status === 200) {
        const data = res.data.data;
        setInitialValues({
          status: data.status,
          document: data.document,
          name: data.name,
          bank: data.bank,
          number: data.number,
          type: data.type,
        });
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      notifyError("Ocurrió un error", {
          position: "top-center",
        });
      console.log(err);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "El campo es demasiado corto")
      .required("El campo es obligatorio"),
    document: Yup.string()
      .min(2, "El campo es demasiado corto")
      .required("El campo es obligatorio"),
    number: Yup.string()
      .matches(/[0-9]/, "El campo solo puede contener números")
      .max(11, "El campo debe de tener máximo 11 números.")
      .required("El campo es obligatorio"),
    bank: Yup.string().required("El campo es obligatorio"),
    type: Yup.string().required("El campo es obligatorio"),
  });

  const notifySuccess = (noty, options = {}) => toast.success(noty, options);

  const notifyError = (noty, options = {}) => toast.error(noty, options);

  const handleSubmit = async (values, setSubmitting) => {
    if (typeof params.id != "undefined") {
      try {
        const res = await axiosInstance.put(
          `/api/admin/payments/${params.id}`,
          values
        );

        if (res.status === 201 || res.status === 200) {
          notifySuccess("¡Método de pago actualizado con éxito!", {
            position: "top-center",
          });
        } else {
          throw Error(`[${res.status}] error en la solicitud`);
        }
      } catch (err) {
        notifyError("Ocurrió un error", {
          position: "top-center",
        });
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    } else {
      try {
        const res = await axiosInstance.post("/api/admin/payments", values);

        if (res.status === 201 || res.status === 200) {
          notifySuccess("¡Método de pago agregado con éxito!", {
            position: "top-center",
          });
          setTimeout(() => {
            navigate(`/admin/pago/${res.data.data._id}/editar`);
          }, 2000);
        } else {
          throw Error(`[${res.status}] error en la solicitud`);
        }
      } catch (err) {
        notifyError("Ocurrió un error", {
          position: "top-center",
        });
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div>
      <div className="m-auto">
        <div className="h-6 border-b border-slate-200 mt-2"></div>
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ values, isSubmitting, errors, touched }) => (
            <Form className="flex flex-col items-center p-6 md:p-4 md:px-8  m-auto mb-3  rounded-md">
              <div className="flex w-full gap-2 mb-4 pt-4">
                <div className="flex flex-col flex-wrap gap-4 md:gap-8 w-full justify-center items-center">
                  <div className="md:min-w-[30rem] flex flex-col mb-1">
                    <label className="mb-3 text-base" htmlFor="status">
                      Activo
                      <Field
                        className="mb-4 text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                        id="status"
                        type="checkbox"
                        name="status"
                      />
                    </label>
                  </div>
                  <div role="group" aria-labelledby="my-radio-group">
                    <label className="mr-4">
                      <Field type="radio" name="type" value="Pago móvil" />
                      Pago móvil
                    </label>
                    <label>
                      <Field type="radio" name="type" value="Transferencia" />
                      Transferencia
                    </label>
                  </div>
                  {errors.type && touched.type && (
                    <ErrorMessage
                      className="p-2 bg-tertiary text-white text-base"
                      name="type"
                      component="div"
                    ></ErrorMessage>
                  )}

                  <div className="md:min-w-[30rem] flex flex-col mb-1">
                    <label className="text-sm mb-1" htmlFor="bank">
                      Banco
                    </label>
                    <Field
                      className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      id="bank"
                      as="select"
                      name="bank"
                    >
                      <option value="">Seleccione banco</option>
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </Field>

                    {errors.bank && touched.bank && (
                      <ErrorMessage
                        className="p-2 bg-tertiary text-white text-base"
                        name="bank"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>
                  <div className="md:min-w-[30rem] flex flex-col mb-1">
                    <label
                      className="text-sm inline-block mb-1"
                      htmlFor="name"
                    >
                      Razón social
                    </label>
                    <Field
                      className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      id="name"
                      type="text"
                      placeholder="Razón social"
                      name="name"
                    />
                    {errors.name && touched.name && (
                      <ErrorMessage
                        className="p-2 bg-tertiary text-white text-base"
                        name="name"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>
                  
                  <div className="md:min-w-[30rem] flex flex-col mb-1">
                    <label
                      className="text-sm inline-block mb-1"
                      htmlFor="document"
                    >
                      Documento
                    </label>
                    <Field
                      className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      id="document"
                      type="text"
                      placeholder="Documento"
                      name="document"
                    />
                    {errors.document && touched.document && (
                      <ErrorMessage
                        className="p-2 bg-tertiary text-white text-base"
                        name="document"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>
                  <div className="md:min-w-[30rem] flex flex-col mb-4">
                    {values.type === "Transferencia" ? (
                      <label className="text-sm mb-1" htmlFor="number">
                        Número de cuenta
                      </label>
                    ) : (
                      <label className="text-sm mb-1" htmlFor="number">
                        Número de teléfono
                      </label>
                    )}

                    <Field
                      className="text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      id="number"
                      type="number"
                      placeholder=""
                      name="number"
                    />
                    {errors.number && touched.number && (
                      <ErrorMessage
                        className="p-2 bg-tertiary text-white text-base"
                        name="number"
                        component="div"
                      ></ErrorMessage>
                    )}
                  </div>
                </div>
              </div>

              <button
                className="mb-4 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 md:px-8 shadow-sm hover:shadow-md bg-red-500 border-red-500 text-slate-50 hover:bg-red-400 hover:border-red-400"
                type="submit"
              >
                {typeof params.id != "undefined"
                  ? "ACTUALIZAR MÉTODO DE PAGO"
                  : "REGISTRAR NUEVO MÉTODO DE PAGO"}
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
};

export default FormPayment;
