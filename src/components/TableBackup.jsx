/* eslint-disable react/prop-types */

import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useRef, useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";

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
          name: "name",
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
                <a class="delete-btn ml-4 cursor-pointer" data-name='${row.cells[0].data}' data-id='${row.cells[1].data}'>
                  ⌫
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
      if (e.target.classList.contains("delete-btn")) {
        const id = e.target.getAttribute("data-id");
        const name = e.target.getAttribute("data-name");
        setSelectedItemName(name);
        openModal();
      }

      if (e.target.classList.contains("restore-btn")) {
        const name = e.target.getAttribute("data-name");
        restoreBackup(name);
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

  const restoreBackup = async (name) => {
    try {
      const res = await axiosInstance.post("/api/backup/restore", {
        file: name,
      });

      if (res.status !== 200) throw Error(res.statusText);

      alert("Respaldo restaurado");
    } catch (error) {
      console.log(error);
    }
  };

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
}

export default TableBackup;
