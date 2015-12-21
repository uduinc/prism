'use strict';
module.exports = function runTests()
{
  describe( 'Example Tests', function runExampleTests() {
    var TEST_VAR = 5;

    it( 'Yoyo', function isAYoyo() {
      (TEST_VAR).should.equal(TEST_VAR);
    });
    it( 'Is a string', function isAString() {
      var str = 'lol';

      str.should.be.type('string');
    });
    it( 'Is an array', function isAnArray() {
      Array.isArray([]).should.equal(true);
    });
  });
};