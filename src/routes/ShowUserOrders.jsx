import { useState } from "react";
import StandardSection from "../components/StandardSection";
import TableUserOrders from "../components/TableUserOrders";
import { useFetchUserOrders } from "../hooks/useFetchUserOrders";
import HomeLayout from "../layout/HomeLayout";
import { axiosInstance } from "../services/axios.config";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";
import UserNavProfile from "../components/UserNavProfile";

const ShowUserOrders = () => {
  const { orders, setOrders } = useFetchUserOrders();
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
    <HomeLayout>
      <StandardSection>
        <div className="flex flex-col md:flex-row gap-8">
          <UserNavProfile />
          <div>
            <h1 className="text-2xl pt-4 md:text-4xl text-center mb-4 md:mb-14">
              Compras
            </h1>
            {orders.length > 0 ? (
              <TableUserOrders onSelectItem={handleDeletetItem} items={orders} />
            ) : (
              <p className="text-center">No hay ordenes en el sistema</p>
            )}
          </div>
        </div>
      </StandardSection>
    </HomeLayout>
  );
};

export default ShowUserOrders;
