import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchProductsHome = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/api/category/inicio")
      .then((res) => {
        if (res.status === 200) {
          setItems(res.products);
          console.log(res);
        } else {
          throw new Error(`[${res.status}] ERROR en la solicitud`);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return { items };
};
