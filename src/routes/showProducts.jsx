import Products from "./Products";
import Filters from "../components/Filters";
import HomeLayout from "../layout/HomeLayout";
import "../components/css/Products.css";

const ShowProducts = () => {
  return (
    <HomeLayout>
      <Filters />
      <Products />
    </HomeLayout>
  );
};

export default ShowProducts;
