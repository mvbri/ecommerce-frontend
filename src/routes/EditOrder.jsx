import FormEditOrder from "../components/FormEditOrder";
import StandardSection from "../components/StandardSection";
import DeliveryLayout from "../layout/DeliveryLayout";

const EditOrder = () => {
  return (
    <DeliveryLayout>
      <StandardSection>
        <FormEditOrder />
      </StandardSection>
    </DeliveryLayout>
  );
};

export default EditOrder;
