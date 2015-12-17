var testObj = {
	id: 'testUser',
	devices: [],
	contacts: function () {}
};
var Member =
{
	create: function ( config, cb ) {
		_.forOwn( config, function ( val, prop )
		{
			testObj[prop] = val;
		});
		cb( null, testObj );
	},
	memberHelpers: {
		findMember: function ( id, cb ) {
			if ( id && id === testObj.id ) {
				return cb( null, testObj );
			}
			cb( 'Cannot find member with that id.' );
		}
	}
};

function isArrayOrFn( obj )
{
	return _.isArray( obj ) || _.isFunction(obj);
}

function runTests( should )
{
	describe( 'Validate memberId', function () {
		it( 'Invalid ID', function ( done ) {
			Member.memberHelpers.findMember( undefined, function ( err, data )
			{
				should.exist(err, 'Error should be passed back for invalid id');
				done();
			})
		});
		it( 'Valid ID', function ( done ) {
			Member.memberHelpers.findMember( 'testUser', function ( err, data )
			{
				should.not.exist(err, 'Error should not happen for valid id');
				done();
			})
		});
		it( 'Includes contacts and devices', function ( done ) {
			Member.create( {password: 'password'}, function ( err, member )
			{
				should.not.exist(err);
				should.exist(member);
				member.should.be.an.Object;

				member.should.have.property( 'devices' );
				member.should.have.property( 'contacts' );
				member.should.have.property( 'password' );

				should.equal( isArrayOrFn( member.devices ), true);
				should.equal( isArrayOrFn( member.contacts ), true);
				( typeof member.password ).should.match(/^(string)$/);
				done();
			});
		});				
	});
};
module.exports = runTests;