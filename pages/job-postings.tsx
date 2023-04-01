import Sidebar from "../components/Sidebar";
import { useAuth } from "./_useAuth";
import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import JobPostingCard from "../components/job_postings/JobPostingCard";
import UICard from "../components/UICard";

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
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/job_postings/get-all' + `/${userId}`);
        const data = await response.json();
        setState({...state, job_postings: data});
      }
      fetchJobPostings();
    }
  }, [appState.loading]);

  const JobPostingCards = state.job_postings.map((jobPosting, index) => {
    return <JobPostingCard key={index} jobPosting={jobPosting}/>
  });

  return (
    <div className="flex bg-zinc-50">
      <Sidebar/>
      <div className="flex flex-col w-full">
        <UICard>
          <p className="text-gray-600 mb-4 font-bold">Job Postings</p>
          <Link className="bg-zinc-500 text-white px-4 py-2 rounded-md" href="/new-job-posting">Create Job Posting</Link>
        </UICard>
        {JobPostingCards}
      </div>
      
    </div>
  );
};

export default JobPostings;