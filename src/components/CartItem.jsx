const CartItem = ({ data, delFromCart }) => {
  let { id, name, description, image, categoria, price, priceIVA, quantity } =
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
      <img src={image} />
      <h5>{categoria}</h5>
      <button
        onClick={() => delFromCart(id)}
        className="bg-sky-500/75 w-fit py-1 px-2 rounded-md
 hover:bg-sky-700  hover:border-sky- font-semibold mb-3"
      >
        Eliminar 1
      </button>
      <button
        onClick={() => delFromCart(id, true)}
        className="bg-sky-500/75 ml-4 w-fit py-1 px-2 rounded-md
 hover:bg-sky-700  hover:border-sky- font-semibold mb-3"
      >
        Eliminar todo
      </button>
    </div>
  );
};

export default CartItem;
