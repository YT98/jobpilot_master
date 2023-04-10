import { useContext, useEffect, useState } from "react";
import ResumePageContainer from "../../../components/resumes/[id]/ResumePageContainer";
import { ResumeContext } from "../../../contexts/ResumeContext";
import { AppContext } from "../../../contexts/AppContext";
import protectedRequest from "../../../utils/protectedRequest";
import { jobPostingRoutes, resumeRoutes } from "../../../config/routes";
import { JobPosting } from "../../../types/dbModels";

interface ResumeIndexState {
    resumeName?: string;
    jobTitle?: string;
    tailoredResume?: boolean;
    jobPostingId?: number;
    jobPostings: JobPosting[];
}

const ResumeIndex = () => {
    const { resumeState, resumeDispatch } = useContext(ResumeContext);
    const { appState } = useContext(AppContext);
    const accountId = appState.account ? appState.account.id : '';

    const [state, setState] = useState<ResumeIndexState>({
        resumeName: "",
        jobTitle: "",
        tailoredResume: false,
        jobPostingId: 0,
        jobPostings: []
    });

    useEffect(() => {
        if (resumeState.resume) {
            setState({
                ...state,
                resumeName: resumeState.resume.resumeName,
                jobTitle: resumeState.resume.jobTitle,
                tailoredResume: resumeState.resume.jobPostingId ? true : false,
                jobPostingId: resumeState.resume.jobPostingId,
            });
        }
    }, [resumeState.resume]);

    useEffect(() => {
        if (!appState.loading) {
            const getJobPostings = async () => {
                const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + jobPostingRoutes.getAllJobPostings + `/${accountId}`, "GET");
                const data = await response.json();
                setState({...state, jobPostings: data, jobPostingId: data[0].id});
            }
            getJobPostings();
        }
    }, [appState.loading]);

    const jobPostingOptions = state.jobPostings.map((jobPosting, index) => {
        // TODO: Handle case where there are duplicate job postings titles/companies
        return (
            <option key={index} value={jobPosting.id}> {jobPosting.title} at {jobPosting.companyName} </option>
        )
    });

    // TODO: Test
    const handleSubmit = async () => {
        // if ( !state.resumeName || !state.jobTitle ) return;
        // TODO: Validate that inputs have changed
        const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.updateResume + `/${resumeState.resume?.id}`, "POST",
            JSON.stringify ({
                resumeName: state.resumeName,
                jobTitle: state.jobTitle,
                jobPostingId: state.tailoredResume ? state.jobPostingId : undefined
            })
        );
        const data = await response.json();
        console.log(data.resume)
        resumeDispatch({type: "SET_RESUME", payload: data.resume});
    }

    if (resumeState.loading) return (<ResumePageContainer><div id="resume-index-loading"> Loading... </div></ResumePageContainer>);
    return (
        <ResumePageContainer>
            <div className="flex flex-row" id="resume-index">
                <div className="flex flex-col w-1/2 mr-5">
                    <label className="uppercase text-sm font-bold pb-1"> Resume Name </label>
                    <input
                        id="resume-name-input"
                        className="input input-bordered" type="text"
                        defaultValue={resumeState.resume?.resumeName}
                        onChange={(e) => { setState({...state, resumeName: e.target.value}) }}
                    />
                </div>
                <div className="flex flex-col w-1/2 ml-5">
                    <label className="uppercase text-sm font-bold pb-1"> Job Title </label>
                    <input
                        id="resume-job-title-input"
                        className="input input-bordered" type="text"
                        defaultValue={resumeState.resume?.jobTitle}
                        onChange={(e) => { setState({...state, jobTitle: e.target.value}) }}
                    />
                </div>
            </div>
            <div className="flex flex-col mt-8">
                <div className="flex flex-row mr-5 mb-5">
                    <label className="uppercase text-sm font-bold mr-5"> Tailored Resume </label>
                    <input
                        id="resume-tailored-resume-checkbox"
                        className="toggle" type="checkbox"
                        checked={state.tailoredResume}
                        onChange={(e) => { setState({...state, tailoredResume: e.target.checked}) }}
                    />
                </div>
                {state.tailoredResume ? <div className="flex-grow flex flex-col">
                    <label className="uppercase text-sm font-bold"> Choose Job Posting</label>
                    {/* TODO: bug when checkbox is checked, nothing is selected and submit is pressed */}
                    <select
                        id="resume-job-posting-select"
                        className="select select-bordered mt-2"
                        value={state.jobPostingId ? state.jobPostingId : state.jobPostings[0].id}
                        onChange={(e) => { setState({...state, jobPostingId: parseInt(e.target.value)}) }}
                    >
                        {jobPostingOptions.length > 0 ? jobPostingOptions : <option> No Job Postings </option>}
                    </select>
                </div> : ""}
            </div>
            <div className="mt-8">
                <button
                    id="resume-save-button"
                    className="btn btn-outline"
                    onClick={handleSubmit}
                > Save </button>
            </div>

        </ResumePageContainer>
    )
}

export default ResumeIndex;