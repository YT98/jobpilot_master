import { AppContext } from "../../contexts/AppContext";
import { useContext, useEffect } from "react";
import UICard from "../UICard";
import protectedRequest from "../../utils/protectedRequest";
import { profileRoutes } from "../../config/routes";

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
        
        const sendResume = async () => {
            console.log(formData)
            const response = await protectedRequest(
                process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.resume + `/${userId}`, 
                'POST', 
                formData,
                'multipart/form-data'
            );
            const data = await response.json();
            console.log(data);
        }
        sendResume();
};

  return (
    <div className="m-5 card rounded-lg border-gray-200 bg-white border-2 p-5">
        <div className="card-header prose p-5 pl-8">
            <h2 className="mb-0">Automatic Fill</h2>
            <p>To automatically fill in your profile, upload your resume or sign in with LinkedIn.</p>
        </div>
        <div className="card-body flex flex-row align-middle">
            <div className="flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="flex flex-col max-w-xs">
                    <input 
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf"
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                    <button 
                        type="submit"
                        className="btn btn-outline btn-sm mt-2"
                    >
                        Upload
                    </button>
                </form>
            </div>
            <div className="flex flex-col justify-center p-5">
                <span className="prose"> OR </span>
            </div>
            <div className="flex flex-col justify-center">
                <button className="btn btn-outline"> Sign in with LinkedIn </button>
            </div>
        </div>
    </div>
  );
};

export default UploadResumeCard;
