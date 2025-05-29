import StandardSection from "../components/StandardSection";
import AdminLayout from "../layout/AdminLayout";
import FormUserProfile from "../components/FormUserProfile";


const AdminUserProfile = () => {
  return (
    <AdminLayout>
      <StandardSection className="px-1 pt-[3rem] pb-8">
        <h1 className="text-2xl md:text-3xl text-center mb-8 md:mb-14 text-gray-800">
          Mi Perfil
        </h1>
        <FormUserProfile />

      </StandardSection>
    </AdminLayout>
  );
};

export default AdminUserProfile;
