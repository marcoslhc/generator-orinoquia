/*
    app/index.js is the main file in the generator project. Everything starts
    here. From here the sky is the limit. This is just JavaScript in Node.js
    Basically this files expose a method that build a generator object that inherits
    from yeoman.generators.Base and yeoman.generators.NamedBase.
    Then a series of functions are given to the generator object prototype, this
    functions will be excecuted in this order when the generator is called
*/
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var OrinoquiaGenerator = module.exports = function OrinoquiaGenerator(args, options, config) {
    /*
        this modules exposes a function that works as an object builder.
        The object is your Generator.
        This Generator inherits from 2 other objects. The first beign
        yeoman.generators.Base
    */
  yeoman.generators.Base.apply(this, arguments);
  /*
      The generator accepts is a event emmiter. This means it can send signals
      to the system in particular events.
      in this case, when the generator ends executing all the functions
      you've created below,proceeds to execute installDependencies() which like
      the name says install the required npm packages.
  */
  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  /*
      Finally 
  */
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  this.config = JSON.parse(this.readFileAsString(path.join(__dirname,'config.json')))
};

util.inherits(OrinoquiaGenerator, yeoman.generators.NamedBase);

OrinoquiaGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =

  console.log(welcome);

  var prompts = [{
    name: 'siteName',
    message: 'How\'s your site named:',
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.siteName = props.siteName

    cb();
  }.bind(this));
};

OrinoquiaGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/images');
  this.mkdir('app/less');
  this.mkdir('app/css');

  this.template('_package.json' ,'package.json'           );
  this.template('_bower.json'   ,'bower.json'             );
  this.template('_index.html'   ,'app/index.html'         );
  this.template('_config.js'    ,'app/scripts/config.js'  );
  this.template('gruntfile.js'  ,'gruntfile.js'           );       
                                                         
  this.copy('bowerrc'           ,'app/.bowerrc'               );
  this.copy('.htaccess'         ,'app/.htaccess'          );
  this.copy('404.html'          ,'app/404.html'           );
  this.copy('crossdomain.xml'   ,'app/crossdomain.xml'    );
  this.copy('favicon.ico'       ,'app/favicon.ico'        );
  this.copy('humans.txt'        ,'app/humans.txt'         );
  this.copy('main.js'           ,'app/scripts/main.js'    );
  this.copy('normalize.css'     ,'app/css/normailize.css' );
  this.copy('main.css'          ,'app/css/main.css'       );

  this.installDependencies();
};

OrinoquiaGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
