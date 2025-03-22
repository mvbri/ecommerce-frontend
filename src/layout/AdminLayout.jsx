import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function AdminLayout({ children }) {
  const auth = useAuth();
  return (
    <>
      <header>
        <nav className="px-3 py-4">
          <Link className="ml-4" to="/">
            Inicio
          </Link>
          <Link className="ml-4" to="/create">
            Crear Producto
          </Link>
          <Link className="ml-4" to="/show">
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
