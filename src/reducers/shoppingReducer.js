import { TYPES } from "../actions/shoppingAction";

export const shoppingInitialState = JSON.parse(
  localStorage.getItem("cart")
) || {
  _id: null,
  detail: [],
  total_delivery: 0,
  total_products: 0,
  total_iva: 0,
  total: 0,
  total_quantity: 0,
};

export const updateLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      const newState = action.payload;

      updateLocalStorage(newState);
      return newState;
    }

    case TYPES.REMOVE_ALL_FROM_CART: {
      const newState = action.payload;

      updateLocalStorage(newState);
      return newState;
    }
    case TYPES.CLEAR_CART: {
      const newState = action.payload;

      updateLocalStorage(newState);
      return newState;
    }

    default:
      return state;
  }
}
