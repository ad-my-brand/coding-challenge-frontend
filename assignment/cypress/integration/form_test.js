/// <reference types="cypress" />

it.only("form test", function () {
  cy.visit("http://localhost:3000/");
  cy.get("#usersId").select(5);
  cy.get("#titleId").type("Lorem Ipsum");
  cy.get("#bodyId").type(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a scelerisque magna, id convallis elit. Integer feugiat eros vel mauris consequat placerat. Ut non lacus eu justo tempus imperdiet in eu metus."
  );
  cy.get("#btnSubmit").click();
  cy.on("window:alert", (str) => {
    expect(str).to.equal("Post created");
  });
});
