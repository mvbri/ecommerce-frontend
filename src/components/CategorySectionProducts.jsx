import BasicGridLayout from "./BasicGridLayout";
import ProductItem from "./ProductItem";
import { useFetchCategory } from "../hooks/useFetchCategory";
import StandardSection from "./StandardSection";
import { API_URL } from "../auth/constants";

const CategorySectionProducts = ({ slug }) => {
  const { products, category } = useFetchCategory(slug);
  return (
    <StandardSection>
      <h2 className="text-2xl md:text-4xl text-center mb-4 md:mb-14 font-semibold">
        {category.name} <br className="md:hidden" />{" "}
      </h2>
      {category.image &&
        <img
          className="w-full mb-4"
          src={`${API_URL}/public/images/category/${category.image.url}`}
        />}
      <p className="text-center font-semibold mb-8">{category.description}</p>
      <BasicGridLayout className="justify-items-center">
        {products.length > 0 ? products.map((item, i) => (
          <ProductItem key={i} product={item} />
        ))
          : <p>No hay productos disponibles en esta categoría</p>
        }
      </BasicGridLayout>
    </StandardSection>
  );
};

export default CategorySectionProducts;
