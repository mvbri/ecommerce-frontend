import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { axiosInstance } from "../services/axios.config";
import { useModal } from "../hooks/useModal";
import { useNavigate } from "react-router-dom";

const TablePayments = ({ items, setItems }) => {
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);
  const navigate = useNavigate();

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
          data: (row) => row.type,
          name: "Tipo",
        },
        {
          data: (row) => row.bank,
          name: "Banco",
        },
        {
          data: (row) => row.document,
          name: "Documento",
        },
        {
          data: (row) => row.number,
          name: "Número",
        },
        {
          id: "_id",
          name: "Modificar",
          formatter: (_, row) =>
            html(`
                  <div class="flex justify-center items-center">
                    <a class="edit-btn cursor-pointer" data-name='${row.cells[0].data}' data-id='${row.cells[5].data}'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>

                    </a>
                    <a class="delete-btn flex ml-4 cursor-pointer" data-name='${row.cells[0].data}' data-id='${row.cells[5].data}'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="size-6 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
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
      if (e.target.closest(".edit-btn")) {
        const rowId = e.target.closest(".edit-btn").getAttribute("data-id");
        navigate(`/admin/pago/${rowId}/editar`); // Navegación programática
      }

      if (e.target.closest(".delete-btn")) {
        const name = e.target.closest(".delete-btn").getAttribute("data-name");
        setSelectedItemName(name);
        openModal();
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
  }, [items]); //

  const deleteItem = async (name) => {
    try {
      const res = await axiosInstance.post(`/api/backup/destroy`, {
        file: name,
      });

      if (res.status === 200) {
        const data = res.data.data;
        setItems(data);
      } else {
        throw new Error(`[${res.status}] ERROR en la solicitud`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <div ref={wrapperRef} />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="flex items-center justify-center size-full flex-col">
          <h2 className="text-center text-gray-950 mb-8 text-xl font-semibold">
            ¿Está seguro que desea elimiar el siguiente Item? <br />
            <span>{`"${selectedItemName ? selectedItemName : ""}" `}</span>
          </h2>
          <button
            className="bg-secondary w-fit py-1 px-4 rounded-md
    hover:bg-secondary-accent text-white"
            onClick={() => deleteItem(selectedItemName)}
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TablePayments;
