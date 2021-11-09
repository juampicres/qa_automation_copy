/// <reference types="cypress" />
import * as loginPage from '../../../page-objects/voice/login';
import * as homePage from '../../../page-objects/voice/home';
import {getUser, isSmallViewport} from '../../../support/utils';
const viewports = require('../../../fixtures/voice/viewports.json');

describe('Home Page - Menubar smoke test', () => {
  context(
    'User can interact with the menu bar and it\'s functionalities',
    () => {
      Object.keys(viewports).forEach((viewport) => {
        it(`Viewport - ${viewport}`, viewports[viewport], () => {
          const user = getUser();
          cy.log(viewports[viewport]);
          loginPage.navigateAndLogin(user.email, user.password);
          menuBarShouldHaveRendered();
          logoutModalShouldBeDismissible();
          userShouldBeAbleToLogout();
        });
      });
    }
  );
});

// ---------- SUPPORT METHODS ----------

function menuBarShouldHaveRendered() {
  if (isSmallViewport()) homePage.getNavbar().openMenuBar();
  homePage.getMenuBar().menuBarShouldHaveRendered();
  if (isSmallViewport()) homePage.getMenuBar().closeMenuBar();
  homePage.getNavbar().navbarShouldHaveRendered();
}

function logoutModalShouldBeDismissible() {
  if (isSmallViewport()) homePage.getNavbar().openMenuBar();
  homePage.getMenuBar().clickLogoutButton();
  homePage.getMenuBar().dismissLogoutModal();
}

function userShouldBeAbleToLogout() {
  if (isSmallViewport()) homePage.getMenuBar().closeMenuBar();
  homePage.getNavbar().navbarShouldHaveRendered();
  homePage.logout();
  loginPage.loginPageShouldHaveRendered();
}
