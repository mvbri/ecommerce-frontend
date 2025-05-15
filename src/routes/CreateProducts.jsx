import FormCreateProducts from "../components/FormCreateProducts";
import StandardSection from "../components/StandardSection";
import AdminLayout from "../layout/AdminLayout";

import { useParams } from "react-router";

function CreateProducts() {
  const params = useParams();

  return (
    <AdminLayout>
      <StandardSection className="px-1 pt-[3rem] pb-8">
        <h1 className="text-2xl md:text-3xl text-center mb-8 md:mb-14 text-gray-800">
          {typeof params.id != "undefined"
            ? "Editar Producto"
            : "Cargar Nuevo Producto"}
        </h1>
        <FormCreateProducts />
      </StandardSection>
    </AdminLayout>
  );
}

export default CreateProducts;
