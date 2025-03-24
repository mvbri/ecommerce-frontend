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
import ShowProducts from "./routes/showProducts.jsx";
import AdminLogin from "./routes/AdminLogin.jsx";

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
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <AdminLogin />,
      },
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
        element: <ShowProducts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
