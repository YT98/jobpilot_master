import { 
    Profile as DbProfile,
    ProfileLink as DbProfileLink,
    Education as DbEducation,
    WorkExperience as DbWorkExperience,
} from './dbModels';

export type WorkExperience = Omit<DbWorkExperience, "id"| "profileId">;

export interface WorkExperienceWithSkills extends WorkExperience {
    skills: string[];
}

export type Profile = Omit<DbProfile, "id">;

export type ProfileLink = Omit<DbProfileLink, "id" | "profileId">;

export type Education = Omit<DbEducation, "id" | "profileId">;
