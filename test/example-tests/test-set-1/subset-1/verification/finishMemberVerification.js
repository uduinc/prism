// Possible useful example, but way too much to make work for now.

/*function runTests( should )
{
	var Member;
	var Verification;

	var claimantMember;
	var victimMember;
	var verification;

	function requireModels ( done )
	{
		Member = loopback.getModel( 'member' );
		Verification = loopback.getModel( 'verification' );
		done();		
	}
	function setupTest ( done )
	{
		Member.createMember( 'test1@udu.co', 'aPassword', function ( err, member )
		{
			should.not.exist( err );
			should.exist(member);				
			claimantMember = member;
			Member.createMember( 'test2@udu.co', 'anotherPassword', function ( err, member )
			{
				should.not.exist( err );
				should.exist( member );
				victimMember = member;
				var verificationObj = {
					code: Member.memberHelpers.getRandomXCharString(),
					memberId: claimantMember.id, 
					victimId: victimMember.id
				};
				Verification.create( verificationObj, function ( err, verificationInstance )
				{
					should.not.exist( err );
					should.exist( verificationInstance );
					verification = verificationInstance;
					done();
				});
			});
		});		
	}
	describe( 'Validate input/output', function ( done ) {		
		before( requireModels );
		beforeEach( setupTest );
		it( 'Valid call', function ( done ) {
			Member.verificationHelpers.finishMemberVerification( verification, victimMember, claimantMember, function ( err, result )
			{
				should.not.exist(err);
				should.exist(result);
				done();
			});
		});
		it( 'Invalid verification', function ( done ) {
			Member.verificationHelpers.finishMemberVerification( null, victimMember, claimantMember, function ( err, result )
			{
				should.exist(err);
				should.not.exist(result);
				done();
			});
		});
		it( 'Invalid victimMember', function ( done ) {
			Member.verificationHelpers.finishMemberVerification( verification, null, claimantMember, function ( err, result )
			{
				should.exist(err);
				should.not.exist(result);
				done();
			});
		});
		it( 'Invalid claimantMember', function ( done ) {
			Member.verificationHelpers.finishMemberVerification( verification, victimMember, null, function ( err, result )
			{
				should.exist(err);
				should.not.exist(result);
				done();
			});
		});				
	});
	describe( 'Validate results in database', function ( done ) {
		before( requireModels );
		beforeEach( function ( done ) {
			setupTest( function ( err ) {
				if ( err ) {
					done(err);
				} else {
					Member.verificationHelpers.finishMemberVerification( verification, victimMember, claimantMember, function ( err, result )
					{
						should.not.exist(err);
						should.exist(result);
						done();
					});					
				}
			});
		});
		it( 'dateExpended', function ( done ) {
			Verification.findOne( { where: { id: verification.id } }, function ( err, verification )
			{
				should.not.exist( err );
				should.exist( verification );
				verification.should.have.property( 'dateExpended' );
				verification.dateExpended.should.be.an.instanceOf( Date );
				done();
			});
		});
		it( 'redirectId', function ( done ) {
			Member.findOne( { where: { id: victimMember.id } }, function ( err, member )
			{
				should.not.exist( err );
				should.exist( member );
				member.should.have.property( 'redirectId' );
				member.redirectId.should.be.an.instanceOf( Object );
				done();
			});
		});
	});
}
module.exports = runTests;*/