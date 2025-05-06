import { useAuth } from "../auth/AuthProvider";
import StandardSection from "../components/StandardSection";
import HomeLayout from "../layout/HomeLayout";

function Dashboard() {
  const auth = useAuth();

  return (
    <>
      <HomeLayout>
        <StandardSection>
          <h1 className="text-2xl pt-8 md:text-4xl text-center mb-8 md:mb-14">
            Hola {auth.getUser()?.name || null}
          </h1>
        </StandardSection>
      </HomeLayout>
    </>
  );
}

export default Dashboard;
