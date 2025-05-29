import { useEffect, useState } from "react";
import { axiosInstance } from "../services/axios.config";

export const useFetchOrdersChart = () => {
  const [orders, setOrders] = useState([]);

  const [dataChart, setData] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await axiosInstance.get(`/api/admin/ordersData/`);
      if (res.status === 200) {
        const data = res.data;

        setProducts(data.products);
        setCategory(data.category);
        setCustomers(data.customers);
        setOrders(data.orders);
        setData(data.data);
      } else {
        throw Error(`[${res.status}] error en la solicitud`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { orders, dataChart, category, products, customers };
};
