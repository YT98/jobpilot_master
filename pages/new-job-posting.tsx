import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useAuth } from "./_useAuth";
import { jobPostingRoutes } from "../config/routes";
import protectedRequest from "../utils/protectedRequest";
import { useRouter } from "next/router";

// TODO: Add loading overlay

interface JobPostingState {
    loading: boolean;
    informationExtracted: boolean;
    cancelConfirmation: boolean;
    jobPostingDescription: string;
    jobPostingInformation: {
        companyName: string;
        title: string;
        location: string;
        skills: string[];
        qualifications: {
            education: string;
            experience: string;
        }
    };
    error: string;
}

const NewJobPosting = () => {
    useAuth();
    const { appState } = useContext(AppContext);
    const userId = appState.user ? appState.user.id : '';
    const router = useRouter();
    
    const [state, setState] = useState<JobPostingState>({
        loading: false,
        informationExtracted: false,
        cancelConfirmation: false,
        jobPostingDescription: '',
        jobPostingInformation: {
            companyName: '',
            title: '',
            location: '',
            skills: [],
            qualifications: {
                education: '',
                experience: ''
            }
        },
        error: ''
    });

    const handleSubmitJobDescription = async (e: any) => {
        e.preventDefault();
        let jobPostingDescriptionElement = document.getElementById('job-posting-description') as HTMLInputElement;
        let jobPostingDescription = jobPostingDescriptionElement.value as string;
        setState({...state, jobPostingDescription: jobPostingDescription, loading: true});
        try {
            const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + jobPostingRoutes.extractJobPostingInformation, 'POST', JSON.stringify({
                userId: userId,
                description: jobPostingDescription,
            }));
            const data = await response.json();
            setState({...state, jobPostingInformation: data.jobPosting, informationExtracted: true, loading: false});
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitJobInformation = async (e: any) => {
        e.preventDefault();
        setState({...state, loading: true});
        try {
            const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + jobPostingRoutes.createJobPosting, 'POST', JSON.stringify({
                userId: userId,
                jobPosting: {
                    ...state.jobPostingInformation,
                    description: state.jobPostingDescription
                }
            }));
            const data = await response.json();
            router.push(`/job-postings/${data.jobPostingId}`);
        } catch (error) {
            console.log(error);
        }
    };


    const handleRemoveSkill = (index: number) => {
        let skills = state.jobPostingInformation.skills;
        skills.splice(index, 1);
        setState({...state, jobPostingInformation: {...state.jobPostingInformation, skills: skills}});
    };

    const handleAddSkill = (e: any) => {
        e.preventDefault();
        let skillInput = document.getElementById('add-skill-input') as HTMLInputElement;
        let skill = skillInput.value as string;
        let skills = state.jobPostingInformation.skills;
        skills.push(skill);
        setState({...state, jobPostingInformation: {...state.jobPostingInformation, skills: skills}});
        skillInput.value = '';
    };

    const handleCancel = (e: any) => {
        e.preventDefault();
        router.push('/job-postings');
    };

    const skillInputs = state.jobPostingInformation.skills.map((skill, index) => {
        return (
            
            <div key={skill + index.toString()} className="modify-skill-input-container">
                <input
                    type="text"
                    className=""
                    defaultValue={skill}
                />
                <button onClick={() => handleRemoveSkill(index)}> X </button>
            </div>
        );
    });

    return (
        <div className="flex bg-gray-100">

            <div 
                className={state.cancelConfirmation ? "cancel-overlay absolute h-full w-full z-10" : "hidden"}
            >
                <div className="card absolute top-1/2 left-1/2 bg-white border-2 border-gray-200 -translate-x-1/2 -translate-y-1/2">
                    <div className="card-body">
                        <h2 className="card-title">Are you sure you want to cancel?</h2>
                        <p className="mb-0">All information will be lost.</p>
                        <div className="flex justify-end mt-6">
                            <button className="btn btn-outline mr-2" onClick={handleCancel}>Yes</button>
                            <button 
                                className="btn btn-outline"
                                onClick={() => setState({...state, cancelConfirmation: false})}
                                >No</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full">

                <div 
                    className={state.informationExtracted ? "create-job-posting-section disabled" : "create-job-posting-section"}
                >
                    <div className="prose p-5">
                        <h1 className="mb-0">Step 1:</h1>
                        <p> Paste your job posting below and submit to extract information. </p>
                    </div>
                    <div className="p-5 flex-1">
                        <textarea 
                            id="job-posting-description" 
                            className="textarea textarea-bordered w-full h-full"
                            disabled={state.informationExtracted}
                        >
                        </textarea>
                    </div>
                    <div className="w-full p-5">
                        <button 
                            className={state.informationExtracted ? "btn btn-outline mr-2 btn-disabled" : "btn btn-outline mr-2 btn-error"}
                            onClick={() => setState({...state, cancelConfirmation: true})}
                        >
                            Cancel</button>
                        <button 
                            className={
                                state.loading && !state.informationExtracted ? "btn btn-outline loading" :
                                state.informationExtracted ? "btn btn-outline btn-disabled" : "btn btn-outline"
                            }
                            onClick={handleSubmitJobDescription}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                <div 
                    className={state.informationExtracted ? "create-job-posting-section right" : "create-job-posting-section right disabled"}
                >
                    <div className="prose p-5">
                        <h1 className="mb-0">Step 2:</h1>
                        <p> Verify and edit extracted job information. </p>
                    </div>

                    <div className="p-5 prose">
                        <div>
                            <h3 className="mt-0">Basic Info</h3>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                className="input mt-2"
                                placeholder="Company Name"
                                defaultValue={state.jobPostingInformation.companyName}
                            />
                            <input
                                type="text"
                                className="input mt-2"
                                placeholder="Job Title"
                                defaultValue={state.jobPostingInformation.title}
                            />
                            <input
                                type="text"
                                className="input mt-2"
                                placeholder="Location"
                                defaultValue={state.jobPostingInformation.location}
                            />
                        </div>
                    </div>

                    <div className="p-5 prose">
                        <div>
                            <h3 className="mt-0">Skills</h3>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                className="input mt-2 placeholder-skill-input"
                                placeholder="Skills"
                            />
                            {skillInputs}
                            <div className="add-skill-input-container">
                                <input
                                    type="text"
                                    placeholder="Add skill"
                                    id="add-skill-input"
                                />
                                <button
                                    className=""
                                    onClick={handleAddSkill}
                                > Add </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 prose">
                        <div>
                            <h3 className="mt-0">Qualifications</h3>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                className="input mt-2"
                                placeholder="Education"
                                defaultValue={state.jobPostingInformation.qualifications.education}
                            />
                            <input
                                type="text"
                                className="input mt-2"
                                placeholder="Experience"
                                defaultValue={state.jobPostingInformation.qualifications.experience}
                            />
                        </div>
                    </div>
                    
                    <div className="p-5 prose">
                        <button 
                            className={state.informationExtracted ? "btn btn-outline mr-2 btn-error" : "btn btn-outline mr-2 btn-disabled"}
                            onClick={() => setState({...state, cancelConfirmation: true})}
                        >
                            Cancel</button>
                        <button 
                            className={
                                state.loading && state.informationExtracted ? "btn btn-outline loading" :
                                state.informationExtracted ? "btn btn-outline" : "btn btn-outline btn-disabled"
                            }
                            onClick={handleSubmitJobInformation}
                        >
                            Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewJobPosting;