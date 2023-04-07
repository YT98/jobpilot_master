const authRoutes = {
    signin: '/auth/signin',
    register: '/auth/register',
};

const profileRoutes = {
    profile: '/profile',
    education: '/profile/education',
    workExperience: '/profile/work-experience',
    skills: '/profile/skills',
    languages: '/profile/languages',
    resume: '/profile/resume',
    profileLinks: '/profile/links',
    workExperiences: '/profile/work-experiences',
    educations: '/profile/educations',
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