import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { setAuthToken, useAxiosWithAuth } from "../services/axios.config";
import "../components/css/Navbar.css";
import { useState } from "react";
import logo from "../img/logo.jpeg";

function DeliveryLayout({ children }) {
  const auth = useAuth();
  setAuthToken(auth.getAccessToken());
  const [isOpen, setIsOpen] = useState(false);

  useAxiosWithAuth();

  const handleOpen = () => setIsOpen(!isOpen);
  return (
    <>
      <header className="navbar-container">
        <div className="max-w-[1400px] m-auto flex justify-between w-full">
          <Link to="/">
            <img
              className="logo w-[80px] h-[80px] rounded-full"
              src={logo}
              alt="Logo"
            />
          </Link>
          <div className="flex items-center justify-center">
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
              <Link className="navbar-item" to="/delivery/ordenes">
                Lista de Pedidos
              </Link>
            </div>
            <div className="navbar-section">
              {auth.isAuthenticated ? (
                <button onClick={auth.handleSignOut} className="navbar-item">
                  Cerrar sesion
                </button>
              ) : (
                <Link className="navbar-item" to="/login">
                  Inicia sesión
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </>
  );
}

export default DeliveryLayout;
