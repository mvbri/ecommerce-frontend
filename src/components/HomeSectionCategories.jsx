import BasicGridLayout from "./BasicGridLayout";
import Card from "./Card";
import ImgDrinks from "../img/cards_categories/drinks.jpg";
import StandardSection from "./StandardSection";
import "./css/HomeSectionCategories.css";
import TitleSection from "./TitleSection";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { API_URL } from "../auth/constants";

function HomeSectionCategories() {
  const { categories } = useFetchCategories();

  console.log(categories);

  return (
    <>
      <StandardSection className="bg-gray-100 py-16 sm:py-24 lg:py-32">
        <TitleSection text="Algunas de Nuestras" secondText="categorias" />
        <BasicGridLayout>
          {categories.map((item, i) => (
            <Card
              key={i}
              className="custom-card"
              title={item.name}
              description={item.description}
              img={
                item.image
                  ? `${API_URL}/public/images/category/${item.image.url}`
                  : `${API_URL}/public/images/default.png`
              }
              imgAlt={item.name}
              link={`/categoria/${item.slug}`}
            />
          ))}
        </BasicGridLayout>
      </StandardSection>
    </>
  );
}

export default HomeSectionCategories;
