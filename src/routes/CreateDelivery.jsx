import FormCreateDelivery from "../components/FormCreateDelivery";
import StandardSection from "../components/StandardSection";
import { useParams } from "react-router";
import AdminLayout from "../layout/AdminLayout";

const CreateDelivery = () => {
  const params = useParams();
  return (
    <AdminLayout>
      <StandardSection>
        <div className="pt-[5.6rem] max-w-[1400px] m-auto">
          <h1 className="text-2xl pt-8 md:text-4xl text-center mb-8 md:mb-14">
            {typeof params.id != "undefined"
              ? "Editar Delivery"
              : "Registrar Delivery"}
          </h1>
          <FormCreateDelivery />
        </div>
      </StandardSection>
    </AdminLayout>
  );
};

export default CreateDelivery;
