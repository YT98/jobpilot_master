import { useState } from "react";

interface SkillsOrLanguagesProps {
    skillsOrLanguages: string[];
    setSkillsOrLanguages: (skillsOrLanguages: string[]) => void;
    buttonText: string;
}

const SkillsOrLanguages = ({ skillsOrLanguages, setSkillsOrLanguages, buttonText}: SkillsOrLanguagesProps) => {
    const [state, setState] = useState({
        isAdding: false,
        beingCurrentlyAdded: ""
    });

    const handleAdd = () => {
        skillsOrLanguages.push(state.beingCurrentlyAdded);
        setSkillsOrLanguages(skillsOrLanguages);
        setState({...state, isAdding: false, beingCurrentlyAdded: ""});
    }

    const handleToggleAdd = () => {
        setState({...state, isAdding: true});
    }

    const handleRemoveSkillOrLanguage = (index: number) => {
        skillsOrLanguages.splice(index, 1);
        setSkillsOrLanguages(skillsOrLanguages);
    }

    const skillsOrLanguagesList = skillsOrLanguages.map((skillOrLanguage, index) => {
        return (
            <button key={skillOrLanguage + index.toString()} className="border border-gray-400 rounded-full pl-4 pr-4 mr-2">
                {skillOrLanguage} 
                <span
                    className="ml-2"
                    onClick={() => {handleRemoveSkillOrLanguage(index)}}
                >
                        &#10005;
                </span>
            </button>
        )
    });

    return (
        <div className="flex flex-row flex-wrap">
            {skillsOrLanguagesList}
            <div className={state.isAdding ? "border border-gray-700 rounded-full pl-2 pr-2 ml-2 mr-2" : "hidden"}>
                <input
                    className="inline-block h-10 bg-transparent pl-2"
                    type="text" placeholder="Skill"
                    value={state.beingCurrentlyAdded}
                    onChange={(e) => {setState({...state, beingCurrentlyAdded: e.target.value})}}
                />
                <span
                    className="font-semibold text-gray-700 cursor-pointer hover:text-black"
                    onClick={handleAdd}
                >
                    ADD
                </span>
            </div>
            <button 
                className={state.isAdding ? "hidden" : "btn btn-outline rounded-full"}
                onClick={handleToggleAdd}
            >
                    {buttonText}
                    +
            </button>
        </div>
    )
}

export default SkillsOrLanguages;