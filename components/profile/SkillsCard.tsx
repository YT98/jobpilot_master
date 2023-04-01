import { AppContext } from "../../contexts/AppContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import DashboardCard from "../DashboardCard";

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
  const userId = appState.user ? appState.user.id : '';
  const [state, setState] = useState<SkillState>({
        skills: [],
        error: ''
    });

    useEffect(() => {
        if (!appState.loading) {
            const fetchSkills = async () => {
                const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/profile/skills' + `/${userId}`);
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
        className="p-3 bg-gray-100 m-2 rounded-md first-of-type:ml-0" 
        key={index}>
            {skill.name}
            {/* TODO: Add delete functionality */}
            <button className="m-1 font-bold text-sm text-red-500 hover:text-red-800"> X </button>
        </li>
    });

  return (
    <DashboardCard>
        <div>
            <p className="text-gray-600 mb-4 font-bold">Skills</p>
            <ul className="flex"> 
                {skillItems} 
                <li className="p-3 bg-gray-100 m-2 rounded-md"> <button>New Skill</button> </li>
            </ul>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">
                Save
            </button>
        </div>
    </DashboardCard>
  );
};

export default SkillCard;
