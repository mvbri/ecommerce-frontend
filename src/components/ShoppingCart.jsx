import "../components/css/ShoppingCart.css";
import CartItem from "./cartItem";
import { useCart } from "../hooks/useCart";
import StandardSection from "./StandardSection";
const ShoppingCart = () => {


  const { cart, clearCart, delFromCart, updateQuantityCart, createOrder } = useCart();
  return (
    <StandardSection>
      {cart?.detail?.length === 0 ? (
        <div className="p-3 max-w-[1400px] m-auto">
          <article className="box flex flex-col">
            <p>No hay productos en el carrito</p>
          </article>
        </div>
      ) : (
        <div className="p-3 max-w-[1400px] m-auto">
          <h2 className="text-center text-xl mb-4 font-bold">
            Carrito de compras
          </h2>
          <h3 className="text-center text-lg font-semibold">Total de Productos <b>{cart.total_quantity}</b></h3>

          <h3 className="text-center text-lg font-semibold">Carrito</h3>
          <article className="box flex flex-col">
            <button
              className="bg-secondary hover:bg-secondary-accent text-white self-end mr-3 mt-2 w-fit py-1 px-2 rounded-md
  font-semibold mb-3"
              onClick={clearCart}
            >
              Limpiar carrito
            </button>

            <div className="grid-rows-4 gap-4">
              {cart?.detail?.map((item, index) => (
                <CartItem key={index} product={item.product} quantity={item.quantity} updateQuantityCart={updateQuantityCart} delFromCart={delFromCart} />
              ))}
            </div>
          </article>
          <div>
            <h2 className="ml-4 p-2 text-2xl text-center font-bold">
              PRODUCTOS : {cart?.total_products.toFixed(2)} Bs
            </h2>
            <h2 className="ml-4 p-2 text-2xl text-center font-bold">
              IVA : {(cart?.total_iva - cart?.total_products).toFixed(2)} Bs
            </h2>
            <h2 className="ml-4 p-2 text-2xl text-center font-bold">
              DELIVERY: {cart?.total_delivery.toFixed(2)} Bs
            </h2>
            <h2 className="ml-4 p-2 text-2xl text-center font-bold">
              TOTAL: {cart?.total.toFixed(2)} Bs
            </h2>

<div className="flex justify-center">
            <button
              className="bg-secondary hover:bg-secondary-accent text-xl text-white self-end mr-3 mt-2 w-fit p-4 rounded-md
  font-semibold mb-3"
              onClick={createOrder}
            >
              Finalizar pedido
            </button>
            </div>
          </div>
        </div>)}
    </StandardSection>
  );
};

export default ShoppingCart;
