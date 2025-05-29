import StandardSection from "../components/StandardSection";
import HomeLayout from "../layout/HomeLayout";
import UserNavProfile from "../components/UserNavProfile";
import FormUserProfile from "../components/FormUserProfile";

const UserProfile = () => {
  return (
    <HomeLayout>
      <StandardSection>
        <div className="flex flex-col md:flex-row flex-wrap gap-8 pt-8">
          <UserNavProfile />
          <div className="p-8 border rounded-md flex-1">
            <div className="flex flex-wrap gap-2 justify-between items-center">
              <h3 className="text-gray-800 text-2xl md:text-3xl">Mi Perfil</h3>
            </div>
            <FormUserProfile />
          </div>
        </div>
      </StandardSection>
    </HomeLayout>
  );
};

export default UserProfile;
