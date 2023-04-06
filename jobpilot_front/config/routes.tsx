const authRoutes = {
    signin: '/auth/signin',
    register: '/auth/register',
};

const profileRoutes = {
    profile: '/profile',
    personalInformation: '/profile/personal-information',
    education: '/profile/education',
    workExperience: '/profile/work-experience',
    skills: '/profile/skills',
    resume: '/profile/resume',
};

const jobPostingRoutes = {
    getJobPostings: '/job-postings/profile',
    getJobPosting: '/job-postings',
    getQualificationsComparison: '/job-postings/qualification-comparison',
    getSkillsComparison: '/job-postings/skills-comparison',
    extractJobPostingInformation: '/job-postings/extract',
    createJobPosting: '/job-postings/create'
}

export { authRoutes, profileRoutes, jobPostingRoutes };