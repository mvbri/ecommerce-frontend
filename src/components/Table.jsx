/* eslint-disable react/prop-types */

import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useRef, useEffect } from "react";

function Table({ onSelectItem, items }) {
  const wrapperRef = useRef(null);
  const gridInstance = useRef(null); // Mantiene la instancia de la tabla

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Limpia el contenedor antes de renderizar la nueva tabla
    wrapperRef.current.innerHTML = "";

    // Si ya hay una instancia de grid, la destruimos antes de crear otra
    if (gridInstance.current) {
      gridInstance.current.destroy();
    }

    // Crear la tabla Grid.js
    gridInstance.current = new Grid({
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
                <a class="edit-btn cursor-pointer" data-info='${row.cells.map(
                  (cell) => cell.data
                )}'>
                  ✎
                </a>
                <a class="delete-btn ml-4 cursor-pointer" data-info='${row.cells.map(
                  (cell) => cell.data
                )}'>
                  ⌫
                </a>
              </div>
            `),
        },
      ],
      data: items.map((product) => [
        product.id,
        product.name,
        product.description,
        product.image,
        product.category,
        product.stock,
        product.price,
        product.priceIVA,
      ]),
      sort: true,
      search: true,
    });

    // Renderiza la tabla en el contenedor
    gridInstance.current.render(wrapperRef.current);

    // Agrega event listeners para los botones de editar y eliminar
    const handleClick = (e) => {
      if (e.target.classList.contains("edit-btn")) {
        const rowData = e.target.getAttribute("data-info");
        editItem(rowData);
      }
      if (e.target.classList.contains("delete-btn")) {
        const rowData = e.target.getAttribute("data-info");
        deleteItem(rowData);
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

  const editItem = (item) => {
    onSelectItem(item, "edit");
  };

  const deleteItem = (item) => {
    onSelectItem(item, "delete");
  };

  return <div ref={wrapperRef} />;
}

export default Table;
