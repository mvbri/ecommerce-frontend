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
        console.log(name)
        try {
         const res = await axiosInstance 
                .post(`/api/backup/destroy`, {
                    file: name
                })

            if (res.status === 200) {
                const data = res.data.data
                setItems(data);
            } else {
                throw new Error(`[${res.status}] ERROR en la solicitud`);
            }
        } catch (error) {
            console.log(error)
        } finally {
            closeModal();
        }



    };

    return (
        <AdminLayout>
            <StandardSection className="pt-[4rem]">
                <h1 className="text-2xl pt-4 md:text-3xl text-gray-800 text-center mb-8 md:mb-14">
                    Respaldos
                </h1>
                <div className="p-4">
                    {items.length > 0 ? (
                        <TableBackup onSelectItem={handleDeletetItem} items={items} />
                    ) : (
                        <p className="text-center">No hay respaldos en el sistema</p>
                    )}
                    {console.log(selectedItem)}
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
                                onClick={() => deleteItem(selectedItem, selectedItemName.split(",").shift())}
                            >
                                Eliminar
                            </button>
                        </div>
                    </Modal>
                </div>
            </StandardSection>
        </AdminLayout>
    )
}

export default ShowBackup