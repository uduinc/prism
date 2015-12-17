'use strict';
/* global _:true beforeEach describe getFiles:true */
/* eslint no-native-reassign: [2, { "exceptions": ["_", "getFiles"] } ] */
var should = require( 'should' );
require( '../../setup-tests' );

// EXAMPLE. This function does the following for each file in its subdirectory tree:
//  1. Describe a task with the file's name
//  2. Run a set of pre-determined setup tasks before executing the file's tests
//  3. Pass the should.js module to the file so its tests can use should
describe( 'Test Set #1', function testSet1() {  
  var files = getFiles( __dirname, __filename );
  _.each( files, function iterateFiles( file ) 
  {
    if ( file && _.isFunction ( file.run ) ) 
    {
      describe( file.name, function runTestsForFile( )
      {
        beforeEach( function beforeEach( done ) {
          // Run whatever tasks (clearing db etc) are needed
          done();
        });
        file.run( should );
      });
    }
  });
});