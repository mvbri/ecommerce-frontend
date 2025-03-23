import {
  shoppingInitialState,
  shoppingReducer,
} from "../reducers/shoppingReducer";
import ProductItem from "./ProductItem";
import { useReducer } from "react";
import "../components/css/ShoppingCart.css";
import CartItem from "./cartItem";
import { TYPES } from "../actions/shoppingAction";

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  const { products, cart, total } = state;
  const addToCart = (id) => {
    dispatch({
      type: TYPES.ADD_TO_CART,
      payload: id,
    });
  };
  const delFromCart = (id, all = false) => {
    if (!all) {
      dispatch({
        type: TYPES.REMOVE_ONE_FROM_CART,
        payload: id,
      });
      return;
    }

    dispatch({
      type: TYPES.REMOVE_ALL_FROM_CART,
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: TYPES.CLEAR_CART,
    });
  };

  return (
    <div className="p-3 max-w-[1200px] m-auto">
      <h2 className="text-center text-xl mb-4 font-bold">Carrito de compras</h2>
      <h3 className="text-center text-lg font-semibold">Productos</h3>
      <article className="box grid-responsive mb-3">
        {products.map((product) => (
          <ProductItem key={product.id} data={product} addToCart={addToCart} />
        ))}
      </article>
      <h3 className="text-center text-lg font-semibold">Carrito</h3>
      <article className="box flex flex-col">
        <button
          className="bg-sky-500/75 self-end mr-3 mt-2 w-fit py-1 px-2 rounded-md
 hover:bg-sky-700  hover:border-sky- font-semibold mb-3"
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
          TOTAL: {total}
        </h2>
      </div>
    </div>
  );
};

export default ShoppingCart;
