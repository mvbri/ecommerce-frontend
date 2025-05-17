import StandardSection from "../components/StandardSection";
import FormCreateCategory from "../components/FormCreateCategory";
import { useParams } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

const CreateCategory = () => {
  const params = useParams();
  return (
    <AdminLayout>
      <StandardSection className="px-1 pt-[3rem] pb-8">
        <h1 className="text-2xl md:text-3xl text-center mb-8 md:mb-14 text-gray-800">
          {typeof params.id != "undefined"
            ? "Editar Categoría"
            : "Cargar Nueva Categoría"}
        </h1>
        <FormCreateCategory />
      </StandardSection>
    </AdminLayout>
  );
};

export default CreateCategory;
