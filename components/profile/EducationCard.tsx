import { AppContext } from "../../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import UICard from "../UICard";
import { profileRoutes } from "../../config/routes";
import protectedRequest from "../../utils/protectedRequest";

interface Education {
    id: number;
    school_name: string;
    degree: string;
    start_date: string;
    end_date: string;
    description: string;
}

interface EducationState {
    education: Education[];
    error: string;
}

const EducationCard = () => {
    const { appState } = useContext(AppContext);
    const userId = appState.user ? appState.user.id : '';
    const [state, setState] = useState<EducationState>({
        education: [],
        error: ''
    });

    useEffect(() => {
        if (!appState.loading) {
            const fetchEducation = async () => {
                const response = await protectedRequest(
                    process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.education + `/${userId}`,
                    'GET'
                )
                const data = await response.json();
                setState({...state, education: data});
            }
            fetchEducation();
        }
    }, [appState.loading]);

    const educationItems = state.education.map((education, index) => {
        return <div className="mt-5 first-of-type:mt-0" key={index}>
            <p className="font-bold">{education.school_name}</p>
            <p>{education.degree}</p>
            <p>{education.start_date} - {education.end_date}</p>
            <p>{education.description}</p>
        </div>
    });

  return (
    <UICard>
        <div className="card-header prose p-5">
            <h2>Education</h2>
        </div>
        <div className="p-5">
            {educationItems}
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

export default EducationCard;
