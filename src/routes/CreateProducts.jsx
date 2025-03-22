import FormCreateProducts from "../components/FormCreateProducts";
import AdminLayout from "../layout/AdminLayout";

function CreateProducts() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-center mb-4 p-4 md:pt-8 text-2xl md:text-4xl">
          Cargar Nuevo Producto
        </h1>
        <FormCreateProducts />
      </div>
    </AdminLayout>
  );
}

export default CreateProducts;
