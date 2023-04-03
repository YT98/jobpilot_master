import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { useRouter } from "next/router";
import protectedRequest from "../../utils/protectedRequest";
import { jobPostingRoutes } from "../../config/routes";
import QualificationsComparison from "../../components/job_postings/QualificationsComparison";
import SkillsComparison from "../../components/job_postings/SkillsComparison";

interface JobPosting {
    id: string;
    company_name: string
    title: string;
    description: string;
    location: string;
    skills: string[];
    qualifications: {
        education: string;
        experience: string;
    }
}

interface UserProfile {
    highestEducation: string;
    skills: string[];
    yearsExperience: number;
}

const JobPosting = () => {
    const { appState } = useContext(AppContext);
    const userId = appState.user ? appState.user.id : '';

    const [jobPosting, setJobPosting] = useState<JobPosting>({
        id: '',
        company_name: '',
        title: '',
        description: '',
        location: '',
        skills: ["Python", "React", "Node", "Express", "MongoDB", "SQL"],
        qualifications: {
            education: "",
            experience: ""
        }
    });

    const [userProfile, setUserProfile] = useState<UserProfile>({
        skills: [],
        highestEducation: "",
        yearsExperience: 0
    });

    const router = useRouter();
    const { id } = router.query;

    const getJobPosting = async () => {
        try {
            const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + jobPostingRoutes.getJobPosting + `/${id}`, 'GET');
            const jobPostingData = await response.json();
            setJobPosting({
                ...jobPostingData, 
                skills: jobPosting.skills,
                qualifications: {
                    education: jobPostingData.education_qualification,
                    experience: jobPostingData.experience_qualification
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getJobPosting();
    }, [id]);

    return (
        <div className="p-10">
            <div className="flex flex-row justify-between">

                <div className="prose p-5 flex flex-row align-middle">
                    <div>
                        <h1 className="m-0">{jobPosting.title}</h1>
                        <div>
                            <h3 className="m-0 inline">{jobPosting.company_name}</h3>
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
                <SkillsComparison jobPostingId={jobPosting.id} />
                <QualificationsComparison jobPostingId={jobPosting.id} />
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

export default JobPosting;