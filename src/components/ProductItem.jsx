import { useCart } from "../hooks/useCart";
import { API_URL } from "../auth/constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import NumberInput from "./NumberInput";
import { useAuth } from "../auth/AuthProvider";

const ProductItem = ({ product }) => {
  const auth = useAuth();

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity !== quantity) {
      setQuantity(newQuantity); // Actualiza el estado de cantidad en el padre
    }
  };

  const handleAddTocart = (_id, quantity) => {
    setQuantity(1);

    addToCart(_id, quantity);
  };

  let { _id, name, images, categoria, price, priceIVA, slug } = product;

  return (
    <div className="p-2 border border-gray-400 max-w-[400px] pointer rounded-md py-4">
      <Link
        to={{
          pathname: `/producto/${slug}`,
        }}
      >
        <h4 className="text-lg font-semibold mb-1 text-gray-800 text-center">
          {name}
        </h4>
      </Link>
      <Link
        to={{
          pathname: `/producto/${slug}`,
        }}
      >
        <img
          className="w-full mb-4"
          src={
            images[0]?.url
              ? `${API_URL}/public/images/products/${images[0].url}`
              : `${API_URL}/public/images/default.png`
          }
        />
      </Link>
      <h5>{categoria}</h5>
      <h4 className="mb-2 text-center mb-4">
        {price} Bs -{" "}
        <span className="font-bold mb-2"> Precio con IVA: {priceIVA} bs</span>
      </h4>

      <div className="flex justify-around items-center">
        <NumberInput
          onQuantityChange={handleQuantityChange}
          quantityDefault={quantity}
        />

        {auth.isAuthenticated ? (
          <button
            onClick={() => handleAddTocart(_id, quantity)}
            className="m-auto md:m-0 transition-all duration-300 ease-in bg-secondary hover:bg-secondary-accent text-white py-1 px-4 rounded-md font-semibold mb-4"
          >
            Agregar
          </button>
        ) : (
          <Link
            className="m-auto md:m-0 transition-all duration-300 ease-in bg-secondary hover:bg-secondary-accent text-white py-1 px-4 rounded-md font-semibold mb-4"
            to="/login"
            exact
          >
            Agregar
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
