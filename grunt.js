/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*<%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    qunit: {
      files: ['test/**/*.html']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'lib/intro.js', 'lib/core.js', 'lib/helpers.js', 'lib/miscellaneous.js', 'lib/manipulation/class.js', 'lib/outro.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    lint: {
      afterconcat: ['dist/hippo.js']
    },
    uglify: {},
    yuidoc: {
      compile: {
        'name': 'hippojs',
        'description': 'Modern JavaScript library for DOM operations',
        'version': '1.0',
        'url': 'http://hippojs.com',
        'logo':'',
        options: {
          paths: 'lib',
          outdir: 'docs'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'qunit concat lint:afterconcat min yuidoc');

  grunt.loadNpmTasks('grunt-contrib-yuidoc');

};