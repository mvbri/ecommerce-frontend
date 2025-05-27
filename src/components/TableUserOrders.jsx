import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TableUserOrders = ({ onSelectItem, items }) => {
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
                    data: (row) => {
                        let date = new Date(row.voucher.date);
                        return new Intl.DateTimeFormat('es-VE').format(date);

                    },
                    name: 'Fecha de pago'
                },
                {
                    id: "status",
                    name: "Estatus",
                },
                {
                    data: (row) => `${row.total.toFixed(2)} Bs`,
                    name: 'Total a Pagar'
                },
                {
          id: "_id",
          name: "Acciones",
          formatter: (_, row) =>
            html(`
              <div class="flex justify-center items-center">
                <a class="show-btn cursor-pointer" data-id='${row.cells[3].data}'>
                  ver
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
            if (e.target.classList.contains("show-btn")) {
                const rowId = e.target.getAttribute("data-id");
                navigate(`/compras/${rowId}`); // Navegación programática
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
};

export default TableUserOrders;
