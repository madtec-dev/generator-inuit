'use strict';
var path = require('path');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    // add option to skip install
    this.option('skip-install');

  },
  prompting: {

    inuit: function () {
        var done = this.async();
        var prompt = [{
          type: 'confirm',
          name: 'inuit',
          message: 'Do you want to use Inuit CSS?',
        }];

        this.prompt(prompt, function (response) {
          if(response.inuit === true) {
            this.options.inuit = response.inuit;
          }
          else {
            return;
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
      var inuit = this.options.inuit;
      if( inuit === true ) {
        console.log('inuit');
        this.sourceRoot(path.join(__dirname, 'templates', 'css', 'inuit'));
      }
      this.directory('.', 'public/css');
    },
    assetsDirs: function () {
      this.mkdir('public');
      this.mkdir('public/components');
      this.mkdir('public/css');
    }
  },
  install: function () {
    this.bowerInstall();
  }
});
