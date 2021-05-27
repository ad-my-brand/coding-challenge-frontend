context('Files', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('try to create a post resource without selecting a user', () => {
    cy.get('#title').type('title');
    cy.get('#body').type('body');
    cy.get('button[type=submit]').click();
    cy.contains('Please select a user');
  });
  it('try to create a post resource without filling title input', () => {
    cy.get('select').select('Ervin Howell');
    cy.get('#body').type('body');
    cy.get('button[type=submit]').click();
    cy.contains('Please type a title');
  });
  it('try to create a post resource without filling body textarea', () => {
    cy.get('select').select('Ervin Howell');
    cy.get('#title').type('title');
    cy.get('button[type=submit]').click();
    cy.contains('Please type a body');
  });
  it('create a post resource successfully', () => {
    cy.get('select').select('Ervin Howell');
    cy.get('#title').type('title');
    cy.get('#body').type('body');
    cy.get('button[type=submit]').click();
    cy.get('div.alert').contains('Created');
  });
  it('try to create a post resource with an invalid JSON', () => {
    cy.get('select').select('Ervin Howell');
    cy.get('#title').type('title');
    cy.get('#body').type('body');
    cy.intercept('POST', '/posts', (req) => {
      req.body = '{';
      req.continue();
    });
    cy.get('button[type=submit]').click();
    cy.get('div.alert').contains('Internal Server Error');
  });
  it('try to create a post resource with Network Error', () => {
    cy.get('select').select('Ervin Howell');
    cy.get('#title').type('title');
    cy.get('#body').type('body');
    cy.intercept(
      { method: 'POST', url: '/posts' },
      { forceNetworkError: true }
    );
    cy.get('button[type=submit]').click();
    cy
      .get('div.alert div.alert-heading')
      .invoke('text')
      .should(
        'match',
        /TypeError: Failed to fetch|TypeError: NetworkError when attempting to fetch resource./
      ).or;
  });
});
