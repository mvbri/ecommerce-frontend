import BasicGridLayout from "./BasicGridLayout";
import ProductItem from "./ProductItem";
import { useFetchCategory } from "../hooks/useFetchCategory";
import StandardSection from "./StandardSection";

const HomeSectionProducts = () => {
  const { products } = useFetchCategory("inicio");
  return (
    <StandardSection>
      <h2 className="text-2xl md:text-4xl text-center mb-8 md:mb-14 font-semibold">
        Nuestros <br className="md:hidden" />{" "}
        <span className="text-secondary">Productos</span>
      </h2>
      <BasicGridLayout>
        {products.map((item, i) => (
          <ProductItem key={i} product={item} />
        ))}
      </BasicGridLayout>
    </StandardSection>
  );
};

export default HomeSectionProducts;
