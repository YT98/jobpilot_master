import { useEffect, useState } from 'react';
import { jobPostingRoutes } from '../../config/routes';
import protectedRequest from '../../utils/protectedRequest';

interface QualificationsProps {
    jobPostingId: string;
}

const SkillsComparison = ({ jobPostingId }: QualificationsProps) => {

    const [state, setState] = useState({
        "jobPostingSkills": [],
        "jobPostingSkillsPosessedByUser": [],
        "jobPostingSkillsNotPosessedByUser": []
    });

    useEffect(() => {
        getSkillsComparison();
    }, [jobPostingId]);

    const getSkillsComparison = async () => {
        try {
            const response = await protectedRequest(
                process.env.NEXT_PUBLIC_BASE_URL + jobPostingRoutes.getSkillsComparison + `/${jobPostingId}`, 
                'GET'
            );
            const data = await response.json();
            setState({...state, ...data})
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const jobPostingSkillsPosessedByUser = state.jobPostingSkillsPosessedByUser.map((skill, index) => {
        return (
            <p 
                key={index}
                className="m-2 basis-1/3 list-item list-inside text-green-700"
            > 
                {skill} 
            </p>
        )
    });

    const jobPostingSkillsNotPosessedByUser = state.jobPostingSkillsNotPosessedByUser.map((skill, index) => {
        return (
            <p 
                key={index}
                className="m-2 basis-1/3 list-item list-inside text-red-700"
            > 
                {skill} 
            </p>
        )
    });

    return (
        <div className="prose p-5 w-1/2">
            <h2 className="m-0">Skills</h2>
            <div className="flex flex-col">
                <p className="m-0"> 
                    {(state.jobPostingSkillsPosessedByUser.length / state.jobPostingSkills.length) > 0.8 ? "Nice!" : "You might want to brush up on some skills. "}
                    You have {state.jobPostingSkillsPosessedByUser.length} out of the {state.jobPostingSkills.length} skills mentioned in the job posting. 
                </p>
                <div className="flex flex-wrap">
                    {jobPostingSkillsPosessedByUser}
                    {jobPostingSkillsNotPosessedByUser}
                </div>
            </div>
        </div>
    )
}

export default SkillsComparison;
