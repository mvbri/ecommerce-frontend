import FormCreateProducts from "../components/FormCreateProducts";
import AdminLayout from "../layout/AdminLayout";

import { useParams } from "react-router";

function CreateProducts() {
  const params = useParams();

  return (
    <AdminLayout>
      <div className="pt-[5.6rem] max-w-[1400px] m-auto">
        <h1 className="text-2xl pt-8 md:text-4xl text-center mb-8 md:mb-14">
          {typeof params.id != "undefined"
            ? "Editar Producto"
            : "Cargar Nuevo Producto"}
        </h1>
        <FormCreateProducts />
      </div>
    </AdminLayout>
  );
}

export default CreateProducts;
