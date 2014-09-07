# grunt-hash-required

> Add a unique hash to a file, and update requirejs paths to cache-busted paths.

## Why?

Assuming you are already familiar with [grunt-hash](https://github.com/jgallen23/grunt-hash), this plugin adds functionality on top of, and is intended to be a drop-in replacement of *grunt-hash*. grunt-hash, while a great plugin, I found didn't work well with RequireJS. My css and js assets would have a cache-busting path, but my require configuration would have no idea what those new paths were. 

By reading the RequireJS configuration file itself, we can update the paths as we rename them, and we get the added benefit of only hashing the js files we actually use (as negligible an optimization as that is).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hash-required --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hash-required');
```

## The "hash_require" task

### Overview
In your project's Gruntfile, add a section named `hash_require` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    'hash_require': {
            options: {
                mapping: 'assets/assets.json',
                srcBasePath: '',
                destBasePath: '',
                flatten: true,
                prepend: true,
                clean: true
            },
            require_js: {
                configPath: 'assets/js/config.js' // RequireJS config path
            },
            css: {
                src: ['assets/build/**/*.css'],  //all your css that needs a hash appended to it
                dest: 'assets/build' //where the new files will be created
            } 
    },
});
```

### require_js

grunt-hash-required uses a specific task called `require_js` to parse all of your dependency paths, add a cache-bust hash to those files, and update the **built** configuration file to point to those newly hashed files.

#### require_js.configPath
Type: `String`
Default value: `""`

A string value of the path to your RequireJS configuration file.


### Options

#### options.mapping
Type: `String`
Default value: `""`

A string value of the path to your generated assets map file. This file maps your cache-busted file names to their original names. When in production you can use this file to map your existing css includes and javascript includes to their cache-busted counterparts, using the original filename as the key.

#### options.srcBasePath
Type: `String`
Default value: `""`

A string value of the path to your assets directory. 

#### options.destBasePath
Type: `String`
Default value: `""`

A string value of the path to your build directory.


#### options.clean
Type: `Boolean`
Default value: `false`

A boolean value that is used to determine whether hashed files are also deleted.

#### options.flatten
Type: `Boolean`
Default value: `false`

A boolean value that is used to indicator if file paths should be flattened at their `dest` or not.

**Not flattened:**
```shell
    /assets/build/jquery/dist/jquery.789ab3.js
```

**Flattened:**
```shell
    /assets/build/jquery.789ab3.js
```

#### options.prepend
Type: `Boolean`
Default value: `false`

A boolean value indicating whether or not the hash should be prepended or appended to the original filename. By default this plugin will append a hash to the filename before the file extension. 

**Prepend:**
```shell
    /assets/build/789ab3.jquery.js
```

**Append:**
```shell
    /assets/build/jquery.789ab3.js
```

*Why would you want to prepend? For me, I needed to because I was uploading my assets to S3 on release. And Amazon suggests that you start each filename with an md5sum to give expected throughput when using Amazon S3 as a CDN. This was a two birds, one stone type situation.*

*See [Improving GET and PUT Throughput](https://aws.amazon.com/articles/1904/)*


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
