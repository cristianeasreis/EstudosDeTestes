{/* <reference types="Cypress" /> */}

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
        cy.visit ('http://127.0.0.1:5500/EstudosCypress/src/index.html')

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
  })
  