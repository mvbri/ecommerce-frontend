import CardSlider from "./CardSlider";
import StandardSection from "./StandardSection";

const HomeSectionCustomers = () => {
  return (
    <StandardSection>
      <h2 className="text-2xl md:text-4xl text-center mb-8 md:mb-14 font-semibold">
        Nuestros Clientes <br className="md:hidden" />{" "}
        <span className="text-secondary">lo Dicen</span>
      </h2>
      <CardSlider />
    </StandardSection>
  );
};

export default HomeSectionCustomers;
