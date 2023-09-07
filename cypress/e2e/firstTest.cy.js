// describe groups together similar tests

describe('E2E Test For customForm Component', () => {

  beforeEach(() => {

    cy.visit('http://localhost:3000');
  });

  it('Ensure all input fields are renderes', () => {
    cy.get('select[name="userId"]').should('be.visible');
    cy.get('input[name="title"]').should('be.visible');
    cy.get('input[name="body"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');

  })


  it('fetch users list', () => {
    // cy.wait(2000)
    cy.contains('Fetched users successfully').should('be.visible');

  })


  it('should show validation errors for empty fields upon submission', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error-text').should('contain', 'Please select a user');
    cy.get('.error-text').should('contain', 'Title is required');
    cy.get('.error-text').should('contain', 'Body is required');

    cy.contains('form fields are invalid').should('be.visible');
  });


  it('should submit a post successfully', () => {

    cy.get('input[name="title"]').type('Test Title');

    cy.get('input[name="body"]').type('This is a test body.');


    cy.get('select[name="userId"]').select('1');


    // Intercept the network call
    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts').as('postSubmit');

    cy.get('button[type="submit"]').click();

    // Here you can add assertions, like checking if a success message appears after submission:
    // For instance, if after submission a "Post submitted successfully" message appears, you'd assert:
    cy.wait('@postSubmit').should((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.request.body).to.deep.equal({
        userId: '1',
        title: 'Test Title',
        body: 'This is a test body.'
      });
    })

    cy.contains('Post submitted successfully').should('be.visible');

  });


  it("Form should reset after submission", () => {
    cy.get('select[name="userId"]').select('1');
    cy.get('input[name="title"]').type('Test title');
    cy.get('input[name="body"]').type('Test body content');
    cy.get('button[type="submit"]').click();

    cy.get('select[name="userId"]').should('have.value', '');
    cy.get('input[name="title"]').should('have.value', '');
    cy.get('input[name="body"]').should('have.value', '');
  })


  it('should handle API errors gracefully', () => {
    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts', {
      statusCode: 500,
      body: { error: "Something went wrong" }
    }).as('postFail');

    cy.get('select[name="userId"]').select('1');
    cy.get('input[name="title"]').type('Test title');
    cy.get('input[name="body"]').type('Test body content');
    cy.get('button[type="submit"]').click();

    cy.wait('@postFail');
    cy.contains('Something went wrong').should('be.visible');
  });


})