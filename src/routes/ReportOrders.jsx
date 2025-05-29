import StandardSection from "../components/StandardSection";
import FormReportOrder from "../components/FormReportOrder";
import AdminLayout from "../layout/AdminLayout";

const CreateCategory = () => {
  return (
    <AdminLayout>
      <StandardSection className="px-1 pt-[3rem] pb-8">
        <h1 className="text-2xl md:text-3xl text-center mb-8 md:mb-14 text-gray-800">
          Reportes
        </h1>
        <FormReportOrder />
      </StandardSection>
    </AdminLayout>
  );
};

export default CreateCategory;
