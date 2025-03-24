/* eslint-disable react/prop-types */

import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useRef, useEffect } from "react";
import { API_URL } from "../auth/constants";
import { useNavigate } from "react-router-dom"; 


function Table({ onSelectItem, items }) {
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
      columns: [
        {
          id: 'images',
          name: "Imagen",
          formatter: (_, row) => {


            let imageUrl = row.cells[0].data[0]?.url; // Obtiene la URL de la primera imagen
            imageUrl = typeof (imageUrl) != "undefined" ? `${API_URL}/public/images/products/${imageUrl}` : `${API_URL}/public/images/default.png`;


            return html(`
              <div class="flex justify-center items-center">
                <img width="100px" height="100px" src='${imageUrl}'>                  
                
              </div>
            `);
          }

        },
        {
          id: 'name',
          name: 'Name'
        },
        {
          id: 'description',
          name: "Description"
        },
        {
          id: 'category',
          name: "Categoria",
          formatter: (cell) => `${cell.map(cat => cat.name)}`
        },
        {
          id: 'stock',
          name: "Cantidad"
        },
        {
          id: 'price',
          name: "Precio"
        },
        {
          id: 'priceIVA',
          name: "Precio con IVA"
        },
        {
          id: '_id',
          name: "Modificar",
          formatter: (_, row) => html(`
              <div class="flex justify-center items-center">
                <a class="edit-btn cursor-pointer" data-id='${row.cells[7].data}'>
                  ✎
                </a>
                <a class="delete-btn ml-4 cursor-pointer" data-name='${row.cells[1].data}' data-id='${row.cells[7].data}'>
                  ⌫
                </a>
              </div>
            `)
          ,
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
        navigate(`/admin/product/${rowId}/edit`); // Navegación programática
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

  const editItem = (item) => {
    onSelectItem(item, "edit");
  };

  const deleteItem = (item) => {
    onSelectItem(item, "delete");
  };

  return <div ref={wrapperRef} />;
}

export default Table;
