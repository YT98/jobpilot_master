import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import CompleteProfileHeader from '../components/completeProfile/CompleteProfileHeader';
import CompleteProfilePersonalInformationStep from '../components/completeProfile/steps/CompleteProfilePersonalInformationStep';
import CompleteProfileStepContainer from '../components/completeProfile/CompleteProfileStepContainer';
import CompleteProfileWorkExperienceStep from '../components/completeProfile/steps/CompleteProfileWorkExperienceStep';
import CompleteProfileEducationStep from '../components/completeProfile/steps/CompleteProfileEducationStep';
import CompleteProfileSkillsAndLanguagesStep from '../components/completeProfile/steps/CompleteProfileSkillsAndLanguagesStep';
import CompleteProfileReviewStep from '../components/completeProfile/steps/CompleteProfileReviewStep';
import { Education, Profile, ProfileLink, WorkExperienceWithSkills } from '../types/dbModels';
import protectedRequest from '../utils/protectedRequest';
import { profileRoutes } from '../config/routes';

// TODO: If user uploaded resume, populate state with resume data
const CompleteProfile = () => {
    const { appState } = useContext(AppContext);
    const profileId = appState.account ? appState.account.profileId : "";
    const [currentStep, setCurrentStep] = useState(1);

    const [profile, setProfile] = useState<Profile>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });

    const [profileLinks, setProfileLinks] = useState<ProfileLink[]>([
        { type: "LinkedIn", url: "" }
    ]);

    const [workExperiences, setWorkExperiences] = useState<WorkExperienceWithSkills[]>([
        {
            title: "",
            companyName: "",
            location: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
            description: "",
            skills: []
        }
    ]);
    
    const [educations, setEducations] = useState<Education[]>([
        {
            schoolName: "",
            degree: "",
            majorOrAreaOfStudy: "",
            location: "",
            startDate: "",
            endDate: "",
            currentlyAttending: false,
            description: ""
        }
    ]);


    const [skills, setSkills] = useState<string[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);

    useEffect(() => {
        try {
            if (!appState.loading) {
                const fetchProfile = async () => {
                    const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.profile + `/${profileId}`, 'GET');
                    const data = await response.json();
                    setProfile({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phoneNumber: data.phoneNumber
                    });
                }
                fetchProfile();

                const fetchProfileLinks = async () => {
                    const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.profileLinks + `/${profileId}`, 'GET');
                    const data = await response.json();
                    setProfileLinks(data.links);
                }
                fetchProfileLinks();

                const fetchWorkExperiences = async () => {
                    const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.workExperiences + `/${profileId}`, 'GET');
                    const data = await response.json();
                    console.log(data)
                    if (data.workExperiences.length > 0) {
                        setWorkExperiences(data.workExperiences);
                    }
                }
                fetchWorkExperiences();

                const fetchEducations = async () => {
                    const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.educations + `/${profileId}`, 'GET');
                    const data = await response.json();
                    if (data.educations.length > 0) {
                        setEducations(data.educations);
                    }
                }
                fetchEducations();

                const fetchSkills = async () => {
                    const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.skills + `/${profileId}`, 'GET');
                    const data = await response.json();
                    if (data.skills.length > 0) {
                        setSkills(data.skills);
                    }
                }
                fetchSkills();

                const fetchLanguages = async () => {
                    const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.languages + `/${profileId}`, 'GET');
                    const data = await response.json();
                    if (data.languages.length > 0) {
                        setLanguages(data.languages);
                    }
                }
                fetchLanguages();
            }
        } catch (error) {
            console.log(error);
        }
    }, [appState.loading]);

    const handleChangeStep = (step: number) => {
        setCurrentStep(step);
    }

    const handleSubmit = () => {
        try {
            const submitProfile = async () => {

                await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.profile + `/${profileId}`, 'POST',
                    JSON.stringify({
                        ...profile,
                        profileLinks: profileLinks,
                        workExperiences: workExperiences,
                        educations: educations,
                        skills: skills,
                        languages: languages
                    })
                );
                // TODO: Handle response
                // const data = await response.json();
            }
            submitProfile();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative overflow-hidden">
            <CompleteProfileHeader step={currentStep} handleChangeStep={handleChangeStep}/>

            <div className="relative h-screen overflow-x-hidden mt-[74px]">
                <CompleteProfileStepContainer handleChangeStep={handleChangeStep} current_step={currentStep} element_step={1}>
                    <CompleteProfilePersonalInformationStep
                        profile={{
                            firstName: profile.firstName,
                            lastName: profile.lastName,
                            email: profile.email,
                            phoneNumber: profile.phoneNumber
                        }}
                        profileLinks = {profileLinks}
                        setProfile={ (profile: Profile) => {
                            setProfile({...profile,
                                firstName: profile.firstName,
                                lastName: profile.lastName,
                                email: profile.email,
                                phoneNumber: profile.phoneNumber
                            })
                        }}
                        setProfileLinks={ (profileLinks: ProfileLink[]) => {
                            setProfileLinks(profileLinks)
                        }}
                    />
                </CompleteProfileStepContainer>
                <CompleteProfileStepContainer handleChangeStep={handleChangeStep} current_step={currentStep} element_step={2}>
                    <CompleteProfileWorkExperienceStep 
                        workExperiences={workExperiences} 
                        setWorkExperiences={ (workExperiences: WorkExperienceWithSkills[]) => {
                            setWorkExperiences([...workExperiences])
                        }}
                    />
                </CompleteProfileStepContainer>
                <CompleteProfileStepContainer handleChangeStep={handleChangeStep} current_step={currentStep} element_step={3}>
                    <CompleteProfileEducationStep 
                        educations={educations} 
                        setEducations={ (educations: Education[]) => {
                            setEducations([...educations])
                        }}
                    />
                </CompleteProfileStepContainer>
                <CompleteProfileStepContainer handleChangeStep={handleChangeStep} current_step={currentStep} element_step={4}>
                    <CompleteProfileSkillsAndLanguagesStep 
                        skills={skills}
                        languages={languages}
                        setSkills={ (skills: string[]) => {
                            setSkills([...skills])
                        }}
                        setLanguages={ (languages: string[]) => {
                            setLanguages([...languages])
                        }}
                    />
                </CompleteProfileStepContainer>
                <CompleteProfileStepContainer 
                    handleChangeStep={handleChangeStep} current_step={currentStep} element_step={5}
                    handleSubmit={handleSubmit}
                >
                    <CompleteProfileReviewStep
                        profile={profile}
                        profileLinks={profileLinks}
                        workExperiences={workExperiences}
                        educations={educations}
                        skills={skills}
                        languages={languages}
                    />
                </CompleteProfileStepContainer>
            </div>
        </div>
    )
}

export default CompleteProfile;