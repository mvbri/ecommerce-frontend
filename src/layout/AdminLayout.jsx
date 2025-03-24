import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import {  setAuthToken } from "../services/axios.config";

function AdminLayout({ children }) {
  const auth = useAuth();
  setAuthToken(auth.getAccessToken());

  return (
    <>
      <header>
        <nav className="px-3 py-4">
          <Link className="ml-4" to="/admin/dashboard">
            Inicio
          </Link>
          <Link className="ml-4" to="/admin/product/create">
            Crear Producto
          </Link>
          <Link className="ml-4" to="/admin/product/">
            Lista de Productos
          </Link>
          <a className="ml-4" href="#" onClick={auth.handleSignOut}>
            Cerrar sesión
          </a>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}

export default AdminLayout;
