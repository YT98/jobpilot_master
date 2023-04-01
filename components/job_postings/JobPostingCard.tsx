import UICard from "../UICard";

interface JobPostingCardProps {
    jobPosting: any;
}

const JobPostingCard = ({jobPosting}: JobPostingCardProps) => {
  return (
    <UICard>
        <p className="text-gray-600 mb-4 font-bold">{jobPosting.title} at {jobPosting.company_name}</p>
        <p> Description: {jobPosting.description}</p>
    </UICard>
  );
};

export default JobPostingCard;
