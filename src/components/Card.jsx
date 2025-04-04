import { Link } from "react-router-dom";
import "./css/Card.css";

const Card = ({ title, img, imgAlt, btnText, link }) => {
  return (
    <div className="card">
      <h3 className="title-card">{title}</h3>
      <img className="img-card" src={img} alt={imgAlt} />
      <Link className="btn-card" to={link}>
        {btnText}
      </Link>
    </div>
  );
};

export default Card;
