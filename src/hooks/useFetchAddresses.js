import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchAddresses = () => {
const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    getAddresses()
  }, []);

  const getAddresses = async () => {
    try {
      const res = await axiosInstance.get(`/api/address`);
      if (res.status === 200) {
        const addresses = res.data.data;

        setAddresses(addresses);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return { addresses };
};
