(function(window, document, APP, $, Modernizr, undefined) {
  'use strict';

  APP.promises = {

    /**
     * Device changed promise, will be executed when the device has changed
     * @return {void}
     * @sample usage:
     * APP.promises.deviceChanged.done(function(){});
     */
    deviceChanged: (function() {
      var treshold = 500,
        devicePromise = $.Deferred(),
        debounce;

      $(window).on('resize.tsb', function() {
        window.clearTimeout(debounce);
        debounce = window.setTimeout(function() {
          if (APP.settings.environment.device !== APP.events.getDevice()) {
            APP.settings.environment.device = APP.events.getDevice();
            devicePromise.resolve();
          }
        }, treshold);
      });
      //return the device promise
      return devicePromise.promise();
    })()

  };

})(this, this.document, this.APP, this.jQuery, this.Modernizr);
