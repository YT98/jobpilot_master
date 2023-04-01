import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useAuth } from "./_useAuth";

import Sidebar from "../components/Sidebar";
import UICard from "../components/UICard";

const NewJobPosting = () => {
    useAuth();
    const { appState } = useContext(AppContext);
    const userId = appState.user ? appState.user.id : '';

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let jobPostingDescriptionElement = document.getElementById('job-posting-description') as HTMLInputElement;
        let jobPostingDescription = jobPostingDescriptionElement.value as string;
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/job_postings/create', {
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
        <div className="flex bg-zinc-100">
            <Sidebar />
            <div className="flex flex-col w-full">
                <UICard>
                    <p className="text-gray-600 mb-4 font-bold">New Job Posting</p>
                    <textarea id="job-posting-description" className="w-full h-40 border border-gray-300 rounded-md p-2 mb-4" placeholder="Paste job posting here"></textarea>
                    <button className="bg-zinc-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Create Job Posting</button>
                </UICard>
            </div>
        </div>
    );
};

export default NewJobPosting;