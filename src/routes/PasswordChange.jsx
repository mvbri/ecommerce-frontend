import StandardSection from "../components/StandardSection";
import HomeLayout from "../layout/HomeLayout";
import UserNavProfile from "../components/UserNavProfile";
import FormPasswordChange from "../components/FormPasswordChange";

const PasswordChange = () => {
  return (
    <HomeLayout>
      <StandardSection>
        <div className="flex gap-8 pt-8">
          <UserNavProfile />
          <div className="p-8 border rounded-md flex-1">
            <FormPasswordChange />
          </div>
        </div>
      </StandardSection>
    </HomeLayout>
  );
};

export default PasswordChange;
