(function(window, document, $, undefined) {
  'use strict';

  TSB.settings = {
    environment: {
      isProduction: false,
      device: 'small' //device, can be: desktop, tablet, mobile. The version is set up on init, but mobile is default.
    },
    console: {
      css: 'color: #7E7E7E; font-style: italic;'
    }
  };

})(this, this.document, this.jQuery);
