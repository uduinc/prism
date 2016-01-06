'use strict';
module.exports = function runGrunt(grunt)
{
  var config;

  config = {
    init: true,
    data: {
      pkg: grunt.file.readJSON('package.json'),
      // env: grunt.file.readJSON('grunt/task-configs/env.json'),
      prompt: require('./grunt/prompt.js')
      // shell: require('./grunt/task-configs/shell.js'),
    },
    loadGruntTasks: {
      pattern: 'grunt-*', // The pattern it uses to load modules, such as grunt-shell
      config: require('./package.json')
    }
  };
  process.maxTickDepth = 100000;
  require('load-grunt-config')(grunt, config);
};