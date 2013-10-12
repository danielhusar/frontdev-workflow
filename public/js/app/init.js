(function(window, document, $, undefined) {
  'use strict';

  //all init triggers
  TSB.init = function() {

    //log the versions of libraries
    TSB.events.versions();

    //store device
    TSB.settings.environment.device = TSB.events.getDevice();

    //mobile inits
    TSB.isDevice('small', function() {
      TSB.log('%c small version', TSB.settings.console.css);
    });

    //tablet inits
    TSB.isDevice('medium', function() {
      TSB.log('%c medium version', TSB.settings.console.css);
    });

    //desktop inits
    TSB.isDevice('large', function() {
      TSB.log('%c large version', TSB.settings.console.css);
    });


    //global inits
    TSB.events.lazyLoad();

    //page custom inits

    //Homepage
    TSB.page('home', function() {
      //TSB.instances.myModule = new TSB.modules.myModule();
    });

  };

  //initial init
  TSB.init();

})(this, this.document, this.jQuery);
