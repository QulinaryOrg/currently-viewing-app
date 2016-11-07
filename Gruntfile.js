'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: 'CurrentlyViewingApp.templates',
          processName: function (filePath) {
            var pieces = filePath.split('/');
            return pieces[pieces.length - 1].split('.')[0];
          }
        },
        // output file: input files
        files: {
          'src/client/templates.js': ['src/client/**/*.hbs']
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'src/client/**/*.hbs'],
      tasks: ['handlebars', 'jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['handlebars', 'jshint']);

};
