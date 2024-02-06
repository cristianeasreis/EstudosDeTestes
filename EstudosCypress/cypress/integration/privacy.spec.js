
it.only('testa a página da política de privacidade de forma independente', function () {
    cy.visit("http://127.0.0.1:5500/EstudosCypress/src/privacy.htm");
    cy.contains('Talking About Testing').should('be.visible')
})