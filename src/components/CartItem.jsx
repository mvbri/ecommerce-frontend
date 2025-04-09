import { API_URL } from "../auth/constants";

const CartItem = ({ data, delFromCart }) => {
  let { id, name, description, images, categoria, price, priceIVA, quantity } =
    data;

  return (
    <div className="border-b p-2 mb-2">
      <h4
        className="mb-2 text-lg font-semibold
"
      >
        {name}
      </h4>
      <p className="mb-2">{description}</p>
      <h5>
        {price} <span className="font-bold">precio con IVA: {priceIVA}</span>
      </h5>
      <h5></h5>

      <h5 className="mb-3">
        {priceIVA} x{quantity} = {priceIVA * quantity}
      </h5>
      {images.map((image, i) => (
        <figure key={i} className="mb-3">
          <img
            className="object-fit max-h-[300px]"
            src={`${API_URL}/public/images/products/${image.url}`}
          />
        </figure>
      ))}

      <h5>{categoria}</h5>
      <div className="m-auto md:m-0 w-fit">
        <button
          onClick={() => delFromCart(id)}
          className="bg-secondary hover:bg-secondary-accent text-white w-fit py-1 px-2 rounded-md
  font-semibold mb-3"
        >
          Eliminar 1
        </button>
        <button
          onClick={() => delFromCart(id, true)}
          className="bg-secondary hover:bg-secondary-accent text-white ml-4 w-fit py-1 px-2 rounded-md
  font-semibold mb-3"
        >
          Eliminar todo
        </button>
      </div>
    </div>
  );
};

export default CartItem;
