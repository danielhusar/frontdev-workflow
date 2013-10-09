'use strict';
var util = require('util');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var yeoman = require('yeoman-generator');
_.str = require('underscore.string');
_.mixin(_.str.exports());


var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    console.log('All done.');
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ModuleGenerator, yeoman.generators.Base);

ModuleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'moduleName',
      message: 'What do you want to call your module?'
    },
    {
      name: 'createSass',
      type: 'confirm',
      message: 'Do you want me to create sass files?',
      default: true
    },
    {
      name: 'createJs',
      type: 'confirm',
      message: 'Do you want me to create javascript file?',
      default: true
    },
    {
      name: 'createTpl',
      type: 'confirm',
      message: 'Do you want me to create tpl file?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.moduleName = props.moduleName;
    this.slug = _.slugify(this.moduleName);
    this.cap = _.camelize(this.moduleName.toLowerCase());

    this.createSass = props.createSass;
    this.createJs = props.createJs;
    this.createTpl = props.createTpl;

    cb();
  }.bind(this));
};


//dont overwrite existing modules
ModuleGenerator.prototype.check = function app() {
  var cssBasePath = 'sass/modules/' + this.slug;
  var tplBasePath = 'templates/modules/' + this.slug;
  var jsFile = 'public/js/modules/' + this.slug + '.js';

  if (fs.existsSync(cssBasePath) && this.createSass) {
    console.log(cssBasePath + ' directory already exits. Please pick another name');
    process.exit(1);
  }

  if (fs.existsSync(tplBasePath) && this.createTpl) {
    console.log(tplBasePath + ' directory already exits. Please pick another name');
    process.exit(1);
  }

  if (fs.existsSync(jsFile) && this.createJs) {
    console.log(jsFile + ' file already exits. Please pick another name');
    process.exit(1);
  }
}

//generators
ModuleGenerator.prototype.tpl = function app() {
  if(this.createTpl){
    var basePath = 'templates/modules/' + this.slug;
    var tplModule = this.readFileAsString(path.join(this.sourceRoot(), 'module.tpl'))
                      .replace(/{yeoman-slug}/g, this.slug);
    this.mkdir(basePath);
    this.write(basePath + '/_' + this.slug + '.tpl', tplModule);
  }
};

ModuleGenerator.prototype.css = function app() {
  if(this.createSass){
    var basePath = 'sass/modules/' + this.slug;
    var cssModule = this.readFileAsString(path.join(this.sourceRoot(), 'module.scss'))
                      .replace(/{yeoman-slug}/g, this.slug);
    this.mkdir(basePath);
    this.write(basePath + '/_small.scss', cssModule);
    this.write(basePath + '/_medium.scss', cssModule);
    this.write(basePath + '/_large.scss', cssModule);

    //link our files
    addStyle('sass/responsive/_small.scss', this.slug, 'small', this);
    addStyle('sass/responsive/_medium.scss', this.slug, 'medium', this);
    addStyle('sass/responsive/_large.scss', this.slug, 'large', this);
  }
};

ModuleGenerator.prototype.js = function app() {
  if(this.createJs){
    var basePath = 'public/js/modules/';
    var jsModule = this.readFileAsString(path.join(this.sourceRoot(), 'module.js'))
                    .replace(/{yeoman-cap}/g, this.cap)
                    .replace(/{yeoman-slug}/g, this.slug)
                    .replace(/{yeoman-name}/g, this.moduleName);
    this.write(basePath + this.slug + '.js', jsModule);
  }
};

ModuleGenerator.prototype.body = function app() {
  if(this.createTpl){
    var basePath = 'templates/base/_layout.tpl';
    var body = this.readFileAsString(basePath).replace('<!-- yeoman slug -->', '<script src="js/modules/' + this.slug + '.js"></script>\r\n    <!-- yeoman slug -->');
    fs.unlinkSync(basePath) //delete it first so yeoman will not print conflict file
    this.write(basePath, body);
  }
};

function addStyle(file, slug, type, context){
  var fileContent = context.readFileAsString(file) + '\r\n@import "modules/' + slug + '/'+ type +'";';
  fs.unlinkSync(file)
  context.write(file, fileContent);
}
