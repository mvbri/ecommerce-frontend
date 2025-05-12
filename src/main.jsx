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
import ShowCategories from "./routes/ShowCategories.jsx";
import ShowProduct from "./routes/ShowProduct.jsx";
import CreateDelivery from "./routes/CreateDelivery.jsx";
import ShowDeliveries from "./routes/ShowDeliveries.jsx";
import DeliveryDashboard from "./routes/DeliveryDashboard.jsx";
import ShowOrders from "./routes/ShowOrders.jsx";
import EditOrder from "./routes/EditOrder.jsx";

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
    path: "/shopping",
    element: <Shopping />,
  },
  {
    path: "/productos",
    element: <ShowProducts />,
  },
  {
    path: "/search",
    element: <SearchPageView />,
  },
  {
    path: "/categoria/:slug",
    element: <ShowCategories />,
  },
  {
    path: "/producto/:slug",
    element: <ShowProduct />,
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
        element: <CreateProducts key="create" />,
      },
      {
        path: "product/:id/edit",
        element: <CreateProducts key="edit" />,
      },
      {
        path: "product",
        element: <AdminShowProducts />,
      },
      {
        path: "delivery/crear",
        element: <CreateDelivery />,
      },
      {
        path: "deliveries",
        element: <ShowDeliveries />,
      },
      {
        path: "delivery/:id/editar",
        element: <CreateProducts key="edit" />,
      },
    ],
  },
  {
    path: "/delivery",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <DeliveryDashboard />,
      },
      {
        path: "ordenes",
        element: <ShowOrders />,
      },
      {
        path: "orden/:id/editar",
        element: <EditOrder />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <CartProvider>
        <FilterProvider>
          <RouterProvider router={router} />
        </FilterProvider>
      </CartProvider>
    </AuthProvider>
);
