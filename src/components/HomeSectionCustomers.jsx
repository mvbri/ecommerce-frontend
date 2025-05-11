import CardSlider from "./CardSlider";
import StandardSection from "./StandardSection";
import TitleSection from "./TitleSection";

const HomeSectionCustomers = () => {
  return (
    <StandardSection>
      <TitleSection text="Nuestros Clientes" secondText="lo Dicen" />
      <CardSlider />
    </StandardSection>
  );
};

export default HomeSectionCustomers;
