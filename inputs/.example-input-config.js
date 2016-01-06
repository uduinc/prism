'use strict';
module.exports = {
  
  // These four options can also be specified and/or overridden for each glob pattern
  preProcessors: [],
  postProcessors: [],
  globOptions: {},
  excludes: [],

  // FUTURE global zipList: [],
  
  // glob_patterns are evaluated and used sequentially from first to last
  glob_patterns: [
    '**/*.json',
    { '**/*.json': 'tsv' },
    {
      pattern: '**/*.json', // https://github.com/isaacs/node-glob#glob-primer
      globOptions: {
        // https://github.com/isaacs/node-glob#options
      },
      // FUTURE zipList: [],
      outputFileTypes: ['.tsv'], // or detected automatically / left alone
      excludes: ['**/*.csv', { pattern: '**/*.yaml', globOptions: {} } ], // List of globs to exclude.
        // If an excludes element is an object, it can have an options
        // property whose values overwrite the main globOptions
      pre_processors: [
        function pleaseNameYourPreProcessors() { },
        {
          // Should we run this before the global preprocessors?
          // Default: true
          beforeGlobals: false,
          fn: function reallyJustNameThem() { }
        }
      ],     // Array of functions applied to each key/value pair (json) or value (csv, tsv)
      post_processors: []     // Array of functions applied to each key/value pair (json) or value (csv, tsv)
    }
  ]
};

