describe("smoke", () => {
  it("loads the home page", () => {
    cy.visit("/");
    cy.get("body").should("be.visible");
  });

  it("loads the assets index", () => {
    cy.visit("/assets");
    cy.get("body").should("be.visible");
  });
});
