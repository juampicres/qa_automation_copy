import Users from '../apis/users';

const user = require('../fixtures/auth-user.json'); // this page contains valid username and password

export const isSmallViewport = () => {
  return (
    Cypress.config('viewportWidth') <
    Cypress.env('smallViewportWidthBreakpoint')
  );
};

export const getUser = (types = ['user']) => {
  switch (Cypress.env('environment')) {
  case 'local':
    Users.createUser({ email: user.email, password: user.password }, types);
    break;
  case 'staging':
    break;
  case 'prod':
    break;
  }
  return user;
};
