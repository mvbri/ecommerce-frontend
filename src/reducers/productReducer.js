import { TYPES } from "../actions/productsAction";

export const productsInitialState = {
  products: [],
};

export function productsReducer(state, action) {
  switch (action.type) {
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
