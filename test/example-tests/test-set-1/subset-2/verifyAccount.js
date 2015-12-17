function runTests( should )
{
	describe( 'test', function () {
		it( 'test2', function () {
			(5).should.equal(5);
		});
	});
};
module.exports = runTests;