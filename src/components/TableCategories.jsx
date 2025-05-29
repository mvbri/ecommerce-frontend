/* eslint-disable react/prop-types */

import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useRef, useEffect } from "react";
import { API_URL } from "../auth/constants";
import { useNavigate } from "react-router-dom";

function TableCategories({ onSelectItem, items }) {
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
          data: (row) => row.name,
          name: "name",
        },
        {
          id: "image",
          name: "Imagen",
          formatter: (_, row) => {
            console.log(row.cells[1].data?.url);
            let imageUrl = row.cells[1].data?.url; // Obtiene la URL de la primera imagen
            imageUrl =
              typeof imageUrl != "undefined"
                ? `${API_URL}/public/images/category/${imageUrl}`
                : `${API_URL}/public/images/default.png`;

            return html(`
                      <div class="flex justify-center items-center">
                        <img width="100px" height="100px" src='${imageUrl}'>                  
                        
                      </div>
                    `);
          },
        },
        {
          data: (row) => row.description,
          name: "Descripción",
        },
        {
          data: (row) => (row.menu ? "True" : "False"),
          name: "Menu",
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
        navigate(`/admin/category/${rowId}/editar`); // Navegación programática
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

export default TableCategories;
