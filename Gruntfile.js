module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          sourcemap: true,
          style: 'compressed'
        },
        files: {
          'styles/app.css' : 'styles/app.scss',
          'firebase/app.css' : 'styles/app.scss',
          'hoodie/trooper/www/assets/css/app.css' : 'styles/app.scss'
        }
      }
    },

    jshint: {
      options: {
        'curly': true,
        'eqeqeq': true,
        'globals': {
          'JQuery': true
        }
      },
      files: ['firebase/*.js', 'hoodie/*.js', 'parse/*.js']
    },

    connect: {
      firebase: {
        options: {
          port: 13000,
          base: 'firebase',
          useAvailablePort: true,
          keepalive: true
        }
      }
    },

    watch: {
      styles: {
        files: ['styles/*.scss', 'styles/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['firebase/*.js', 'hoodie/*.js', 'parse/*.js'],
        tasks: ['jshint']
      },
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('serveFire', ['connect:firebase']);
};
