/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConst = require('./promiseConstructor.js');
var promisification = require('./promisification.js');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // the outermost 'return' lets us continue the chain
  // after an invocation of 'pluckFirstLineFromFileAsync'
  return promiseConst.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(user) {
      return promisification.getGitHubProfileAsync(user);
    }).then(function(response) {
      return fs.writeFileSync(writeFilePath, JSON.stringify(response));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
