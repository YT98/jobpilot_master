import Sidebar from "../components/Sidebar";
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
    <div className="flex bg-zinc-50">
      <Sidebar/>
      <div className="flex-1 p-10">


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
