/*
 * grunt-hash-required
 * https://github.com/zkwentz/grunt-hash-required
 *
 * Copyright (c) 2014 Zach Wentz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    'hash_require': {
      'require_js': {
        configPath: 'examples/require_config.js',
        dest: 'out/dist/require/'
      },
      php: {
        options: {
          mapping: 'out/assets.php'
        },
        src: 'examples/*.js',
        dest: 'out/dist/php/'
      },
      json: {
        options: {
          mapping: 'out/assets.json'
        },
        src: 'examples/*.js',
        dest: 'out/dist/json/'
      },
      single: {
        options: {
          mapping: 'out/single.json'
        },
        src: 'examples/test1.js',
        dest: 'out/dist/single/'
      },
      no_map: {
        src: 'examples/*.js',
        dest: 'out/dist/no_map/'
      },
      path: {
        options: {
          mapping: 'out/path.json',
          destBasePath: 'out/',
          srcBasePath: 'examples/'
        },
        src: 'examples/**/*.js',
        dest: 'out/dist/path/'
      },
      flatten: {
        options: {
          mapping: 'out/flatten.json',
          flatten: true
        },
        src: 'examples/**/*.js',
        dest: 'out/dist/flatten/'
      },
      no_dest: {
        options: {
          mapping: 'out/no_dest.json'
        },
        src: 'examples/test1.js'
      }
    },
    watch: {
      files: '<%= jshint.all %>',
      tasks: 'default'
    },
    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    clean: [
      'out/', 
      'examples/test1.*.js'
    ],
    simplemocha: {
      options: {
        ui: 'tdd'
      },
      all: { src: 'test/**/*.js' }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-hash-required');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'hash_require', 'simplemocha']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
