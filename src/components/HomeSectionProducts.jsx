import BasicGridLayout from "./BasicGridLayout";
import ProductItem from "./ProductItem";
import { useFetchCategory } from "../hooks/useFetchCategory";
import StandardSection from "./StandardSection";
import TitleSection from "./TitleSection";

const HomeSectionProducts = () => {
  const { products } = useFetchCategory("inicio");
  return (
    <StandardSection>
      <TitleSection text="Nuestros" secondText="Productos" />
      <BasicGridLayout>
        {products.map((item, i) => (
          <ProductItem key={i} product={item} />
        ))}
      </BasicGridLayout>
    </StandardSection>
  );
};

export default HomeSectionProducts;
