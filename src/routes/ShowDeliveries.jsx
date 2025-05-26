import { useState } from "react";
import StandardSection from "../components/StandardSection";
import AdminLayout from "../layout/AdminLayout";
import { axiosInstance } from "../services/axios.config";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";
import { useFetchDeliveries } from "../hooks/useFetchDeliveries";
import TableDeliveries from "../components/TableDeliveries";

const ShowDeliveries = () => {
  const { deliveries, setDeliveries } = useFetchDeliveries();
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
      .delete(`/api/admin/users/delivery/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setDeliveries((prevItems) =>
            prevItems.filter((item) => item._id !== id)
          );
        } else {
          throw new Error(`[${res.status}] ERROR en la solicitud`);
        }
      })
      .catch((err) => console.log(err));

    closeModal();
  };

  return (
    <AdminLayout>
      <StandardSection>
        <h1 className="mb-4 pt-4 md:mb-20 text-2xl md:text-3xl text-gray-800 text-center">
          Tabla de Deliveries
        </h1>

        <div className="p-4">
          {deliveries.length > 0 ? (
            <TableDeliveries
              onSelectItem={handleDeletetItem}
              items={deliveries}
            />
          ) : (
            <p className="text-center md:text-2xl text-gray-700">
              No hay productos en el sistema
            </p>
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
      </StandardSection>
    </AdminLayout>
  );
};

export default ShowDeliveries;
