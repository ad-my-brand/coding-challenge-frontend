/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Form e2e test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("check form", () => {
    cy.get(".FormInput").eq(0).type("5")
    cy.get(".FormInput").eq(1).type("Rishav")
    cy.get(".FormInput").eq(2).type("this is rishav body")
    cy.get("button").click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Data send`||`HTTP requests fails`)
    })
  })
})



// Prevent TypeScript from reading file as legacy script
export {}
