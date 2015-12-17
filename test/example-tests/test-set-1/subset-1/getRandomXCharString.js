// Help demonstrate should.js use-cases
var TOKEN_LEN = 50;
function getRandomXCharString(x)
{
	if (typeof x !== 'number' || x < 1)
	{
		x = TOKEN_LEN;
	}
	var idx = 'ABCDEFDHIJKLMNOPQRSTUVWXYZ0123456789';
	var str = '';
	for (var i = 0; i < x; i++)
	{
		str += idx[Math.floor(Math.random() * 36)];
	}
	return str;
};

function runTests( should )
{
	var Member;
	describe( 'getRandomXCharString', function () {
		before( function ( ) {
			// Stuff
		});
		it( 'Is a string', function () {
			var str = getRandomXCharString(1);
			str.should.be.String;
		});
		it( 'Is alphanumeric', function () {
			var str = getRandomXCharString(50);
			str.should.match(/^[a-z0-9]+$/i);
		});			
		it( 'Has correct length when specified', function () {
			var len = 5;
			var str = getRandomXCharString(len);
			str.should.have.length(len);
		});
		it( 'Has correct length when not specified', function () {
			var str = getRandomXCharString();
			str.should.have.length(TOKEN_LEN);
		});			
	});
}
module.exports = runTests;