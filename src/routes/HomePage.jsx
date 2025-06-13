import HomeSectionCategories from "../components/HomeSectionCategories";
import HomeSectionCustomers from "../components/HomeSectionCustomers";
import HomeSectionProducts from "../components/HomeSectionProducts";
import Slider from "../components/Slider";
import HomeBanner from "../components/HomeBanner";
import HomeLayout from "../layout/HomeLayout";
import CandyImg from "../img/dulces.jpg";
import ShoppingImg from "../img/compras.jpg";
import "../components/css/HomeBanner.css";
import SimpleSlider from "../components/SimpleSlider";
import StandardSection from "../components/StandardSection";

const HomePage = () => {
  return (
    <HomeLayout>
      <StandardSection>
        <SimpleSlider />
      </StandardSection>
      <HomeSectionCategories />
      <HomeSectionCustomers />
      <HomeSectionProducts />
    </HomeLayout>
  );
};

export default HomePage;
