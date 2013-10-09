var expect = chai.expect,
		should = chai.should();


describe('TSB', function() {

	describe('Globals', function() {
		it('Libraries tests.', function () {
			$.should.be.a('function');
			$.fn.jquery.should.be.above('2.0');
			Modernizr.should.be.a('object');
		});

		it('Prototypes exists.', function () {
			TSB.should.be.a('object');
			TSB.device.should.be.a('object');
			TSB.isDevice.should.be.a('function');
			TSB.log.should.be.a('function');
			TSB.prefix.should.be.a('function');
			TSB.fmt.should.be.a('function');
		});

		it('FMT is working.', function () {
			TSB.fmt("test%@1%@2", 1, 2).should.equal('test12');
		});
	});

	describe('Settings', function() {
		it('We should be on development environment.', function () {
			TSB.settings.environment.isProduction.should.equal(false);
		});
		it('We should be using large version.', function () {
			//we run it through browser
			if(window.outerWidth > 1) { 
				TSB.settings.environment.device.should.equal('large');
			//we run it through grunt
			} else { 
				TSB.settings.environment.device.should.equal('small');
			}
		});
	})


	describe('Events', function() {
		it('Events object exists.', function () {
			TSB.events.should.be.a('object');
		});
	});

	describe('Modules', function() {
		it('Modules object exists.', function () {
			TSB.modules.should.be.a('object');
		});
	});

});