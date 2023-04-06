import { useState } from "react";
import { WorkExperience } from "../../../types/UserProfile";
import WorkExperienceCard from "../WorkExperienceCard";

interface CompleteProfileWorkExperienceStepProps {
    workExperiences: WorkExperience[];
    setWorkExperiences: (workExperiences: WorkExperience[]) => void;
}

const CompleteProfileWorkExperienceStep = ({workExperiences, setWorkExperiences}: CompleteProfileWorkExperienceStepProps) => {

    const addWorkExperience = () => {
        workExperiences.push({
            companyName: "",
                location: "",
                jobTitle: "",
                startDate: "",
                endDate: "",
                currentlyWorking: false,
                description: "",
                skills: []
        })
        setWorkExperiences([ ...workExperiences ])
    }

    const removeWorkExperience = (index: number) => {
        workExperiences.splice(index, 1);
        setWorkExperiences([...workExperiences])
    }

    const workExperienceCards = workExperiences.map((workExperience, index) => {
        return (
            <WorkExperienceCard 
                key={index} 
                workExperience={workExperience}
                removeWorkExperience={() => removeWorkExperience(index)}
            />
        )
    });

    return (
        <div>
            <h1 className="mb-5"> Step 2: Work Experience </h1>
            <p className="text-gray-500 border-l-2 pl-4"> 
                Please fill up the fields below with information regarding your work experience. Providing accurate and comprehensive information will help us understand your professional background better and enable us to match your skills and experience with job requirements more effectively.
                <br/> <span className="text-gray-400">* indicates required</span>
            </p>

            {workExperienceCards}

            <div>
                <button className="btn btn-outline mt-10 mr-5 w-full text-gray-500 border-2 border-gray-300 font-bold hover:bg-transparent hover:border-gray-600 hover:text-gray-600" onClick={addWorkExperience}>+ ADD WORK EXPERIENCE</button>
            </div>
        </div>
    )
};

export default CompleteProfileWorkExperienceStep;