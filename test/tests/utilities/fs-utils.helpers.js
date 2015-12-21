var fsUtils = require('../../../lib/utilities/fs-utils');
var should = require('should');

module.exports = {
  checkIfDirExists: function( dirPath )
  {
    it( 'When we create dir', function testCreateDir(done) {
      fsUtils.mkdir(dirPath, function createDir( err ) {
        should.not.exist(err);
        done();
      });
    });

    it( 'Then the directory should exist', function testDirExists() {
      should.equal(global.fs.statSync(dirPath).isDirectory(), true, 'Directory doesn\'t exist.');
    });
  },
  cleanupDirs: function()
  {
    _.each( ['dir1a', 'dir1b'], function cleanupDir(dir) {
      rmdir(path.join(__dirname, dir));
    });
  }
};

function rmdir(dir)
{
  var filename, i, list, stat;

  try {
    list = fs.readdirSync(dir);
  } catch ( e ) {
    return 'Doesn\'t exist.';
  }
  for (i = 0; i < list.length; i++) {
    filename = path.join(dir, list[i]);
    stat = fs.statSync(filename);
    
    if (filename !== '.' && filename !== '..') {
      if (stat.isDirectory()) {
        // rmdir recursively
        rmdir(filename);
      } else {
        // rm fiilename
        fs.unlinkSync(filename);
      }
    }
  }
  fs.rmdirSync(dir);
}