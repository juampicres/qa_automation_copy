/// <reference types="cypress" />
import * as homePage from '../../../page-objects/voice/home';
import {isSmallViewport} from '../../../support/utils';
import Users from '../../../apis/users';

const viewports = require('../../../fixtures/voice/viewports.json');
const app = 'Voice';
describe('Home page - Visual test', () => {

  Object.keys(viewports).forEach((viewport) => {
    const name = `Home page ${viewport} viewport`;
    it(`Viewport - ${viewport}`, viewports[viewport], () => {
      cy.startVisualTest(app, name);

      Users.loginUser();
      homePage.navigate();
      homePage.endCall();
      homePage.getNavbar().navbarShouldHaveRendered();
      cy.eyesCheckWindow(name);
      if (isSmallViewport()) {
        homePage.getNavbar().openMenuBar();
        homePage.getMenuBar().menuBarShouldHaveRendered();
        cy.eyesCheckWindow('Home Page - Side menu open - Small viewport');
      }
      cy.endVisualTest();
    });
  });
});
