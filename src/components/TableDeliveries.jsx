/* eslint-disable react/prop-types */

import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TableDeliveries({ onSelectItem, items }) {
  const wrapperRef = useRef(null);
  const gridInstance = useRef(null);
  const navigate = useNavigate();

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
          id: "name",
          name: "Nombre",
        },
        {
          id: "email",
          name: "Correo",
        },
        {
          id: "phone",
          name: "Número de Telefono",
        },
        {
          id: "_id",
          name: "Modificar",
          formatter: (_, row) =>
            html(`
              <div class="flex justify-center items-center">
                <a class="edit-btn cursor-pointer" data-id='${row.cells[3].data}'>
                  ✎
                </a>
                <a class="delete-btn ml-4 cursor-pointer" data-name='${row.cells[1].data}' data-id='${row.cells[3].data}'>
                  ⌫
                </a>
              </div>
            `),
        },
      ],
      data: items,
      sort: true,
      search: true,
    });

    // Renderiza la tabla en el contenedor
    gridInstance.current.render(wrapperRef.current);

    // Agrega event listeners para los botones de editar y eliminar
    const handleClick = (e) => {
      if (e.target.classList.contains("edit-btn")) {
        const rowId = e.target.getAttribute("data-id");
        navigate(`/admin/delivery/${rowId}/editar`); // Navegación programática
      }
      if (e.target.classList.contains("delete-btn")) {
        const id = e.target.getAttribute("data-id");
        const name = e.target.getAttribute("data-name");
        deleteItem(id, name);
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

  const deleteItem = (item, name) => {
    onSelectItem(item, name);
  };

  return <div ref={wrapperRef} />;
}

export default TableDeliveries;
