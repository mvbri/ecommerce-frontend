import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./output.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./routes/Signup.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Login from "./routes/Login.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";
import AdminDashboard from "./routes/adminDashboard.jsx";
import CreateProducts from "./routes/CreateProducts.jsx";
import Shopping from "./routes/Shopping.jsx";
import AdminShowProducts from "./routes/AdminShowProducts.jsx";
import { FilterProvider } from "./context/Filter.jsx";
import { CartProvider } from "./context/cart.jsx";
import AdminLogin from "./routes/AdminLogin.jsx";
import HomePage from "./routes/HomePage.jsx";
import ShowProducts from "./routes/ShowProducts.jsx";
import SearchPageView from "./routes/SearchPageView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <HomePage />,
  },
  {
    path: "shopping",
    element: <Shopping />,
  },
  {
    path: "products",
    element: <ShowProducts />,
  },
  {
    path: "search",
    element: <SearchPageView />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "product/create",
        element: <CreateProducts />,
      },
      {
        path: "product/:id/edit",
        element: <CreateProducts />,
      },
      {
        path: "product",
        element: <AdminShowProducts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <FilterProvider>
          <RouterProvider router={router} />
        </FilterProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
