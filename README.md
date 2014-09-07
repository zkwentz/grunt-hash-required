# grunt-hash-required

> Add a unique hash to a file, and update requirejs paths to cache-busted paths.

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

## The "require_cache" task

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

### Options

#### options.clean
Type: `Boolean`
Default value: `false`

A boolean value that is used to determine whether hashed files are also deleted.

#### options.flatten
Type: `Boolean`
Default value: `false`

A boolean value that is used to indicator if file paths should be flattened at their `dest` or not.

*Not flattened:
```shell
    /assets/build/jquery/dist/789ab3.jquery.js
```

*Flattened:
```shell
    /assets/build/789ab3.jquery.js
```

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  require_cache: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  require_cache: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
