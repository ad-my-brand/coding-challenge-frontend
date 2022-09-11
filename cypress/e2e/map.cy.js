describe('Navigation', () => {
	it('should navigate to the form page', () => {
		cy.visit('http://localhost:3000/');

		cy.get('a[href*="form"]').first().click();

		// The new url should include "/about"
		cy.url().should('include', '/form');

		// The new page should contain an h1 with "About page"
		cy.get('h2').contains('Users Form');
	});
});
