import { useCart } from "../hooks/useCart";
import { API_URL } from "../auth/constants";

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();

  let { id, name, description, images, categoria, price, priceIVA } = product;

  return (
    <div className="p-2 border border-gray-400">
      <h4 className="text-lg font-semibold mb-1">{name}</h4>
      <p className="mb-2">{description}</p>

      {images.map((image, i) => (
        <img
          key={i}
          className="w-full"
          src={`${API_URL}/public/images/products/${image.url}`}
        />
      ))}

      <h5>{categoria}</h5>
      <h4 className="mb-2">
        {price} - <span className="font-bold"> Precio con IVA: {priceIVA}</span>
      </h4>
      <button
        onClick={() => addToCart(id)}
        className="block m-auto md:m-0 bg-secondary hover:bg-secondary-accent text-white py-1 px-2 rounded-md font-semibold mb-3"
      >
        Agregar
      </button>
    </div>
  );
};

export default ProductItem;
