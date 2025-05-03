import BasicGridLayout from "./BasicGridLayout";
import ProductItem from "./ProductItem";
import { useFetchProductsHome } from "../hooks/useFetchProductsHome";
import StandardSection from "./StandardSection";

const HomeSectionProducts = () => {
  const {items} = useFetchProductsHome()
  console.log(items)
  return (
    <StandardSection>
      <h2 className="text-2xl md:text-4xl text-center mb-8 md:mb-14 font-semibold">
          Nuestros <br className="md:hidden" />{" "}
          <span className="text-secondary">Productos</span>
        </h2>
       <BasicGridLayout>
      {items.map(item => (
        <ProductItem product={item} />

      ))
      }
      </BasicGridLayout>
    </StandardSection>
  );
};

export default HomeSectionProducts;
