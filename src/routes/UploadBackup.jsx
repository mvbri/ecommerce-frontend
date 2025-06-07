import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import StandardSection from "../components/StandardSection"
import AdminLayout from "../layout/AdminLayout"
import { axiosInstance } from "../services/axios.config";
import { useState } from "react";

const file = () => {

    const SUPPORTED_FORMATS = [
        'application/x-tar', // Ejemplo para PDF
    ];

    const validationSchema = Yup.object().shape({
        file: Yup.mixed()
            .required("El campo es obligatorio")
            .test(
                'fileType',
                'Formato de archivo no soportado',
                (value) => {
                    // Si el campo es opcional y no hay archivo, también es válido
                    return value && SUPPORTED_FORMATS.includes(value.type);


                }
            )
    });

    const initialValues = {
        file: null
    };

    return (
        <AdminLayout>
            <StandardSection className="pt-[4rem]">
                <h1 className="text-2xl pt-4 md:text-3xl text-gray-800 text-center mb-8 md:mb-14">
                    Subir Respaldo
                </h1>

                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        const data = new FormData();

                        console.log(values)

                        for (let index in values) {
                            data.append(index, values[index]);
                        }

                        try {
                            const res = await axiosInstance.post(
                                "/api/backup/upload",
                                data,
                                {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                }
                            );

                            if (!res.status === 201)
                                throw Error(`[${res.status}] error en la solicitud`);

                        } catch (err) {
                            console.log(err);
                        } finally {
                            setSubmitting(false);
                        }

                    }}
                >
                    {({ setFieldValue, isSubmitting, errors, touched }) => (
                        <Form className="flex flex-col pt-8 p-4 md:px-8 w-full border border-gray-700 rounded-md m-auto">
                            <label className="mb-3 text-base" htmlFor="name">
                                Respaldo
                            </label>
                            <input
                                className="mb-4 text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                id="file"
                                type="file"
                                name="name"
                                multiple
                                onChange={(event) => {
                                    // event.currentTarget.files es un FileList, tomamos el primer archivo
                                    setFieldValue('file', event.currentTarget.files[0]);
                                }}
                            />
                            {errors.file && touched.file && (
                                <ErrorMessage
                                    className="mb-3 -mt-2 w-full p-2 bg-red-500 text-white"
                                    name="file"
                                    component="div"
                                ></ErrorMessage>
                            )}

                            <button
                                className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm md:text-base rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700 my-8"
                                type="submit"
                            >
                                subir archivo

                            </button>
                            {isSubmitting ? (
                                <p className="mb-3 text-center">SUBIR REPORTE</p>
                            ) : null}
                        </Form>
                    )}
                </Formik>
            </StandardSection>
        </AdminLayout>
    )

}

export default file