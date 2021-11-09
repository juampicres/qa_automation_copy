import * as loginPage from '../../../page-objects/voice/login';

const viewports: object = require('../../../fixtures/voice/viewports.json');
const app = 'Voice';

describe('Login page visual testing', () => {
  Object.keys(viewports).forEach((viewport: string) => {
    const name = `Login page ${viewport} viewport`;
    it(`${viewport} viewport`, viewports[viewport], () => {
      cy.startVisualTest(app, name);
      loginPage.navigate();
      cy.eyesCheckWindow(name);
      cy.endVisualTest();
    });
  });
});
