import { useEffect, useState } from 'react';
import { jobPostingRoutes } from '../../config/routes';
import protectedRequest from '../../utils/protectedRequest';

interface QualificationsProps {
    jobPostingId: string;
}

const QualificationsComparison = ({ jobPostingId }: QualificationsProps) => {

    const [state, setState] = useState({
        isUserEducationQualified: false,
        isUserExperienceQualified: false,
        jobPostingEducationQualification: '',
        jobPostingExperienceQualification: '',
        userHighestEducation: '',
        userYearsExperience: 0
    });

    useEffect(() => {
        getQualificationsComparison();
    }, [jobPostingId]);

    const getQualificationsComparison = async () => {
        try {
            const response = await protectedRequest(
                process.env.NEXT_PUBLIC_BASE_URL + jobPostingRoutes.getQualificationsComparison + `/${jobPostingId}`, 
                'GET'
            );
            const data = await response.json();
            setState({...state, ...data})
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="prose p-5 w-1/2">
            <h2 className="m-0">Qualifications</h2>
            <div className="flex flex-col">
                <p className="m-0"> 
                    From what we can gather, 
                    {state.isUserEducationQualified && state.isUserExperienceQualified ? " you are qualified for the position!" : " you are not underqualified for the position. Doesn't hurt to try."}
                </p>
                <div className="">
                    <p>
                        <span className="font-bold mr-2">Education:</span> 
                        The job post mentions 
                        <span className="underline underline-offset-2"> {state.jobPostingEducationQualification}  </span>
                        and you have 
                        <span className="underline underline-offset-2"> {state.userHighestEducation} </span>
                        .
                    </p>
                    <p> 
                        <span className="font-bold mr-2">Experience:</span> 
                        The job post mentions 
                        <span className="underline underline-offset-2"> {state.jobPostingExperienceQualification}  </span>
                        and you have 
                        <span className="underline underline-offset-2"> {state.userYearsExperience} years of experience </span>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}

export default QualificationsComparison;
