import { useState } from "react";
import Modal from "../components/Modal";
import StandardSection from "../components/StandardSection";
import { useFetchBackups } from "../hooks/useFetchBackups";
import AdminLayout from "../layout/AdminLayout";
import { useModal } from "../hooks/useModal";
import TableBackup from "../components/TableBackup";
import { axiosInstance } from "../services/axios.config";

const ShowBackup = () => {
  const { items, setItems } = useFetchBackups();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [isOpen, openModal, closeModal] = useModal(false);

  const handleDeletetItem = (item, name) => {
    setSelectedItem(item);
    setSelectedItemName(name);
    openModal();
  };

  const deleteItem = async (id, name) => {
    try {
      const res = await axiosInstance.post(`/api/backup/destroy`, {
        file: name,
      });

      if (res.status === 200) {
        const data = res.data.data;
        setItems(data);
      } else {
        throw new Error(`[${res.status}] ERROR en la solicitud`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  const generateBackup = async () => {
    try {
      const res = await axiosInstance.post(`/api/backup/generate`);

      if (!res.status === 200) {
        throw new Error(`[${res.status}] ERROR en la solicitud`);
      }

      alert("Respaldo generado");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <StandardSection className="pt-[4rem]">
        <h1 className="text-2xl pt-4 md:text-3xl text-gray-800 text-center mb-8 md:mb-14">
          Respaldos
        </h1>
        <div className="flex justify-end">
          <button
            onClick={generateBackup}
            className="mb-4 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 md:px-8 shadow-sm hover:shadow-md bg-red-500 border-red-500 text-slate-50 hover:bg-red-400 hover:border-red-400"
          >
            GENERAR RESPALDO
          </button>
        </div>

        <div className="p-4">
          {items.length > 0 ? (
            <TableBackup onSelectItem={handleDeletetItem} items={items} />
          ) : (
            <p className="text-center">No hay respaldos en el sistema</p>
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
                onClick={() =>
                  deleteItem(selectedItem, selectedItemName.split(",").shift())
                }
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

export default ShowBackup;
