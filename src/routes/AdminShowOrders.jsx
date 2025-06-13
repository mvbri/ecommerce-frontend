import TableAdminOrders from "../components/TableAdminOrders";
import AdminLayout from "../layout/AdminLayout";
import StandardSection from "../components/StandardSection";
import { useFetchAdminOrders } from "../hooks/useFetchAdminOrders";

const AdminShowOrders = () => {
  const { orders } = useFetchAdminOrders();
  return (
    <AdminLayout>
      <StandardSection className="pt-[4rem]">
        <h1 className="text-2xl pt-4 md:text-3xl text-gray-800 text-center mb-8 md:mb-14">
          Tabla de Pedidos
        </h1>
        <TableAdminOrders items={orders} />
      </StandardSection>
    </AdminLayout>
  );
};

export default AdminShowOrders;
