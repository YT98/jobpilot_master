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
        return <div className="mt-5" key={index}>
            <p>{education.school_name}</p>
            <p>{education.degree}</p>
            <p>{education.start_date}</p>
            <p>{education.end_date}</p>
            <p>{education.description}</p>
        </div>
    });

  return (
    <UICard>
        <p className="text-gray-600 mb-4 font-bold">Education</p>
        {educationItems}
    </UICard>
  );
};

export default EducationCard;
