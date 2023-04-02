import { useAuth } from "./_useAuth";
import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import JobPostingsTable from "../components/job_postings/JobPostingsTable";
import { jobPostingRoutes } from "../config/routes";

interface JobPosting {
  id: number;
  title: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface JobPostingState {
  job_postings: JobPosting[];
  error: string;
}

const JobPostings = () => {
  useAuth();
  const { appState } = useContext(AppContext);
  const userId = appState.user ? appState.user.id : '';
  const [state, setState] = useState<JobPostingState>({
    job_postings: [],
    error: ''
  });

  useEffect(() => {
    if (!appState.loading) {
      const fetchJobPostings = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + jobPostingRoutes.getJobPostings + `/${userId}`);
        const data = await response.json();
        setState({...state, job_postings: data});
      }
      fetchJobPostings();
    }
  }, [appState.loading]);

  return (
    <div className="flex bg-zinc-50 min-h-full">
      <div className="flex flex-col w-full">
        <JobPostingsTable jobPostings={state.job_postings}/>
      </div>
      
    </div>
  );
};

export default JobPostings;