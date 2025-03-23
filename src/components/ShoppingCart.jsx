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

  const calculateTotal = () => {
    dispatch({
      type: TYPES.CALCULATE_TOTAL_CART,
    });
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      <h3>Productos</h3>
      <article className="box grid-responsive">
        {products.map((product) => (
          <ProductItem key={product.id} data={product} addToCart={addToCart} />
        ))}
      </article>
      <h3>Carrito</h3>
      <article className="box">
        <button
          className="bg-sky-500/75 w-fit py-1 px-2 rounded-md
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
        <h2>{total}</h2>
      </div>
    </div>
  );
};

export default ShoppingCart;
