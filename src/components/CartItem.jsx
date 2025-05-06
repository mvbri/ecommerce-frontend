import { API_URL } from "../auth/constants";
import NumberInput from './NumberInput';

const CartItem = ({ product, quantity, delFromCart, updateQuantityCart }) => {


  const handleQuantityChange = (newQuantity) => {
    if (newQuantity !== quantity) {
      updateQuantityCart(_id, newQuantity); // Actualiza el estado de cantidad en el padre

    }
  };

  let { _id, name, description, images, category, price, priceIVA } =
    product;

  return (
    <div className="border-b p-2 mb-2 ">
      <div class="grid grid-flow-col grid-rows-2 gap-4">
        <div class="grid-responsive row-span-3 ...">
          <figure className="mb-3">
            <img
              className="w-full mb-4 max-h-[300px]"
              src={`${API_URL}/public/images/products/${images[0].url}`}
            />
          </figure>
        </div>
        <div class="col-span-2 ...">
          <h4
            className="mb-2 text-lg font-semibold
"
          >
            {name}
          </h4>
          <p className="mb-2">{description}</p>
          <h5>
            Precio sin IVA: {price.toFixed(2)} Bs
          </h5>
          <h5><span className="font-bold">precio con IVA: {priceIVA.toFixed(2)} Bs</span></h5>

          <h5 className="mb-3">
            {priceIVA.toFixed(2)}  Bs x {quantity} = {(priceIVA * quantity).toFixed(2)} Bs
          </h5>
          <h5>{category[0].name}</h5>

        </div>
        <div class="col-span-2 row-span-2 flex justify-start">
          <NumberInput onQuantityChange={handleQuantityChange} quantityDefault={quantity} />
          <div>
            <button
              title="Eliminar producto del carrito"
              onClick={() => delFromCart(_id, true)}
              className="bg-secondary hover:bg-secondary-accent text-white ml-4 w-fit py-1 px-2 rounded-md
  font-semibold mb-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
              </svg>

            </button>
          </div>
        </div>
      </div>






    </div>
  );
};

export default CartItem;
