import { useAuth } from "../auth/AuthProvider";
import DashboardLayout from "../layout/DashboardLayout";

function Dashboard() {
  const auth = useAuth();

  return (
    <>
      <DashboardLayout>
        <div>Dashboard {auth.getUser()?.name || null}</div>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
