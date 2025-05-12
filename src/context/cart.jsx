import { createContext, useEffect, useReducer } from "react";
import { TYPES } from "../actions/shoppingAction";
import { axiosInstance, setAuthToken} from "../services/axios.config";
import { useAuth } from "../auth/AuthProvider";
import {  } from "../services/axios.config";
import {
  shoppingInitialState,
  shoppingReducer,
} from "../reducers/shoppingReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const auth = useAuth();
  setAuthToken(auth.getAccessToken());

  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  const cart = state;


  const addToCart = async (_id, quantity = 1) => {
    let data = {
      _id: state._id,
      quantity: quantity,
      product_id: _id

    }
    try {
      const res = await axiosInstance.post(
        `/api/cart/`,
        data
      );

      if (res.status === 200) {

        const data = res.data.data

        const newState = {
          _id: data._id,
          detail: data.detail,
          total_delivery: data.total_delivery,
          total_products: data.total_products,
          total_iva: data.total_iva,
          total: data.total,
          total_quantity: data.total_quantity
        }

        dispatch({
          type: TYPES.ADD_TO_CART,
          payload: newState
        });

      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }


  };
  const delFromCart = async (_id) => {
    let data = {
      _id: state._id,
      product_id: _id
    }
    try {
      const res = await axiosInstance.put(
        `/api/cart/remove`,
        data
      );

      if (res.status === 200) {

        const data = res.data.data

        const newState = {
          _id: data._id,
          detail: data.detail,
          total_delivery: data.total_delivery,
          total_products: data.total_products,
          total_iva: data.total_iva,
          total: data.total,
          total_quantity: data.total_quantity
        }

        dispatch({
          type: TYPES.REMOVE_ALL_FROM_CART,
          payload: newState,
        });


      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }


  };

  const updateQuantityCart = async (_id, quantity = 1) => {

    let data = {
      _id: state._id,
      quantity: quantity,
      product_id: _id

    }
    try {
      const res = await axiosInstance.put(
        `/api/cart/`,
        data
      );

      if (res.status === 200) {

        const data = res.data.data

        const newState = {
          _id: data._id,
          detail: data.detail,
          total_delivery: data.total_delivery,
          total_products: data.total_products,
          total_iva: data.total_iva,
          total: data.total,
          total_quantity: data.total_quantity
        }

        dispatch({
          type: TYPES.ADD_TO_CART,
          payload: newState
        });

      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }


  };

  const createOrder = async() => {
    
    let data = {
      _id: state._id,
    }
    try {
      const res = await axiosInstance.post(
        `/api/orders`,
        data
      );

      if (res.status === 200) {

        const data  = res.data.cart

        const newState = {
          ...state,
          _id: data._id,
          detail: data.detail,
          total_delivery: data.total_delivery,
          total_products: data.total_products,
          total_iva: data.total_iva,
          total: data.total,
          total_quantity: data.total_quantity
        }

        dispatch({
          type: TYPES.CLEAR_CART,
          payload: newState,
        });


      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
      return state;
    }
  }


  const clearCart = async () => {
    let data = {
      _id: state._id,
    }

    try {
        const res = await axiosInstance.put(
          `/api/cart/remove/all`,
          data
        );

        if (res.status === 200) {

          const data  = res.data.data

          const newState = {
            ...state,
            _id: data._id,
            detail: data.detail,
            total_delivery: data.total_delivery,
            total_products: data.total_products,
            total_iva: data.total_iva,
            total: data.total,
            total_quantity: data.total_quantity
          }

          dispatch({
            type: TYPES.CLEAR_CART,
            payload: newState,
          });


        } else {
          throw Error(`[${res.status}] error en la solicitud`);
        }
      } catch (err) {
        console.log(err);
        return state;
      }
   
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, delFromCart, updateQuantityCart, createOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};
