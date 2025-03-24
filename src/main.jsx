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
import AdminShowProducts from "./routes/AdminShowProducts.jsx";
import Shopping from "./routes/Shopping.jsx";
import ShowProducts from "./routes/ShowProducts.jsx";
import { FilterProvider } from "./context/filter.jsx";
import { CartProvider } from "./context/cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <ShowProducts />,
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/create",
        element: <CreateProducts />,
      },
      {
        path: "/admin-show",
        element: <AdminShowProducts />,
      },
      {
        path: "/shopping",
        element: <Shopping />,
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
