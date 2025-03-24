import { useCart } from "../hooks/useCart";

const ProductItem = ({ product }) => {
  console.log(product);
  const { addToCart } = useCart();

  let { id, name, description, image, categoria, price, priceIVA } = product;

  return (
    <div className="p-2 border border-gray-400">
      <h4 className="text-lg font-semibold mb-1">{name}</h4>
      <p className="mb-2">{description}</p>
      <img className="w-full" src={image}></img>
      <h5>{categoria}</h5>
      <h4 className="mb-2">
        {price} - <span className="font-bold"> Precio con IVA: {priceIVA}</span>
      </h4>
      <button
        onClick={() => addToCart(id)}
        className="bg-sky-500/75 py-1 px-2 rounded-md
 hover:bg-sky-700  hover:border-sky- font-semibold mb-3"
      >
        Agregar
      </button>
    </div>
  );
};

export default ProductItem;
