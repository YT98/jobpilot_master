import { Resume, ResumeCertification, ResumeContactInformation, ResumeEducation, ResumeInvolvement, ResumeLanguage, ResumeProject, ResumeSkill, ResumeSummary, ResumeWorkExperience } from "./dbModels";

export interface ResumeState {
    resume: Resume | null;
    contact: ResumeContactInformation | null;
    experiences: ResumeWorkExperience[] | null;
    projects: ResumeProject[] | null;
    educations: ResumeEducation[] | null;
    certifications: ResumeCertification[] | null;
    involvements: ResumeInvolvement[] | null;
    skills: ResumeSkill[] | null;
    languages: ResumeLanguage[] | null;
    summary: ResumeSummary | null;
    loading: boolean;
}

export type ResumeAction =
    | { type: 'CLEAR_RESUME' }
    | { type: 'SET_COMPLETE_RESUME'; payload: Omit<ResumeState, "loading"> }
    | { type: 'SET_RESUME'; payload: Resume }
    | { type: 'SET_CONTACT'; payload: ResumeContactInformation }
    | { type: 'SET_EXPERIENCES'; payload: ResumeWorkExperience[] }
    | { type: 'SET_PROJECTS'; payload: ResumeProject[] }
    | { type: 'SET_EDUCATIONS'; payload: ResumeEducation[] }
    | { type: 'SET_CERTIFICATIONS'; payload: ResumeCertification[] }
    | { type: 'SET_INVOLVEMENTS'; payload: ResumeInvolvement[] }
    | { type: 'SET_SKILLS'; payload: ResumeSkill[] }
    | { type: 'SET_LANGUAGES'; payload: ResumeLanguage[] }
    | { type: 'SET_SUMMARY'; payload: ResumeSummary };