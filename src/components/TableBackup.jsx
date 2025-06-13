/* eslint-disable react/prop-types */
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useRef, useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { toast } from "react-toastify";
const URL = `${import.meta.env.VITE_API_URL}`;

function TableBackup({ items, setItems }) {
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);

  const wrapperRef = useRef(null);
  const gridInstance = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    wrapperRef.current.innerHTML = "";

    if (gridInstance.current) {
      gridInstance.current.destroy();
    }

    gridInstance.current = new Grid({
      language: {
        loading: "Cargando...",
        noRecordsFound: "No se encontraron registros coincidientes",
        error: "Se produjo un error al obtener los datos",
        search: {
          placeholder: "🔍 Buscar...",
        },
        sort: {
          sortAsc: "Ordenar columna ascendente",
          sortDesc: "Ordenar columna descendente",
        },
        pagination: {
          previous: "⬅️",
          next: "➡️",
          of: "de",
          to: "al",
          showing: "Mostrando",
          results: () => "Resultados",
          navigate: (page, pages) => `Página ${page} de ${pages}`,
          page: (page) => `Página ${page}`,
        },
      },
      pagination: true,
      columns: [
        {
          data: (row) => row.name,
          name: "Nombre",
        },
        {
          id: "_id",
          name: "Modificar",
          formatter: (_, row) =>
            html(`
              <div class="flex justify-center items-center">
                <a class="restore-btn cursor-pointer" data-name='${row.cells[0].data}' data-id='${row.cells[1].data}'>
                  Restaurar
                </a>
                <a class="delete-btn flex ml-4 cursor-pointer" data-name='${row.cells[0].data}' data-id='${row.cells[1].data}'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="size-6 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                  </svg>

                </a>
                <a class="download-btn flex ml-4 cursor-pointer" data-name='${row.cells[0].data}' data-id='${row.cells[1].data}'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="size-6 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
              </div>
            `),
        },
      ],
      data: () => items,
      sort: true,
      search: true,
    });

    // Renderiza la tabla en el contenedor
    gridInstance.current.render(wrapperRef.current);

    // Agrega event listeners para los botones de editar y eliminar
    const handleClick = (e) => {
      if (e.target.closest(".delete-btn")) {
        const name = e.target.closest(".delete-btn").getAttribute("data-name");
        setSelectedItemName(name);
        openModal();
      }

      if (e.target.closest(".restore-btn")) {
        const name = e.target.closest(".restore-btn").getAttribute("data-name");
        restoreBackup(name);
      }

      if (e.target.closest(".download-btn")) {
        const name = e.target
          .closest(".download-btn")
          .getAttribute("data-name");
        BackupDownloader(name);
      }
    };

    wrapperRef.current.addEventListener("click", handleClick);

    // Cleanup: elimina la tabla y los event listeners al desmontar el componente
    return () => {
      if (gridInstance.current) {
        gridInstance.current.destroy();
        gridInstance.current = null;
      }
      if (wrapperRef.current) {
        // ✅ Verifica que el ref no sea null antes de eliminar el evento
        wrapperRef.current.removeEventListener("click", handleClick);
      }
    };
  }, [items]); // Se ejecuta cada vez que `items` cambia

  const notifySuccess = (noty, options = {}) => toast.success(noty, options);

  const notifyError = (noty, options = {}) => toast.error(noty, options);

  const restoreBackup = async (name) => {
    try {
      const res = await axiosInstance.post("/api/backup/restore", {
        file: name,
      });

      if (res.status !== 200 && res.status !== 201) throw Error(res.statusText);

      notifySuccess("¡Respaldo restaurado con éxito!", {
        position: "top-center",
      });
    } catch (error) {
      notifyError("Ocurrió un error", {
        position: "top-center",
      });
      console.log(error);
    }
  };

  const deleteItem = async (name) => {
    try {
      const res = await axiosInstance.post(`/api/backup/destroy`, {
        file: name,
      });

      if (res.status === 200 || res.status === 201) {
        const data = res.data.data;
        setItems(data);

        notifySuccess("¡Respaldo eliminado con éxito!", {
          position: "top-center",
        });
      } else {
        throw new Error(`[${res.status}] ERROR en la solicitud`);
      }
    } catch (error) {
      notifyError("Ocurrió un error", {
        position: "top-center",
      });
      console.log(error);
    } finally {
      closeModal();
    }
  };

  const BackupDownloader = (filename) => {
    if (filename) {
      // Construct the URL with the query parameter
      const downloadUrl = `${URL}/api/backup/download?file=${encodeURIComponent(
        filename
      )}`;

      // Open a new blank window with the constructed URL
      window.open(downloadUrl, "_blank");
    }
  };

  return (
    <>
      <div ref={wrapperRef} />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="flex items-center justify-center size-full flex-col">
          <h2 className="text-gray-950 mb-8 text-xl font-semibold">
            ¿Está seguro que desea elimiar el siguiente Item? <br />
            <span>{`"${selectedItemName ? selectedItemName : ""}" `}</span>
          </h2>
          <div className="flex self-end gap-3">
            <button
              className="bg-gray-400 w-fit py-1 px-4 rounded-md
 hover:bg-gray-500 text-white transition-all duration-300 ease-in"
              onClick={closeModal}
            >
              Cerrar
            </button>
            <button
              className="bg-secondary w-fit py-1 px-4 rounded-md
 hover:bg-secondary-accent text-white transition-all duration-300 ease-in"
              onClick={() => deleteItem(selectedItemName)}
            >
              Sí
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TableBackup;
