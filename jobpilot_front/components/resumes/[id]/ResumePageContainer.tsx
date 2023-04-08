import { useContext, useEffect } from "react";
import protectedRequest from "../../../utils/protectedRequest";
import { useRouter } from "next/router";
import { resumeRoutes } from "../../../config/routes";
import ResumeNavbar from "../../../components/resumes/[id]/ResumeNavbar";
import { ResumeContext } from "../../../contexts/ResumeContext";

interface ResumePageContainerProps {
    children: React.ReactNode;
}

const ResumePageContainer = ({children}: ResumePageContainerProps) => {
    const router = useRouter();
    const { id: resumeId } = router.query;
    const { resumeState, resumeDispatch } = useContext(ResumeContext);

    useEffect(() => {
        if (!resumeId) return;
        if (!resumeState.resume || resumeId != resumeState.resume.id.toString()) {
            const fetchResume = async () => {
                const response = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.getCompleteResume + `/${resumeId}`, 'GET');
                const data = await response.json();
                // TODO: Handle 404
                if (response.status === 404) {
                    router.push("/404");
                    return;
                }
                resumeDispatch({
                    type: "CLEAR_RESUME"
                });
                resumeDispatch({
                    type: "SET_COMPLETE_RESUME",
                    payload: {
                        resume: data.resumeComplete.resume,
                        contact: data.resumeComplete.contact,
                        experiences: data.resumeComplete.experiences,
                        projects: data.resumeComplete.projects,
                        educations: data.resumeComplete.educations,
                        certifications: data.resumeComplete.certifications,
                        involvements: data.resumeComplete.involvements,
                        skills: data.resumeComplete.skills,
                        languages: data.resumeComplete.languages,
                        summary: data.resumeComplete.summary
                    }
                });
            }
            fetchResume();
        }
    }, [resumeId]);
    
    return (
        <div>
            <div className="max-w-[1280px] m-auto">
                { resumeState.resume ? 
                    <ResumeNavbar 
                        resumeId={resumeState.resume.id.toString()} 
                        resumeName={resumeState.resume.resumeName} 
                        currentPage={router.pathname.split("/").slice(-1)[0]}
                    /> : < ResumeNavbar resumeId={null} resumeName={null} currentPage={router.pathname.split("/").slice(-1)[0]} /> }
                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ResumePageContainer;