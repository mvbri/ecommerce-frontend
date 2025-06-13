import { useState } from "react";
import StandardSection from "../components/StandardSection";
import TableCategories from "../components/TableCategories";
import { useModal } from "../hooks/useModal";
import AdminLayout from "../layout/AdminLayout";
import { axiosInstance } from "../services/axios.config";
import { useFetchAdminCategories } from "../hooks/useFetchAdminCategories";
import Modal from "../components/Modal";
import { ToastContainer, toast } from "react-toastify";
const AdminShowCategories = () => {
  const { categories, setCategories } = useFetchAdminCategories();
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
      const res = await axiosInstance.delete(`/api/admin/category/${id}`);

      if (res.status === 200 || res.status === 201) {
        notifySuccess("¡Categoría eliminada con éxito!", {
          position: "top-center",
        });
        setCategories((prevItems) =>
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
    }

    closeModal();
  };

  return (
    <AdminLayout>
      <StandardSection className="pt-[4rem]">
        <h1 className="text-2xl pt-4 md:text-3xl text-gray-800 text-center mb-8 md:mb-14">
          Lista de Categorias
        </h1>
        <ToastContainer />
        <div className="p-4">
          {categories.length > 0 ? (
            <TableCategories
              onSelectItem={handleDeletetItem}
              items={categories}
            />
          ) : (
            <p className="text-center">No hay productos en el sistema</p>
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

export default AdminShowCategories;
