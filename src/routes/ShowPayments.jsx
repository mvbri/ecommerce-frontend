import StandardSection from "../components/StandardSection";
import TablePayments from "../components/TablePayments";
import AdminLayout from "../layout/AdminLayout";
import { useFetchPayments } from "../hooks/useFetchPayments";
import { useState } from "react";
import { axiosInstance } from "../services/axios.config";
import Modal from "../components/Modal";
import { useModal } from "../hooks/useModal";
import { ToastContainer, toast } from "react-toastify";


const ShowPayments = () => {
  const { payments, setPayments } = useFetchPayments();
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
      const res = axiosInstance.delete(`/api/admin/payments/${id}`)
      if (res.status === 200) {
        setPayments((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        notifySuccess("¡Método de pago eliminado con éxito!", {
          position: "top-center",
        });
      } else {
        throw new Error(`[${res.status}] ERROR en la solicitud`);
      }
    } catch (error) {
      notifyError("Ocurrió un error", {
        position: "top-center",
      })
      console.error(error)

    }

    closeModal();
  };

  return (
    <AdminLayout>
      <StandardSection>
        <ToastContainer />
        <TablePayments items={payments}
          onSelectItem={handleDeletetItem}
        />
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className="flex items-center justify-center size-full flex-col">
            <h2 className="text-center text-gray-950 mb-8 text-xl font-semibold">
              ¿Está seguro que desea elimiar el siguiente Item? <br />
              <span>
                {`"${selectedItemName ? selectedItemName.split(",").shift() : ""
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
    </AdminLayout>
  );
};

export default ShowPayments;
