/* eslint-disable react/prop-types */

import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useRef, useEffect } from "react";

function Table({ onSelectItem }) {
  const wrapperRef = useRef(null);
  let gridInstance = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.innerHTML = "";
    }

    // Evita renderizar múltiples instancias del grid
    if (!gridInstance.current) {
      grid.render(wrapperRef.current);

      // Agrega el listener para el botón de edición
      wrapperRef.current.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
          const rowData = e.target.getAttribute("data-info");
          editItem(rowData); // Aquí pasas la fila completa a tu función
        }
        if (e.target.classList.contains("delete-btn")) {
          const rowData = e.target.getAttribute("data-info");
          deleteItem(rowData); // Aquí pasas la fila completa a tu función
        }
      });
    }

    return () => {
      if (gridInstance.current) {
        gridInstance.current.destroy();
        gridInstance.current = null; // Reinicia la referencia para evitar que se dupliquen
      }
    };
  }, []);

  const editItem = (item) => {
    onSelectItem(item, "edit");
  };

  const deleteItem = (item) => {
    onSelectItem(item, "delete");
  };

  const grid = new Grid({
    columns: [
      "#id",
      "Name",
      "Description",
      "Imagen",
      "Categoria",
      "Stock",
      "Precio",
      "Precio con IVA",
      {
        name: "Modificar",
        formatter: (_, row) =>
          html(`
            <div class="flex justify-center items-center">
               <a class="edit-btn cursor-pointer" data-info="${row.cells.map(
                 (cell) => cell.data
               )}">
              ✎
            </a>
            <a class="delete-btn ml-4 cursor-pointer" data-info="${row.cells.map(
              (cell) => cell.data
            )}">
              ⌫
            </a>
            </div>
          `),
      },
    ],
    data: () => {
      return new Promise((resolve, reject) => {
        fetch(`${import.meta.env.VITE_API_URL}/stockProducts`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Hubo un problema con la respuesta de la API");
            }
            return response.json();
          })
          .then((data) => {
            resolve(
              data.map((product) => [
                product.id,
                product.name,
                product.description,
                product.image,
                product.category,
                product.stock,
                product.price,
                product.priceIVA,
              ])
            );
          })
          .catch((error) => {
            console.error("Error al cargar los datos:", error);
            resolve([]); // En caso de error, devolver un array vacío
          });
      });
    },
    sort: true,
    search: true,
  });

  return <div ref={wrapperRef} />;
}

export default Table;
