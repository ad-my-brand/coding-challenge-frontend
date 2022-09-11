describe('Main', () => {
	it('full workflow', () => {
		cy.visit('http://localhost:3000/');

		cy.get('a[href*="form"]').first().click();

		cy.url().should('include', '/form');

		cy.get('h2').contains('Users Form');

		cy.get('input[name="title"]').type('Demo');
		cy.get('textarea[name="description"]').type('Some description here');

		cy.get('input[type="submit"]').click();

		cy.get('body').contains('Invalid input users');
	});
});
