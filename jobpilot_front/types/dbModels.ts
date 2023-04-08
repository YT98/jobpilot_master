// Generated using py-ts-export interfaces.
// See https://github.com/cs-cordero/py-ts-export interfaces

export interface Skill {
    id: number;
    name: string;
}

export interface Language {
    id: number;
    name: string;
}

export interface InvitationCode {
    id: number;
    code: string;
    used: boolean;
}

export interface JobPosting {
    id: number;
    profileId: number;
    title: string;
    location: string;
    description: string;
    companyName: string;
    datePosted: string;
    experienceQualification: string;
    educationQualification: string;
}

export interface JobPostingSkill {
    id: number;
    jobPostingId: number;
    skillId: number;
}

export interface Profile {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface ProfileSkill {
    id: number;
    profileId: number;
    skillId: number;
}

export interface ProfileLanguage {
    id: number;
    profileId: number;
    languageId: number;
    proficiency: string;
}

export interface ProfileLink {
    id: number;
    profileId: number;
    type: string;
    url: string;
}

export interface WorkExperience {
    id: number;
    profileId: number;
    companyName: string;
    location: string;
    currentlyWorking: boolean;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface WorkExperienceSkill {
    id: number;
    workExperienceId: number;
    skillId: number;
}

export interface Resume {
    id: number;
    accountId: number;
    resumeName: string;
    jobTitle: string;
    jobPostingId: number;
}

export interface ResumeContactInformation {
    id: number;
    resumeId: number;
    email: string;
    phoneNumber: string;
    city: string;
    region: string;
    country: string;
}

export interface ResumeContactInformationLinks {
    id: number;
    resumeContactInformationId: number;
    type: string;
    url: string;
}

export interface ResumeWorkExperience {
    id: number;
    resumeId: number;
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    location: string;
    description: string;
}

export interface ResumeProject {
    id: number;
    resumeWorkExperienceId: number;
    title: string;
    organization: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: string;
}

export interface ResumeEducation {
    id: number;
    resumeId: number;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    currentlyAttending: boolean;
    description: string;
}

export interface ResumeCertification {
    id: number;
    resumeId: number;
    certificationName: string;
    issuingOrganization: string;
    date: string;
    description: string;
}

export interface ResumeInvolvement {
    id: number;
    resumeId: number;
    role: string;
    organization: string;
    startDate: string;
    endDate: string;
    currentlyInvolved: boolean;
    description: string;
}

export interface ResumeSkill {
    id: number;
    resumeId: number;
    skillId: number;
}

export interface ResumeLanguage {
    id: number;
    resumeId: number;
    languageId: number;
}

export interface ResumeSummary {
    id: number;
    resumeId: number;
    summary: string;
}

export interface Account {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    invitationCodeId: string;
    profileId: number;
}

export interface Education {
    id: number;
    profileId: number;
    schoolName: string;
    location: string;
    degree: string;
    majorOrAreaOfStudy: string;
    currentlyAttending: boolean;
    startDate: string;
    endDate: string;
    description: string;
}
