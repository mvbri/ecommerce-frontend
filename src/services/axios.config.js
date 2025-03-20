import axios from "axios";

const URL = `${import.meta.env.VITE_API_URL}`;

export const axiosInstance = axios.create({
  baseURL: URL,
});

export const setAuthToken = (accessToken) => {
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
