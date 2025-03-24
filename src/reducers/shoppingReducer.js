import { TYPES } from "../actions/shoppingAction";

export const shoppingInitialState = {
  products: [],
  cart: [],
  total: 0,
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      let newItem = state.products.find(
        (product) => product.id === action.payload
      );

      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    total: item.priceIVA * (item.quantity + 1),
                  }
                : item
            ),
            total: state.total + itemInCart.priceIVA,
          }
        : {
            ...state,
            cart: [
              ...state.cart,
              { ...newItem, quantity: 1, total: newItem.price * 1 },
            ],
            total: newItem.priceIVA + state.total,
          };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                    total: item.priceIVA * (item.quantity - 1),
                  }
                : item
            ),
            total: state.total - itemToDelete.priceIVA,
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
            total: state.total - itemToDelete.priceIVA,
          };
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        total:
          state.total -
          state.cart.find((item) => item.id === action.payload).total,
      };
    }
    case TYPES.CLEAR_CART: {
      return {
        ...state,
        cart: [],
        total: 0,
      };
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
