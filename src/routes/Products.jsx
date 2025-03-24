import { useFilter } from "../hooks/useFilter";
import { useReducer, useEffect } from "react";
import { axiosInstance } from "../services/axios.config";
import {
  productsInitialState,
  productsReducer,
} from "../reducers/productReducer";

const Products = () => {
  const { filterProducts } = useFilter();

  const [state, dispatch] = useReducer(productsReducer, productsInitialState);

  const { products } = state;

  useEffect(() => {
    axiosInstance
      .get(`/stockProducts`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "SET_PRODUCTS", payload: res.data });
        } else {
          throw new Error(`[${res.status}] Error en la solicitud`);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = filterProducts(products);

  return (
    <>
      <div className="grid-responsive max-w-[1200px] m-auto">
        {filteredProducts.map((product) => (
          <div className="flex flex-col items-center" key={product.id}>
            <div className="mb-2">
              <img
                className="h-[300px] object-cover"
                src={product.image}
                alt={product.name}
              />
            </div>
            <h3 className="mb-4 font-semibold">{product.name}</h3>
            <button
              className="bg-sky-500/75 w-fit py-1 px-2 rounded-md
 hover:bg-sky-700  hover:border-sky- font-semibold mb-3"
            >
              Agrega al carrito
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
