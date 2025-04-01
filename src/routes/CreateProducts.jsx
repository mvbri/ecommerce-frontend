import FormCreateProducts from "../components/FormCreateProducts";
import AdminLayout from "../layout/AdminLayout";

import { useParams } from "react-router"


function CreateProducts() {
  const params = useParams();

  return (
    <AdminLayout>
      <div>
        <h1 className="text-center mb-4 p-4 md:pt-8 text-2xl md:text-4xl">
        { typeof(params.id) != "undefined" ?  "Editar Producto":  "Cargar Nuevo Producto"}
        </h1>
        <FormCreateProducts />
      </div>
    </AdminLayout>
  );
}

export default CreateProducts;
