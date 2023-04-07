// Generated using py-ts-export interfaces.
// See https://github.com/cs-cordero/py-ts-export interfaces

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

export interface Language {
    id: number;
    name: string;
}

export interface InvitationCode {
    id: number;
    code: string;
    used: boolean;
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

export interface Skill {
    id: number;
    name: string;
}
