import { AppContext } from "../../contexts/AppContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import DashboardCard from "../DashboardCard";

const UploadResumeCard = () => {
    const { appState } = useContext(AppContext);
    const userId = appState.user ? appState.user.id : '';
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        const fileField = document.querySelector('#resume') as HTMLInputElement;

        // TODO: Update appState
        // TODO: Add loading
        // TODO: Add error handling
        if (fileField == null) { return; }
        if (fileField.files == null) { return; }

        formData.append('resume', fileField.files[0]);
        fetch(`http://localhost:5000/user/${userId}/resume`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

  return (
    <DashboardCard>
        <div className="flex-col">
            <p className="text-gray-600 mb-4 font-bold">Upload Resume</p>
            <p>Manually fill in your information below or upload your resume.</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    className="mt-3"
                />
                <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                >
                    Upload
                </button>
            </form>
        </div>
    </DashboardCard>
  );
};

export default UploadResumeCard;
