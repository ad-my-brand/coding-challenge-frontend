import React from "react";
import { CREATE_SUCCESS_MESS } from "../../src/constants/Utilities";

describe("complete e to e test", () => {
  it("e to e test", () => {
    cy.visit("/");

    // selection of users
    cy.get("#users").select("3");

    // title text input
    cy.get("#title").type("arabin");

    // body text input
    cy.get("#body").type("body");

    // create button
    cy.get("#button").click();

    // verify the successful message
    cy.get('[role="presentation"]').should("contain.text", CREATE_SUCCESS_MESS);

    //post request check
    cy.request("https://jsonplaceholder.typicode.com/posts/").should((res) => {
      expect(res.body).not.to.be.null;
    });
  });
});
