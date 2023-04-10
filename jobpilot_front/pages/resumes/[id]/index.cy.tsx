import ResumeIndex from ".";
import { jobPostingRoutes } from "../../../config/routes";
import { AppContext } from "../../../contexts/AppContext";
import { ResumeContext } from "../../../contexts/ResumeContext";
import resume_complete from "../../../cypress/fixtures/resume_complete.json";
import MockRouter from "../../../cypress/utils/MockRouter";
import '../../../styles/index.css'
import 'cypress-react-selector';


describe('<ResumeIndex/>', () => {
    beforeEach(() => {
        cy.waitForReact(1000, "#__cy_root")
    })
    const resumeContext = {...resume_complete}
    const resumeContextWithNullResume = {
        ...resume_complete,
        resume: null,
        loading: true
    }
    const accountId = 1

    it('if resume is undefined, do not render', () => {
        cy.mount(
            <MockRouter>
                <ResumeContext.Provider value={{resumeState: resumeContextWithNullResume, resumeDispatch: () => undefined}}>
                    <ResumeIndex />
                </ResumeContext.Provider>
            </MockRouter>
        )
        cy.get('#resume-index').should('not.exist')
        cy.get('#resume-index-loading').should('exist')
    })

    it('if resume is defined, render correct components', () => {
        cy.mount(
            <MockRouter>
                <ResumeContext.Provider value={{resumeState: resume_complete, resumeDispatch: () => undefined}}>
                    <ResumeIndex />
                </ResumeContext.Provider>
            </MockRouter>
        )
        cy.get('#resume-index').should('exist')
        cy.get('#resume-index-loading').should('not.exist')
        cy.get('#resume-name-input').should('exist')
        cy.get('#resume-job-title-input').should('exist')
        cy.get('#resume-tailored-resume-checkbox').should('exist')
    })

    it('component should fetch job postings', () => {
        cy.intercept('GET', process.env.NEXT_PUBLIC_BASE_URL + `${jobPostingRoutes.getAllJobPostings}/${accountId}`).as('getJobPostings')
        cy.mount(
            <AppContext.Provider value={{appState: {account: {id: accountId, firstName: "", lastName: "", email: "", profileId: 1}, loading: false}, appDispatch: () => undefined}}>
                <MockRouter>
                    <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => undefined}}>
                        <ResumeIndex />
                    </ResumeContext.Provider>
                </MockRouter>
            </AppContext.Provider>
        )
        cy.wait('@getJobPostings')
    })

    it('if resume has no jobPostingId, tailored resume checkbox should be unchecked and job posting input should be hidden', () => {
        const resumeContextWithoutJobPostingId = {
            ...resumeContext,
            resume: {
                ...resumeContext.resume,
                jobPostingId: undefined
            }
        }
        cy.mount(
            <MockRouter>
                <ResumeContext.Provider value={{resumeState: resumeContextWithoutJobPostingId, resumeDispatch: () => undefined}}>
                    <ResumeIndex />
                </ResumeContext.Provider>
            </MockRouter>
        )
        cy.get('#resume-tailored-resume-checkbox').should('not.be.checked')
        cy.get('#resume-job-posting-select').should('not.exist')
    })

    it('if resume has jobPostingId, tailored resume checkbox should be checked and job posting input should be visible', () => {
        resumeContext.resume.jobPostingId = 1
        cy.mount(
            <MockRouter>
                <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => undefined}}>
                    <ResumeIndex />
                </ResumeContext.Provider>
            </MockRouter>
        )
        cy.get('#resume-tailored-resume-checkbox').should('be.checked')
        cy.get('#resume-job-posting-select').should('exist')
    })

    it('when tailored resume checkbox is checked, state jobPostingId should be set to the first job posting', () => {
        cy.intercept('GET', process.env.NEXT_PUBLIC_BASE_URL + `${jobPostingRoutes.getAllJobPostings}/${accountId}`,
            { statusCode: 200,
                body: [{
                    id: 1,
                    profileId: 1,
                    title: "test",
                    location: "test",
                    description: "test",
                    companyName: "test"
                }]
            }
        )

        cy.mount(
            <AppContext.Provider value={{appState: {account: {id: accountId, firstName: "", lastName: "", email: "", profileId: 1}, loading: false}, appDispatch: () => undefined}}>
                <MockRouter>
                    <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => undefined}}>
                        <ResumeIndex />
                    </ResumeContext.Provider>
                </MockRouter>
            </AppContext.Provider>
        )
        cy.get('#resume-tailored-resume-checkbox').should('not.be.checked')
        cy.get('#resume-tailored-resume-checkbox').check()
        cy.get('#resume-tailored-resume-checkbox').should('be.checked')
        cy.get('#resume-job-posting-select').should('have.value', 1)
    })
})