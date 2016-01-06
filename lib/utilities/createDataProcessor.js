var fs = require('fs');
var transform = require('stream-transform');
var util = require('util');

function getDataTransformStream(filename, transFn, opts) 
{
  // transform() returns a new instance
  var dps;
  opts = opts || {};

  dps = transform( transFn, opts );
  dps.on('error', function ( err ) {
    console.error('Stream transform error @ ' + filename + ': ', err );

    // Don't pass on input if there's an error
    // If we stop it here, the file will never get written.
    this.unpipe();
    this.end();
  });
  return dps;
}
module.exports = getDataTransformStream;

// Example:
// var ts = DataProcessorStream(function ( data, cb ) {
//   console.log('data = ', JSON.parse(data) );
//   cb( null, data);
// });
// var rs = fs.createReadStream('test.txt');
// rs.pipe(ts).pipe(process.stdout);