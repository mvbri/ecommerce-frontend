import { useParams } from "react-router-dom";
import StandardSection from "../components/StandardSection";
import AdminLayout from "../layout/AdminLayout";
import FormPayment from "../components/FormPayment";

const CreatePayment = () => {
  const params = useParams();

  return (
    <AdminLayout>
      <StandardSection className="px-1 pt-[3rem] pb-8">
        <h1 className="text-2xl md:text-3xl text-center mb-8 md:mb-14 text-gray-800">
          {typeof params.id != "undefined"
            ? "Editar metodo de pago"
            : "Registrar metodo de pago"}
        </h1>
        <FormPayment />
      </StandardSection>
    </AdminLayout>
  );
};

export default CreatePayment;
