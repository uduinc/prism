var mkdirp = require('mkdirp');

var fsUtils = {};

// Make the dir recursively
fsUtils.mkdir = function ( path )
{
	mkdirp(path, function (err) {
		cb( err, path );
	});
};

module.exports = fsUtils;