import HomeSectionCategories from "../components/HomeSectionCategories";
import Slider from "../components/Slider";
import HomeLayout from "../layout/HomeLayout";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="max-w-[1400px] m-auto">
        <Slider />
        <HomeSectionCategories />
      </div>
    </HomeLayout>
  );
};

export default HomePage;
