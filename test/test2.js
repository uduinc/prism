var prism = require('../prism');
var fsutils = require('../lib/utilities/fs-utils');

describe( 'Test Set #1', function testSet1() {  
  it('lol', function lol() {
    assert(prism.hi())
  });
  it('lol2', function lol2() {
    fsutils.mkdir('lol/what', function ( err, data ) {
      assert( !err );
    });
  });
});