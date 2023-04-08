import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import protectedRequest from "../../utils/protectedRequest";
import { resumeRoutes } from "../../config/routes";
import { Resume } from "../../types/dbModels";
import Link from "next/link";
import { useRouter } from "next/router";


const Resumes = () => {
    const { appState } = useContext(AppContext);
    const router = useRouter();
    const accountId = appState.account ? appState.account.id : null;
    const [resumes, setResumes] = useState<Resume[]>([]);

    const handleCreate = async () => {
        try {
            const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.createResume, 'POST',
                JSON.stringify({
                    resumeName: "New Resume",
                    accountId: accountId,
                    jobTitle: "Job Title"
                })
            );
            const data = await response.json();
            if (response.status === 200) {
                router.push(`/resumes/${data.resumeId}/contact`);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        if (accountId) {
            try {
                const fetchResumes = async () => {
                    const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.getAllResumes + `/${accountId}`, 'GET')
                    const data = await response.json();
                    if (response.status === 200) {
                        setResumes(data.resumes);
                    } else {
                        throw new Error(data.message);
                    }
                }
                fetchResumes();
            } catch (error) {
                alert(error);
            }
        }
    }, [accountId]);

    const resumeCardClasses = "m-2 border-2 flex flex-col no-underline hover:border-blue-500 ease-in-out duration-100";
    const resumeCards = resumes.map((resume, index) => {
        return (
            <Link href={`/resumes/${resume.id}/contact`} key={index} className={resumeCardClasses}>
                {/* Resume image placeholder */}
                <div className="h-[250px] w-[300px] bg-gray-200"></div>
                <div className="p-4">
                    <p className="m-0 font-bold">{resume.resumeName}</p>
                    {resume.jobPostingId ? 
                        <p className="bg-blue-500 rounded-full"> Tailored </p>
                        : ""
                    }
                </div>
            </Link>
        )
    })
            

    return (
        <div className="p-10">
            <div className="prose">
                <h1>Resumes</h1>
            </div>
            <div className="flex flex-row p-5 flex-wrap">
                {resumeCards}
                <a 
                    className={"m-2 flex flex-col no-underline border-2 border-dashed hover:border-blue-500 ease-in-out duration-100"}
                    onClick={handleCreate}
                >
                    <div className="h-[250px] w-[300px]"></div>
                    <div className="p-4">
                        <p className="m-0 font-bold">Create new resume</p>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Resumes;