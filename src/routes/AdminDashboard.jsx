import AdminLayout from "../layout/AdminLayout";
import { useAuth } from "../auth/AuthProvider";

function AdminDashboard() {
  const auth = useAuth();

  return (
    <AdminLayout>
      <div className="pt-[5.6rem] text-2xl md:text-4xl text-center mb-8 md:mb-14">
        <h1 className="text-2xl md:text-4xl text-center pt-4">
          Bienvenid@ {auth.getUser()?.name || null}
        </h1>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
