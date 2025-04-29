import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchProducts = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/api/admin/products")
      .then((res) => {
        if (res.status === 200) {
          setItems(res.data.data);
        } else {
          throw new Error(`[${res.status}] ERROR en la solicitud`);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return { items, setItems };
};
