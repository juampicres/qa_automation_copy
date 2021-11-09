module.exports = {
  showLogs: false,
  concurrency: 10,
  isDisabled: true, //If true, all calls to Eyes-Cypress commands will be silently ignored.
  failCypressOnDiff: false, //If true, then the Cypress test fails if an eyes visual test fails.
  // If false and an eyes test fails, then the Cypress test does not fail
  //
  browser: [
    // Browsers with different viewports
    { width: 1920, height: 1080, name: 'chrome' },
    { width: 360, height: 639, name: 'chrome' },
    { width: 1920, height: 1080, name: 'firefox' },
    { width: 360, height: 639, name: 'firefox' },
  ],
  // set batch name to the configuration
  batchName: 'Testing with multiple viewports in multiple browsers',
};
