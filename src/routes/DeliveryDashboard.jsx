import DeliveryLayout from "../layout/DeliveryLayout";
import StandardSection from "../components/StandardSection";
import BannerDelivery from "../components/BannerDelivery";

function DeliveryDashboard() {
  return (
    <DeliveryLayout>
      <StandardSection>
        <BannerDelivery />
      </StandardSection>
    </DeliveryLayout>
  );
}

export default DeliveryDashboard;
