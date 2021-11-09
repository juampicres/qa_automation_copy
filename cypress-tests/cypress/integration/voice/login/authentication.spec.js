//// <reference types="cypress" />
import * as loginPage from '../../../page-objects/voice/login';
import { getUser } from '../../../support/utils';
const viewports = require('../../../fixtures/voice/viewports.json');
const authentication_error_message = loginPage.getLoginErrorMessageText();
let user;

describe('Login Page', () => {

  beforeEach(() => {
    user = getUser();
    loginPage.navigate();
  });

  Object.keys(viewports).forEach((viewport) => {
    context(`A non authenticated user on a ${viewport} 
    viewport should not be able to login` , viewports[viewport], () => {
      it('if inputs no email and password', () => {
        loginPage.getSignInButton().click();
        loginPage.getErrorMessageText().contains(authentication_error_message);
      });

      it('if inputs incorrect username and password', () => {
        loginPage.getEmailInput().type(user.email.replace('@', '_wrong_email@'));
        loginPage.getPasswordInput().type('incorrect');
        loginPage.getSignInButton().click();
        loginPage.getErrorMessageText().contains(authentication_error_message);
      });

      it('if attempts to login with only password', () => {
        loginPage.getPasswordInput().type(user.password);
        loginPage.getSignInButton().click();
        loginPage.getErrorMessageText().contains(authentication_error_message);
      });

      // Skipping this test on staging to not block the only available user
      if (Cypress.env('environment') === 'local') {
        it('if attempts to login with only username', () => {
          loginPage.getEmailInput().type(user.email);
          loginPage.getSignInButton().click();
          loginPage.getErrorMessageText().contains(authentication_error_message);
        });
      }
    });
  });
});
