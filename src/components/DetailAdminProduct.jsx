import { Link } from "react-router-dom";
import { API_URL } from "../auth/constants";


const DetailAdminProduct = ({ product, detail }) => {
  let { _id, name, description, images, category } =
    product;

  let { quantity, price_unit,price_unit_iva, price_total, price_total_iva } =
    detail;

  return (
    <li className="flex py-6 bg-gray-200 p-4 rounded-md">
      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Link to={`/admin/product/${_id}/edit`}>
          <img
            alt={name}
            src={images[0]?.url ? `${API_URL}/public/images/products/${images[0].url}` : `${API_URL}/public/images/default.png`}
            className="size-full object-cover"
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to={`/admin/product/${_id}/edit`}>{name}</Link>
            </h3>
            <div className="text-sm">
              <p className="ml-4">Precio unitario sin IVA {price_unit} Bs</p>
              <p className="ml-4">Precio unitario com IVA {price_unit_iva} Bs</p>
              <p className="ml-4">Precio total {price_total} Bs</p>
              <p className="ml-4">
                {price_total} Bs x{quantity} = {price_total_iva} Bs
              </p>
            </div>
          </div>
          <p className="ml-1 text-base font-medium text-gray-500">
            {description}
          </p>
          {category.map((cat, i) => {
            return (
              <span
                className="ml-1 text-base font-medium text-gray-500"
                key={i}
              >
                {cat.name}
              </span>
            );
          })}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500">Cantidad: {quantity}</p>
          </div>
        </div>
      </div>
    </li >
  );
}

export default DetailAdminProduct