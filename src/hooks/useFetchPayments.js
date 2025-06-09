import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    try {
      const res = await axiosInstance.get("/api/checkout");

      if (res.status === 200) {
        const data = res.data.payments;

        setPayments(data);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { payments, setPayments };
};
