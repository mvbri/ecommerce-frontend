import { Link } from "react-router-dom";
import "./css/Card.css";

const Card = ({ title, img, imgAlt, link, className, description }) => {
  return (
    <Link to={link}>
      <div className={className ? `${className} card group` : "card group"}>
        <h3 className="title-card">{title}</h3>
        <img
          className="img-card group-hover:opacity-75 mb-4"
          src={img}
          alt={imgAlt}
        />
        <p className="text-gray-800 mb-4 text-center">{description}</p>
      </div>
    </Link>
  );
};

export default Card;
