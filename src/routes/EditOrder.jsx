import FormEditOrder from "../components/FormEditOrder";
import StandardSection from "../components/StandardSection";
import DeliveryLayout from "../layout/DeliveryLayout";
import { useParams } from "react-router";


import { useState, useEffect } from "react";
import BasicGridLayout from "../components/BasicGridLayout";
import { axiosInstance } from "../services/axios.config";
import DetailAdminProduct from "../components/DetailAdminProduct";
import ImageGallery from "react-image-gallery";
import { API_URL } from '../auth/constants';


const EditOrder = () => {
  const [orderVal, setOrderVal] = useState({})
  const params = useParams();


  useEffect(() => {
    if (typeof params.id != "undefined") getValues();

  }, [params]);

  const formatDate = (date) => {
    const newdate = new Date(date);
    return new Intl.DateTimeFormat('es-VE').format(newdate);
  }

  const images = [{
    original: orderVal && orderVal.voucher && orderVal.voucher.image ? `${API_URL}/public/images/voucher/${orderVal.voucher.image.url}` : "",
    originalClass: "w-full object-cover customImg",
    thumbnail: orderVal && orderVal.voucher && orderVal.voucher.image ? `${API_URL}/public/images/voucher/${orderVal.voucher.image.url}` : "",
    thumbnailHeight: '100px',
    thumbnailWidth: '100px',
  }];

  const getValues = async () => {
    try {
      const res = await axiosInstance.get(`/api/delivery/orders/${params.id}`);

      const data = res.data.data;

      setOrderVal(data);


    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DeliveryLayout>
      <StandardSection>
        <h1 className="text-2xl pt-4 md:text-3xl text-gray-800 text-center mb-8 md:mb-14">
          Editar Compra
        </h1>

        <FormEditOrder status={orderVal.status} />

        <div className="w-[90%] md:w-[50%] m-auto mb-8 bg-gray-200 p-4 rounded-md">
          {orderVal && (
            <ul>
              <li className="mb-2 flex justify-between"><span className="font-bold">Estado:</span> {orderVal.status}</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Total de productos sin IVA::</span> {orderVal.total_products} bs</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Total de IVA:</span> {orderVal.total_iva - orderVal.total_products} bs</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Total de productos con IVA:</span> {orderVal.total_iva} bs</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Delivery:</span> {orderVal.total_delivery} bs</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Total a pagar:</span> {orderVal.total} bs</li>
            </ul>
          )}
        </div>

        {orderVal && orderVal.address && (

          <div className="w-[90%] md:w-[50%] m-auto mb-8 bg-gray-200 p-4 rounded-md">
            <h3 className="md:text-2xl text-center  md:mb-6">
              Detalles de envío
            </h3>

            <ul>
              <li className="mb-2 flex justify-between"><span className="font-bold">Nombre de receptor:</span> {orderVal.address.name}</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Número de telefono:</span> {orderVal.address.phone}</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Dirección:</span> {orderVal.address.address}</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Parroquía:</span> {orderVal.address.parish}</li>

              <li className="mb-2 flex justify-between"><span className="font-bold">Nombre de delivery:</span> {orderVal && orderVal.delivery ? orderVal.delivery.name : "N/A"}</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Número de telefono:</span> {orderVal && orderVal.delivery ? orderVal.delivery.phone : "N/A"}</li>
            </ul>
          </div>
        )}


        <div className="w-[90%] md:w-[50%] m-auto mb-8 bg-gray-200 p-4 rounded-md">
          <h3 className="md:text-2xl text-center  md:mb-6">
            Detalles de pago
          </h3>
          {orderVal && orderVal.voucher && (

            <ul>
              <li className="mb-2 flex justify-between"><span className="font-bold">Fecha de pago:</span> {formatDate(orderVal.voucher.date)} </li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Referencia:</span> {orderVal.voucher.reference}</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Tipo de pago:</span> {orderVal.voucher.payment.type}</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Banco receptor:</span> {orderVal.voucher.payment.bank}</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Documento receptor:</span> {orderVal.voucher.payment.document}</li>
              <li className="mb-2 flex justify-between"><span className="font-bold">Numero receptor:</span> {orderVal.voucher.payment.number}</li>
            </ul>
          )}
          {orderVal && orderVal.voucher && orderVal.voucher.image && (
            <ImageGallery showThumbnails={false} disableSwipe={true} showPlayButton={false} items={images} />

          )}

        </div>

        <h2 className="font-semibold text-xl mt-4 mb-4">Productos de la orden</h2>

        <BasicGridLayout>
          {orderVal.detail && orderVal.detail.map((detail, i) => (
            <DetailAdminProduct key={i} product={detail.product} detail={detail} />
          ))}
        </BasicGridLayout>
      </StandardSection>
    </DeliveryLayout>
  )
}



export default EditOrder;
