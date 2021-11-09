// Ensure the application state is clean before every test
// Clear the DB and the cypress/downloads directory

beforeEach(cy.clearDB);
beforeEach(cy.clearDownloads);
