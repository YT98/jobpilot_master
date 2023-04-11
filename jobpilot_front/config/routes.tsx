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
    getAllJobPostings: '/job-postings/all',
    getJobPosting: '/job-postings',
    getQualificationsComparison: '/job-postings/qualification-comparison',
    getSkillsComparison: '/job-postings/skills-comparison',
    extractJobPostingInformation: '/job-postings/extract',
    createJobPosting: '/job-postings/create'
}

const resumeRoutes = {
    getAllResumes: '/resumes/all',
    getResume: '/resumes',
    createResume: '/resumes/create',
    getCompleteResume: '/resumes/complete',
    updateResume: '/resumes/resume',
    updateContactInformation: '/resumes/contact',
    updateContactLinks: '/resumes/contact-links',
}

export { authRoutes, profileRoutes, jobPostingRoutes, resumeRoutes };