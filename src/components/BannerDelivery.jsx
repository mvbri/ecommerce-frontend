import imgShop from "../img/admin/carro-tienda.png";
import { useAuth } from "../auth/AuthProvider";

const BannerDelivery = () => {
  const auth = useAuth();

  return (
    <div className="m-auto bg-blue-100 py-8 px-6 rounded-md md:flex justify-between">
      <div>
        <h1 className="text-2xl md:text-4xl mb-3 font-semibold">
          Bienvenid@, <br></br>
          <span className="text-secondary">{auth.getUser()?.name || null}</span>
        </h1>
        <p className="text-gray-800">
          Revisa tus pedidos y actualiza su estado.
        </p>
      </div>
      <div className="max-w-[10rem] md:h-[auto] md:max-w-[18rem] m-auto md:m-0">
        <img src={imgShop} alt="Tienda" />
      </div>
    </div>
  );
};

export default BannerDelivery;
