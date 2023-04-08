import { ResumeAction, ResumeState } from "../types/RouterContextTypes";

export const resumeReducer = (state: ResumeState, action: ResumeAction): ResumeState => {
  switch (action.type) {
    case 'CLEAR_RESUME':
        return {
            ...state,
            resume: null,
            contact: null,
            experiences: null,
            projects: null,
            educations: null,
            certifications: null,
            involvements: null,
            skills: null,
            languages: null,
            summary: null,
            loading: true,
        };
    case 'SET_COMPLETE_RESUME':
        return {
            resume: action.payload.resume,
            contact: action.payload.contact,
            experiences: action.payload.experiences,
            projects: action.payload.projects,
            educations: action.payload.educations,
            certifications: action.payload.certifications,
            involvements: action.payload.involvements,
            skills: action.payload.skills,
            languages: action.payload.languages,
            summary: action.payload.summary,
            loading: false,
        };
    case 'SET_RESUME':
      return {
        ...state,
        resume: action.payload,
        loading: false,
      };
    case 'SET_CONTACT':
      return {
        ...state,
        contact: action.payload,
      };
    case 'SET_EXPERIENCES':
      return {
        ...state,
        experiences: action.payload,
      };
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };
    case 'SET_EDUCATIONS':
      return {
        ...state,
        educations: action.payload,
      };
    case 'SET_CERTIFICATIONS':
      return {
        ...state,
        certifications: action.payload,
      };
    case 'SET_INVOLVEMENTS':
      return {
        ...state,
        involvements: action.payload,
      };
    case 'SET_SKILLS':
      return {
        ...state,
        skills: action.payload,
      };
    case 'SET_LANGUAGES':
      return {
        ...state,
        languages: action.payload,
      };
    case 'SET_SUMMARY':
      return {
        ...state,
        summary: action.payload,
      };
    default:
      return state;
  }
}