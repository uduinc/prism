function runTests( should )
{
	describe( 'test2', function () {
		it( 'Yoyo', function () {
			(5).should.equal(5);
		});
	});
};
module.exports = runTests;