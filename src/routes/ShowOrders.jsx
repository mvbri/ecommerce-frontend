import { useState } from "react";
import StandardSection from "../components/StandardSection";
import TableOrders from "../components/TableOrders";
import { useFetchOrders } from "../hooks/useFetchOrders";
import DeliveryLayout from "../layout/DeliveryLayout";
import { axiosInstance } from "../services/axios.config";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";

const ShowOrders = () => {
  const { orders, setOrders } = useFetchOrders();
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
      .delete(`/api/delivery/orders/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setOrders((prevItems) => prevItems.filter((item) => item._id !== id));
        } else {
          throw new Error(`[${res.status}] ERROR en la solicitud`);
        }
      })
      .catch((err) => console.log(err));

    closeModal();
  };
  return (
    <DeliveryLayout>
      <StandardSection>
        <h1 className="text-2xl pt-8 md:text-4xl text-center mb-8 md:mb-14">
          Tabla de Pedidos
        </h1>
        {orders.length > 0 ? (
          <TableOrders onSelectItem={handleDeletetItem} items={orders} />
        ) : (
          <p className="text-center">No hay ordenes en el sistema</p>
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
      </StandardSection>
    </DeliveryLayout>
  );
};

export default ShowOrders;
