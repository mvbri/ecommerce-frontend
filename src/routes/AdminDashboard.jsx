import AdminLayout from "../layout/AdminLayout";
import { useAuth } from "../auth/AuthProvider";


function AdminDashboard() {
  const auth = useAuth();

  
  return (
    <AdminLayout>
      <div>Dashboard {auth.getUser()?.name || null}</div>
    </AdminLayout>
  );
}

export default AdminDashboard;
