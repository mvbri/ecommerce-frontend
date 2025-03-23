import { TYPES } from "../actions/shoppingAction";

export const shoppingInitialState = {
  products: [
    {
      id: 1,
      name: "Producto 1",
      price: 100,
    },
    {
      id: 2,
      name: "Producto 2",
      price: 200,
    },
    {
      id: 3,
      name: "Producto 3",
      price: 300,
    },
    {
      id: 4,
      name: "Producto 4",
      price: 400,
    },
    {
      id: 5,
      name: "Producto 5",
      price: 500,
    },
    {
      id: 6,
      name: "Producto 6",
      price: 600,
    },
  ],
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
                    total: item.price * (item.quantity + 1),
                  }
                : item
            ),
            total: state.total + itemInCart.price,
          }
        : {
            ...state,
            cart: [
              ...state.cart,
              { ...newItem, quantity: 1, total: newItem.price * 1 },
            ],
            total: newItem.price + state.total,
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
                    total: item.price * (item.quantity - 1),
                  }
                : item
            ),
            total: state.total - itemToDelete.price,
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
            total: state.total - itemToDelete.price,
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
      return shoppingInitialState;
    }
    default:
      return state;
  }
}
