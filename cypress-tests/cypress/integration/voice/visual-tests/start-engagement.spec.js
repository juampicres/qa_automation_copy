/// <reference types="cypress" />
import Users from '../../../apis/users';
import * as homePage from '../../../page-objects/voice/home';
import {isSmallViewport} from '../../../support/utils';
import Engagement from '../../../apis/engagement';
import * as engagement from '../../../page-objects/voice/ui-chunk/engagement';

const viewports = require('../../../fixtures/voice/viewports.json');
const app = 'Voice';

describe('Login page visual testing', () => {
  if (Cypress.env('environment') !== 'local') {
    beforeEach(() => {
      Users.loginUser();
      homePage.navigate();
      homePage.endCall();
      Engagement.startEngagement();
      engagement.engagementShouldHaveStarted();
    });

    afterEach(() => {
      homePage.endCall();
    });

    Object.keys(viewports).forEach((viewport) => {
      const name = `Start Engagement page ${viewport} viewport`;
      it(`${viewport} viewport`, viewports[viewport], () => {
        cy.startVisualTest(app, name);
        cy.eyesCheckWindow(name);

        if (isSmallViewport()) {
          homePage.getNavbar().openMenuBar();
          homePage.getMenuBar().menuBarShouldHaveRendered();
          cy.eyesCheckWindow('Start engagement - Side menu open - Small viewport');
          homePage.getMenuBar().closeMenuBar();
        }
        cy.endVisualTest();
      });
    });
  }
});
