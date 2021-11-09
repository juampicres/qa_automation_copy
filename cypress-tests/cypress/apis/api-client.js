
export default class ApiClient {

  /**
     * GET request
     * @param {string} path - path for request
     * @param {Object} options - Extra options for the request
     */
  get(path, options = {}) { this.request('GET', path, {}, options); }

  /**
     * POST request
     * @param {string} path - path for request
     * @param {Object} body - body of the request
     * @param {Object} options - Extra options for the request
     */
  post(path, body, options = {}) { this.request('POST', path, body, options); }

  /**
     * Base request
     * @param {string} path - path for request
     * @param {Object} body - body of the request
     * @param {Object} options - Extra options for the request
     */
  request(method, path, body = {}, options = {}) {
    cy.request({
      method: method,
      url: `${Cypress.env().backend}/${path}`,
      body,
      log: true,
      failOnStatusCode: true,
      ...options.cyParams
    }).then((response) => {
      if (options.validate) options.validate(response);
      if(options.saveAs) cy.wrap(response).as(options.saveAs);
    });
  }
}
