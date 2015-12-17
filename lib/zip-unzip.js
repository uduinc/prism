'use strict';

// var _ = require('lodash');
var extract = require('extract-zip');
var fs = require('fs');
var path = require('path');
var Q = require('q');

var zipUnzip = {};

function zip( filePath, cb )
{
  // TODO
  cb('TODO');
}
zipUnzip.zip = function callPromiseZip( filePath, cb )
{
  return Q.nfcall(zip, filePath, function promiseZip(err) {
    cb( err, filePath );
  });
};

function unzip( file, unzipTo )
{
  var deferred = Q.defer();

  console.log('awesome');
  extract(file, { dir: unzipTo }, function extractContents( err ) {
    console.log('wtf');
    if ( err ) {
      console.log('well?');
      deferred.reject( new Error( err ) );
    } else {
      console.log('ffs');
      deferred.resolve();
    }
  });
  return deferred.promise;
}
zipUnzip.unzip = function callPromiseUnzip( opts )
{
  var deferred = Q.defer();
  var unzipTo = opts.unzipTo;

  if ( opts.unzipFrom ) {
    unzipTo = path.normalize( unzipTo || opts.unzipFrom.replace('.zip', '') );
    console.log( Q.nfcall );
    return Q.nfcall(fs.readFile, opts.unzipFrom ).then(function promiseUnzip( file ) {
      console.log('here?');
      return unzip( file, unzipTo );
    });
  }
  if ( !unzipTo ) {
    deferred.reject( new Error( 'No source or path for zip file.' ) );
    return deferred.promise;
  }
  return unzip( opts.source, path.normalize(unzipTo));
};

module.exports = zipUnzip;

// console.log( _.keys(Q));
zipUnzip.unzip( { unzipFrom: 'a.zip', unzipTo: 'b.zip' } ).then(
  function unzipSuccess( res ) {
    console.log( 'then!', res );
  },
  function unzipError( err ) {
    console.log( 'error = ', err );
  },
  function unzipProgress( prog ) {
    console.log( 'progress = ', prog );
  }
);