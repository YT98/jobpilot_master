import { ResumeContext } from "../../../contexts/ResumeContext";
import MockRouter from "../../../cypress/utils/MockRouter"
import Contact from "./contact";
import resume_complete from "../../../cypress/fixtures/resume_complete.json";
import { resumeRoutes } from "../../../config/routes";

describe('Contact', () => {
    const resumeContext = {...resume_complete}

    it('should render successfully', () => {
        resumeContext.loading = false
        cy.mount(
            <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => undefined}}>
                <MockRouter>
                    <Contact />
                </MockRouter>
            </ResumeContext.Provider>
        )
        cy.get("#resume-contact-container").should("exist")
        cy.get("#resume-contact-container-loading").should("not.exist")
        cy.get("#resume-email-input").should("exist")
        cy.get("#resume-phone-number-input").should("exist")
        cy.get("#resume-city-input").should("exist")
        cy.get("#resume-region-input").should("exist")
        cy.get("#resume-country-input").should("exist")
        cy.get('#resume-contact-links').should('exist')
    });

    it('should render loading component if loading is true', () => {
        resumeContext.loading = true
        cy.mount(
            <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => undefined}}>
                <MockRouter>
                    <Contact/>
                </MockRouter>
            </ResumeContext.Provider>
        )
        cy.get("#resume-contact-container").should("not.exist")
        cy.get("#resume-contact-container-loading").should("exist")
    });

    it('should post to backend and dispatch to context when submit button is clicked', () => {
        resumeContext.loading = false
        cy.intercept('POST', process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.updateContactInformation).as('updateResume')
        cy.intercept('POST', process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.updateContactLinks).as('updateContactLinks')
        const resumeDispatch = cy.spy().as('resumeDispatch')

        cy.mount(
            <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => resumeDispatch}}>
                <MockRouter>
                    <Contact/>
                </MockRouter>
            </ResumeContext.Provider>
        )
        cy.get('#contact-submit-button').click()
        cy.wait('@updateResume')
        cy.wait('@updateContactLinks')
        // TODO: cy.get('@resumeDispatch').should('have.been.called')
    });

    it('should not post to backend if the email input is empty', () => {
        resumeContext.loading = false
        cy.intercept('POST', process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.updateContactInformation, cy.spy().as('updateResume'))
        cy.intercept('POST', process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.updateContactLinks, cy.spy().as('updateContactLinks'))
        const resumeDispatch = cy.spy().as('resumeDispatch')

        cy.mount(
            <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => resumeDispatch}}>
                <MockRouter>
                    <Contact/>
                </MockRouter>
            </ResumeContext.Provider>
        )
        cy.get('#resume-email-input').clear()
        cy.get('#contact-submit-button').click()
        cy.get('@updateResume').should('not.have.been.called')
        cy.get('@updateContactLinks').should('not.have.been.called')
        cy.get('@resumeDispatch').should('not.have.been.called')
    });

    it('should not post to backend if the phone number input is empty', () => {
        resumeContext.loading = false
        cy.intercept('POST', process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.updateContactInformation, cy.spy().as('updateResume'))
        cy.intercept('POST', process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.updateContactLinks, cy.spy().as('updateContactLinks'))
        const resumeDispatch = cy.spy().as('resumeDispatch')

        cy.mount(
            <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => resumeDispatch}}>
                <MockRouter>
                    <Contact/>
                </MockRouter>
            </ResumeContext.Provider>
        )
        cy.get('#resume-phone-number-input').clear()
        cy.get('#contact-submit-button').click()
        cy.get('@updateResume').should('not.have.been.called')
        cy.get('@updateContactLinks').should('not.have.been.called')
        cy.get('@resumeDispatch').should('not.have.been.called')
    });

    it('should display provided contact links', () => {
        resumeContext.loading = false

        cy.mount(
            <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => undefined}}>
                <MockRouter>
                    <Contact/>
                </MockRouter>
            </ResumeContext.Provider>
        )
        cy.get('#resume-contact-links').should('exist')
        cy.get('#resume-contact-links').children().should('have.length', resumeContext.contactLinks.length + 1) // +1 because of the add link button
        cy.get('#resume-contact-links').children().first().get('#type-input-0').should('exist')
        cy.get('#resume-contact-links').children().first().get('#type-input-1').should('exist')
    });

    it('if no contact links are provided, the add link button should be displayed', () => {
        resumeContext.loading = false
        resumeContext.contactLinks = []

        cy.mount(
            <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => undefined}}>
                <MockRouter>
                    <Contact/>
                </MockRouter>
            </ResumeContext.Provider>
        )
        cy.get('#resume-contact-links').should('exist')
        cy.get('#resume-contact-links').children().should('have.length', 1)
        cy.get('#resume-contact-links').children().first().get('#resume-add-link-button').should('exist')
    });

});