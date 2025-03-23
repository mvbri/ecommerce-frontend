const ProductItem = ({ data, addToCart }) => {
  let { id, name, price } = data;

  return (
    <div className="p-2 border border-gray-400">
      <h4>{name}</h4>
      <h4 className="mb-2">${price}.00</h4>
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
