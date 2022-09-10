describe('empty spec', () => {
	it('passes', () => {
		cy.visit('http://localhost:3000/');
		cy.findByPlaceholderText(/Name/i).type('Chelsey');
		cy.findByPlaceholderText(/title/i).type('foo');
		cy.findAllByPlaceholderText(/body/i).type('bar');
		cy.findByText(/submit/).click();

		// type name
		// type title and body
		// submit in the component
	});
});
