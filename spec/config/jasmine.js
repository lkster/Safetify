const Jasmine = require('jasmine');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

let jasmine = new Jasmine();

jasmine.loadConfig({
    spec_dir: 'spec',
    spec_files: [
        "*.[sS]pec.js"
    ],
});

jasmine.clearReporters();
jasmine.addReporter(new SpecReporter({
    maxLogLines: 5,             // limit number of lines logged per test
    suppressErrorSummary: false, // do not print error summary
    suppressFailed: false,      // do not print information about failed tests
    suppressPassed: false,      // do not print information about passed tests
    suppressSkipped: true,      // do not print information about skipped tests
    showSpecTiming: false,      // print the time elapsed for each spec
    failFast: false              // test would finish with error when a first fail occurs.
}));

jasmine.execute();