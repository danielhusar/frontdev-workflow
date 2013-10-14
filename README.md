Autor: Daniel Husar

Installation
============

Install node.js (http://nodejs.org/)

Install grunt globally by running (http://gruntjs.com/)

	sudo npm install -g grunt-cli


Install all dependencies:

	sudo npm install


***

Working with Grunt
==================
### Default task:
Running grunt default task will:

	grunt

- concate and unglify your javascript
- compile less files
- compile all templates into static html files

After running this task you can start your webserver in public directory and your app will be ready to use.

### Predefined tasks:

This task will start a local webserver inside of public directory and open chrome with it and than ti will watch for less and template changes 

(**use this during the development**)

	grunt server

***

Switching between production and development environment

(this task basically just change isProduction in all relevant settings and than run grunt default task)

	grunt prod // production
	grunt dev  // development

***

Compile all less files
```javascript
grunt css
```
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

***	
Create the screenshots of every page in 3 resolutuins within screenhshot directory, this will take a while, but you will have after the screenshots of whole app in all covered resolutions

	grunt screens

***
Generate the javascript statistic by plato plugin

	grunt reports

***

Coding standards
================
### Html
-	swig as a template engine (http://paularmstrong.github.io/swig/)

### Css

- Every module need to have small, medium and large scss file (even if its empty)
- Every module must be in its namespace
- Dashes in class names
- Only allowed mediaqueries are in style.scss
- Don't use css hacks to target IE browsers, use lt- classes instead
- Don't use px in font sizes, use always em, and tried to avoid to use px at minimum (use percentage rather in elements)
- Don't use prefixed css3 styles, use css3 compass, or create a mixin
- Don't use IDS or !important
- If you think your functionality can be reused, include it in components

### Javascript

- Every module need to be in module directory
- Lint and beautify you code before submitting! (grunt)
- Use the current module structure of file (use yeoman to create new module)
- 2 spaces indentation
- Only global objects are APP and TSB so please don't create any other
- Always use "on" for binding events (dont use click..)
- Every bind events must have namespace: tsb ( elem.on('click.tsb', function(){}) )
- Dont use classes or ids for selectors, use data attributes instead
- For calling global functions, always call it with window.function.. so not setInterval but window.setInterval
- For most possible cases use css transitions instead of jQuery animations, or use jQuery animations just as fallback
- Don't include respond.js, css3-mediaqueries.js or any js library that parses the css with ajax call
- Don't modify object you don't own, so don't prototype to any javascript core objects
- Single quotes
- Install docblockr (https://tutsplus.com/lesson/docblockr/) or any other plugin to your favorite IDE and comment everything
- Keep things simple :)

Creating a new module
=====================
For easy module creation there is a yeoman module task that can do all the work for you.
First you need to install yeoman globally.

	sudo npm install -g yo
	
Than you need to link the generator by running:

	sudo cd generator-module && npm link && cd ..
	
After that you will have linked module generator.
Now you can run this command:

	yo module
	
And it will ask you for module name and create and link all the proper files required for single module.
