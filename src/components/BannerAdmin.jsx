import imgShop from "../img/admin/carro-tienda.png";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";

const BannerAdmin = () => {
  const auth = useAuth();

  return (
    <div className="m-auto bg-blue-100 py-8 px-6 rounded-md md:flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-4xl mb-3 font-semibold">
          Bienvenid@, <br></br>
          <span className="text-secondary">{auth.getUser()?.name || null}</span>
        </h1>
        <p className="text-gray-800 mb-8">
          Aquí está lo que está pasando actualmente con tu tienda. Mira todas
          las estadísticas a la vez.
        </p>
        <Link
          to="/admin/producto/crear"
          className="mb-4 flex gap-1 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
        >
          Crear nuevo producto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      </div>
      <div className="max-w-[10rem] md:h-[auto] md:max-w-[18rem] m-auto md:m-0">
        <img src={imgShop} alt="Tienda" />
      </div>
    </div>
  );
};

export default BannerAdmin;
