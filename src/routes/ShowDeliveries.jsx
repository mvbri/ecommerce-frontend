import { useState } from "react";
import StandardSection from "../components/StandardSection";
import AdminLayout from "../layout/AdminLayout";
import { axiosInstance } from "../services/axios.config";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";
import { useFetchDeliveries } from "../hooks/useFetchDeliveries";
import TableDeliveries from "../components/TableDeliveries";
import { ToastContainer, toast } from "react-toastify";

const ShowDeliveries = ({ type = "delivery" }) => {
  const { deliveries, setDeliveries } = useFetchDeliveries(type);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);

  const handleDeletetItem = (item, name) => {
    setSelectedItem(item);
    setSelectedItemName(name);
    openModal();
  };

  const notifySuccess = (noty, options = {}) => toast.success(noty, options);

  const notifyError = (noty, options = {}) => toast.error(noty, options);

  const deleteItem = async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/users/${id}`);
      if (res.status === 200 || res.status === 201) {
        notifySuccess(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } eliminado con éxito!`,
          {
            position: "top-center",
          }
        );

        setDeliveries((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      } else {
        throw new Error(`[${res.status}] ERROR en la solicitud`);
      }
    } catch (error) {
      notifyError("Ocurrió un error", {
        position: "top-center",
      });
      console.log(error);
    } finally {
      closeModal();
    }
  };

  return (
    <AdminLayout>
      <StandardSection>
        <h1 className="mb-4 pt-4 md:mb-20 text-2xl md:text-3xl text-gray-800 text-center">
          Tabla de {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>

        <ToastContainer />

        <div className="p-4">
          {deliveries.length > 0 ? (
            <TableDeliveries
              type={type}
              onSelectItem={handleDeletetItem}
              items={deliveries}
            />
          ) : (
            <p className="text-center md:text-2xl text-gray-700">
              No hay {type.charAt(0).toUpperCase() + type.slice(1)}s en el
              sistema
            </p>
          )}
          <Modal isOpen={isOpen} closeModal={closeModal}>
            <div className="flex items-center justify-center size-full flex-col">
              <h2 className="text-gray-950 mb-8 text-xl font-semibold">
                ¿Está seguro que desea elimiar el siguiente Item? <br />
                <span>
                  {`"${
                    selectedItemName ? selectedItemName.split(",").shift() : ""
                  }" `}
                </span>
              </h2>
              <div className="flex self-end gap-3">
                <button
                  className="bg-gray-400 w-fit py-1 px-4 rounded-md
 hover:bg-gray-500 text-white transition-all duration-300 ease-in"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
                <button
                  className="bg-secondary w-fit py-1 px-4 rounded-md
 hover:bg-secondary-accent text-white transition-all duration-300 ease-in"
                  onClick={() => deleteItem(selectedItem)}
                >
                  Sí
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </StandardSection>
    </AdminLayout>
  );
};

export default ShowDeliveries;
