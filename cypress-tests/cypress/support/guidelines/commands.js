/** fetch
 * Finds elements by the "data-test-id" attribute, e.g <div data-test-id="batches-title>Some text</div>"
 * The value of the data attribute is expected as argument.
 * Examples:
 * cy.fetch("batches-title").should("contain", "Some text")
 **/
Cypress.Commands.add('fetch', (identifier) =>
  cy.get(`[data-test-id="${identifier}"]`)
);

/** tap
 * Allows the user to find elements inside the already specified one.
 * Examples:
 *    cy.fetch("batches-title").tap(slider => {
 *      slider.get("#threshold_slider_handle").click()
 *      slider.get("#threshold_slider_handle").type("{leftarrow}")
 *      slider.get("#threshold_slider_handle_val").should("contain", "1")
 *    })
 * How NOT to use it:
 *    cy.fetch("batches-titler").tap(slider => {
 *      slider.should("be.visible")
 *    })
 **/
Cypress.Commands.add('tap', (f) => f(cy));

/**
 * Starts Applitools visual test. Must be run before cy.endVisualTest.
 * @param: {string} appName - Application name
 * @param: {string} testName - Name for the test
 **/
Cypress.Commands.add('startVisualTest', (appName, testName) => {
  cy.eyesOpen({
    appName,
    testName,
  });
});

/**
 * Ends Applitools visual test. Must be run after cy.startVisualTest close Applitools.
 **/
Cypress.Commands.add('endVisualTest', () => cy.eyesClose());
