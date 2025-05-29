import { createRoot } from "react-dom/client";
import "./output.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./routes/Signup.jsx";
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
import CreateCategory from "./routes/CreateCategory.jsx";
import ShowDeliveries from "./routes/ShowDeliveries.jsx";
import DeliveryDashboard from "./routes/DeliveryDashboard.jsx";
import ShowOrders from "./routes/ShowOrders.jsx";
import EditOrder from "./routes/EditOrder.jsx";
import UserProfile from "./routes/UserProfile.jsx";
import PasswordChange from "./routes/PasswordChange.jsx";
import UserAddresses from "./routes/UserAddresses.jsx";
import CreateAddresses from "./routes/CreateAddresses.jsx";
import ShowUserOrders from "./routes/ShowUserOrders.jsx";
import ShowUserOrder from "./routes/ShowUserOrder.jsx";
import AdminShowOrders from "./routes/AdminShowOrders.jsx";
import AdminEditOrder from "./components/AdminEditOrder.jsx";
import AdminShowCategories from "./routes/AdminShowCategories.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/productos",
    element: <ShowProducts />,
  },
  {
    path: "/busqueda",
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
        element: <HomePage />,
      },
      {
        path: "/perfil",
        element: <UserProfile />,
      },
      {
        path: "/contraseña",
        element: <PasswordChange />,
      },
      {
        path: "/direcciones",
        element: <UserAddresses />,
      },
      {
        path: "/direcciones/crear",
        element: <CreateAddresses />,
      },
      {
        path: "/direcciones/:id/editar",
        element: <CreateAddresses key="edit" />,
      },
      {
        path: "/compras",
        element: <ShowUserOrders />,
      },
      {
        path: "/compras/:id",
        element: <ShowUserOrder />,
      },
      {
        path: "/compra",
        element: <Shopping />,
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
        path: "producto/crear",
        element: <CreateProducts key="create" />,
      },
      {
        path: "producto/:id/editar",
        element: <CreateProducts key="edit" />,
      },
      {
        path: "productos",
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
        element: <CreateDelivery key="edit" />,
      },
      {
        path: "categoria/crear",
        element: <CreateCategory />,
      },
      {
        path: "categorias",
        element: <AdminShowCategories />,
      },
      {
        path: "categoria/:id/editar",
        element: <CreateCategory key="edit" />,
      },
      {
        path: "ordenes",
        element: <AdminShowOrders />,
      },
      {
        path: "ordenes/:id/editar",
        element: <AdminEditOrder />,
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
