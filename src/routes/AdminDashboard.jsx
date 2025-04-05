import AdminLayout from "../layout/AdminLayout";
import { useAuth } from "../auth/AuthProvider";

function AdminDashboard() {
  const auth = useAuth();

  return (
    <AdminLayout>
      <div className="text-2xl md:text-4xl text-center mb-8 md:mb-14">
        Bienvenid@ {auth.getUser()?.name || null}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
