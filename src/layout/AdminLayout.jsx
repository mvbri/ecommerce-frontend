import { Link } from "react-router-dom";

function AdminLayout({ children }) {
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
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}

export default AdminLayout;
