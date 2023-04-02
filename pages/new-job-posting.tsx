import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useAuth } from "./_useAuth";

import UICard from "../components/UICard";
import { jobPostingRoutes } from "../config/routes";

const NewJobPosting = () => {
    useAuth();
    const { appState } = useContext(AppContext);
    const userId = appState.user ? appState.user.id : '';

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let jobPostingDescriptionElement = document.getElementById('job-posting-description') as HTMLInputElement;
        let jobPostingDescription = jobPostingDescriptionElement.value as string;
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + jobPostingRoutes.createJobPosting, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    description: jobPostingDescription
                })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex bg-gray-100">
            <div className="flex flex-row w-full">

                <div className="w-1/2 bg-white p-5 flex flex-col">
                    <div className="prose p-5">
                        <h1 className="mb-0">Step 1:</h1>
                        <p> Paste your job posting below and submit to extract information. </p>
                    </div>
                    <div className="p-5 flex-1">
                        <textarea 
                            id="job-posting-description" 
                            className="textarea textarea-bordered w-full h-full">
                        </textarea>
                    </div>
                    <div className="w-full p-5">
                        <button 
                            className="btn btn-outline"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                <div className="w-1/2 bg-gray-50 border-l-2 border-gray-200 p-5">
                    <div className="prose p-5">
                        <h1 className="text-gray-400 mb-0">Step 2:</h1>
                        <p className="text-gray-400"> Verify and edit extracted job information. </p>
                    </div>

                    <div className="p-5 prose">
                        <div>
                            <h3 className="mt-0 text-gray-400">Basic Info</h3>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                className="input input-bordered input-disabled mt-2"
                                placeholder="Company Name"
                            />
                            <input
                                type="text"
                                className="input input-bordered input-disabled mt-2"
                                placeholder="Job Title"
                            />
                            <input
                                type="text"
                                className="input input-bordered input-disabled mt-2"
                                placeholder="Location"
                            />
                        </div>
                    </div>

                    <div className="p-5 prose">
                        <div>
                            <h3 className="mt-0 text-gray-400">Skills</h3>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                className="input input-bordered input-disabled mt-2"
                                placeholder="Skills"
                            />
                        </div>
                    </div>

                    <div className="p-5 prose">
                        <div>
                            <h3 className="mt-0 text-gray-400">Qualifications</h3>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                className="input input-bordered input-disabled mt-2"
                                placeholder="Education"
                            />
                            <input
                                type="text"
                                className="input input-bordered input-disabled mt-2"
                                placeholder="Experience"
                            />
                        </div>
                    </div>
                    
                    <div className="p-5 prose">
                        <button className="btn btn-outline btn-disabled mr-2">Cancel</button>
                        <button className="btn btn-outline btn-disabled">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewJobPosting;