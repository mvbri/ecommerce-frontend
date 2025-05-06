import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchOrder = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async ({ _id }) => {
    try {
      const res = await axiosInstance.get(`/api/delivery/orders/${_id}`);
      if (res.status === 200) {
        const order = res.data.data;

        setOrder(order);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { order };
};
