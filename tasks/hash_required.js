/*
 * grunt-hash-required
 * https://github.com/zkwentz/grunt-hash-required
 *
 * Copyright (c) 2014 Zach Wentz
 * Licensed under the MIT license.
 */

'use strict';

var requirejs   = require('requirejs/bin/r.js');
var fs          = require('fs');
var chalk       = require('chalk');
var path        = require('path');
var file        = require('file-utils');
var getHash     = require('../lib/hash');

function unixify(path) {
  return path.split('\\').join('/');
}

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
    
  

  grunt.registerMultiTask('hash_require', 'Add a unique hash to a file, and update requirejs paths to cache-busted paths.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        srcBasePath: "",
        destBasePath: "",
        baseUrl: "",
        flatten: false,
        prepend: false,
        clean: false,
        hashLength: 8
    });
    
    var done = this.async();
    
    
    var hashFile = function hashFile(src, fileDest) {
        var source = grunt.file.read(src);
        var hash = getHash(source, 'utf8').substr(0, options.hashLength);
        var dirname = path.dirname(src);
        var rootDir = path.relative(options.srcBasePath, dirname);
        var ext = path.extname(src);
        var basename = path.basename(src, ext);
        
        // Default destination to the same directory
        var dest = fileDest || path.dirname(src);
        
        
        var newFile = basename + '.' + hash + '.' + ext;
        if (options.prepend) {
            newFile = hash + '.' + basename + ext;
        }
        var outputPath = path.join(dest, newFile);
        
        // Determine if the key should be flatten or not. Also normalize the output path
        var key = path.join(rootDir, path.basename(src));
        var outKey = path.relative(options.destBasePath, outputPath);
        if (options.flatten) {
          key = path.basename(src);
          outKey = path.basename(outKey);       
        }
        
        grunt.file.copy(src, outputPath);
        if (options.clean) {
            grunt.file.delete(src);
        }
        grunt.log.writeln('Generated: ' + outKey);
        
        map[unixify(key)] = unixify(outKey);

        return outputPath;
    };
    
    var genMap = function genMap() {
        if (options.mapping) {
          var output = '';
    
          if (mappingExt === '.php') {
            output = "<?php return json_decode('" + JSON.stringify(map) + "'); ?>";
          } else {
            output = JSON.stringify(map, null, "  ");
          }
    
          grunt.file.write(options.mapping, output);
          grunt.log.writeln('Generated mapping: ' + options.mapping);
        }
        done();
    };
    
    var map = {};
    var mappingExt = path.extname(options.mapping);
    var config;

    // If mapping file is a .json, read it and just override current modifications
    if (mappingExt === '.json' && grunt.file.exists(options.mapping)) {
      map = grunt.file.readJSON(options.mapping);
    }
    
    if (this.target === "require_js") {
        // Get hashed requirejs path
        if (this.data.configPath) {
            
            // Grab the config file
            if (file.exists(this.data.configPath)) {
            
                // First hash the config file itself
                var hashedConfigPath = hashFile(this.data.configPath,'assets/build');
                config = grunt.file.read(hashedConfigPath);
                
                var rjsConfig;    
                requirejs.tools.useLib(function(require){
            
                    rjsConfig = require('transform').modifyConfig(config,function(config){  
                       var relativeBaseUrl = path.join('.',config.baseUrl); 
                       for (var aPath in config.paths) {
                         var pathToJSFile = relativeBaseUrl + '/' + config.paths[aPath] + '.js';
                         if (file.exists(pathToJSFile) && grunt.file.isFile(pathToJSFile)) {
                             var relativeHashedPath = path.relative(relativeBaseUrl,hashFile(pathToJSFile,relativeBaseUrl));
                             config.paths[aPath] = relativeHashedPath.replace(/\.js$/,'');
                         } else {
                             console.log(chalk.yellow(pathToJSFile + " not found, skipping."));
                         }
                       }           
                       
                       return config;
                    });
                    
                    grunt.file.write(hashedConfigPath,rjsConfig);
                    console.log(chalk.green('Updated ' + hashedConfigPath + ' with cache bust paths'));
                    genMap();
                });
                
                
            } else {
                //log error no config file found at specified path
                console.log(chalk.yellow('No config file found at: '+this.data.configPath));
            }
            
        }
        else 
        {
            //log error no config file specified
            console.log(chalk.red('No config file path specified.'));
        }
    }
    else
    {
        this.files.forEach(function(file) {
          file.src.forEach(function(src) {
              hashFile(src, file.dest);
          });
          genMap();
        });
    }
    

  });
  
  

};
