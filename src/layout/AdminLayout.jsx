import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { setAuthToken } from "../services/axios.config";
import logo from "../img/logo.jpeg";

function AdminLayout({ children }) {
  const auth = useAuth();
  setAuthToken(auth.getAccessToken());

  return (
    <>
      <header className="max-w-[1400px] m-auto">
        <nav className="px-3 py-2 flex items-center place-content-between w-full">
          <div className="flex items-center">
            <Link to="/home">
              <img
                className="w-[80px] h-[80px] rounded-full"
                src={logo}
                alt="Logo"
              />
            </Link>
            <Link
              className="ml-4 text-secondary hover:text-secondary-accent"
              to="/admin/dashboard"
            >
              Inicio
            </Link>
            <Link
              className="ml-4 text-secondary hover:text-secondary-accent"
              to="/admin/product/create"
            >
              Crear Producto
            </Link>
            <Link
              className="ml-4 text-secondary hover:text-secondary-accent"
              to="/admin/product/"
            >
              Lista de Productos
            </Link>
          </div>
          <a
            className="ml-4 text-secondary hover:text-secondary-accent"
            href="#"
            onClick={auth.handleSignOut}
          >
            Cerrar sesión
          </a>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}

export default AdminLayout;
