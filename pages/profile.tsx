import Sidebar from "../components/Navbar";
import { useAuth } from "./_useAuth";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import PersonalInformationCard from "../components/profile/PersonalInformationCard";
import SkillCard from "../components/profile/SkillsCard";
import WorkExperienceCard from "../components/profile/WorkExperienceCard";
import EducationCard from "../components/profile/EducationCard";
import UploadResumeCard from "../components/profile/UploadResumeCard";

const Profile = () => {
  useAuth();
  const { appState } = useContext(AppContext);
  const firstName = appState.user ? appState.user.firstName : '';
  const lastName = appState.user ? appState.user.lastName : '';

  return (
    <div className="flex bg-gray-100 min-h-full">
      <div className="w-full">

        <UploadResumeCard />
        <PersonalInformationCard />
        <SkillCard />
        <WorkExperienceCard />
        <EducationCard />

      </div>
    </div>
  );
};

export default Profile;
