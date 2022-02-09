describe("formtests", () => {
  it("user need to enter a tiitle and body", () => {
    cy.visit("/");
    cy.findByRole("textbox", { name: /title/i }).type("test");
    cy.findByRole("textbox", { name: /body/i }).type("test");
  });

  it("check the list of the users", () => {
    cy.findByRole("combobox").select(1);
    cy.findAllByText("Leanne Graham").should("exist");
  });
  it("check the submit button", () => {
    cy.findByRole("button", {
      name: /submit/i,
    }).should("exist");
  });
});
