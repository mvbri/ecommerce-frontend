import { Link } from "react-router-dom";

function DefaultLayout({ children }) {
  return (
    <>
      <header>
        <nav className="px-3 py-4">
          <Link className="ml-4" to="/">
            Inicio
          </Link>
          <Link className="ml-4" to="/signup">
            Signup
          </Link>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}

export default DefaultLayout;
