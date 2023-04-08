import { createContext, useReducer } from "react";
import { ResumeAction, ResumeState } from "../types/RouterContextTypes";
import { resumeReducer } from "../reducers/resumeReducer";

type ResumeContextType = {
    resumeState: ResumeState;
    resumeDispatch: React.Dispatch<ResumeAction>;
}

const initialState: ResumeState = {
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
}

export const ResumeContext = createContext<ResumeContextType>({
    resumeState: initialState,
    resumeDispatch: () => {
        return;
    }
});

type ResumeProviderProps = {
    children: React.ReactNode;
};

const ResumeProvider = ({ children }: ResumeProviderProps) => {
    const [resumeState, resumeDispatch] = useReducer(resumeReducer, initialState);

    return (
        <ResumeContext.Provider value={{ resumeState, resumeDispatch }}>
            {children}
        </ResumeContext.Provider>
    );
};

export default ResumeProvider;