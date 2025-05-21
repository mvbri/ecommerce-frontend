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
            <FormUserProfile />
          </div>
        </div>
      </StandardSection>
    </HomeLayout>
  );
};

export default UserProfile;
