(function(window, document, $, Modernizr, undefined) {
  'use strict';

  TSB.events = {

    /**
     * Get the current device which is viewing the page
     * @return {string} device name
     */
    getDevice: function() {
      var device = '';
      TSB.isDevice('small', function() {
        device = 'small';
      });
      TSB.isDevice('medium', function() {
        device = 'medium';
      });
      TSB.isDevice('large', function() {
        device = 'large';
      });
      return device;
    },

    /**
     * Lazy load image
     * @return {void}
     */
    lazyLoad: function() {
      $("img[data-src]").lazyLoad(200, function() {
        $(this).css('opacity', 1);
        TSB.log('%c ' + $(this).attr('alt') + ' image lazy loaded', TSB.settings.console.css);
      });
    },


    /**
     * Log the versions of the used plugins
     * @return {void}
     */
    versions: function() {
      TSB.log('%c jQuery version used: ' + $.fn.jquery, TSB.settings.console.css);
      TSB.log('%c Modernizr version used: ' + Modernizr._version, TSB.settings.console.css);
      TSB.log('%c ----------------------------', TSB.settings.console.css);
    }

  };

})(this, this.document, this.jQuery, this.Modernizr);
