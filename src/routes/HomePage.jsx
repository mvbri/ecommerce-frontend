// import HomeBanner from "../components/HomeBanner";
import Slider from "../components/Slider";
import HomeLayout from "../layout/HomeLayout";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="flex items-center justify-center max-w-[1400px] w-full m-auto">
        {/* <HomeBanner /> */}
        <Slider />
      </div>
    </HomeLayout>
  );
};

export default HomePage;
