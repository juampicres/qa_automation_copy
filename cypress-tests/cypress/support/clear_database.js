// Ensure the Database is clean before every test
import Commands from '../apis/commands';

beforeEach(() => {
  switch (Cypress.env('environment')) {
  case 'local':
    Commands.clearDatabase();
    break;
  case 'staging':
    break;
  case 'prod':
    break;
  }
});
