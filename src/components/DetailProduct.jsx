import { Link } from "react-router-dom";
import { API_URL } from "../auth/constants";

const DetailProduct = ({ product, detail }) => {
  let { _id, name, description, images, category, price, priceIVA, slug } =
    product;

  let { quantity } = detail;

  return (
    <li className="flex py-6 bg-gray-200 p-4 rounded-md">
      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Link to={`/producto/${slug}`}>
          <img
            alt={name}
            src={
              images[0]?.url
                ? `${API_URL}/public/images/products/${images[0].url}`
                : `${API_URL}/public/images/default.png`
            }
            className="size-full object-cover"
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to={`/producto/${slug}`}>{name}</Link>
            </h3>
            <div className="text-sm">
              <p className="ml-4 font-semibold mb-2">{price} Bs.</p>
              <p className="ml-4 mb-2"> {priceIVA} Bs.</p>
              <p className="ml-4 mb-8">
                {priceIVA} Bs x{quantity} = {priceIVA * quantity} Bs.
              </p>
            </div>
          </div>
          <p className="ml-1 text-base font-medium text-gray-500 mb-4">
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
    </li>
  );
};

export default DetailProduct;
