/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import AdminLayout from "../layout/AdminLayout";

function ShowProducts() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);
  const [isOpenConfirm, openModalConfirm, closeModalConfirm] = useModal(false);

  useEffect(() => {
    axiosInstance
      .get("/stockProducts")
      .then((res) => {
        if (res.status === 200) {
          setItems(res.data);
        } else {
          throw new Error(`[${res.status}] ERROR en la solicitud`);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Función para manejar la selección del elemento
  const handleSelectedItem = (item, action) => {
    action === "edit" ? handleEditItem(item) : handleDeletetItem(item);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    openModal();
  };

  const handleDeletetItem = (item) => {
    setSelectedItem(item);
    openModalConfirm();
  };

  const deleteItem = (selectedItem) => {
    const id = selectedItem.split(",").shift();
    axiosInstance
      .delete(`/stockProducts/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const selectedItemID = selectedItem.split(",").shift();
          setItems((prevItems) =>
            prevItems.filter((item) => item.id !== selectedItemID)
          );
        } else {
          throw new Error(`[${res.status}] ERROR en la solicitud`);
        }
      })
      .catch((err) => console.log(err));

    closeModalConfirm();
  };

  // Función para actualizar el estado local
  const updateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? { ...updatedItem } : item
      )
    );
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-center p-4">Lista de Productos</h1>
        <div className="p-4">
          {items.length > 0 ? (
            <Table onSelectItem={handleSelectedItem} items={items} />
          ) : (
            <p>No hay productos en el sistema</p>
          )}
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            data={selectedItem}
            updateItem={updateItem}
          ></Modal>
          <Modal
            isOpen={isOpenConfirm}
            closeModal={closeModalConfirm}
            updateItem={updateItem}
          >
            <div className="flex items-center justify-center size-full flex-col">
              <h2 className="text-center text-gray-950 mb-8 text-xl">
                ¿Está seguro que desea elimiar el siguiente Item?{" "}
                {selectedItem ? selectedItem.split(",").shift() : ""}
              </h2>
              <button
                className="w-fit bg-sky-500/75 w-[100px] py-1 px-2 rounded-md
 hover:bg-sky-700  hover:border-sky- font-semibold"
                onClick={() => deleteItem(selectedItem)}
              >
                Eliminar
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ShowProducts;
