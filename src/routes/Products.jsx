import { useFilter } from "../hooks/useFilter";
import { useReducer, useEffect } from "react";
import { axiosInstance } from "../services/axios.config";
import {
  productsInitialState,
  productsReducer,
} from "../reducers/productReducer";
import ProductItem from "../components/ProductItem";

const Products = () => {
  const { filterProducts } = useFilter();

  const [state, dispatch] = useReducer(productsReducer, productsInitialState);

  const { products } = state;

  useEffect(() => {
    axiosInstance
      .get(`/api/category/inicio`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "SET_PRODUCTS",
            payload: res.data.products || res.data,
          });
        } else {
          console.log(res + "Aqui");
          throw new Error(`[${res.status}] Error en la solicitud`);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = Array.isArray(products)
    ? filterProducts(products)
    : [];

  return (
    <>
      <article className="box pt-[5.6rem] grid-responsive mb-3">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </article>
    </>
  );
};

export default Products;
