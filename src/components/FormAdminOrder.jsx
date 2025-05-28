import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../services/axios.config";
import Dropzone from "./Dropzone";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const FormAdminOrder = ({ status, deliveries, delivery }) => {

    const initialValues = {
        status: status,
        delivery: delivery,
    };


    const params = useParams();
    const navigate = useNavigate();

    const statuses = [
        'Pago rechazado',
        'Pago aceptado',
        'Enviado',
        'En camino',
        'Recibido por el cliente',
        'En verificación de pago',
    ]



    const validationSchema = Yup.object().shape({
        status: Yup.string()
            .required("El campo es obligatorio"),
    });

    async function handleSubmit(values, setSubmitting) {
            try {
                const res = await axiosInstance.put(
                    `/api/admin/orders/${params.id}`,
                    values
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
       
    }

    return (
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
                            htmlFor="status"
                        >
                            Estado
                        </label>
                        <Field
                            id="status"
                            as="select"
                            name="status"
                            className="col-start-1 cursor-pointer row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option value="">Seleccione Estado</option>
                            
                            {statuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </Field>
                    </div>

                    <div className="w-full flex flex-col mb-4">
                        <label
                            className="mb-3 text-base inline-block mb-1 
"
                            htmlFor="delivery"
                        >
                            Delivery
                        </label>
                        <Field
                            id="delivery"
                            as="select"
                            name="delivery"
                            className="col-start-1 cursor-pointer row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option value="">Seleccione Delivery</option>
                            
                            {deliveries.length > 0 ? deliveries.map((item) => (
                                <option key={item._id} value={item._id}>{item.name} - {item.email} - {item.phone}</option>
                            ))
                                : null
                            }
                        </Field>
                    </div>

                    <button
                        className="w-full inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm md:text-base rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
                        type="submit"
                    >
                        Actualizar
                    </button>
                    {isSubmitting ? (
                        <p className="mb-3 text-center">Cargando...</p>
                    ) : null}
                </Form>
            )}
        </Formik>
    )
}

export default FormAdminOrder