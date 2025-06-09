import HomeSectionCategories from "../components/HomeSectionCategories";
import HomeSectionCustomers from "../components/HomeSectionCustomers";
import HomeSectionProducts from "../components/HomeSectionProducts";
import Slider from "../components/Slider";
import HomeBanner from "../components/HomeBanner";
import HomeLayout from "../layout/HomeLayout";
import CandyImg from "../img/dulces.jpg";
import ShoppingImg from "../img/compras.jpg";
import "../components/css/HomeBanner.css";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="max-w-[1400px] m-auto pt-[7.5rem] md:pt-[5rem]">
        <Slider>
          <HomeBanner />
          <div className="bg-green-500 text-white rounded-lg">
            <div className="grid-container">
              <div className="container">
                <h1 className="title s-center">
                  <span> ¡Todo en </span>
                  <br />
                  <span className="line-2">Chucherías!</span>
                </h1>
                <p className="description s-center">
                  ¿Se te antoja algo rico? En tu abasto, tenemos todas las
                  chucherías, chocolates y dulces que te puedas imaginar. ¡Ven a
                  buscar tu favorita y endulza tu día con nosotros!
                </p>
              </div>
              {/* Imagen*/}
              <div className="graphic">
                <img
                  className="h-64 md:h-96 w-full object-cover"
                  src={CandyImg}
                />
              </div>
            </div>
          </div>
          <div className="bg-blue-600 text-white rounded-lg">
            <div className="grid-container">
              <div className="container">
                <h1 className="title s-center">
                  <span> ¡Compras fáciles, </span>
                  <br />
                  <span className="line-2">vida más simple!</span>
                </h1>
                <p className="description s-center">
                  Tu despensa completa a solo un clic o una visita. Calidad y
                  variedad siempre.
                </p>
              </div>
              {/* Imagen*/}
              <div className="graphic">
                <img
                  className="h-64 md:h-96 w-full object-cover"
                  src={ShoppingImg}
                />
              </div>
            </div>
          </div>
        </Slider>
      </div>
      <HomeSectionCategories />
      <HomeSectionCustomers />
      <HomeSectionProducts />
    </HomeLayout>
  );
};

export default HomePage;
