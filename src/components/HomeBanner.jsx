import "./css/HomeBanner.css";
import ImgBanner from "../img/imagen-banner.avif";

const HomeBanner = () => {
  return (
    <div className="main-banner bg-primary">
      {/*Grid container*/}
      <div className="grid-container">
        {/*Banner container*/}
        <div className="container">
          <h1 className="title s-center">
            <span> Viveres</span>
            <br />
            <span className="line-2">Piñero</span>
          </h1>
          <h3 className="font-semibold s-center text-gray-800">
            ¡Tu Despensa Completa, Cerca de Ti!
          </h3>
          <p className="description s-center text-gray-700">
            ¡Aquí en nuestro abasto, hacer tu compra es fácil y rápido!
            Encuentra toda la variedad de productos frescos y esenciales que tu
            hogar necesita, siempre con la comodidad y los precios que buscas.
            ¡Ven y llena tu carrito sin complicaciones!
          </p>
        </div>
        {/* Imagen*/}
        <div className="graphic">
          <img className="h-64 md:h-96 w-full object-cover" src={ImgBanner} />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
