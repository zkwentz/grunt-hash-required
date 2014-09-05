/*
 * grunt-require-cache
 * https://github.com/zkwentz/grunt-require-cache
 *
 * Copyright (c) 2014 Zach Wentz
 * Licensed under the MIT license.
 */

'use strict';

var requireCache = require('/var/require-cache');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('require_cache', 'Change requirejs paths to cache-busted paths.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        config: this.data.rjsConfig,
        assets: this.data.assetsMap,
        baseUrl: ''
    });

    requireCache(options,this.async());
  });

};
