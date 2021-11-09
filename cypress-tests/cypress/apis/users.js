import ApiClient from './api-client';
import Commands from './commands';
import {getUser} from '../support/utils';

const BASE_URL = 'api/users',
  UNLOCK = 'unlock',
  PASSWORD = 'password',
  SIGN_IN = 'sign_in';

class Users extends ApiClient {

  /**
     * Base request for sending recovery token, either for UNLOCK or PASSWORD
     * @param {string} from - Either UNLOCK or PASSWORD
     * @param {string} email - Recovery email
     */
  baseSendTokenRequest(from, email) {
    const payload = {
      user: {
        email:email
      }
    };
    this.post(`${BASE_URL}/${from}`, payload, {saveAs: 'TOKEN'});
  }

  /**
     * Sends reset password email
     * @param {string} email - Recovery email
     */
  sendResetPasswordToken(email) { this.baseSendTokenRequest(PASSWORD, email); }

  /**
     * Sends unlock account email
     * @param {string} email - Recovery email
     */
  sendUnlockToken(email) { this.baseSendTokenRequest(UNLOCK, email); }

  /**
     * Unlocks account
     * @param {string} unlock_token - Token for unlocking account
     */
  unlockAccount(unlock_token) { this.post(`${BASE_URL}/${UNLOCK}`, { unlock_token }); }

  /**
     * Resets user password
     * @param {string} reset_password_token - Token for resetting password
     * @param {string} password - New password
     * @param {string} password_confirmation - New password confirmation
     */
  resetPassword(reset_password_token, password, password_confirmation) {
    password_confirmation = password_confirmation ?? password;
    const payload = {
      user: {
        reset_password_token,
        password,
        password_confirmation
      }
    };
    this.post(`${BASE_URL}/${PASSWORD}`, payload);
  }

  /**
     * Create user
     * @param {Object} attributes - Attributes for the user: email, password, etc...
     * @param {string[]} types - Array for different types of user (:locked_user, reset_password_user)
     */
  createUser(attributes = {}, types = ['user']) {
    types.push('with_agent_profile');
    Commands.createUser(attributes, types);
  }

  loginUser(){
    const user = getUser();
    this.post(`${BASE_URL}/${SIGN_IN}`, { user: { email: user.email, password: user.password } },
      { cyParams: {form: true, failOnStatusCode: false}, saveAs: 'LOGIN_RESPONSE' } );
    cy.get('@LOGIN_RESPONSE').then(response => {
      const cookies = response.headers['set-cookie'],
        csrfToken = cookies[0].split(';')[0].split('=')[1],
        railsSession = cookies[1].split(';')[0].split('=')[1],
        options = { log: true, domain: `${BASE_URL}`, sameSite: 'lax' };
      cy.wrap(response.body.user.agent_profile.agent_external_voice_id).as('AGENT_VOICE_ID');
      cy.wrap(csrfToken).as('CSRF-TOKEN');
      cy.setCookie('CSRF-TOKEN', csrfToken, options);
      cy.setCookie('_rails_session', railsSession, options);
    });
    localStorage.setItem('logged-status', JSON.stringify(true));
  }
}

export default new Users();
