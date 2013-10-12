module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Concat files
    concat: {
      options: {
        separator: '\r\n;'
      },
      app: {
        src: ['public/js/libraries/polyfills.js', 'public/js/app/global.js', 'public/js/app/settings.js', 'public/js/app/promises.js', 'public/js/app/events.js', 'public/js/app/validation.js', 'public/js/modules/*.js', 'public/js/app/init.js'],
        dest: 'public/js/app.js'
      },
      plugins: {
        src: ['public/js/plugins/*.js'],
        dest: 'public/js/plugins.js'
      }
    },

    //Uglify files
    uglify: {
      dist: {
        src: ['public/js/*.js', '!public/js/*.min.js'], // source files mask
        dest: 'public/js/', // destination folder
        expand: true, // allow dynamic building
        flatten: true, // remove all unnecessary nesting
        ext: '.min.js' // replace .js to .min.js
      }
    },

    //Lint only app files
    jshint: {
      files: ['<%= concat.app.src %>', 'gruntfile.js', 'package.json', '!public/js/libraries/polyfills.js']
    },

    //Less compiler
    less: {
      development: {
        files: {
          "public/css/style.css": "less/style.less",
          "public/css/IE.css": "less/IE.less"
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "public/css/style.min.css": "less/style.less",
          "public/css/IE.min.css": "less/IE.less"
        }
      }
    },

    //Watch task for less and templates changes
    watch: {
      tpl: {
        files: ['templates/*.tpl', 'templates/**/*.tpl', 'templates/**/**/*.tpl'],
        tasks: ['swig']
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less:development']
      }
    },

    //Tests
    mocha: {
      all: {
        src: 'test/index.html',
        options: {
          run: true
        }
      }
    },

    //Reports
    plato: {
      main: {
        files: {
          'reports': ['<%= jshint.files %>']
        }
      }
    },

    //Beautify javascript
    jsbeautifier: {
      files: ['<%= jshint.files %>'],
      options: {
        js: {
          indentChar: " ",
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false
        }
      }
    },

    //Generate all templates
    swig: {
      development: {
        init: {
          root: "templates",
          allowErrors: false,
          autoescape: true
        },
        dest: "public/",
        cwd: "templates",
        src: ['*.tpl', '!_*.tpl'],
        generateSitemap: false,
        generateRobotstxt: false,
        production: false,
      }
    },

    //Create screenshots
    localscreenshots: {
      options: {
        path: 'screenshots',
        type: 'png',
        local: {
          path: 'public',
          port: 3000
        },
        viewport: ['600x800', '768x1024', '1024x1024']
      },
      src: ['public/*.html']
    },


    //Switching between prod and dev environment
    'string-replace': {
      prod: {
        files: {
          './': ['public/js/app/settings.js', 'templates/base/_variables.tpl']
        },
        options: {
          replacements: [{
            pattern: 'isProduction: false',
            replacement: 'isProduction: true'
          },
          {
            pattern: 'isProduction = false',
            replacement: 'isProduction = true'
          }]
        }
      },
      dev: {
        files: {
          './': ['public/js/app/settings.js', 'templates/base/_variables.tpl']
        },
        options: {
          replacements: [{
            pattern: 'isProduction: true',
            replacement: 'isProduction: false'
          }, {
            pattern: 'isProduction = true',
            replacement: 'isProduction = false'
          }]
        }
      }
    },

    //Start local webserver
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'public'
        }
      }
    },

    //Open chrome
    open: {
      dev: {
        path: 'http://localhost:<%= connect.server.options.port %>/',
        app: 'Google Chrome Canary'
      }
    }

  });

  //Dependencies
  require('load-grunt-tasks')(grunt);

  //Tasks  
  grunt.registerTask('default', ['concat', 'uglify', 'swig', 'less']);
  grunt.registerTask('h', ['jshint']);
  grunt.registerTask('u', ['concat', 'uglify']);
  grunt.registerTask('t', ['mocha']);
  grunt.registerTask('p', ['plato']);
  grunt.registerTask('b', ['jsbeautifier']);
  grunt.registerTask('a', ['localscreenshots']);
  grunt.registerTask('s', ['swig']);

  grunt.registerTask('l', ['less']);
  grunt.registerTask('server', ['connect', 'open', 'watch']);
  grunt.registerTask('prod', ['string-replace:prod', 'default']);
  grunt.registerTask('dev', ['string-replace:dev', 'default']);

  return grunt;

};
