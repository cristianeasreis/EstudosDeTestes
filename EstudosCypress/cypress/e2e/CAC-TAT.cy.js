{
  /* <reference types="Cypress" /> */
}
// validar o caminho da aplicação
describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("http://127.0.0.1:5500/EstudosCypress/src/");
  });
  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  // Validação do formulário
  it("preenche os campos obrigatórios e envia o formulário", function () {
    const LongText =
      "Teste, Texto, Teste , Texto,Teste, Texto, Teste , Texto,Teste, Texto, Teste , Texto,Teste, Texto, Teste , Texto,Teste, Texto, Teste , Texto,Teste, Texto, Teste , Texto";
    cy.get("#firstName").type("Cristiane");
    cy.get("#lastName").type("Reis");
    cy.get("#email").type("cristianeasreis@exemplo.com");
    cy.get("#open-text-area").type(LongText, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Cristiane");
    cy.get("#lastName").type("Reis");
    cy.get("#email").type("cristianeasreis@exemplo,com");
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });
  it("campoo telefone continua vazio quando preenchido com valor não-numerico", function () {
    cy.get("#phone").type("asdfgh").should("have.value", "");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Cristiane");
    cy.get("#lastName").type("Reis");
    cy.get("#email").type("cristianeasreis@exemplo.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Teste");
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });
  // Validação usando clear
  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Cristiane")
      .should("have.value", "Cristiane")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Reis")
      .should("have.value", "Reis")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("cristianeasreis@exemplo.com")
      .should("have.value", "cristianeasreis@exemplo.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("1199996666")
      .should("have.value", "1199996666")
      .clear()
      .should("have.value", "");
  });
  // validação do button
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });
  // validação customizada
  it("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });
  // Validação de campos usando select
  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });
  // validação marcar e desmarcar checkebox
  it("marca ambos checkboxs, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should("not.be.checked");
  });
  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]')
    .should("not.have.value")
    .selectFile('cypress/fixtures/example.json')
    .should(function ($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })      
  });
// validação arrastar o arquivo 
  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]')
    .should("not.have.value")
    .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
    .should(function ($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    }) 
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function () {
    cy.fixture('example.json').as('samplefile')
    cy.get('input[type="file"]')
    .selectFile('@samplefile')
    .should(function ($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    }) 
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique' , function () {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link' , function () {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('Talking About Testing').should('be.visible')
  });

  it.only('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  });

});

