const authRoutes = {
    signin: '/auth/login'
};

const profileRoutes = {
    personalInformation: '/profile/personal-information',
    education: '/profile/education',
    workExperience: '/profile/work-experience',
    skills: '/profile/skills',
    resume: '/profile/resume',
};

const jobPostingRoutes = {
    getJobPostings: '/job-postings',
    extractJobPostingInformation: '/job-postings/fake-extract',
    createJobPosting: '/job-postings/fake-create'
}

export { authRoutes, profileRoutes, jobPostingRoutes };