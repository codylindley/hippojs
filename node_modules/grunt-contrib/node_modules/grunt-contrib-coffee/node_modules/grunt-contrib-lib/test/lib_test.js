var grunt = require('grunt');
var helper = require('../lib/contrib.js').init(grunt);

exports['less'] = {
  main: function(test) {
    'use strict';

    var expect, result;

    test.expect(10);

    // Both test should result in this[JST]
    expect = {
      namespace: 'this["JST"]',
      declaration: 'this["JST"] = this["JST"] || {};'
    };

    result = helper.getNamespaceDeclaration("this.JST");
    test.equal(expect.namespace, result.namespace, 'namespace with square brackets incorrect');
    test.equal(expect.declaration, result.declaration, 'namespace declaration with square brackets incorrect');

    result = helper.getNamespaceDeclaration("JST");
    test.equal(expect.namespace, result.namespace, 'namespace with square brackets incorrect');
    test.equal(expect.declaration, result.declaration, 'namespace declaration with square brackets incorrect');

    // Templates should be declared globally if this provided
    expect = {
      namespace: "this",
      declaration: ""
    };

    result = helper.getNamespaceDeclaration("this");
    test.equal(expect.namespace, result.namespace, 'namespace with square brackets incorrect');
    test.equal(expect.declaration, result.declaration, 'namespace declaration with square brackets incorrect');

    // Nested namespace declaration
    expect = {
      namespace: 'this["GUI"]["Templates"]["Main"]',
      declaration:  'this["GUI"] = this["GUI"] || {};\n' +
                    'this["GUI"]["Templates"] = this["GUI"]["Templates"] || {};\n' +
                    'this["GUI"]["Templates"]["Main"] = this["GUI"]["Templates"]["Main"] || {};'
    };

    result = helper.getNamespaceDeclaration("GUI.Templates.Main");
    test.equal(expect.namespace, result.namespace, 'namespace incorrect');
    test.equal(expect.declaration, result.declaration, 'namespace declaration incorrect');

    // Namespace that contains square brackets
    expect = {
      namespace: 'this["main"]["[test]"]["[test2]"]',
      declaration: 'this["main"] = this["main"] || {};\n' +
                   'this["main"]["[test]"] = this["main"]["[test]"] || {};\n' +
                   'this["main"]["[test]"]["[test2]"] = this["main"]["[test]"]["[test2]"] || {};'
    };

    result = helper.getNamespaceDeclaration("main.[test].[test2]");
    test.equal(expect.namespace, result.namespace, 'namespace with square brackets incorrect');
    test.equal(expect.declaration, result.declaration, 'namespace declaration with square brackets incorrect');

    test.done();
  }
};