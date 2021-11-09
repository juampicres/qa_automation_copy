const baseUrl = Cypress.env().backend;

/*
  login(password)

  Used to login a user previously created with cy.create().
  - It expects the user's password as an argument
  - It NEEDS to be chained to the cy.create() call that was used to create the user intented to be logged in, e.g:

    - cy.create('admin_user', { password: '123' }).login('123') // This will login the "admin_user" created

  If you need to use the created user in other factory, you can chain a `then()` to `login()`,
  as `login()` yields the same subject it receives from cy.create(), e.g:

    - cy.create('user', { password: '123' })
        .login('123') // Login created "user"
        .then(response =>
          // Here we are using the "id" from the user created above
          cy.create('engagement', { user_id: response.body.id })
        )
*/
Cypress.Commands.add(
  'login',
  {
    prevSubject: true,
  },
  // response: HTTP response yielded from cy.create()
  // password: Password used to create the user record
  (response, password) => {
    cy.visit('/');

    cy.fetch('email').type(response.body.email);
    cy.fetch('password').type(password);
    cy.fetch('sign-in').click();

    return cy.wrap(response);
  }
);

Cypress.Commands.add('logout', (user_id) =>
  cy.request({
    method: 'DELETE',
    url: `${baseUrl}/__cypress__/logout`,
    body: { user_id },
    log: true,
    failOnStatusCode: true,
  })
);

Cypress.Commands.add('appCommands', (body) =>
  cy.request({
    method: 'POST',
    url: `${baseUrl}/__cypress__/command`,
    body,
    log: true,
    failOnStatusCode: true,
  })
);

Cypress.Commands.add('clearDB', () =>
  cy.appCommands({ command: 'ClearDatabase' })
);

/*
cy.create(options)

Used to create one or multiple different entitites in the DB.
It mirrors as close as possible the FactoryBot interface.

Examples:
- cy.create('user')                                                  Use the default values in the factory
- cy.create('user', { first_name: 'Zlagathor'})                      Override attributes in the factory
- cy.create('user', 'admin')                                         Use one trait
- cy.create('user', 'admin', 'female')                               Use multiple traits
- cy.create('user', 'admin', 'female', { first_name: 'Zlagathor' })  Use traits and overrides


You can also create different entities in one call.
This is useful to avoid making multiple HTTP requests to the backend
Examples:
  Create 1 User and 1 Location:
  - cy.create(
      ['user'],
      ['location']
    )

  You can use all the same options available above (traits and overrides)
  - cy.create(
      ['user', 'admin', 'female'],
      ['location', { name: 'Macondo' }]
    )

In all cases, the response from the backend will mirror the structure of the request:
 - cy.create('user')                ---> response.body  = { id: 1, first_name: 'qwerty', ... }
 - cy.create(['user], ['location])  ---> response.body  =
    [{ id: 1, first_name: 'user name', ... }, { id: 1, name: 'location name' }]
*/
Cypress.Commands.add('create', (...options) =>
  cy.appCommands({ command: 'Create', options })
);

/*
cy.createList(options)

Mirrors FactoryBot.create_list as close as possible.
It has the same options as cy.create (defined above)
BUT it expects as the seconds option the quantity of items to create

Example:
- cy.createList('user', 5, 'admin', 'female', { first_name: 'Zlagathor' })
- cy.createList(
    ['user', 5, 'admin', 'female', { first_name: 'Zlagathor' }],
    ['location', 3, { name: 'Macondo' }]
  )
*/
Cypress.Commands.add('createList', (...options) =>
  cy.appCommands({ command: 'CreateList', options })
);
