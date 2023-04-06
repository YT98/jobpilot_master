import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import CompleteProfileHeader from '../components/completeProfile/CompleteProfileHeader';
import CompleteProfilePersonalInformationStep from '../components/completeProfile/steps/CompleteProfilePersonalInformationStep';
import CompleteProfileStepContainer from '../components/completeProfile/CompleteProfileStepContainer';
import CompleteProfileWorkExperienceStep from '../components/completeProfile/steps/CompleteProfileWorkExperienceStep';
import CompleteProfileEducationStep from '../components/completeProfile/steps/CompleteProfileEducationStep';
import CompleteProfileSkillsAndLanguagesStep from '../components/completeProfile/steps/CompleteProfileSkillsAndLanguagesStep';
import CompleteProfileReviewStep from '../components/completeProfile/steps/CompleteProfileReviewStep';
import { UserProfile, PersonalInformation, WorkExperience, Education } from '../types/UserProfile';
import protectedRequest from '../utils/protectedRequest';
import { profileRoutes } from '../config/routes';

// TODO: If user uploaded resume, populate state with resume data
const CompleteProfile = () => {
    const { appState } = useContext(AppContext);
    const profileId = appState.account ? appState.account.profileId : "";

    const [currentStep, setCurrentStep] = useState(1);
    const [userProfile, setUserProfile] = useState<UserProfile>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        links: [ { type: "LinkedIn", url: "" } ],
        workExperiences: [
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
        ],
        educations: [
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
        ],
        skills: [],
        languages: []
    });

    useEffect(() => {
        try {
            if (!appState.loading) {
                const fetchPersonalInformation = async () => {
                    const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.profile + `/${profileId}`, 'GET');
                    const data = await response.json();
                    setUserProfile({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        links: data.links,
                        workExperiences: data.workExperiences,
                        educations: data.educations,
                        skills: data.skills,
                        languages: data.languages
                    });
                    console.log(data)
                }
                fetchPersonalInformation();
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
            console.log(userProfile.workExperiences)
            const submitProfile = async () => {
                await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.profile + `/${profileId}`, 'POST',
                    JSON.stringify({
                        firstName: userProfile.firstName,
                        lastName: userProfile.lastName,
                        email: userProfile.email,
                        phoneNumber: userProfile.phoneNumber,
                        links: userProfile.links,
                        workExperiences: userProfile.workExperiences,
                        educations: userProfile.educations,
                        skills: userProfile.skills,
                        languages: userProfile.languages
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
                        personalInformation={{
                            firstName: userProfile.firstName,
                            lastName: userProfile.lastName,
                            email: userProfile.email,
                            phoneNumber: userProfile.phoneNumber,
                            links: userProfile.links
                        }}
                        setPersonalInformation={ (personalInformation: PersonalInformation) => {
                            setUserProfile({...userProfile,
                                firstName: personalInformation.firstName,
                                lastName: personalInformation.lastName,
                                email: personalInformation.email,
                                phoneNumber: personalInformation.phoneNumber,
                                links: personalInformation.links
                            })
                        }}
                    />
                </CompleteProfileStepContainer>
                <CompleteProfileStepContainer handleChangeStep={handleChangeStep} current_step={currentStep} element_step={2}>
                    <CompleteProfileWorkExperienceStep 
                        workExperiences={userProfile.workExperiences} 
                        setWorkExperiences={ (workExperiences: WorkExperience[]) => {
                            setUserProfile({...userProfile, workExperiences: workExperiences})
                        }}
                    />
                </CompleteProfileStepContainer>
                <CompleteProfileStepContainer handleChangeStep={handleChangeStep} current_step={currentStep} element_step={3}>
                    <CompleteProfileEducationStep 
                        educations={userProfile.educations} 
                        setEducations={ (educations: Education[]) => {
                            setUserProfile({...userProfile, educations: educations})
                        }}
                    />
                </CompleteProfileStepContainer>
                <CompleteProfileStepContainer handleChangeStep={handleChangeStep} current_step={currentStep} element_step={4}>
                    <CompleteProfileSkillsAndLanguagesStep 
                        skills={userProfile.skills}
                        languages={userProfile.languages}
                        setSkills={ (skills: string[]) => {
                            setUserProfile({...userProfile, skills: skills})    
                        }}
                        setLanguages={ (languages: string[]) => {
                            setUserProfile({...userProfile, languages: languages})
                        }}
                    />
                </CompleteProfileStepContainer>
                <CompleteProfileStepContainer 
                    handleChangeStep={handleChangeStep} current_step={currentStep} element_step={5}
                    handleSubmit={handleSubmit}
                >
                    <CompleteProfileReviewStep
                        personalInformation={{
                            firstName: userProfile.firstName,
                            lastName: userProfile.lastName,
                            email: userProfile.email,
                            phoneNumber: userProfile.phoneNumber,
                            links: userProfile.links
                        }}
                        workExperiences={userProfile.workExperiences}
                        educations={userProfile.educations}
                        skills={userProfile.skills}
                        languages={userProfile.languages}
                    />
                </CompleteProfileStepContainer>
            </div>
        </div>
    )
}

export default CompleteProfile;