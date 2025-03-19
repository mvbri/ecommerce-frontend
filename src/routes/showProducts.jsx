/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";

function ShowProducts() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);

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
    const id = item.split(",").shift();
    axiosInstance
      .delete(`/stockProducts/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        } else {
          throw new Error(`[${res.status}] ERROR en la solicitud`);
        }
      })
      .catch((err) => console.log(err));
  };

  // Función para actualizar el estado local
  const updateItem = (updatedItem) => {
    console.log("Elemento actualizado:", updatedItem);
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        String(item.id) === String(updatedItem.id) ? { ...updatedItem } : item
      );

      return [...updatedItems]; // 🔄 Forzar un nuevo array en memoria
    });
  };

  return (
    <div>
      <h1 className="text-center p-4">Lista de Productos</h1>
      <div className="p-4">
        {console.log(items)}
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
      </div>
    </div>
  );
}

export default ShowProducts;
