import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    getDeliveries();
  }, []);

  const getDeliveries = async () => {
    try {
      const res = await axiosInstance.get(`/api/admin/users/delivery`);
      if (res.status === 200) {
        const deliveries = res.data.data;

        setDeliveries(deliveries);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { deliveries };
};
