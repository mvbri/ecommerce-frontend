import StandardSection from "../components/StandardSection";
import FormUserProfile from "../components/FormUserProfile";
import DeliveryLayout from "../layout/DeliveryLayout";

const DeliveryProfile = () => {
  return (
    <DeliveryLayout>
      <StandardSection>
        <div className="flex md:w-[80%] m-auto flex-col md:flex-row flex-wrap gap-8 pt-8">
          <div className="p-8 border rounded-md flex-1">
            <FormUserProfile />
          </div>
        </div>
      </StandardSection>
    </DeliveryLayout>
  );
};

export default DeliveryProfile;
