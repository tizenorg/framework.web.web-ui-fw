/*global window, define, HTMLElement */
/*jslint plusplus: true, nomen: true */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #jQuery Mobile mapping router
 * Object maps router from TAU namespace to jQuery Mobile namespace.
 * @class ns.jqm.router
 */
(function (window, document, ns, $) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../core/engine",
			"../core/util/path",
			"../profile/mobile/router/urlHistory",
			"./namespace"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");

			var engine = ns.engine;
			ns.jqm.router = {
				/**
				 * Enables support jQM before router init.
				 * @method beforeinit
				 * @member ns.jqm.router
				 */
				beforeinit: function () {
					var container,
						router = engine.getRouter();
					if ($) {
						if ($.mobile) {
							if ($.mobile.pageContainer) {
								container = $.mobile.pageContainer;
								if (container instanceof $) {
									container = container[0];
								}
								if (!container instanceof HTMLElement) {
									container = document.body;
								}
								ns.setConfig('container', container);
								$.mobile.pageContainer = $(container);
								router.setContainer(container);
							}
							if ($.mobile.autoInitializePage !== undefined) {
								ns.setConfig('autoInitializePage', $.mobile.autoInitializePage);
							}
							if ($.mobile._bindPageRemove !== undefined) {
								ns.setConfig('_bindPageRemove', $.mobile._bindPageRemove);
							}
							$.mobile.changePage = function (toPage, options) {
								var htmlElementToPage;
								if (toPage instanceof $) {
									htmlElementToPage = $(toPage).get(0);
									return router.open(htmlElementToPage, options);
								}
								return router.open(toPage, options);
							};
							document.addEventListener('pageshow', function (ev) {
								$.mobile.activePage = $(ev.target);
							}, true);
							$.mobile.firstPage = $(router.getFirstPage());
							$.mobile.pageContainer = $(router.getContainer());
							$.mobile.subPageUrlKey = ns.widget.mobile.Page.classes.uiPage;
							$.mobile.ajaxEnabled = true;
							$.mobile.hashListeningEnabled = true;
							$.mobile.linkBindingEnabled = true;
							$.mobile.maxTransitionWidth = false;
							$.mobile.minScrollBack = 250;
							$.mobile.touchOverflowEnabled = false;
							$.mobile.defaultDialogTransition = 'pop';
							$.mobile.pageLoadErrorMessage = "Error Loading Page";
							$.mobile.pageLoadErrorMessageTheme = 'e';
							$.mobile.phonegapNavigationEnabled = false;
							$.mobile.autoInitializePage = false;
							$.mobile.pushStateEnabled = true;
							$.mobile.ignoreContentEnabled = false;
							$.mobile.orientationChangeEnabled = true;
							$.mobile.ajaxBlacklist = false;
							$.mobile.defaultTransitionHandler = null;
							$.mobile.transitionHandlers = {};
							$.mobile.transitionFallbacks = {};
							$.mobile._maybeDegradeTransition = null;
							$.mobile.focusPage = null;
							$.mobile.urlHistory = ns.router.urlHistory;
							$.mobile.dialogHashKey = "&ui-state=dialog";
							$.mobile.allowCrossDomainPages = false;
							$.mobile.getDocumentUrl = ns.util.path.getDocumentUrl;
							$.mobile.getDocumentBase = ns.util.path.getDocumentBase;
							$.mobile._bindPageRemove = null;
							$.mobile.loadPage = router.loadPage === undefined ? ns.error.bind(null, 'router PageExternal is not loaded') : router.loadPage.bind(router);
							$.mobile.navreadyDeferred = router.navreadyDeferred;
							$.mobile.initializePage = null;
							$.mobile._handleHashChange = router._hashChangeHandler;
						} else {
							$.mobile = {};
						}
					}
				},
				/**
				 * Enables support jQM after router init.
				 * @method init
				 * @member ns.jqm.router
				 */
				init: function () {
					var transitions,
						name,
						container,
						router = engine.getRouter();
					if ($) {
						$.mobile.defaultPageTransition = "none";

						if (router.getTransitions) {
							transitions = router.getTransitions();
							for (name in transitions) {
								if (transitions.hasOwnProperty(name)) {
									if (transitions[name].fallback !== undefined) {
										$.mobile.transitionFallbacks[name] = transitions[name].fallback;
									}
									if (transitions[name].handler !== undefined) {
										$.mobile.transitionHandlers[name] = transitions[name].handler;
									}
								}
							}
							$.mobile.defaultTransitionHandler = transitions.sequential.handler;
							$.mobile._maybeDegradeTransition = router._maybeDegradeTransition.bind(router);
							$.mobile.getMaxScrollForTransition = router.getMaxScrollForTransition.bind(router);
						}

						$.mobile.focusPage = function (toPage) {
							var page = $(toPage)[0],
								pageWidget = engine.getBinding(page);
							pageWidget.focus();
						};

						$.mobile._bindPageRemove = $.mobile._bindPageRemove || router._bindPageRemove.bind(router);
						$.mobile.initializePage = router.init.bind(router);
						container = router.getContainer();
						$.mobile.pageContainer = $(container);
					}
				}
			};
			document.addEventListener("routerinit", function (evt) {
				ns.jqm.router.init();
			}, false);
			document.addEventListener("beforerouterinit", function (evt) {
				ns.jqm.router.beforeinit();
			}, false);
			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return ns.jqm;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window, window.document, ns, ns.jqm.jQuery));
