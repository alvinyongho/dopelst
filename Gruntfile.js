module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('grunt-config.json'),

    /* Clean */
    clean: {
      options: {
        force: true
      },
      build:   ['<%= pkg.build %>/*'],
      cssdist: ['<%= pkg.hw5vuedist %>/css'],
      imgdist: ['<%= pkg.hw5vuedist %>/img'],
      jsdist:  ['<%= pkg.hw5vuedist %>/js']
    },

    /* HTML Minify */
    htmlmin: {
      options: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true
      },
      hw5vue: {
        files: [{
          expand: true,
          cwd: '<%= pkg.dev %>/html/vue',
          src: ['**/*.html'],
          dest: '<%= pkg.hw5vuedist %>'
        }]
      }
    },



    vueify: {
        components: {
            files: [{
                    expand: true,
                    src: '<%= pkg.js %>/vue/components/**/*.vue',
                    dest: '<%= pkg.build %>/js/vueout',
                    ext: '.vue.js'
                }
            ]
        }
    },


    /* JS */
    uglify: {

      hw5vue: {
        files: {
          '<%= pkg.hw5vuedist %>/js/output.min.js': ['<%= pkg.js %>/vue/vue.js', '<%= pkg.js %>/vue/vue-router.js'  , '<%= pkg.js %>/vue/vuefire.js', '<%= pkg.js %>/vue/config.js', '<%= pkg.build %>/js/vueout/**/*.js']
        }
      },

      // vuefiles: {
      //   files: {
      //     '<%= pkg.hw5vuedist %>/js/vue.min.js': ['<%= pkg.build %>/js/vueout/**/*.js']
      //   }
      // },

    },







    /* SASS compile + Concatenate CSS + Combine Media Queries + CSS Minify + CSSO */
    sass: {

      hw5vue: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: '<%= pkg.css %>',
          src: ['**/*.css', '**/*.scss'],
          dest: '<%= pkg.build %>/css/sassout',
          ext: '.css'
        }]
      }
    },
    concat: {
      options: {
        separator: '\n'
      },

      hw5vue: {
        src: ['<%= pkg.build %>/css/sassout/**.css'],
        dest: '<%= pkg.build %>/css/concatout/main.css'
      }
    },
    cmq: {
      options: {
        log: false
      },
      target: {
        files: {
          '<%= pkg.build %>/css/cmqout': ['<%= pkg.build %>/css/concatout/*.css']
        }
      }
    },
    cssmin: {
      options: {
        sourceMap: false
      },
      target: {
        files: [{
          expand: true,
          cwd: '<%= pkg.build %>/css/cmqout',
          src: ['*.css'],
          dest: '<%= pkg.build %>/css/minifyout',
          ext: '.min.css'
        }]
      }
    },
    csso: {
      options: {
        report: 'gzip'
      },
      hw5: {
        files: {
          '<%= pkg.hw5vuedist %>/css/main.min.css': ['<%= pkg.build %>/css/minifyout/main.min.css']
        }
      }
    },

    /* Imagemin */
    imagemin: {

      hw5vue: {
        files: [{
          expand: true,
          cwd: '<%= pkg.img %>',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '<%= pkg.hw5vuedist %>/img'
        }]
      }
    },

    /* Modernizr */
    modernizr: {
      dist: {
        'dest': '<%= pkg.js %>/vendor/modernizr.min.js',
        'options' : [
          'setClasses',
          'addTest',
          'html5printshiv',
          'testProp',
          'fnBind'
        ],
        'uglify': true,
        'tests': [],
        'excludeTests': [],
        'crawl': true,
        'useBuffers': false,
        'files' : {
          'src': [
            '<%= pkg.js %>/**.js',
            '<%= pkg.css %>/**.css'
          ]
        },
        'customTests': []
      }
    },

    /* Watch */
    watch: {
      html: {
        files: '<%= pkg.dev %>/**',
        tasks: 'html'
      },
      css: {
        files: '<%= pkg.css %>/**',
        tasks: 'css'
      },
      js: {
        files: '<%= pkg.js %>/**/*.js',
        tasks: 'js'
      },
      img: {
        files: '<%= pkg.img %>/**',
        tasks: 'img'
      }
    }
  });


  /**
   * Load NPM Tasks
   */

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-csso');

  grunt.loadNpmTasks('grunt-modernizr');

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-vueify');


  /**
   * Register Tasks
   */

  grunt.registerTask('html', ['htmlmin'])
  grunt.registerTask('js', ['clean:jsdist', 'vueify', 'uglify', 'clean:build']);

  grunt.registerTask('css', ['clean:cssdist', 'sass', 'concat', 'cmq', 'cssmin', 'csso', 'clean:build']);
  grunt.registerTask('img', ['clean:imgdist', 'imagemin']);

  grunt.registerTask('default', ['html', 'css', 'img', 'js']);

};
