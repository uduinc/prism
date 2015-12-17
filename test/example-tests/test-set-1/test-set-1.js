require( '../../setup-tests' );
var should = require( 'should' );

// EXAMPLE. This function does the following for each file in its subdirectory tree:
// 	1. Describe a task with the file's name
// 	2. Run a set of pre-determined setup tasks before executing the file's tests
// 	3. Pass the should.js module to the file so its tests can use should
describe( 'Test Set #1', function () {	
	var files = getFiles( __dirname, __filename );
	_.each( files, function ( file ) 
	{
		if ( file && _.isFunction ( file.run ) ) 
		{
			describe( file.name, function ( )
			{
				beforeEach( function ( done ) {
					// Run whatever tasks (clearing db etc) are needed
					done();
				});
				file.run( should );
			});
		}
	});
});