import BasicGridLayout from "./BasicGridLayout";
import Card from "./Card";
import ImgDrinks from "../img/cards_categories/drinks.jpg";
import StandardSection from "./StandardSection";

function HomeSectionCategories() {
  return (
    <>
      <StandardSection>
        <h2 className="text-2xl md:text-4xl text-center mb-8 md:mb-14 font-semibold">
          Algunas de Nuestras <br className="md:hidden" />{" "}
          <span className="text-secondary">Categorias</span>
        </h2>
        <BasicGridLayout>
          <Card
            title="Dulces"
            img={ImgDrinks}
            imgAlt="Cuidad personal"
            btnText="Dulces"
            link="/dulces"
          />
          <Card
            title="Frutas"
            img={ImgDrinks}
            imgAlt="Cuidad personal"
            btnText="Frutas"
            link="/frutas"
          />
          <Card
            title="All"
            img={ImgDrinks}
            imgAlt="Cuidad personal"
            btnText="All"
            link="/all"
          />
          <Card
            title="Inicio"
            img={ImgDrinks}
            imgAlt="Cuidad personal"
            btnText="Inicio"
            link="/inicio"
          />
        </BasicGridLayout>
      </StandardSection>
    </>
  );
}

export default HomeSectionCategories;
