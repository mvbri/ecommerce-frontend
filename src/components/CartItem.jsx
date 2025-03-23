const CartItem = ({ data, delFromCart }) => {
  let { id, name, price, quantity } = data;

  return (
    <div className="border-b">
      <h4>{name}</h4>
      <h5>
        {price} x{quantity} = {price * quantity}.00
      </h5>
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
