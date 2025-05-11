import BasicGridLayout from "./BasicGridLayout";
import Card from "./Card";
import ImgDrinks from "../img/cards_categories/drinks.jpg";
import StandardSection from "./StandardSection";
import "./css/HomeSectionCategories.css";
import TitleSection from "./TitleSection";

function HomeSectionCategories() {
  return (
    <>
      <StandardSection className="bg-gray-100 py-16 sm:py-24 lg:py-32">
        <TitleSection text="Algunas de Nuestras" secondText="categorias" />
        <BasicGridLayout>
          <Card
            className="custom-card"
            title="Dulces"
            img={ImgDrinks}
            imgAlt="Cuidad personal"
            link="/dulces"
          />
          <Card
            className="custom-card"
            title="Frutas"
            img={ImgDrinks}
            imgAlt="Cuidad personal"
            link="/frutas"
          />
          <Card
            className="custom-card"
            title="All"
            img={ImgDrinks}
            imgAlt="Cuidad personal"
            btnText="All"
            link="/all"
          />
        </BasicGridLayout>
      </StandardSection>
    </>
  );
}

export default HomeSectionCategories;
