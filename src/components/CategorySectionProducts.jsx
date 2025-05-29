import BasicGridLayout from "./BasicGridLayout";
import ProductItem from "./ProductItem";
import { useFetchCategory } from "../hooks/useFetchCategory";
import StandardSection from "./StandardSection";
import { API_URL } from "../auth/constants";

const CategorySectionProducts = ({ slug }) => {
  const { products, category, loading, error } = useFetchCategory(slug);

  if (loading) {
    return (
      <StandardSection>
        <p className="text-center font-semibold">Cargando productos...</p>
      </StandardSection>
    );
  }

  if (error) {
    return (
      <StandardSection>
        <p className="text-center font-semibold text-red-500">
          Error al cargar la categoría: {error.message}
        </p>
      </StandardSection>
    );
  }

  return (
    <StandardSection>
      <h2 className="text-2xl md:text-4xl text-center mb-4 md:mb-8 mt-8 font-semibold">
        {category.name} <br className="md:hidden" />{" "}
      </h2>
      {category.image && (
        <div className="h-[25rem] mb-3">
          <img
            className="mb-4 w-full h-full object-cover rounded-md backdrop-grayscale-[2]"
            src={`${API_URL}/public/images/category/${category.image.url}`}
          />
        </div>
      )}
      <p className="text-center font-semibold mb-8">{category.description}</p>
      <BasicGridLayout className="justify-items-center">
        {products?.length > 0 ? (
          products.map((item, i) => <ProductItem key={i} product={item} />)
        ) : (
          <p>No hay productos disponibles en esta categoría</p>
        )}
      </BasicGridLayout>
    </StandardSection>
  );
};

export default CategorySectionProducts;
