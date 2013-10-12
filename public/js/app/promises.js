(function(window, document, $, Modernizr, undefined) {
  'use strict';

  TSB.promises = {

    /**
     * Device changed promise, will be executed when the device has changed
     * @return {void}
     * @sample usage:
     * TSB.promises.deviceChanged.done(function(){});
     */
    deviceChanged: (function() {
      var treshold = 500,
        devicePromise = $.Deferred(),
        debounce;

      $(window).on('resize.tsb', function() {
        window.clearTimeout(debounce);
        debounce = window.setTimeout(function() {
          if (TSB.settings.environment.device !== TSB.events.getDevice()) {
            TSB.settings.environment.device = TSB.events.getDevice();
            devicePromise.resolve();
          }
        }, treshold);
      });
      //return the device promise
      return devicePromise.promise();
    })()

  };

})(this, this.document, this.jQuery, this.Modernizr);
