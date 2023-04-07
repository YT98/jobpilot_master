import { Profile, ProfileLink, WorkExperienceWithSkills, Education } from "../../../types/dbModels";

interface CompleteProfileReviewStepProps {
    profile: Profile;
    profileLinks: ProfileLink[];
    workExperiences: WorkExperienceWithSkills[];
    educations: Education[];
    skills: string[];
    languages: string[];
}

const CompleteProfileReviewStep = ({profile, profileLinks, workExperiences, educations, skills, languages}: CompleteProfileReviewStepProps) => {

    const linksElements = profileLinks.map((profileLink, index) => {
        return (
            <div key={index}>
                <p className="mr-5 mb-0 p-3 pr-5 pl-5 border border-gray-300 rounded-full"> 
                    <span className="font-semibold">{profileLink.type}: </span> 
                    {profileLink.url ? profileLink.url : <span className="text-red-700 font-normal">URL is required</span>} 
                </p>
            </div>
        )
    })

    const workExperienceElements = workExperiences.map((workExperience, index) => {

        const skillElements = workExperience.skills.map((skill, index) => {
            return (
                <div key={index}>
                    <p className="mr-5 mb-0 p-2 pr-5 pl-5 border border-gray-300 rounded-full"> {skill} </p>
                </div>
            )
        })

        return (
            <div key={index} className="mt-3 p-5 border rounded-lg border-gray-300">
                <h3 className="mb-0 mt-0 font-bold">{workExperience.title ? workExperience.title : <span className="text-red-700 font-normal">Job Title is required</span>} </h3>
                <p className="mb-0 mt-0 font-bold">{workExperience.companyName ? workExperience.companyName : <span className="text-red-700 font-normal">Company name is required</span>} </p>
                <p className="mb-0 mt-0 text-gray-500"> {workExperience.startDate ? workExperience.startDate : <span className="text-red-700 font-normal">Start date is required</span>} - {workExperience.currentlyWorking ? "Present" : workExperience.endDate ? workExperience.endDate : <span className="text-red-700 font-normal">End date is required</span>} </p>
                <p className="mb-0 mt-0 text-gray-500">{workExperience.location} </p>

                {workExperience.description ? 
                    <p className="mb-0"> <span className="font-semibold">Description:</span> <br/> {workExperience.description} </p>
                    : null    
                }
                {/* {workExperience.accomplishments.length < 3 ? <p className="text-orange-500 font-normal mt-0 mb-0">We recommend you add at least 3 skills. </p> : null} */}

                <p className="mb-0"> <span className="font-semibold">Skills:</span></p>
                {skillElements.length < 3 ? <p className="text-orange-500 font-normal mt-0 mb-0">We recommend you add at least 3 skills. </p> : null}
                <div className="flex flex-row flex-wrap">
                    {skillElements}
                </div>
            </div>
        )
    })

    const educationElements = educations.map((education, index) => {
        return (
            <div key={index} className="mt-3 p-5 border rounded-lg border-gray-300">
                <h3 className="mb-0 mt-0 font-bold">
                    {education.schoolName ? education.schoolName : <span className="text-red-700 font-normal">Institution name is required</span>}
                </h3>
                <p className="mb-0 mt-0 font-bold">
                    {education.degree ? education.degree : <span className="text-red-700 font-normal">Degree type is required</span>} in {education.majorOrAreaOfStudy ? education.majorOrAreaOfStudy : <span className="text-red-700 font-normal">Major or area of study is required</span>} 
                </p>
                <p className="mb-0 mt-0 text-gray-500"> 
                    {education.startDate ? education.startDate : <span className="text-red-700 font-normal">Start date is required</span>} - {education.currentlyAttending ? "Present" : education.endDate ? education.endDate : <span className="text-red-700 font-normal">End date is required</span>}
                </p>
                <p className="mb-0 mt-0 text-gray-500">{education.location} </p>
                {/* TODO: Add condition */}
                <p className="mb-0"> <span className="font-semibold">Description:</span> <br/> {education.description} </p>
            </div>
        )
    })

    const skillElements = skills.map((skill, index) => {
        return (
            <div key={index}>
                <p className="mr-5 mb-0 p-2 pr-5 pl-5 border border-gray-300 rounded-full"> {skill} </p>
            </div>
        )
    })

    const languageElements = languages.map((language, index) => {
        return (
            <div key={index}>
                <p className="mr-5 mb-0 p-2 pr-5 pl-5 border border-gray-300 rounded-full"> {language} </p>
            </div>
        )
    })

    return (
        <div>
            <h1 className="mb-5"> Step 5: Review </h1>
            <p className="text-gray-500 border-l-2 pl-4">
                Please take the time to read through the details you have provided and make sure they are accurate and complete.
                If you notice any errors or would like to make any changes, please go back to the previous steps and edit the necessary fields.
                Once you have reviewed and edited your information, please click the submit button to complete the process.
            </p>
            <h3> Personal Information </h3>
            <div className="flex flex-row">
                
                <p className="mr-5 mb-0 p-3 pr-5 pl-5 border border-gray-300 rounded-full"> 
                    {profile.firstName ? <span className="font-semibold">First Name: </span> : <span className="text-red-700 font-normal">First name is required</span>}
                    {profile.firstName}
                </p>

                <p className="mr-5 mb-0 p-3 pr-5 pl-5 border border-gray-300 rounded-full"> 
                    {profile.lastName ? <span className="font-semibold">Last Name: </span> : <span className="text-red-700 font-normal">Last name is required</span>}
                    {profile.lastName}
                </p>
            </div>
            <p className="mr-5 mb-0 p-3 pr-5 pl-5 border border-gray-300 rounded-full"> 
                {profile.email ? <span className="font-semibold">Email: </span> : <span className="text-red-700 font-normal">Email is required</span>}
                {profile.email}
            </p>
            <p className="mr-5 mb-0 p-3 pr-5 pl-5 border border-gray-300 rounded-full">
                {profile.email ? <span className="font-semibold">Phone Number: </span> : <span className="text-red-700 font-normal">Phone Number is required</span>}
                {profile.phoneNumber} 
            </p>
            {linksElements}


            <h3> Work Experiences </h3>
            {workExperienceElements.length === 0 ? <p className="text-red-700 font-normal mt-0 mb-0">Please add at least one work experience entry. </p> : null}
            {workExperienceElements}

            <h3> Education </h3>
            {educationElements}

            <h3> Skills </h3>
            {skillElements.length < 5 ? <p className="text-orange-500 font-normal mt-0 mb-0">We recommend you add at least 5 skills. </p> : null}
            <div className="flex flex-row flex-wrap">
                {skillElements}
            </div>

            {languages.length == 0 ? "" : <h3> Languages </h3>}
            <div className="flex flex-row flex-wrap">
                {languageElements}
            </div>
        </div>
    )
};

export default CompleteProfileReviewStep;