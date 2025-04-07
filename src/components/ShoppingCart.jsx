import ProductItem from "./ProductItem";
import "../components/css/ShoppingCart.css";
import CartItem from "./cartItem";
import { useCart } from "../hooks/useCart";
import StandardSection from "./StandardSection";

const ShoppingCart = () => {
  const { cart, addToCart, clearCart, delFromCart, products, total } =
    useCart();

  return (
    <StandardSection>
      <div className="p-3 max-w-[1400px] m-auto">
        <h2 className="text-center text-xl mb-4 font-bold">
          Carrito de compras
        </h2>
        <h3 className="text-center text-lg font-semibold">Productos</h3>
        <article className="box grid-responsive mb-3">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </article>
        <h3 className="text-center text-lg font-semibold">Carrito</h3>
        <article className="box flex flex-col">
          <button
            className="bg-secondary hover:bg-secondary-accent text-white self-end mr-3 mt-2 w-fit py-1 px-2 rounded-md
  font-semibold mb-3"
            onClick={clearCart}
          >
            Limpiar carrito
          </button>
          {cart.map((item, index) => (
            <CartItem key={index} data={item} delFromCart={delFromCart} />
          ))}
        </article>
        <div>
          <h2 className="ml-4 p-2 text-2xl text-center font-bold">
            TOTAL: {total.toFixed(2)}
          </h2>
        </div>
      </div>
    </StandardSection>
  );
};

export default ShoppingCart;
