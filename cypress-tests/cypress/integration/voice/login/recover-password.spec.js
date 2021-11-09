import * as loginPage from '../../../page-objects/voice/login';
import {getUser} from '../../../support/utils';

describe('On Login page', () => {

  it.skip('User can request a password reset', () => {
    const user = getUser();
    loginPage.navigate();
    loginPage.goToResetPassword();
    loginPage.resetPasswordShouldHaveRendered();
    loginPage.submitEmail(user.email);
    loginPage.recoverEmailShouldHaveBeenSent();
    loginPage.sendEmailRequestShouldHaveBeenMade();
  });
});

