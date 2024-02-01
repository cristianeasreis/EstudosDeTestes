Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Cristiane')
    cy.get('#lastName').type('Reis')
    cy.get('#email').type('cristianeasreis@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

})
