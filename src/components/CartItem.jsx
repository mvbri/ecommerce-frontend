import { Link } from "react-router-dom";
import { API_URL } from "../auth/constants";
import NumberInput from "./NumberInput";

const CartItem = ({ product, quantity, delFromCart, updateQuantityCart }) => {
  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity !== quantity) {
      await updateQuantityCart(_id, newQuantity); // Actualiza el estado de cantidad en el padre
    }
  };

  let { _id, name, description, images, slug, category, price, priceIVA } =
    product;

  return (
    <li className="flex py-6">
      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={name}  
          src={images && images[0]?.url ? `${API_URL}/public/images/products/${images[0].url}` : `${API_URL}/public/images/default.png`}
          className="size-full object-cover"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to={`/producto/${slug}`}>{name}</Link>
            </h3>
            <div className="text-sm">
              <p className="ml-4">Precio sin I.V.A {price} Bs</p>
              <p className="ml-4">Precio con I.V.A {priceIVA} Bs</p>
              <p className="ml-4">
                {priceIVA} Bs x{quantity} = {priceIVA * quantity} Bs
              </p>
            </div>
          </div>
          <p className="ml-1 text-base font-medium text-gray-500">
            {description}
          </p>
          {category && category.map((cat, i) => {
            return (
              <span
                className="ml-1 text-base font-medium text-gray-500"
                key={i}
              >
                {cat.name}
              </span>
            );
          })}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">Cantidad: {quantity}</p>
            <NumberInput
              onQuantityChange={handleQuantityChange}
              quantityDefault={quantity}
            />
          </div>
          <div className="flex">
            <button
              onClick={() => delFromCart(_id, true)}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
