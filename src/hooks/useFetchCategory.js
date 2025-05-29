import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchCategory = (slug) => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategory();
  }, [slug]);

  const getCategory = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/category/${slug}`);
      if (res.status === 200) {
        const category = res.data.data;
        const products = res.data.products;

        setCategory(category);
        setProducts(products);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      setError(err); // Guarda el error
      setProducts([]); // Asegura que `products` sea un array vacío en caso de error
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { products, category, loading, error };
};
