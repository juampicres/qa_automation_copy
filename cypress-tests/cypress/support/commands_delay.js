// Sets a delay after any of the specified commands in DELAYED_COMMANDS is executed.
// Set the ENV variable CYPRESS_COMMAND_DELAY to the desired ms to wait after each command.

const DELAYED_COMMANDS = [
  'visit',
  'click',
  'trigger',
  'type',
  'clear',
  'reload',
  'contains',
];

const COMMAND_DELAY = Cypress.env('COMMAND_DELAY') || 0;

if (COMMAND_DELAY > 0) {
  for (const command of DELAYED_COMMANDS) {
    Cypress.Commands.overwrite(command, (originalFn, ...args) => {
      const origVal = originalFn(...args);

      return new Promise((resolve) =>
        setTimeout(() => resolve(origVal), COMMAND_DELAY)
      );
    });
  }
}
