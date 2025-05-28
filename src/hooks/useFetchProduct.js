import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchProduct = (slug) => {
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    getProduct()
  }, [ slug ]);

  const getProduct = async () => {
    try {
      const res = await axiosInstance.get(`/api/product/${slug}`);
      if (res.status === 200) {
        const product = res.data.data;

        setProduct(product);
        setImages(product.images);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return { product , images};
};
