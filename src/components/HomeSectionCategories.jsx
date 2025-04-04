import BasicGridLayout from "./BasicGridLayout";
import Card from "./Card";
import ImgDrinks from "../img/cards_categories/drinks.jpg";
import StandardSection from "./StandardSection";

function HomeSectionCategories() {
  return (
    <>
      <StandardSection>
        <h2 className="text-2xl md:text-4xl text-center mb-8 font-semibold">
          Algunas de Nuestras <span className="text-secondary">Categorias</span>
        </h2>
        <BasicGridLayout>
          <Card
            title="Bebidas"
            img={ImgDrinks}
            btnText="ir a Bebidas"
            link="/home"
          />
          <Card
            title="Cuidad Personal"
            img={ImgDrinks}
            btnText="ir a Cuidado Personal"
            link="/home"
          />
          <Card
            title="snacks"
            img={ImgDrinks}
            btnText="ir a Snacks"
            link="/home"
          />
          <Card
            title="Condimentos y Salsas"
            img={ImgDrinks}
            btnText="ir a Condimentos y Salsas"
            link="/home"
          />
        </BasicGridLayout>
      </StandardSection>
    </>
  );
}

export default HomeSectionCategories;
