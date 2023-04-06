import { useAuth } from "./_useAuth";
import UploadResumeCard from "../components/profile/UploadResumeCard";
import { useEffect, useContext, useState } from "react";
import protectedRequest from "../utils/protectedRequest";
import { profileRoutes } from "../config/routes";
import { AppContext } from "../contexts/AppContext";
import { Education, PersonalInformation, WorkExperience } from "../types/UserProfile";

const Profile = () => {
  useAuth();
  const { appState } = useContext(AppContext);
  const profileId = appState.account ? appState.account.profileId : "";

  const [personalInformationState, setPersonalInformationState] = useState<PersonalInformation>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    links: []
  });

  const [workExperienceState, setWorkExperienceState] = useState<WorkExperience[]>([
    {
      companyName: "",
      jobTitle: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
      skills: []
    }
  ]);

  const [educationState, setEducationState] = useState<Education[]>([
    {
      institutionName: "",
      location: "",
      degreeType: "",
      majorOrAreaOfStudy: "",
      startDate: "",
      endDate: "",
      currentlyAttending: false,
      description: ""
    }
  ]);

  useEffect(() => {
    if (!appState.loading) {
        const fetchPersonalInformation = async () => {
            const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.profile + `/${profileId}`, 'GET');
            const data = await response.json();
        }
        fetchPersonalInformation();
    }
  }, [appState.loading]);

  return (
    <div className="flex bg-gray-100">
      <div className="w-full">

      </div>
    </div>
  );
};

export default Profile;
