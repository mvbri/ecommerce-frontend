import { useAuth } from "../auth/AuthProvider";
import HomeLayout from "../layout/HomeLayout";

function Dashboard() {
  const auth = useAuth();

  return (
    <>
      <HomeLayout>
        <div>Dashboard {auth.getUser()?.name || null}</div>
      </HomeLayout>
    </>
  );
}

export default Dashboard;
