import { AppContext } from "../../contexts/AppContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import UICard from "../UICard";
import protectedRequest from "../../utils/protectedRequest";
import { profileRoutes } from "../../config/routes";

interface Skill {
    id: number;
    name: string;
}

interface SkillState {
    skills: Skill[];
    error: string;
}

const SkillCard = () => {
  const { appState } = useContext(AppContext);
  const accountId = appState.account ? appState.account.id : '';
  const [state, setState] = useState<SkillState>({
        skills: [],
        error: ''
    });

    useEffect(() => {
        if (!appState.loading) {
            const fetchSkills = async () => {
                const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.skills + `/${accountId}`, 'GET', null)
                const data = await response.json();
                setState({...state, skills: data});
            }
            fetchSkills();
        }
    }, [appState.loading]);
    
    // TODO: Add update functionality
    // TODO: Add new skill functionality

    const skillItems = state.skills.map((skill, index) => {
        return <li 
        className="p-3 bg-gray-100 mr-2 mb-2 rounded-md prose" 
        key={index}>
            {skill.name}
        </li>
    });

  return (
    <UICard>
        <div className="card-header prose p-5">
            <h2>Skills</h2>
        </div>
        <div className="p-5">
            <ul className="flex flex-wrap"> 
                {skillItems}
            </ul>
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

export default SkillCard;
