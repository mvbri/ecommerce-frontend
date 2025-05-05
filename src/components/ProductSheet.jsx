import React from 'react'
import { useFetchProduct } from '../hooks/useFetchProduct'
import { API_URL } from '../auth/constants';
import { useCart } from "../hooks/useCart";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductSheet = ({slug}) => {
    const { product, images } = useFetchProduct(slug)
    //  const { addToCart } = useCart();
    const images_test = images.map((image) => {
        let imageUrl = image.url; // Obtiene la URL de la primera imagen
        imageUrl =
          typeof imageUrl != "undefined"
            ? `${API_URL}/public/images/products/${imageUrl}`
            : `${API_URL}/public/images/default.png`;
            
        return {
            original: imageUrl,
          originalClass: "w-full object-cover customImg",
            thumbnail: imageUrl,
            thumbnailHeight: '100px',
            thumbnailWidth: '100px',
          }
    })
    const test_images = [
        {
          original: "https://picsum.photos/id/1018/1000/600/",
          thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
          original: "https://picsum.photos/id/1015/1000/600/",
          thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
          original: "https://picsum.photos/id/1019/1000/600/",
          thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
      ];
             
  return (
    <article>
        <div className='flex flex-col md:flex-row mb-8'>
            <div className='w-full md:w-[50%]'>
                <h2 className='text-2xl md:text-4xl mb-4'>{product.name}</h2>
                    {/* {images.map((image, i) => (
                        <img className='w-full object-cover h-[31.25rem]' key={i} src={ typeof image !== "undefined"
                        ? `${API_URL}/public/images/products/${image.url}`
                        : `${API_URL}/public/images/default.png` }  />
                ))} */}
                <ImageGallery items={images_test} />
            </div>
            <div className="product-details p-2 px-3">
                <h4 className='text-2xl md:text-4xl pb-8'>{product.price}$</h4>
                <button className='block m-auto md:m-0 bg-secondary hover:bg-secondary-accent text-white py-4 px-8 rounded-md font-semibold mb-8'>Agregar al carrito</button> 
                <div className="description">
                    <h3 className='text-2xl md:text-4xl'>Descripción</h3>
                    <p>{product.description}</p>
                 </div>
            </div>
        </div>
    </article>

  )
}

export default ProductSheet