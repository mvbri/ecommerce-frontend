import TableAdminOrders from '../components/TableAdminOrders'
import AdminLayout from "../layout/AdminLayout";
import StandardSection from "../components/StandardSection";
import { useFetchAdminOrders } from '../hooks/useFetchAdminOrders';

const AdminShowOrders = () => {
    const { orders } = useFetchAdminOrders()
  return (
   <AdminLayout>
      <StandardSection className="pt-[4rem]">
        <TableAdminOrders items={orders}/>
      </StandardSection>
    </AdminLayout>
  )
}

export default AdminShowOrders