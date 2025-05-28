import axios from "axios";
import React from 'react';
import { useAuth } from '../auth/AuthProvider'; // Ajusta la ruta según tu estructura
const URL = `${import.meta.env.VITE_API_URL}`;
export const axiosInstance = axios.create({
  baseURL: URL,
});
export const setAuthToken = (accessToken) => {
  if (accessToken) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
// Configurar el interceptor
const setupAxiosInterceptors = (handleSignOut) => {
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        handleSignOut(); // Llamar al método de sign out
      }
      return Promise.reject(error);
    }
  );
};
export const useAxiosWithAuth = () => {
  const { handleSignOut } = useAuth();
  // Efecto para configurar los interceptores
  React.useEffect(() => {
    setupAxiosInterceptors(handleSignOut);
  }, [handleSignOut]);
  return axiosInstance;
};