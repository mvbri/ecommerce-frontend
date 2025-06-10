import FormCreateDelivery from "../components/FormCreateDelivery";
import StandardSection from "../components/StandardSection";
import { useParams } from "react-router";
import AdminLayout from "../layout/AdminLayout";

const CreateDelivery = ({type = 'delivery'}) => {
  const params = useParams();
  return (
    <AdminLayout>
      <StandardSection className="pt-[4rem] px-2">
        <h1 className="text-2xl text-gray-800 md:text-3xl text-center mb-8 md:mb-14">
          {typeof params.id != "undefined"
            ? `Editar ${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `Registrar ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </h1>
        <FormCreateDelivery type={type} />
      </StandardSection>
    </AdminLayout>
  );
};

export default CreateDelivery;
