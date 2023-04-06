export interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    links: { type: string; url: string}[];
    workExperiences: WorkExperience[];
    educations: Education[];
    skills: string[];
    languages: string[];
}

export interface PersonalInformation {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    links: { type: string; url: string}[];
}

export interface Education {
    degreeType: string;
    majorOrAreaOfStudy: string;
    institutionName: string;
    location: string;
    startDate: string;
    endDate: string;
    currentlyAttending: boolean;
    description: string;
}

export interface WorkExperience {
    companyName: string;
    location: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    description: string;
    skills: string[];
}