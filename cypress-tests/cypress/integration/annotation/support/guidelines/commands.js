// fetch
// Finds elements by the "data-testing" attribute.
// A name or a chain of names are expected.
// Examples:
//    cy.fetch("batches-list").should("not.exist")
//    cy.fetch("batches-list batch-row").should("not.exist")
//    cy.fetch("batches-list batch-row batch-name").should("not.exist")
Cypress.Commands.add('fetch', function(nameOrChainOfNames) {
  let chain = nameOrChainOfNames.split(' ');
  let result = cy;
  for (var i = 0; i < chain.length; i++) {
    let identifier = chain[i];
    result = result.get(`[data-testing="${identifier}"]`);
  }
  return result;
});

// tap
// Allows the user to find elements inside the already specified one.
// Examples:
//    cy.fetch("annotation-threshold-slider").tap((slider) => {
//      slider.get("#threshold_slider_handle").click()
//      slider.get("#threshold_slider_handle").type("{leftarrow}")
//      slider.get("#threshold_slider_handle_val").should("contain", "1")
//    })
// How NOT to use it:
//    cy.fetch("annotation-threshold-slider").tap((slider) => {
//      slider.should("be.visible")
//    })
Cypress.Commands.add('tap', (f) => f(cy));
