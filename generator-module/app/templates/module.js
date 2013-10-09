(function(window, document, $, undefined) {
	'use strict';

	/**
	 * Main module class
	 * @param  {object} settings Settings object that will rewite the defaults
	 */
	var module = function(settings) {
		//default settings
		var defaults = {
			$wrapper: TSB.moduleWrap('{yeoman-slug}')
		};

		//properties
		this.settings = $.extend(defaults, settings);
		this.$wrapper = this.settings.$wrapper; //shortcut to wrapper

		//init functions
		this.pluginEvents();
		this.validate();

		//log that our module is running
		TSB.log('%c {yeoman-name} module init', TSB.settings.console.css);
	};

	/**
	 * All jquery bindings
	 * @return {void}
	 */
	module.prototype.pluginEvents = function() {
		var that = this;
	};

	/**
	 * Validation rules
	 * @return {void}
	 */
	module.prototype.validate = function() {
		var that = this;
	};

	//add our module
	TSB.modules.{yeoman-cap} = module;

})(this, this.document, this.jQuery);