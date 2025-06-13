import { useState } from "react";
import { useFetchProduct } from "../hooks/useFetchProduct";
import { API_URL } from "../auth/constants";
import { useCart } from "../hooks/useCart";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import NumberInput from "./NumberInput";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";

const ProductSheet = ({ slug }) => {
  const auth = useAuth();

  const { product, images } = useFetchProduct(slug);

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity !== quantity) {
      setQuantity(newQuantity); // Actualiza el estado de cantidad en el padre
    }
  };

  const handleAddTocart = (_id, quantity) => {
    setQuantity(1);
    addToCart(_id, quantity);
  };

  const images_products = images.map((image) => {
    let imageUrl = image.url; // Obtiene la URL de la primera imagen
    imageUrl =
      typeof imageUrl != "undefined"
        ? `${API_URL}/public/images/products/${imageUrl}`
        : `${API_URL}/public/images/default.png`;

    return {
      original: imageUrl,
      originalClass: "w-full object-cover customImg",
      thumbnail: imageUrl,
      thumbnailHeight: "100px",
      thumbnailWidth: "100px",
    };
  });

  const images_placeholder = [
    {
      original: `${API_URL}/public/images/default.png`,
      originalClass: "w-full object-cover customImg",
      thumbnail: `${API_URL}/public/images/default.png`,
      thumbnailHeight: "100px",
      thumbnailWidth: "100px",
    },
  ];

  return (
    <article>
      <div className="flex flex-col md:flex-row mb-8 p-4 md:p-8">
        <div className="w-full md:w-[50%]">
          {images_products.length > 0 ? (
            <ImageGallery showPlayButton={false} items={images_products} />
          ) : (
            <ImageGallery
              showThumbnails={false}
              disableSwipe={true}
              showPlayButton={false}
              items={images_placeholder}
            />
          )}
        </div>
        <div className="product-details p-2 px-3">
          <h2 className="text-2xl md:text-4xl mb-4">{product.name}</h2>
          <div className="description">
            <p>{product.description}</p>
          </div>
          <h4 className="text-sm mb-2 font-semibold">{product.price} Bs.</h4>
          <h4 className="text-secondary text-lg font-bold mb-2">
            {product.priceIVA} Bs.
          </h4>

          <div>
            <NumberInput
              onQuantityChange={handleQuantityChange}
              quantityDefault={quantity}
            />
            <div className="my-4">
              {auth.isAuthenticated ? (
                <button
                  onClick={() => handleAddTocart(product._id, quantity)}
                  className="m-auto bg-secondary hover:bg-secondary-accent text-white py-2 px-8 rounded-md font-semibold transition-all duration-300 ease-in"
                >
                  Agregar
                </button>
              ) : (
                <Link
                  className="m-auto  bg-secondary hover:bg-secondary-accent hover:text-white text-white py-2 px-8 rounded-md font-semibold"
                  to="/login"
                  exact
                >
                  Agregar
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductSheet;
