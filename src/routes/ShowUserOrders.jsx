import StandardSection from "../components/StandardSection";
import TableUserOrders from "../components/TableUserOrders";
import { useFetchUserOrders } from "../hooks/useFetchUserOrders";
import HomeLayout from "../layout/HomeLayout";
import UserNavProfile from "../components/UserNavProfile";

const ShowUserOrders = () => {
  const { orders } = useFetchUserOrders();

  return (
    <HomeLayout>
      <StandardSection>
        <div className="flex flex-col md:flex-row gap-8 ">
          <UserNavProfile />
          <div className="p-8 border rounded-md flex-1">
            <h1 className="text-2xl pt-4 md:text-4xl text-center mb-4 md:mb-14 ">
              Compras
            </h1>
            {orders.length > 0 ? (
              <TableUserOrders items={orders} />
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
