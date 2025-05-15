import { Link } from "react-router-dom";
import logo from "../img/logo.jpeg";

function DefaultLayout({ children }) {
  return (
    <>
      <header className="max-w-[1400px] m-auto">
        <nav className="px-3 py-2 flex items-center">
          <Link to="/home">
            <img
              className="w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] rounded-full"
              src={logo}
              alt="Logo"
            />
          </Link>
          <Link
            className="ml-4 text-secondary hover:text-secondary-accent"
            to="/"
          >
            Inicio
          </Link>
          <Link
            className="ml-4 text-secondary hover:text-secondary-accent"
            to="/signup"
          >
            Signup
          </Link>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}

export default DefaultLayout;
