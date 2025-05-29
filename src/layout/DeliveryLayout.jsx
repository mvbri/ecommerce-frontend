import { useAuth } from "../auth/AuthProvider";
import { setAuthToken, useAxiosWithAuth } from "../services/axios.config";
import "../components/css/Navbar.css";

import { DeliverySidebarMenu } from "../components/DeliverySidebarMenu";

function DeliveryLayout({ children }) {
  const auth = useAuth();
  setAuthToken(auth.getAccessToken());

  useAxiosWithAuth();

  return (
    <>
      <header className="max-w-[1400px] m-auto w-full relative py-1">
        <DeliverySidebarMenu />
      </header>

      <main>{children}</main>
    </>
  );
}

export default DeliveryLayout;
