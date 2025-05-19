import StandardSection from "../components/StandardSection";
import HomeLayout from "../layout/HomeLayout";
import UserNavProfile from "../components/UserNavProfile";

const UserProfile = () => {
  return (
    <HomeLayout>
      <StandardSection>
        <div>
          <UserNavProfile />
        </div>
      </StandardSection>
    </HomeLayout>
  );
};

export default UserProfile;
