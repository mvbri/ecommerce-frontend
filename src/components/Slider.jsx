import { useState, useEffect } from "react";
import "./css/Slider.css";

const Slider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [index, setIndex] = useState(0);
  const intervalTime = 3000;

  useEffect(() => {
    let animationFrame;

    const updateSlide = () => {
      if (index === children.length - 1) {
        // Desactivar la transición y volver al inicio
        setIsTransitioning(false);
      }
      if (index === 0) {
        setIsTransitioning(true);
      }

      animationFrame = requestAnimationFrame(() =>
        setIndex((prevIndex) =>
          prevIndex === children.length - 1 ? 0 : prevIndex + 1
        )
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
        className="sliders"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {children.map((child, i) => (
          <div key={i} className="slide">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
