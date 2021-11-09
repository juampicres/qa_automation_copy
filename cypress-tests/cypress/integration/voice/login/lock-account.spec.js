import * as loginPage from '../../../page-objects/voice/login';
import {getUser} from '../../../support/utils';

describe('On Login page', () => {
  it('user gets lock if wrong password is submitted 4 times but is able to recover it', () => {
    const user = getUser();
    loginPage.navigate();
    loginPage.lockUser(user.email);
    loginPage.attemptLogin(user.email, user.password);
    // TODO: Update error message once it's ready
    loginPage.errorMessageShouldBePresent();
  });

  if (Cypress.env('environment') === 'local') {
    it.skip('locked user can send an unlock email from login page', () => {
      const user = getUser(['locked_user']);
      loginPage.navigate();
      loginPage.goToUnlockAccount();
      loginPage.unlockAccountShouldHaveRendered();
      loginPage.submitEmail(user.email);
      loginPage.unlockAccountEmailShouldHaveBeenSent();
      loginPage.sendEmailRequestShouldHaveBeenMade();
    });
  }
});
