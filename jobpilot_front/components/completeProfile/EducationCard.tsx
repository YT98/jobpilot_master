import { useState } from "react";
import { Education } from "../../types/dbModelsExtended";
import Tooltip from "./Tooltip";

interface EducationCardProps {
    education: Education;
    removeEducation: () => void;
}

const EducationCard = ({education, removeEducation}: EducationCardProps) => {

    return (
        <div className="p-5 rounded-lg border-2 border-gray-200 mt-5">
            <div className="flex justify-end">
                <button 
                    className="rounded-full border-2 border-gray-300 pl-2 pr-2 text-gray-400 hover:border-gray-500 hover:text-gray-500"
                    onClick={removeEducation}
                >
                    X
                </button>
            </div>
            <div className="flex flex-col">
                <label className="label mt-3">
                    <span className="label-text">Institution Name *</span>
                </label>
                <input 
                    className="input input-bordered" type="text" placeholder="Institution Name"
                    defaultValue={education.schoolName}
                    onChange={(e) => {education.schoolName = e.target.value}}
                />

                <label className="label mt-3">
                    <span className="label-text">Location *</span>
                </label>
                <input 
                    className="input input-bordered" type="text" placeholder="Location"
                    defaultValue={education.location}
                    onChange={(e) => {education.location = e.target.value}}
                />

                <label className="label mt-3">
                    <span className="label-text">Degree Type *</span>
                </label>
                <div className="border border-gray-300 rounded-lg p-2">
                    <select
                        className="w-full"
                        defaultValue={education.degree}
                        onChange={(e) => {education.degree = e.target.value}}
                    >
                        <option value="Associate's">Associate's</option>
                        <option value="Bachelor's">Bachelor's</option>
                        <option value="Master's">Master's</option>
                        <option value="Doctorate">Doctorate</option>
                    </select>
                </div>

                <label className="label mt-3">
                    <span className="label-text">Major or Area of Study *</span>
                </label>
                <input 
                    className="input input-bordered" type="text" placeholder="Major or Area of Study"
                    defaultValue={education.majorOrAreaOfStudy}
                    onChange={(e) => {education.majorOrAreaOfStudy = e.target.value}}    
                />

                <div className="flex flex-row">
                    <div>
                        <label className="label mt-3">
                            <span className="label-text">Start Date *</span>
                        </label>
                        <input
                            type="month" 
                            className="input input-bordered mr-3" 
                            onChange={(e) => {education.startDate = e.target.value}}
                        />
                    </div>
                    <div>
                        <label className={education.currentlyAttending ? "label mt-3 opacity-70" : "label mt-3"}>
                            <span className="label-text">End Date *</span>
                        </label>
                        <input
                            type="month" 
                            className={education.currentlyAttending ? "input input-bordered input-disabled opacity-70" : "input input-bordered"}
                            disabled={education.currentlyAttending}
                            onChange={(e) => {education.endDate = e.target.value}}
                        />
                        <div className="form-control flex flex-row">
                            <label className="label cursor-pointer mt-1">
                                <input 
                                    type="checkbox" className="checkbox checkbox-sm"
                                    onChange={(e) => { education.currentlyAttending = e.target.checked }}
                                />
                                <span className="label-text ml-2">I am currently attending this school </span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <label className="label mt-3">
                    <span className="label-text">
                        Description &nbsp;
                        <Tooltip text={"E.g. GPA, relevant coursework, honors or awards"} />
                    </span>
                </label>
                <textarea 
                    className="textarea textarea-bordered" placeholder="Description"
                    onChange={(e) => {education.description = e.target.value}}
                ></textarea>
            </div>
        </div>
    )
};

export default EducationCard;