import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import protectedRequest from "../../utils/protectedRequest";
import { jobPostingRoutes } from "../../config/routes";
import JobPosting from "../../types/JobPosting";

const JobPostingPage = () => {
    const router = useRouter();
    const job_posting_id = router.query.id;

    const [jobPosting, setJobPosting] = useState<JobPosting>({
        id: '',
        companyName: '',
        jobTitle: '',
        description: '',
        location: '',
        skills: [],
        educationQualifications: [],
        experienceQualifications: [],
    });

    const getJobPosting = async () => {
        try {
            const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + jobPostingRoutes.getJobPosting + `/${job_posting_id}`, 'GET');
            const jobPostingData = await response.json();
            setJobPosting({
                ...jobPosting,
                ...jobPostingData.jobPosting
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (job_posting_id) {
            getJobPosting();
        }
    }, [job_posting_id]);

    return (
        <div className="p-10">
            <div className="flex flex-row justify-between">

                <div className="prose p-5 flex flex-row align-middle">
                    <div>
                        <h1 className="m-0">{jobPosting.jobTitle}</h1>
                        <div>
                            <h3 className="m-0 inline">{jobPosting.companyName}</h3>
                            <h3 className="inline ml-3 font-normal text-gray-500">{jobPosting.location}</h3>
                        </div>
                        <p className="m-0"> Status: You have not yet applied to this position. </p>
                    </div>
                </div>

                <div className="prose p-5 ">
                    <button className="btn btn-outline">
                        Generate resume
                    </button>
                    <button className="btn btn-outline ml-2">
                        Generate cover letter
                    </button>
                    <button className="btn btn-outline ml-2">
                        Mark as applied
                    </button>
                </div>

            </div>

            <div className="w-full flex flex-row">
                
            </div>

            

            

            <div className="prose p-5 max-w-none">
                <h2 className="">Full Description</h2>
                <div className="max-h-[400px] overflow-scroll border-2 border-gray-100 p-5">
                    <p className="m-0">{jobPosting.description}</p>
                </div>
            </div>
        </div>
    )
}

export default JobPostingPage;