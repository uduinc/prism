'use strict';
module.exports = function runTests()
{
  var helpers = require('./fs-utils.helpers');

  describe( 'In order to create a directory named dir', function mkdirStory() {
    describe( 'I want to create its parent directories if they do not exist, and then create dir', function mkdirStoryDescription() {
      before( function beforeTestScenarios() {
        helpers.cleanupDirs();
      });
      describe( 'Given dir has no parents..', function basicScenario() {
        var dir = 'dir1a';
        
        helpers.checkIfDirExists(path.join(__dirname, dir));
      });
      describe( 'Given dir\'s parent already exists..', function basicScenario() {
        var dir = 'dir1a/dir2a';
        
        helpers.checkIfDirExists(path.join(__dirname, dir));
      });
      describe( 'Given dir\'s parent does not exist..', function basicScenario() {
        var dir = 'dir1b/dir2b';
        
        helpers.checkIfDirExists(path.join(__dirname, dir));
      });
      after( function afterTestScenarios() {
        helpers.cleanupDirs();
      });
    });
  });
};