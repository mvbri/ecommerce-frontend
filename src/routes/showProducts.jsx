import Products from "./Products";
import Filters from "../components/Filters";
import DashboardLayout from "../layout/DashboardLayout";
import "../components/css/Products.css";

const ShowProducts = () => {
  return (
    <DashboardLayout>
      <Filters />
      <Products />
    </DashboardLayout>
  );
};

export default ShowProducts;
