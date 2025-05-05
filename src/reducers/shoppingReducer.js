import { TYPES } from "../actions/shoppingAction";

export const shoppingInitialState = JSON.parse(
  localStorage.getItem("cart")
) || {
  products: [],
  cart: [],
  total: 0,
};

export const updateLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      let newItem = state.products.find(
        (product) => product._id === action.payload
      );

      let itemInCart = state.cart.find((item) => item._id === newItem._id);

      if (itemInCart) {
        const newState = {
          ...state,
          cart: state.cart.map((item) =>
            item._id === newItem._id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  total: item.priceIVA * (item.quantity + 1),
                }
              : item
          ),
          total: state.total + itemInCart.priceIVA,
        };

        updateLocalStorage(newState);
        return newState;
      }

      const newState = {
        ...state,
        cart: [
          ...state.cart,
          { ...newItem, quantity: 1, total: newItem.priceIVA * 1 },
        ],
        total: newItem.priceIVA + state.total,
      };

      updateLocalStorage(newState);
      return newState;
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item._id === action.payload);

      if (itemToDelete.quantity > 1) {
        const newState = {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  total: item.priceIVA * (item.quantity - 1),
                }
              : item
          ),
          total: state.total - itemToDelete.priceIVA,
        };

        updateLocalStorage(newState);
        return newState;
      }

      const newState = {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
        total: state.total - itemToDelete.priceIVA,
      };

      updateLocalStorage(newState);
      return newState;
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      const newState = {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
        total:
          state.total -
          state.cart.find((item) => item._id === action.payload).total,
      };

      updateLocalStorage(newState);
      return newState;
    }
    case TYPES.CLEAR_CART: {
      const newState = {
        ...state,
        cart: [],
        total: 0,
      };

      updateLocalStorage(newState);
      return newState;
    }
    case TYPES.SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    default:
      return state;
  }
}
