import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function AdminLayout({ children }) {
  const auth = useAuth();
  return (
    <>
      <header>
        <nav className="p-2">
          <Link className="ml-4" to="/">
            Inicio
          </Link>
          <Link className="ml-2" to="/create">
            Crear Producto
          </Link>
          <Link className="ml-2" to="/show">
            Lista de Productos
          </Link>
          <a className="ml-2" href="#" onClick={auth.handleSignOut}>
            Cerrar sesión
          </a>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}

export default AdminLayout;
