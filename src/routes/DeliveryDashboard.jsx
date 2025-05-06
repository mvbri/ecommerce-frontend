import DeliveryLayout from "../layout/DeliveryLayout";
import StandardSection from "../components/StandardSection";
import { useAuth } from "../auth/AuthProvider";

function DeliveryDashboard() {
  const auth = useAuth();
  return (
    <DeliveryLayout>
      <StandardSection>
        <h1 className="text-2xl md:text-4xl text-center pt-4">
          Bienvenid@ {auth.getUser()?.name || null}
        </h1>
      </StandardSection>
    </DeliveryLayout>
  );
}

export default DeliveryDashboard;
