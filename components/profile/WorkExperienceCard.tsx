import { AppContext } from "../../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import UICard from "../UICard";
import protectedRequest from "../../utils/protectedRequest";
import { profileRoutes } from "../../config/routes";

interface WorkExperience {
    id: number;
    title: string;
    company_name: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string;
}

interface WorkExperienceState {
    work_experience: WorkExperience[];
    error: string;
}


const WorkExperienceCard = () => {
    const { appState } = useContext(AppContext);
    const userId = appState.user ? appState.user.id : '';
    const [state, setState] = useState<WorkExperienceState>({
        work_experience: [],
        error: ''
    });

  useEffect(() => {
    if (!appState.loading) {
        const fetchWorkExperience = async () => {
            const response = await protectedRequest(
                process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.workExperience + `/${userId}`,
                'GET'
            );
            const data = await response.json();
            setState({...state, work_experience: data});
        }
        fetchWorkExperience();
    }
    }, [appState.loading]);

    const workExperienceItems = state.work_experience.map((workExperience, index) => {
        return <div className="mt-5 first-of-type:mt-0" key={index}>
            <p className="font-bold">{workExperience.company_name}</p>
            <p>{workExperience.title}</p>
            <p>{workExperience.start_date} - {workExperience.end_date}</p>
            <p>{workExperience.description}</p>
        </div>
    });

  return (
    <UICard>
        <div className="card-header prose p-5">
            <h2>Work Experience</h2>
        </div>
        <div className="p-5">
            {workExperienceItems}
        </div>
        <div className="w-full p-5">
            <button 
                className="btn btn-outline" 
            >
                Edit
            </button>
        </div>
    </UICard>
  );
};

export default WorkExperienceCard;
