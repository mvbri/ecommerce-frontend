import HomeBanner from "../components/HomeBanner";
import HomeLayout from "../layout/HomeLayout";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="flex items-center justify-center max-w-[1400px] w-full m-auto">
        <HomeBanner />
      </div>
    </HomeLayout>
  );
};

export default HomePage;
