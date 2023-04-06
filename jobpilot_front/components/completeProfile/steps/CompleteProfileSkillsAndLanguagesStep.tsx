import SkillsOrLanguages from "../SkillsOrLanguages";

interface CompleteProfileSkillsAndLanguagesStepProps {
    skills: string[];
    setSkills: (skills: string[]) => void;
    languages: string[];
    setLanguages: (languages: string[]) => void;
}

const CompleteProfileSkillsAndLanguagesStep = ({ skills, setSkills, languages, setLanguages }: CompleteProfileSkillsAndLanguagesStepProps) => {
    return (
        <div>
            <h1 className="mb-5"> Step 4: Skills and Languages </h1>
            <p className="text-gray-500 border-l-2 pl-4"> 
                Please provide us with information about your skills and languages. This will help us create a comprehensive and effective resume that highlights your strengths and qualifications. It will also give you insights into how qualified you might be for job postings that require specific skills or qualifications. 
            </p>
            <p className="text-gray-500 border-l-2 pl-4">
                Only a few will be listed on your resume but make sure to add any skills that you possess, both technical and soft skills. Some examples of technical skills include proficiency in programming languages, software applications, or data analysis tools. Soft skills include abilities such as communication, problem-solving, teamwork, and time management.
            </p>

            <h3> Skills </h3>
            <SkillsOrLanguages 
                skillsOrLanguages={skills}
                setSkillsOrLanguages={(skills) => {setSkills(skills)}}
                buttonText="Add Skill "
            />

            <h3> Languages </h3>
            <SkillsOrLanguages
                skillsOrLanguages={languages}
                setSkillsOrLanguages={(languages) => {setLanguages(languages)}}
                buttonText="Add Language "
            />
            
        </div>
    )
};

export default CompleteProfileSkillsAndLanguagesStep;