import axios from "axios";

const URL = "http://localhost:3000/stockProducts";

export const axiosInstance = axios.create({
  baseURL: URL,
});
