import Link from "next/link";

interface JobPosting {
    id: number;
    company_name: string;
    title: string;
}

interface JobPostingsTableProps {
    jobPostings: JobPosting[];
}

const JobPostingsTable = ({ jobPostings }: JobPostingsTableProps) => {

    const JobPostingRows = jobPostings.map((jobPosting, index) => {
        return <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div>
                        <div className="font-bold">{jobPosting.company_name}</div>
                        <div className="text-sm opacity-50">location</div>
                    </div>
                </div>
            </td>
            <td>
                {jobPosting.title}
            </td>
            <td>
                Purple
            </td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    });

    return (
        <div className="card m-5 border-2 border-gray-200 rounded-lg">
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-white border-b-2 border-gray-200">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>
                                <Link className="btn btn-sm" href="/new-job-posting">
                                    New
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {JobPostingRows}
                    </tbody>
                </table>
                </div>
        </div>
    );
};

export default JobPostingsTable;
