import { Link } from "react-router-dom";
function DefaultLayout({ children }) {
  return (
    <>
      <header>
        <nav className="p-2">
          <Link className="ml-4" to="/">
            Inicio
          </Link>
          <Link className="ml-2" to="/signup">
            Signup
          </Link>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}

export default DefaultLayout;
