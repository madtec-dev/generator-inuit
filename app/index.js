'use strict';
var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    // add option to skip install
    this.option('skip-install');

  },
  prompting: {

    cssFramework: function () {
        var done = this.async();
        var prompt = [{
          type: 'list',
          name: 'cssFramework',
          message: 'Select a CSS Framework to use:',
          choices: [
            'None',
            'Inuit',
            'Bootstrap'
          ],

        }];

        this.prompt(prompt, function (response) {
          if(response.cssFramework !== 'None') {
            this.options.cssFramework = response.cssFramework.toLowerCase();
          }
          else {
            this.options.cssFramework = '';
          }
          done();
        }.bind(this));
    }
  },
  
  writing: {
    buildEnv: function () {


      // shared across all generators
      this.sourceRoot(path.join(__dirname, 'templates', 'shared'));
      this.expandFiles('**', { cwd: this.sourceRoot() }).map(function (file) {
        this.template(file, file.replace(/^_/, ''));
      }, this);


      // css
      var cssFramework = this.options.cssFramework;
      if( cssFramework === 'inuit' ) {
        this.sourceRoot(path.join(__dirname, 'templates', 'css', 'inuit'));
      }
      else {
        this.sourceRoot(path.join(__dirname, 'templates', 'css', 'sass'));
      }
      this.directory('.', 'public/css');

    },
    assetsDirs: function () {
      this.mkdir('public');
      this.mkdir('public/components');
      this.mkdir('public/js');
      this.mkdir('public/css');
      this.mkdir('public/img');
      if (this.options.database === 'sqlite') {
        this.mkdir('data');
      }
    }
  },
  install: function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  }
});
