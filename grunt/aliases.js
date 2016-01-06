'use strict';
module.exports = function getAliases(/* grunt, options */)
{
  return {
    // Help commands / commands that don't have tangible affects on code/servers
    prism: 'prompt:prism',
    default: 'prism'
  };
};