import { useAuth } from "./_useAuth";
import PersonalInformationCard from "../components/profile/PersonalInformationCard";
import SkillCard from "../components/profile/SkillsCard";
import WorkExperienceCard from "../components/profile/WorkExperienceCard";
import EducationCard from "../components/profile/EducationCard";
import UploadResumeCard from "../components/profile/UploadResumeCard";

const Profile = () => {
  useAuth();

  return (
    <div className="flex bg-gray-100">
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
