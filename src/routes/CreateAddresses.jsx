import StandardSection from "../components/StandardSection";
import HomeLayout from "../layout/HomeLayout";
import UserNavProfile from "../components/UserNavProfile";
import FormUserAddresses from "../components/FormUserAddresses";

const CreateAddresses = () => {
  return (
    <HomeLayout>
      <StandardSection>
        <div className="flex flex-col lg:flex-row gap-8 pt-8">
          <UserNavProfile />
          <div className="p-8 border rounded-md flex-1">
            <div className="flex justify-between">
              <h3 className="mb-4 text-gray-800 text-2xl md:text-3xl">
                Direcciones
              </h3>
            </div>
            <div>
              <FormUserAddresses />
            </div>
          </div>
        </div>
      </StandardSection>
    </HomeLayout>
  );
};

export default CreateAddresses;
