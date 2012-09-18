module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    lint: {
      all: ["grunt.js", "lib/*.js", '<config:test.tasks>']
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },
    
    // Unit tests.
    test: {
      tasks: ['test/*_test.js']
    }
  });

  // By default, lint and run all tests.
  grunt.registerTask('default', 'lint test');
};