import Link from "next/link";

interface ResumeNavbarProps {
    resumeId: string | null;
    resumeName: string | null;
    currentPage: string | null;
}

const ResumeNavbar = ({resumeId, resumeName, currentPage}: ResumeNavbarProps) => {

    const resumeNameClasses = "bg-gray-200 m-2 ml-0 pt-2 pb-2 pl-4 pr-4 rounded-lg uppercase text-xs font-bold w-[150px] text-center ease-in-out duration-100 text-gray-600 hover:text-gray-900"
    const activeResumeNameClasses = "bg-blue-500 text-white m-2 ml-0 pt-2 pb-2 pl-4 pr-4 rounded-lg uppercase text-xs font-bold w-[150px] text-center ease-in-out duration-100"
    const linkClasses = "uppercase text-xs text-gray-600 font-bold m-2 pt-2 pb-2 pl-3 pr-3 hover:text-gray-900 ease-in-out duration-100";
    const activeLinkClasses = "uppercase text-xs font-bold m-2 pt-2 pb-2 pl-3 pr-3 ease-in-out duration-100 text-white bg-blue-500 rounded-lg";

    const pages = ["contact", "experience", "project", "education", "certification", "involvement", "skills-and-languages", "summary", "layout"]
    const pageLinks = pages.map((page, index) => {
        const pageName = page.replace(/-/g, " ");
        const linkPath = resumeId ? `/resumes/${resumeId}/${page}` : "#";
        const classNames = currentPage === page ? activeLinkClasses : linkClasses;
        return (
            <Link
                key={index}
                href={linkPath}
                className={classNames}
            >
                {pageName}
            </Link>
        )
    })

    return (
        <div className="flex flex-row p-5 flex-wrap">
            <Link
                href={ resumeId ? `/resumes/${resumeId}` : "#" }
                className={currentPage === "[id]" ? activeResumeNameClasses : resumeNameClasses}
            >
                {resumeName ? 
                    resumeName.length > 14 ? resumeName.substring(0, 14) + "..." : resumeName 
                    : <span className="w-[150px] block"></span>
                }
            </Link>
            {pageLinks}
        </div>
    )
}

export default ResumeNavbar;