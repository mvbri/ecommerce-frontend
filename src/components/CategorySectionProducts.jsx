import BasicGridLayout from "./BasicGridLayout";
import ProductItem from "./ProductItem";
import { useFetchCategory } from "../hooks/useFetchCategory";
import StandardSection from "./StandardSection";

const CategorySectionProducts = ({ slug }) => {
  const { products, category } = useFetchCategory(slug);
  return (
    <StandardSection>
      <h2 className="text-2xl md:text-4xl text-center mb-8 md:mb-14 font-semibold">
        {category.name} <br className="md:hidden" />{" "}
        {/* <span className="text-secondary">Productos</span> */}
      </h2>
      <p className="text-center mb-4">{category.description}</p>
      <BasicGridLayout>
        {products.map((item, i) => (
          <ProductItem key={i} product={item} />
        ))}
      </BasicGridLayout>
    </StandardSection>
  );
};

export default CategorySectionProducts;
