import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await axiosInstance.get(`/api/category`);
      if (res.status === 200) {
        const categories = res.data.data;

        setCategories(categories);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { categories };
};
