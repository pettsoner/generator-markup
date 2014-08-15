'use strict';
var util   = require('util');
var path   = require('path');
var yeoman = require('yeoman-generator');
var yosay  = require('yosay');
var chalk  = require('chalk');

var MarkupGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');

    this.on('end', function() {
      if (!this.options['skip-install']) {
        this.npmInstall();
        //this.bowerInstall();
      }
    });
  },

  askFor: function() {
    var done = this.async();

    this.log(yosay('Welcome to the Markup generator!'));

    var prompts = [{
      type: 'prompt',
      name: 'appName',
      message: 'Could you tell me the name of your new project?',
    }/*, {
      type: 'confirm',
      name: 'stylus',
      message: 'Stylus',
    }, {
      type: 'confirm',
      name: 'jade',
      message: 'Jade',
    }*/];

    this.prompt(prompts, function(answers) {
      this.appName = answers.appName;

      done();
    }.bind(this));
  },

  main: function() {
    this.mkdir('design');

    this.template('gulpfile.js', 'gulpfile.js');

    this.copy('.gitignore', '.gitignore');

    this.template('package.json', 'package.json');
  }

  source: function() {
    this.mkdir('src');

    this.mkdir('src/stylus');

    this.mkdir('src/jade');

    this.directory('jade', 'src/jade');

    this.directory('stylus', 'src/stylus');
  }, 

  dist: function() {
    this.mkdir('dist');

    this.mkdir('dist/js');

    this.mkdir('dist/js/vendor');

    this.mkdir('dist/fonts');

    this.mkdir('dist/css');

    this.mkdir('dist/img');
  }

  //this.copy('_bower.json', 'bower.json');
  //this.copy('_.bowerrc', '.bowerrc');

  /*projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }*/
});

module.exports = MarkupGenerator;