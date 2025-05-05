import { Link } from "react-router-dom";
import logo from "../img/logo.jpeg";
import "../components/css/Navbar.css";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import { useFetchCategories } from "../hooks/useFetchCategories";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  const { categories } = useFetchCategories();

  const handleOpen = () => setIsOpen(!isOpen);
  return (
    <>
      <header className="navbar-container">
        <div className="max-w-[1400px] m-auto flex justify-between w-full mb-2">
          <Link to="/home">
            <img
              className="logo w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] rounded-full mt-1"
              src={logo}
              alt="Logo"
            />
          </Link>
          <div className="flex items-center justify-end">
            <Link className="cart" to="/shopping">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </Link>
            <button
              className={`navbar-toggle ${isOpen ? "open" : ""}`}
              onClick={handleOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <nav className={`navbar ${isOpen ? "open" : ""}`}>
            <div className="navbar-section">
              <Link className="navbar-item" to="/home">
                Inicio
              </Link>
              <Link className="navbar-item whitespace-nowrap" to="/productos/">
                Ver productos
              </Link>
              <Dropdown items={categories} />
              <SearchBar className="hidden lg:flex" />
            </div>
            <div className="navbar-section">
              <Link className="navbar-item hidden lg:block" to="/shopping">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </Link>
              {auth.isAuthenticated ? (
                <button onClick={auth.handleSignOut} className="navbar-item">
                  Cerrar sesion
                </button>
              ) : (
                <Link className="navbar-item" to="/">
                  Inicia sesión
                </Link>
              )}
            </div>
          </nav>
        </div>
        <div className="flex justify-center m-auto items-center lg:hidden w-full mb-2">
          <SearchBar />
        </div>
      </header>
    </>
  );
};

export default Navbar;
