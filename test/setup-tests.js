'use strict';
/* global _:true assert:true async:true before:true fs:true getFiles:true */
/* eslint no-native-reassign: [2, { "exceptions": ["_", "assert", "async", "fs", "getFiles"] } ] */
/**
 * Setup for testing in a structured manner.
 * See test-set-1/test-set-1.js for a good example of using getFiles to structure your tests 
 *
 * should.js must be required in all files because Mocha's --require opt doesn't expose a global `should` var to enable calls like should.exists(varName)
 */

// These are needed in all the tests (no scope restriction wanted)
global._ = require( 'lodash' );
global.assert = require('assert');
global.fs = require( 'fs' );
global.async = require( 'async' );

// Requires all the files/folders inside of 'dir' recursively, with no maximum depth
// This is exposed to each test file (see example-tests folder for how to use)
global.getFiles = function getFiles(dir, rootFile)
{
  var files_ = [];
  var files = fs.readdirSync(dir);
  var fileObj, i, name;
    
  for (i = 0; i < files.length; i++ ) 
    {
    name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      files_ = files_.concat( _.compact( getFiles(name) ) || [] );
    } else if ( dir + '/' + files[i] === rootFile ) { console.log( 'Not requiring callee file: ' + rootFile );
    } else { fileObj = { name: files[i].replace( '.js', ''), run: require( name )
     };
      files_.push(fileObj);
      fileObj = null;
    }
  }
  return files_;
}

// before(function before( done ) 
// {  
// 	// If needed
//   done();
// });