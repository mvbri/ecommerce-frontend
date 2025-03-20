import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function DashboardLayout({ children }) {
  const auth = useAuth();
  return (
    <>
      <header>
        <nav className="p-2">
          <Link className="ml-4" to="/">
            Inicio
          </Link>
          <Link className="ml-2" to="/productos">
            Ver productos
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

export default DashboardLayout;
