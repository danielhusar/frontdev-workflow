	(function(window, document, undefined) {
		'use strict';
		/*
		 *
		 * @namespace window
		 * Avoid `console` errors in browsers that lack a console.
		 *
		 */
		(function() {
			var method;
			var noop = function() {};
			var methods = [
				'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
				'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
				'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
				'timeStamp', 'trace', 'warn'
			];
			var length = methods.length;
			var console = (window.console = window.console || {});

			while (length--) {
				method = methods[length];

				// Only stub undefined methods.
				if (!console[method]) {
					console[method] = noop;
				}
			}
		}());

		/*
		 *
		 * Add indexOf to array prototype for <IE9
		 *
		 */
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function(elt /*, from*/ ) {
				var len = this.length >>> 0;

				var from = Number(arguments[1]) || 0;
				from = (from < 0) ? Math.ceil(from) : Math.floor(from);
				if (from < 0)
					from += len;

				for (; from < len; from++) {
					if (from in this &&
						this[from] === elt)
						return from;
				}
				return -1;
			};
		}


		/**
		 * Placeholder plugin
		 */
		/*! http://mths.be/placeholder v2.0.7 by @mathias */
		(function(window, document, $) {

			var isInputSupported = 'placeholder' in document.createElement('input');
			var isTextareaSupported = 'placeholder' in document.createElement('textarea');
			var prototype = $.fn;
			var valHooks = $.valHooks;
			var propHooks = $.propHooks;
			var hooks;
			var placeholder;

			if (isInputSupported && isTextareaSupported) {

				placeholder = prototype.placeholder = function() {
					return this;
				};

				placeholder.input = placeholder.textarea = true;

			} else {

				placeholder = prototype.placeholder = function() {
					var $this = this;
					$this
						.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
						.not('.placeholder')
						.bind({
							'focus.placeholder': clearPlaceholder,
							'blur.placeholder': setPlaceholder
						})
						.data('placeholder-enabled', true)
						.trigger('blur.placeholder');
					return $this;
				};

				placeholder.input = isInputSupported;
				placeholder.textarea = isTextareaSupported;

				hooks = {
					'get': function(element) {
						var $element = $(element);

						var $passwordInput = $element.data('placeholder-password');
						if ($passwordInput) {
							return $passwordInput[0].value;
						}

						return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
					},
					'set': function(element, value) {
						var $element = $(element);

						var $passwordInput = $element.data('placeholder-password');
						if ($passwordInput) {
							return $passwordInput[0].value = value;
						}

						if (!$element.data('placeholder-enabled')) {
							return element.value = value;
						}
						if (value == '') {
							element.value = value;
							// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
							if (element != document.activeElement) {
								// We can't use `triggerHandler` here because of dummy text/password inputs :(
								setPlaceholder.call(element);
							}
						} else if ($element.hasClass('placeholder')) {
							clearPlaceholder.call(element, true, value) || (element.value = value);
						} else {
							element.value = value;
						}
						// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
						return $element;
					}
				};

				if (!isInputSupported) {
					valHooks.input = hooks;
					propHooks.value = hooks;
				}
				if (!isTextareaSupported) {
					valHooks.textarea = hooks;
					propHooks.value = hooks;
				}

				$(function() {
					// Look for forms
					$(document).delegate('form', 'submit.placeholder', function() {
						// Clear the placeholder values so they don't get submitted
						var $inputs = $('.placeholder', this).each(clearPlaceholder);
						setTimeout(function() {
							$inputs.each(setPlaceholder);
						}, 10);
					});
				});

				// Clear placeholder values upon page reload
				$(window).bind('beforeunload.placeholder', function() {
					$('.placeholder').each(function() {
						this.value = '';
					});
				});

			}

			function args(elem) {
				// Return an object of element attributes
				var newAttrs = {};
				var rinlinejQuery = /^jQuery\d+$/;
				$.each(elem.attributes, function(i, attr) {
					if (attr.specified && !rinlinejQuery.test(attr.name)) {
						newAttrs[attr.name] = attr.value;
					}
				});
				return newAttrs;
			}

			function clearPlaceholder(event, value) {
				var input = this;
				var $input = $(input);
				if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
					if ($input.data('placeholder-password')) {
						$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
						// If `clearPlaceholder` was called from `$.valHooks.input.set`
						if (event === true) {
							return $input[0].value = value;
						}
						$input.focus();
					} else {
						input.value = '';
						$input.removeClass('placeholder');
						input == document.activeElement && input.select();
					}
				}
			}

			function setPlaceholder() {
				var $replacement;
				var input = this;
				var $input = $(input);
				var id = this.id;
				if (input.value == '') {
					if (input.type == 'password') {
						if (!$input.data('placeholder-textinput')) {
							try {
								$replacement = $input.clone().attr({
									'type': 'text'
								});
							} catch (e) {
								$replacement = $('<input>').attr($.extend(args(this), {
									'type': 'text'
								}));
							}
							$replacement
								.removeAttr('name')
								.data({
									'placeholder-password': $input,
									'placeholder-id': id
								})
								.bind('focus.placeholder', clearPlaceholder);
							$input
								.data({
									'placeholder-textinput': $replacement,
									'placeholder-id': id
								})
								.before($replacement);
						}
						$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
						// Note: `$input[0] != input` now!
					}
					$input.addClass('placeholder');
					$input[0].value = $input.attr('placeholder');
				} else {
					$input.removeClass('placeholder');
				}
			}

			//call it
			$('input, textarea').placeholder();

		}(this, document, jQuery));


	})(this, this.document);

;(function(window, document, $, Modernizr, undefined) {
  'use strict';

  var Application = function() {
    this.modules = {};
    this.instances = {};
    this.promises = {};
    this.events = {};
  };

  var APP = window.APP = new Application();

  /**
   * Defining named conditions to be used by Application.isDevice
   *
   * @namespace APP
   */
  Application.prototype.device = {
    'large': function() {
      return !Modernizr.mq('only all') || Modernizr.mq('only screen and (min-width: 1025px)');
    },
    'medium': function() {
      return (!Application.prototype.device.large()) && Modernizr.mq('only screen and (min-width: 569px)');
    },
    'small': function() {
      return !(Application.prototype.device.medium() || Application.prototype.device.large());
    }
  };

  /**
   * Function that will execute callback only for specific device
   * Especially useful for executing some for mobile only, tablets only, IE only etc.
   *
   * Sample Usage:
   *
   *   this.isDevice('small', callback);   // => V will run the callback  (just for the small)
   *   this.isDevice('medium', callback);  // => V will run the callback  (just for the medium)
   *   this.isDevice('large', callback);   // => V will run the callback  (just for the large)
   *
   *
   * @param     {Anything}  condition   device to match
   * @param     {Function}  callback    Callback to be triggered when conditions return true
   * @return    {Object}                this
   */
  Application.prototype.isDevice = function(condition, callback) {
    if (Application.prototype.device[condition]()) {
      callback();
    }
    return this;
  };


  /**
   * Check if we are on particular page according to body id
   *
   *
   * this.page('home', function(){
   *   ...
   * });
   * @param     {string, object} page   Page name or array of pages where code should be executed
   * @param     {Function}  callback    Callback to be triggered when conditions return true
   * @return    {Object}                this
   */
  Application.prototype.page = function(page, callback) {

    var pageId = $('body').attr('id').replace('page-', '');

    if ((typeof page === 'string' && pageId === page) || (typeof page === 'object' && page.indexOf(pageId) !== -1)) {
      Application.prototype.log('%c Executing scripts for: ' + pageId, APP.settings.console.css);
      callback();
    }
    return this;
  };


  /**
   * Console log function, it logs only on development enviroment
   * @return {void}
   */
  Application.prototype.log = function() {
    var args;

    if (window.APP.settings && window.APP.settings.environment && !window.APP.settings.environment.isProduction) {
      if (window.console && window.console.log && window.console.log.apply) {
        args = Array.prototype.slice.call(arguments);
        window.console.log.apply(window.console, args);
      }
    }
  };

  /**
   * Return the prefixed version of the css statment
   * @param  {string} method css method
   * @return {string} prefixed method if exist, or the same method of preixed not avaiable
   */
  Application.prototype.prefix = function(method) {
    var transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'otransitionend',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    };
    if (method === 'transitionEnd') {
      return transEndEventNames[Modernizr.prefixed('transition')];
    } else {
      method = Modernizr.prefixed(method) ? Modernizr.prefixed(method) : method;
      return method.replace(/([A-Z])/g, function(str, m1) {
        return '-' + m1.toLowerCase();
      }).replace(/^ms-/, '-ms-');
    }

  };


  /**
   * Apply formatting options to the string. This will look for occurrences
   * of %@ in your string and substitute them with the arguments you pass into
   * this method.  If you want to control the specific order of replacement,
   * you can add a number after the key as well to indicate which argument
   * you want to insert.
   *
   * Ordered insertions are most useful when building loc strings where values
   * you need to insert may appear in different orders.
   *
   *
   * Sample Usage:
   *
   *   Application.fmt('Hello %@ %@',    'John', 'Doe') // => 'Hello John Doe'
   *   Application.fmt('Hello %@2, %@1', 'John', 'Doe') // => 'Hello Doe, John'
   *
   *
   * @namespace APP
   *
   * @param  {String}     string  String to be formatted
   * @param  {String...}  *args   Strings to be passed into @string param
   * @return {String}             Formatted string
   */
  Application.prototype.fmt = function(string) {
    var formats;
    var index;

    // Words to fill the string should be all arguments but first
    formats = Array.prototype.slice.call(arguments, 1);

    // first, replace any ORDERED replacements.
    index = 0; // the current index for non-numerical replacements

    return string.replace(/%@([0-9]+)?/g, function(match, argumentIndex) {
      argumentIndex = (argumentIndex) ? parseInt(argumentIndex, 10) - 1 : index++;
      match = formats[argumentIndex];

      return ((match === null) ? '(null)' : (match === undefined) ? '' : match).toString();
    });
  };


})(this, this.document, this.jQuery, this.Modernizr);

;(function(window, document, APP, $, undefined) {
  'use strict';

  APP.settings = {
    environment: {
      isProduction: false,
      device: 'small' //device, can be: desktop, tablet, mobile. The version is set up on init, but mobile is default.
    },
    console: {
      css: 'color: #7E7E7E; font-style: italic;'
    }
  };

})(this, this.document, this.APP, this.jQuery);

;(function(window, document, APP, $, Modernizr, undefined) {
  'use strict';

  APP.promises = {

    /**
     * Device changed promise, will be executed when the device has changed
     * @return {void}
     * @sample usage:
     * APP.promises.deviceChanged.small.done(function(){});
     */
    deviceChanged: (function() {
      var treshold = 500,
        devicePromise,
        debounce;

      devicePromise = {
        small: $.Deferred(),
        medium: $.Deferred(),
        large: $.Deferred()
      };

      $(window).on('resize.app', function() {
        window.clearTimeout(debounce);
        debounce = window.setTimeout(function() {
          if (APP.settings.environment.device !== APP.events.getDevice()) {
            APP.settings.environment.device = APP.events.getDevice();
            devicePromise[APP.settings.environment.device].resolve();
          }
        }, treshold);
      });
      //return the device promise
      return {
        small: devicePromise.small.promise(),
        medium: devicePromise.medium.promise(),
        large: devicePromise.large.promise()
      };
    })()

  };

})(this, this.document, this.APP, this.jQuery, this.Modernizr);

;(function(window, document, APP, $, Modernizr, undefined) {
  'use strict';

  APP.events = {

    /**
     * Get the current device which is viewing the page
     * @return {string} device name
     */
    getDevice: function() {
      var device = '';
      APP.isDevice('small', function() {
        device = 'small';
      });
      APP.isDevice('medium', function() {
        device = 'medium';
      });
      APP.isDevice('large', function() {
        device = 'large';
      });
      return device;
    },

    /**
     * Lazy load image
     * @return {void}
     */
    lazyLoad: function() {
      $('img[data-src]').lazyLoad(200, function() {
        $(this).css('opacity', 1);
        APP.log('%c ' + $(this).attr('alt') + ' image lazy loaded', APP.settings.console.css);
      });
    },

    /**
     * Log the versions of the used plugins
     * @return {void}
     */
    logs: function() {
      APP.log('%c jQuery version used: ' + $.fn.jquery, APP.settings.console.css);
      APP.log('%c Modernizr version used: ' + Modernizr._version, APP.settings.console.css);
      APP.log('%c ----------------------------', APP.settings.console.css);

      //promises
      APP.promises.deviceChanged.small.done(function() {
        APP.log('%c Executing promises for small device.', APP.settings.console.css);
      });
      APP.promises.deviceChanged.medium.done(function() {
        APP.log('%c Executing promises for medium device.', APP.settings.console.css);
      });
      APP.promises.deviceChanged.large.done(function() {
        APP.log('%c Executing promises for large device.', APP.settings.console.css);
      });
    }

  };

})(this, this.document, this.APP, this.jQuery, this.Modernizr);

;(function(window, document, APP, $, undefined) {
  'use strict';

  //all init triggers
  APP.init = function() {

    //log the versions of libraries
    APP.events.logs();

    //store device
    APP.settings.environment.device = APP.events.getDevice();

    //mobile inits
    APP.isDevice('small', function() {
      APP.log('%c small version', APP.settings.console.css);
    });

    //tablet inits
    APP.isDevice('medium', function() {
      APP.log('%c medium version', APP.settings.console.css);
    });

    //desktop inits
    APP.isDevice('large', function() {
      APP.log('%c large version', APP.settings.console.css);
    });


    //global inits
    APP.events.lazyLoad();

    //page custom inits

    //Homepage
    APP.page('home', function() {
      //APP.instances.myModule = new APP.modules.myModule();
    });

  };

  //initial init
  APP.init();

})(this, this.document, this.APP, this.jQuery);
