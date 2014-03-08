Installation [![Build Status](https://travis-ci.org/danielhusar/frontdev-workflow.png?branch=master)](https://travis-ci.org/danielhusar/frontdev-workflow) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
============

Install node.js (http://nodejs.org/)

Install grunt cli (http://gruntjs.com/)

	sudo npm install -g grunt-cli


Install all dependencies:

	npm install
	
	
Install phantom.js

	brew update && brew install phantomjs
	


***
Mobile first
============

The whole page is mobile first, but you dont need to include respond.js for legacy browsers.

Only required mediaqueries are in style.less

Every module have small medium and large less file where you put your styles.
Always start with small.less with basic styles and than extend it with medium and large.

You can include some specific mediaqueris to fix some issues in small or medium version, but you must be sure that his doesnt affect large version, as legacy browsers will always see only non responsive large version built from this three files. (to see how it works check IE.less)

You can use something like 

	@media only screen and (max-width: 400px) {}
	
As this doesnt affect large version, but dont use something like:

	@media only screen and (min-width: 400px) {}
	
As this will affect all versions up from this and legacy browsers will break. I'am recommending to avodid custom mediaquiers as much as possible so the codebase will be as clean as possible.

Working with Grunt
==================
### Default task:
Running grunt default task will:

	grunt

- concate and unglify your javascript
- recreate sprites from all images
- compile less files
- compile all templates into static html files

After running this task you can start your webserver in public directory and your app will be ready to use.

### Predefined tasks:

This task will start a local webserver inside of public directory and open chrome with it and than it will watch for less and template changes

(**use this during the development**)

	grunt server

***

Switching between production and development environment

(this task basically just change isProduction in all relevant settings and than run grunt default task)

	grunt prod // production
	grunt dev  // development

***

Create sprites from all icons located inside icon folder.

Readme: https://github.com/Ensighten/grunt-spritesmith

You may need to install Cairo or Phantom.js: https://github.com/LearnBoost/node-canvas/wiki/Installation---OSX

	grunt sprites
	
***

Minify the images

	grunt image

***

Compile all less files

	grunt css

***
Compile all templates:

	grunt tpl

***
Lint your javascript using jshint and eslint

	grunt hint

***
Beautify your javascript (so if you are stuck with indentation js hint errors, you can run this task and it will fix it automatically)

	grunt beauty

***
Concat and uglify javascript

	grunt packjs

***
Run mocha tests tests

	grunt test
	
Validate html templates

	grunt validate


***
Create the screenshots of every page in 3 resolutuins within screenhshot directory, this will take a while, but you will have after the screenshots of whole app in all covered resolutions.
You will need to have phantom.js installed. (brew update && brew install phantomjs)

	grunt screens

***
Generate the javascript statistic by plato plugin

	grunt reports

***

