/*global module, test, asyncTest, ok, equal, tau, window */
(function(window, document) {
	"use strict";

	/**
	 * Location should be recovered after test
	 * because Page or Router changes history
	 */
	var startLocation = window.location.href;

	module("page", {
		setup: function () {
			tau.engine.run();
		},
		teardown: function () {
			tau.engine._clearBindings();
			window.history.replaceState(null, "", startLocation);
		}
	});

	function isPage(element, selector) {
		ok(!!(tau.engine.getBinding(element, 'Page')), "Page was created by selector: " + selector);
		equal(element.getAttribute('data-tau-bound'), "Page", "Page widget bound: " + selector);
	}
	test( "Page default selectors" , function () {
		isPage(document.getElementById('by-data-role'), '[data-role="page"]');
	});

}(window, window.document));