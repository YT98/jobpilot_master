import { Education } from "../../../types/dbModels";
import EducationCard from "../EducationCard";

interface CompleteProfileEducationStepProps {
    educations: Education[];
    setEducations: (educations: Education[]) => void;
}

const CompleteProfileEducationStep = ({educations, setEducations}: CompleteProfileEducationStepProps) => {

    const addEducation = () => {
        educations.push({
            degree: "",
            majorOrAreaOfStudy: "",
            schoolName: "",
            location: "",
            startDate: "",
            endDate: "",
            currentlyAttending: false,
            description: ""
        })

        setEducations([ ...educations ])
    }

    const removeEducation = (index: number) => {
        educations.splice(index, 1);
        setEducations([...educations])
    }

    const educationCards = educations.map((education, index) => {
        return (
            <EducationCard
                key={index}
                education={education} 
                removeEducation={() => removeEducation(index)}
            />
        )
    });

    return (
        <div>
            <h1 className="mb-5"> Step 3: Education </h1>
            <p className="text-gray-500 border-l-2 pl-4">
                Please provide us with the following information about your education. This information will be used to help you generate a strong and comprehensive resume that highlights your educational background and qualifications. It will also give you insights into how qualified you might be for job postings that require specific educational backgrounds or coursework.
                <br/> <span className="text-gray-400">* indicates required</span>
            </p>
            {educationCards}
            <div>
                <button className="btn btn-outline mt-10 mr-5 w-full text-gray-500 border-2 border-gray-300 font-bold hover:bg-transparent hover:border-gray-600 hover:text-gray-600" onClick={addEducation}>+ ADD EDUCATION</button>
            </div>
        </div>
    )
};

export default CompleteProfileEducationStep;