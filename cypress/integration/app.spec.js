describe('Navigation', () => {
	it('should navigate to the form page', () => {
		cy.visit('http://localhost:3000/');

		cy.get('a[href*="form"]').click();

		cy.url().should('include', '/form');

		cy.get('h2').contains('Users Form');
	});
});
