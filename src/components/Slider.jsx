import { useState, useEffect } from "react";
import HomeBanner from "./HomeBanner";
import "./css/Slider.css";

const slides = [
  <HomeBanner key="1" />,
  <div key="2" className="p-6 bg-green-500 text-white rounded-lg">
    Slide 2: Otro contenido aquí.
  </div>,
  <div key="3" className="p-6 bg-red-500 text-white rounded-lg">
    Slide 3: Otro contenido aquí.
  </div>,
];

const Slider = () => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [index, setIndex] = useState(0);
  const intervalTime = 3000;

  useEffect(() => {
    let animationFrame;

    const updateSlide = () => {
      if (index === slides.length - 1) {
        // Desactivar la transición y volver al inicio
        setIsTransitioning(false);
      }
      if (index === 0) {
        setIsTransitioning(true);
      }

      animationFrame = requestAnimationFrame(() =>
        setIndex((prevIndex) => (prevIndex + 1) % slides.length)
      );
    };

    const interval = setInterval(updateSlide, intervalTime);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
    };
  }, [index]);

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="slide">
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
