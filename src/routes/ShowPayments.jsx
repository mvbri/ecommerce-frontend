import StandardSection from "../components/StandardSection";
import TablePayments from "../components/TablePayments";
import AdminLayout from "../layout/AdminLayout";
import { useFetchPayments } from "../hooks/useFetchPayments";

const ShowPayments = () => {
  const { payments, setPayments } = useFetchPayments();
  return (
    <AdminLayout>
      <StandardSection>
        <TablePayments items={payments} setPayments={setPayments} />
      </StandardSection>
    </AdminLayout>
  );
};

export default ShowPayments;
