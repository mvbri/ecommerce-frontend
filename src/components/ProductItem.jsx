import { useCart } from "../hooks/useCart";
import { API_URL } from "../auth/constants";
import { Link, Navigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();

  let { _id, name, description, images, categoria, price, priceIVA, slug } =
    product;

  return (
    <div className="p-2 border border-gray-400 m-auto max-w-[400px] pointer">
      <Link
        to={{
          pathname: `/producto/${slug}`,
        }}
      >
        <h4 className="text-lg font-semibold mb-1">{name}</h4>
      </Link>

      <p className="mb-2">{description}</p>
      <Link
        to={{
          pathname: `/producto/${slug}`,
        }}
      >
        <img
          className="w-full mb-4"
          src={`${API_URL}/public/images/products/${images[0].url}`}
        />
      </Link>
      <h5>{categoria}</h5>
      <h4 className="mb-2">
        {price} -{" "}
        <span className="font-bold mb-2"> Precio con IVA: {priceIVA}</span>
      </h4>
      <button
        onClick={() => addToCart(_id)}
        className="block m-auto md:m-0 bg-secondary hover:bg-secondary-accent text-white py-1 px-2 rounded-md font-semibold mb-4"
      >
        Agregar
      </button>
    </div>
  );
};

export default ProductItem;
