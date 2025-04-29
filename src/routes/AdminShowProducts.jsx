/* eslint-disable react/jsx-key */
import { useState } from "react";
import { axiosInstance } from "../services/axios.config";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import AdminLayout from "../layout/AdminLayout";
import { useFetchProducts } from "../hooks/useFetchProducts";

function AdminShowProducts() {
  const { items, setItems } = useFetchProducts();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);

  const handleDeletetItem = (item, name) => {
    setSelectedItem(item);
    setSelectedItemName(name);
    openModal();
  };

  const deleteItem = (id) => {
    axiosInstance
      .delete(`/api/admin/products/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        } else {
          throw new Error(`[${res.status}] ERROR en la solicitud`);
        }
      })
      .catch((err) => console.log(err));

    closeModal();
  };

  return (
    <AdminLayout>
      <div className="pt-[5.6rem]">
        <h1 className="text-2xl pt-4 md:text-4xl text-center mb-8 md:mb-14">
          Lista de Productos
        </h1>
        <div className="p-4">
          {items.length > 0 ? (
            <Table onSelectItem={handleDeletetItem} items={items} />
          ) : (
            <p className="text-center">No hay productos en el sistema</p>
          )}
          <Modal isOpen={isOpen} closeModal={closeModal}>
            <div className="flex items-center justify-center size-full flex-col">
              <h2 className="text-center text-gray-950 mb-8 text-xl font-semibold">
                ¿Está seguro que desea elimiar el siguiente Item? <br />
                <span>
                  {`"${
                    selectedItemName ? selectedItemName.split(",").shift() : ""
                  }" `}
                </span>
              </h2>
              <button
                className="bg-secondary w-fit py-1 px-4 rounded-md
 hover:bg-secondary-accent text-white"
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

export default AdminShowProducts;
