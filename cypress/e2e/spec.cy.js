// cypress/e2e/spec.cy.js

describe('Form Submission', () => {
  it('should successfully submit the form', () => {
    cy.visit('http://localhost:3000'); // Update with your app's URL
    cy.get('[name="userId"]').select('1'); // Select a user from the dropdown
    cy.get('[name="title"]').type('Test Title'); // Fill in the title field
    cy.get('[name="body"]').type('Test Body'); // Fill in the body field
    cy.get('button[type="submit"]').click(); // Click the submit button

   
  });

});
