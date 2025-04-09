import { createContext, useEffect, useReducer } from "react";
import { TYPES } from "../actions/shoppingAction";
import { axiosInstance } from "../services/axios.config";
import {
  shoppingInitialState,
  shoppingReducer,
} from "../reducers/shoppingReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  useEffect(() => {
    axiosInstance
      .get(`/api/category/inicio`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "SET_PRODUCTS", payload: res.data.products });
        } else {
          throw new Error(`[${res.status}] Error en la solicitud`);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, delFromCart, products, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
