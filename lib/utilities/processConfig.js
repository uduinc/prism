var createDataProcessor = require('./createDataProcessor');
function processConfig( configObj )
{
  var configArr = simplifyConfig( configObj );
  _.each( configArr, function ( config, key )
  {
    var newArr = [];
    // Convert every preProcessor function to a Transform stream
    // Convert every postProcessor function to a Transform stream
  });
  return configArr;
}

function simplifyConfig( config )
{
  var configs = [];
  var globalConfig = {};

  // 1. Merge global pre-processors into local arrays
  // 2. Merge global post-processors into local arrays
  // 3. Merge global globOptions into local globOptions
  // 4. Merge global excludes into local excludes arrays
  // 5. Return config as an array of local configs
  return 
}

module.exports = processConfig;