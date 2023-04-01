import { AppContext } from "../../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import DashboardCard from "../DashboardCard";

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
            const response = await fetch(`http://localhost:5000/user/${userId}/work_experience`);
            const data = await response.json();
            setState({...state, work_experience: data});
        }
        fetchWorkExperience();
    }
    }, [appState.loading]);

    const workExperienceItems = state.work_experience.map((workExperience, index) => {
        return <div className="mt-5" key={index}>
            <p>{workExperience.company_name}</p>
            <p>{workExperience.title}</p>
            <p>{workExperience.start_date}</p>
            <p>{workExperience.end_date}</p>
            <p>{workExperience.description}</p>
        </div>
    });

  return (
    <DashboardCard>
        <p className="text-gray-600 mb-4 font-bold">Work Experience</p>
        {workExperienceItems}
    </DashboardCard>
  );
};

export default WorkExperienceCard;
