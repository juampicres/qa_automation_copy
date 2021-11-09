/// <reference types="cypress" />
import * as loginPage from '../../../../page-objects/annotation/login';
import * as homePage from '../../../../page-objects/annotation/home';
const users = require('../../fixtures/auth-user.json'); // this page contains valid usernames and passwords

describe('Login page', () => {
  context('As an unknown user', () => {
    it('navigates to the login screen', () => {
      loginPage.navigate();
    });

    context('Invalid authentication', () => {
      it('Invalid e-mail login attempt', () => {
        loginPage.invalidEmailLoginAttempt();
        loginPage.invalidCredentialsShouldBeDisplayed();
      });

      it('Invalid password login attempt', () => {
        loginPage.invalidPasswordLoginAttempt();
        loginPage.invalidCredentialsShouldBeDisplayed();
      });

      it('Sign In button attempt without entering credentials', () => {
        loginPage.navigateAndClickSignInButton();
        loginPage.invalidCredentialsShouldBeDisplayed();
      });
    });
  });
  context('User log in and log out', () => {
    Object.keys(users).forEach((user) => {
      it(`As ${users[user].username}`, () => {
        cy.create(
          users[user].factoryName, {
            email: users[user].email,
            password: users[user].password,
            password_confirmation: users[user].password
          }
        );
        loginPage.navigateAndLogin(users[user].email, users[user].password);
        homePage.getNavbar().navbarShouldDisplayUsername(users[user].username);
        homePage.getNavbar().clickOnNavUsername();
        homePage.getNavbar().clickOnLogoutButton();
        loginPage.loginPageShouldHaveRendered();

        // Verify that after performing a logout user cannot log back in without entering credentials

        loginPage.signInButtonClick();
        loginPage.invalidCredentialsShouldBeDisplayed();
      });
    }
    );
  });
});
