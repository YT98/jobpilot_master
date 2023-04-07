import { useState } from "react";
import { WorkExperienceWithSkills } from "../../types/dbModels";
import SkillsOrLanguages from "./SkillsOrLanguages";
import Tooltip from "./Tooltip";

interface WorkExperienceCardProps {
    workExperience: WorkExperienceWithSkills;
    removeWorkExperience: () => void;
}

interface WorkExperienceCardState {
    workExperience: WorkExperienceWithSkills;
    currentlyWorking: boolean;
}

const WorkExperienceCard = ({workExperience, removeWorkExperience}: WorkExperienceCardProps) => {
    const [state, setState] = useState<WorkExperienceCardState>({
        workExperience: workExperience,
        currentlyWorking: false
    })

    return (
        <div className="p-5 rounded-lg border-2 border-gray-200 mt-5">
            <div className="flex justify-end">
                <button 
                    className="rounded-full border-2 border-gray-300 pl-2 pr-2 text-gray-400 hover:border-gray-500 hover:text-gray-500"
                    onClick={removeWorkExperience}
                >
                    X
                </button>
            </div>
            <div className="flex flex-col">
                <label className="label mt-3">
                    <span className="label-text">Company Name *</span>
                </label>
                <input 
                    className="input input-bordered" type="text" placeholder="Company Name"
                    value={workExperience.companyName}
                    onChange={(e) => {workExperience.companyName = e.target.value}}
                />

                <label className="label mt-3">
                    <span className="label-text">Location *</span>
                </label>
                <input 
                    className="input input-bordered" type="text" placeholder="Location"
                    value={workExperience.location}
                    onChange={(e) => {workExperience.location = e.target.value}}
                />

                <label className="label mt-3">
                    <span className="label-text">Job Title *</span>
                </label>
                <input 
                    className="input input-bordered" type="text" placeholder="Job Title" 
                    value={workExperience.title}
                    onChange={(e) => {workExperience.title = e.target.value}}    
                />

                <div className="flex flex-row">
                    <div>
                        <label className="label mt-3">
                            <span className="label-text">Start Date *</span>
                        </label>
                        <input
                            type="month" 
                            className="input input-bordered mr-3" 
                            value={workExperience.startDate}
                            onChange={(e) => {workExperience.startDate = e.target.value}}
                        />
                    </div>
                    <div>
                        <label className={state.currentlyWorking ? "label mt-3 opacity-70" : "label mt-3"}>
                            <span className="label-text">End Date *</span>
                        </label>
                        <input
                            type="month" 
                            className={state.currentlyWorking ? "input input-bordered input-disabled opacity-70" : "input input-bordered"}
                            disabled={state.currentlyWorking}
                            value={workExperience.currentlyWorking ? "" : workExperience.endDate}
                            onChange={(e) => {workExperience.endDate = e.target.value}}
                        />
                        <div className="form-control">
                        <label className="label cursor-pointer mt-1">
                            <input 
                                type="checkbox" className="checkbox checkbox-sm"
                                checked={workExperience.currentlyWorking}
                                onChange={(e) => {
                                    workExperience.currentlyWorking = e.target.checked
                                    setState({...state, currentlyWorking: e.target.checked})
                                }}
                            />
                            <span className="label-text ml-2">I am currently working in this role</span> 
                        </label>
                    </div>
                    </div>
                </div>
                
                <label className="label mt-3">
                    <span className="label-text">
                        Description &nbsp;
                        <Tooltip text={"The main duties and responsibilities you held or any major contributions you made during your tenure."}/> 
                    </span>
                </label>
                <textarea 
                    className="textarea textarea-bordered" placeholder="Description"
                    value={workExperience.description}
                    onChange={(e) => {workExperience.description = e.target.value}}
                ></textarea>

                <div>
                    <h3 className="mb-3"> Skills </h3>
                    <SkillsOrLanguages
                        skillsOrLanguages={workExperience.skills}
                        setSkillsOrLanguages={
                            (skills) => setState({
                                ...state, 
                                workExperience: {...state.workExperience, skills: skills}
                            })
                        }
                        buttonText = "Add Skill "
                    />
                </div>
            </div>
        </div>
    )
};

export default WorkExperienceCard;