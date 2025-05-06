import Products from "./Products";
import Filters from "../components/Filters";
import HomeLayout from "../layout/HomeLayout";
import "../components/css/Products.css";

const ShowProducts = () => {
  return (
    <HomeLayout>
      <div className="pt-[5.6rem] min-h-[100vh]">
        {/* <Filters /> */}
        <Products />
      </div>
    </HomeLayout>
  );
};

export default ShowProducts;
