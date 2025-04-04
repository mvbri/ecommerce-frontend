import HomeSectionCategories from "../components/HomeSectionCategories";
import HomeSectionCustomers from "../components/HomeSectionCustomers";
import Slider from "../components/Slider";
import HomeLayout from "../layout/HomeLayout";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="max-w-[1400px] m-auto">
        <Slider />
        <HomeSectionCategories />
        <HomeSectionCustomers />
      </div>
    </HomeLayout>
  );
};

export default HomePage;
