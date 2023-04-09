import React from 'react'
import '../../../styles/index.css'
import ResumePageContainer from './ResumePageContainer'
import MockRouter from '../../../cypress/utils/MockRouter'
import { resumeRoutes } from '../../../config/routes'
import { ResumeContext } from '../../../contexts/ResumeContext'
import resume_complete from '../../../cypress/fixtures/resume_complete.json'
import 'cypress-react-selector';


describe('<ResumePageContainer />', () => {

    beforeEach(() => {
        cy.waitForReact(1000, "#__cy_root")
    })
    
    it('renders resume navbar', () => {
        cy.mount(
            <MockRouter>
                <ResumePageContainer>
                    <p>Test</p>
                </ResumePageContainer>
            </MockRouter>
        )
        // Verify that navbar is rendered
        cy.get('#resume-navbar').should('exist')
        // Verify that children are rendered
        cy.get('p').should('exist')
    })

    // When resume is not found
    it('redirects to /404 when resume is not found', () => {
        const resumeId = "1"
        cy.intercept('GET', resumeRoutes.getCompleteResume + `/${resumeId}`, {
            statusCode: 404,
            body: {
                message: "Resume not found"
            }
        })

        cy.mount(
            <MockRouter query={{id: resumeId}}>
                <ResumePageContainer>
                    <p>Test</p>
                </ResumePageContainer>
            </MockRouter>
        ).then(() => {
            // Verify redirect to 404 page
            cy.get('@push').should('be.calledWith', '/404')
        })
    })

    it('navbar is provided correct props', () => {
        const resumeId = 1
        const resumeName = "resumeName"
        const pathName = "/resumes/[id]/contact"

        const resumeContext = {...resume_complete}
        resumeContext.resume.id = resumeId
        resumeContext.resume.resumeName = resumeName

        cy.mount(
            <MockRouter query={{id: resumeId.toString()}} pathname={pathName}>
                <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => undefined}}>
                    <ResumePageContainer>
                        <p>Test</p>
                    </ResumePageContainer>
                </ResumeContext.Provider>
            </MockRouter>
        ).then(() => {
            // Verify that navbar is rendered
            cy.get('#resume-navbar').should('exist')
            // Verify that navbar is provided correct props
            cy.get("#resume-page-container").react(
                'ResumeNavbar', 
                {props:{
                    'resumeId': resumeId.toString(),
                    'resumeName': resumeName,
                    'currentPage': 'contact'
                }}).should('exist')
        })
    })

    it('navbar is provided correct props when resumeId is null', () => {
        const pathName = "/resumes/[id]/contact"
        const resumeContextWithNullResume = {
            ...resume_complete,
            resume: null
        }

        cy.mount(
            <MockRouter pathname={pathName}>
                <ResumeContext.Provider value={{resumeState: resumeContextWithNullResume, resumeDispatch: () => undefined}}>
                    <ResumePageContainer>
                        <p>Test</p>
                    </ResumePageContainer>
                </ResumeContext.Provider>
            </MockRouter>
        ).then(() => {
            // Verify that navbar is rendered
            cy.get('#resume-navbar').should('exist')
            // Verify that navbar is provided correct props
            cy.get("#resume-page-container").react(
                'ResumeNavbar', 
                {props:{
                    'resumeId': undefined,
                    'resumeName': undefined,
                    'currentPage': 'contact'
                }}).should('exist')
        })
    })

    it('resume is fetched only if resumeState,resume is null or resumeState.resume.id is different from query id', () => {
        const resumeId = 1
        const resumeContext = {...resume_complete}
        resumeContext.resume.id = resumeId

        cy.intercept('GET', resumeRoutes.getCompleteResume + `/${resumeId}`, cy.spy().as('request'))
        
        // If resumeState.resume is not null and resumeState.resume.id is equal to query id, resume is not fetched
        cy.mount(
            <MockRouter query={{id: resumeId.toString()}}>
                <ResumeContext.Provider value={{resumeState: resumeContext, resumeDispatch: () => undefined}}>
                    <ResumePageContainer>
                        <p>Test</p>
                    </ResumePageContainer>
                </ResumeContext.Provider>
            </MockRouter>
        ).then(() => {
            // Verify that resume is not fetched
            cy.get('@request').should('not.be.called')
        })

        // If resumeState.resume is null, resume is fetched
        const resumeContextWithNullResume = {
            ...resume_complete,
            resume: null
        }
        cy.mount(
            <MockRouter query={{id: resumeId.toString()}}>
                <ResumeContext.Provider value={{resumeState: resumeContextWithNullResume, resumeDispatch: () => undefined}}>
                    <ResumePageContainer>
                        <p>Test</p>
                    </ResumePageContainer>
                </ResumeContext.Provider>
            </MockRouter>
        ).then(() => {
            // Verify that resume is fetched
            cy.get('@request').should('be.called')
        })

        // If resumeState.resume.id is different from query id, resume is fetched
        const resumeContextWithDifferentResumeId = {
            ...resume_complete,
            resume: {
                ...resume_complete.resume,
                id: resumeId + 1
            }
        }
        cy.mount(
            <MockRouter query={{id: resumeId.toString()}}>
                <ResumeContext.Provider value={{resumeState: resumeContextWithDifferentResumeId, resumeDispatch: () => undefined}}>
                    <ResumePageContainer>
                        <p>Test</p>
                    </ResumePageContainer>
                </ResumeContext.Provider>
            </MockRouter>
        ).then(() => {
            // Verify that resume is fetched
            cy.get('@request').should('be.called')
        })

    })


    it('resumeDispatch is called after resume is fetched', () => {
        const resumeId = 1
        const resumeContextWithDifferentResumeId = {
            ...resume_complete,
            resume: {
                ...resume_complete.resume,
                id: resumeId + 1
            },
            contact: {
                ...resume_complete.contact,
                resumeId: resumeId + 1
            },
            summary: {
                ...resume_complete.summary,
                resumeId: resumeId + 1
            }
        }
        const resumeCompleteObject = {
            ...resumeContextWithDifferentResumeId,
            loading: undefined
        }

        cy.intercept('GET', resumeRoutes.getCompleteResume + `/${resumeId}`, {
            statusCode: 200,
            body: {
                message: "Success",
                resumeComplete: resumeCompleteObject
            }
        })

        const resumeDispatchSpy = cy.spy().as('resumeDispatch')

        cy.mount(
            <MockRouter query={{id: resumeId.toString()}}>
                <ResumeContext.Provider value={{resumeState: resumeContextWithDifferentResumeId, resumeDispatch: resumeDispatchSpy}}>
                    <ResumePageContainer>
                        <p>Test</p>
                    </ResumePageContainer>
                </ResumeContext.Provider>
            </MockRouter>
        ).then(() => {
            // Verify that resumeDispatch is called with correct payload
            cy.get('@resumeDispatch').should('be.calledWith', {type: 'CLEAR_RESUME'})
            // TODO: Verify that resumeDispatch SET_COMPLETE_RESUME is called with correct payload
            // cy.get('@resumeDispatch').should('be.calledWith', {type: 'SET_COMPLETE_RESUME', payload: {...resumeCompleteObject}})
        })
    })

})
