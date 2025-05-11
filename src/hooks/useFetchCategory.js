import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchCategory = (slug) => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
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
      console.log(err);
    }
  };

  return { products, category };
};
