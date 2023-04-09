import React from 'react'
import ResumeNavbar from './ResumeNavbar'
import '../../../styles/index.css'

const pages = ["contact", "experience", "project", "education", "certification", "involvement", "skills-and-languages", "summary", "layout"]

describe('<ResumeNavbar />', () => {

  context('1280px viewport', () => {
    beforeEach(() => {
      cy.viewport(1280, 1000)
    })

    const pagesCopy = [...pages]
    while (pagesCopy.length > 0) {
      const page = pagesCopy.pop()
      if (!page) continue;

      // When on the [page] page
      it(`renders ${page} link correctly`, () => {
        cy.mount(
          <ResumeNavbar resumeId={"1"} resumeName={"resumeName"} currentPage={page}/>
          )
        // Verify that [page] name link is active
        cy.get(`#resume-navbar-${page}`).should('have.class', 'bg-blue-500')
        // Verify that all other links are inactive
        cy.get(`#resume-navbar-${page}`).siblings().should('not.have.class', 'bg-blue-500')
      })
    }

    // When props are null
    it ('renders resume name link width 150px when resumeName is null', () => {
      cy.mount(
        <ResumeNavbar resumeId={undefined} resumeName={undefined} currentPage={"[id]"} />
      )
      // Verify that resume name link has correct width
      cy.get('#resume-navbar-resume-name').should('have.css', 'width', '150px')
    })

    // When resume name is too long
    it ('renders truncated resume name when resumeName is too long', () => {
      cy.mount(
        <ResumeNavbar resumeId={"1"} resumeName={"this is a very long resume name"} currentPage={"[id]"} />
      )
      // Verify that resume name link has correct width
      cy.get('#resume-navbar-resume-name').should('have.css', 'width', '150px')
      // Verify that resume name link has correct text
      // (should be truncated)
      cy.get('#resume-navbar-resume-name').should('have.text', 'this is a very...')
    })

  });

})