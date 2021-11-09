import ApiClient from './api-client';

const COMMANDS = '__cypress__/command';

export class Commands extends ApiClient {

  /**
     * Clears Database
     */
  clearDatabase() {
    this.baseCommandRequest('ClearDatabase');
  }

  /**
     * Create user
     * @param {Object} attributes - Attributes for the user: email, password, etc...
     * @param {string[]} types - Array for different types of user (:locked_user, reset_password_user)
     * @param {string} saveAs - Value for saving user as Alias
     */
  createUser(attributes = {}, types = ['user', 'with_agent_profile'], saveAs = 'USER') {
    attributes.password_confirmation = attributes.password;
    this.baseCreateRequest(types, attributes, { saveAs });
  }

  /**
     * Base create request.
     * @param {string[]} types - Type or types for the created entity
     * @param {Object} attributes - Attributes for the created entity
     * @param {Object} optionalParams - Optional parameters
     */
  baseCreateRequest(types, attributes, optionalParams = {}) {
    const options = [
      ... types,
      attributes,
    ];
    this.baseCommandRequest('Create', options, optionalParams);
  }

  /**
     * Base create request.
     * @param {string} command - command (clearDB, Create, etc...)
     * @param {Object} options - option values for the command
     * @param {Object} optionalParams - Optional parameters
     */
  baseCommandRequest(command, options = {}, optionalParams = {}) {
    this.post(COMMANDS, {command: command, options}, optionalParams);
  }
}

export default new Commands();
