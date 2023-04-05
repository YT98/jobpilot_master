import { useState } from 'react';
import CompleteProfileHeader from '../components/completeProfile/CompleteProfileHeader';
import CompleteProfilePersonalInformationStep from '../components/completeProfile/steps/CompleteProfilePersonalInformationStep';
import CompleteProfileStepContainer from '../components/completeProfile/CompleteProfileStepContainer';
import CompleteProfileWorkExperienceStep from '../components/completeProfile/steps/CompleteProfileWorkExperienceStep';
import CompleteProfileEducationStep from '../components/completeProfile/steps/CompleteProfileEducationStep';
import CompleteProfileSkillsAndLanguagesStep from '../components/completeProfile/steps/CompleteProfileSkillsAndLanguagesStep';
import CompleteProfileReviewStep from '../components/completeProfile/steps/CompleteProfileReviewStep';
import { UserProfile, PersonalInformation, WorkExperience, Education } from '../types/UserProfile';

// TODO: If user uploaded resume, populate state with resume data
const CompleteProfile = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userProfile, setUserProfile] = useState<UserProfile>({
        personalInformation: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            socialMediaLinks: [ { type: "LinkedIn", url: "" } ]
        },
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
        skillsAndLanguages: {
            skills: [],
            languages: []
        }
    });

    const handleChangeStep = (step: number) => {
        setCurrentStep(step);
    }

    const handleSubmit = () => {
        console.log("Submitting form");
    }

    return (
        <div className="relative overflow-hidden">
            <CompleteProfileHeader step={currentStep} handleChangeStep={handleChangeStep}/>

            <div className="relative h-screen overflow-x-hidden mt-[74px]">
                <CompleteProfileStepContainer handleChangeStep={handleChangeStep} current_step={currentStep} element_step={1}>
                    <CompleteProfilePersonalInformationStep 
                        handleChangeStep={handleChangeStep}
                        personalInformation={userProfile.personalInformation}
                        setPersonalInformation={ (personalInformation: PersonalInformation) => {
                            setUserProfile({...userProfile, personalInformation: personalInformation})
                        }}
                    />
                </CompleteProfileStepContainer>
                <CompleteProfileStepContainer handleChangeStep={handleChangeStep} current_step={currentStep} element_step={2}>
                    <CompleteProfileWorkExperienceStep 
                        handleChangeStep={handleChangeStep}
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
                        skills={userProfile.skillsAndLanguages.skills}
                        languages={userProfile.skillsAndLanguages.languages}
                        setSkills={ (skills: string[]) => {
                            setUserProfile({...userProfile, skillsAndLanguages: {...userProfile.skillsAndLanguages, skills: skills}})
                        }}
                        setLanguages={ (languages: string[]) => {
                            setUserProfile({...userProfile, skillsAndLanguages: {...userProfile.skillsAndLanguages, languages: languages}})
                        }}
                    />
                </CompleteProfileStepContainer>
                <CompleteProfileStepContainer 
                    handleChangeStep={handleChangeStep} current_step={currentStep} element_step={5}
                    handleSubmit={handleSubmit}
                >
                    <CompleteProfileReviewStep
                        personalInformation={userProfile.personalInformation}
                        workExperiences={userProfile.workExperiences}
                        educations={userProfile.educations}
                        skills={userProfile.skillsAndLanguages.skills}
                        languages={userProfile.skillsAndLanguages.languages}
                    />
                </CompleteProfileStepContainer>
            </div>
        </div>
    )
}

export default CompleteProfile;