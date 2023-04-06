interface JobPostingType {
    id: string;
    companyName: string
    jobTitle: string;
    description: string;
    location: string;
    skills: string[];
    experienceQualifications: string[];
    educationQualifications: string[];
}

export default JobPostingType;