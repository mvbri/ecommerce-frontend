import "./css/HomeBanner.css";
import ImgBanner from "../img/imagen-banner.avif";

const HomeBanner = () => {
  return (
    <section className="main-banner bg-primary">
      {/*Grid container*/}
      <div className="grid-container">
        {/*Banner container*/}
        <div className="container">
          <h1 className="title s-center">
            <span> Viveres</span>
            <br />
            <span className="line-2">Piñero</span>
          </h1>
          <p className="description s-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            debitis ab beatae temporibus aliquam cum consequatur nam at.
            Molestias cupiditate adipisci expedita corporis quas voluptate vel
            laboriosam quibusdam iure non.
          </p>
        </div>
        {/* Imagen*/}
        <div className="graphic">
          <img src={ImgBanner} />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
