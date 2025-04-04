import ImgUser from "../img/user-test.jpg";
import "./css/CardSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const data = [
  {
    name: "Luis",
    img: ImgUser,
    review:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis repellendus natus laudantium facere nostrum magnam.",
  },
  {
    name: "Pedro",
    img: ImgUser,
    review:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis repellendus natus laudantium facere nostrum magnam.",
  },
  {
    name: "Pablo",
    img: ImgUser,
    review:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis repellendus natus laudantium facere nostrum magnam.",
  },
  {
    name: "Gabriela",
    img: ImgUser,
    review:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis repellendus natus laudantium facere nostrum magnam.",
  },
];

function SampleNextArrow(props) {
  const { style, onClick, classNameCustom } = props;
  return (
    <div
      className={` ${classNameCustom ?? ""}`}
      style={{ ...style, display: "block", right: 0 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { style, onClick, classNameCustom } = props;
  return (
    <div
      className={` ${classNameCustom ?? ""}`}
      style={{ ...style, display: "block", left: 0 }}
      onClick={onClick}
    />
  );
}

const CardSlider = () => {
  var settings = {
    dots: true,
    pauseOnHover: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow classNameCustom="arrowCustom" />,
    prevArrow: <SamplePrevArrow classNameCustom="arrowPrevCustom" />,
    appendDots: (dots) => (
      <div
        style={{
          position: "relative",
          bottom: 0,
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map((d, i) => (
          <div className="slide-card" key={i}>
            <img
              className="img-card-slider"
              src={d.img}
              alt="imagen de usuario"
            />
            <h3 className="name">{d.name}</h3>
            <p className="card-slider-review">{`"${d.review}"`}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
