/*global window, define, console */
/*jslint plusplus: true, nomen: true */
/*
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #jQuery Mobile mapping engine
 * Object maps engine object from TAU namespace to jQuery Mobile namespace.
 * @class ns.jqm.engine
 */
(function (window, document, ns, $) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"./namespace",
			"../core/engine",
			"../core/util/selectors",
			"../core/util/globalize",
			"../core/util/object",
			"../core/event",
			"../core/util/zoom",
			"../core/util/load",
			"../core/frameworkData"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");
			/**
			* Alias to Array.slice function
			* @method slice
			* @member ns.jqm.engine
			* @private
			* @static
			*/
			var slice = [].slice,
				/**
				* @property {Object} nsNormalizeDict directory of data-* attributes normalized name
				* @member ns.jqm.engine
				* @private
				* @static
				*/
				nsNormalizeDict = {},
				util = ns.util,
				zoom = util.zoom,
				events = ns.event,
				load = util.load,
				utilsObject = util.object,
				engine = ns.engine;

			function widgetFunction(parentarguments, mapItem, engine, name) {
				var args = slice.call(parentarguments).map(mapItem);
				engine[name].apply(engine, args);
			}

			ns.jqm.engine = {
				/**
				* append ns functions to jQuery Mobile namespace
				* @method init
				* @param {Object} engine ns.engine class
				* @member ns.jqm.engine
				* @static
				*/
				init: function () {
					var keys = Object.keys(engine),
						i,
						len,
						name,
						/*
						* original jQuery find function
						* type function
						*/
						oldFind,
						/*
						* regular expression to find data-{namespace}-attribute
						*/
						jqmDataRE = /:jqmData\(([^)]*)\)/g, // @TODO fix, insecure (jslint)
						/*
						* string to detect exists jqmData selector
						*/
						jqmDataStr = ':jqmData',
						/*
						* map item to jQuery
						*/
						mapItem = function (item) {
							if (typeof item === "object" && item.selector && item.get) {
								return item.length === 1 ? item.get(0) : item.toArray();
							}

							return item;
						},
						tizen;

					if ($) {

						for (i = 0, len = keys.length; i < len; ++i) {
							name = keys[i];
							$[name] = widgetFunction.bind(null, arguments, mapItem, engine, name);
						}

						utilsObject.merge($.mobile, {
							/*
							* jQuery Mobile namespace
							*/
							ns: "",
							/**
							 *
							 * @param prop
							 * @returns {?string}
							 */
							nsNormalize: function (prop) {
								if (!prop) {
									return null;
								}
								nsNormalizeDict[prop] = nsNormalizeDict[prop] || $.camelCase($.mobile.ns + prop);
								return nsNormalizeDict[prop];
							},
							activeBtnClass : ns.widget.core.Button.classes.uiBtnActive,
							activePageClass : ns.widget.mobile.Page.classes.uiPageActive,
							focusClass : ns.widget.core.Button.classes.uiFocus,
							version: "1.2.0",
							getAttrFixed: function (element, key) {
								var value = element.getAttribute(key);

								return value === "true" ? true :
										value === "false" ? false :
												value === null ? undefined :
														value;
							},
							path: ns.util.path,
							back : window.history.back.bind(window.history),
							silentScroll: function ( ypos ) {
								if ( ypos === undefined ) {
									ypos = $.mobile.defaultHomeScroll;
								}

								// prevent scrollstart and scrollstop events
								// @TODO enable event control
								//ns.event.special.scrollstart.enabled = false;

								setTimeout( function() {
									window.scrollTo( 0, ypos );
									events.trigger(document, "silentscroll", { x: 0, y: ypos });
								}, 20 );

								setTimeout( function() {
									// @TODO enable event control
									//$.event.special.scrollstart.enabled = true;
								}, 150 );
							},
							nsNormalizeDict: nsNormalizeDict,
							getInheritedTheme : ns.theme.getInheritedTheme,
							closestPageData: function (target) {
								var page = ns.util.selectors.getClosestBySelector($(target)[0],
												"[data-" + ($.mobile.ns || "") + "role='page'], [data-" + ($.mobile.ns || "") + "role='dialog']");
								return ns.engine.instanceWidget(page, 'Page');
							},
							enhanceable: function ( $set ) {
								return this.haveParents( $set, "enhance" );
							},
							hijackable: function ( $set ) {
								return this.haveParents( $set, "ajax" );
							},
							haveParents: function ( $set, attr ) {
								if ( !$.mobile.ignoreContentEnabled ) {
									return $set;
								}

								var count = $set.length,
									$newSet = $(),
									e,
									$element,
									excluded,
									i,
									c;

								for (i = 0; i < count; i++ ) {
									$element = $set.eq( i );
									excluded = false;
									e = $set[ i ];

									while ( e ) {
										c = e.getAttribute ? e.getAttribute( "data-" + $.mobile.ns + attr ) : "";

										if ( c === "false" ) {
											excluded = true;
											break;
										}

										e = e.parentNode;
									}

									if ( !excluded ) {
										$newSet = $newSet.add( $element );
									}
								}

								return $newSet;
							},
							getScreenHeight: function () {
								// Native innerHeight returns more accurate value for this across platforms,
								// jQuery version is here as a normalized fallback for platforms like Symbian
								return window.innerHeight;
							},
							widget: function () {
								// @todo fill data
								return null;
							},
							media: ns.support.media,
							browser: {},
							gradeA: function () {
								// @todo fill data
								return null;
							},
							zoom: zoom,
							popupwindow: {}
						});
						$.mobile.buttonMarkup = $.mobile.buttonMarkup || ns.widget.mobile.Button;
						$.mobile.$window = $(window);
						$.mobile.$document = $(document);
						$.mobile.keyCode = {
							ALT: 18,
							BACKSPACE: 8,
							CAPS_LOCK: 20,
							COMMA: 188,
							COMMAND: 91,
							COMMAND_LEFT: 91, // COMMAND
							COMMAND_RIGHT: 93,
							CONTROL: 17,
							DELETE: 46,
							DOWN: 40,
							END: 35,
							ENTER: 13,
							ESCAPE: 27,
							HOME: 36,
							INSERT: 45,
							LEFT: 37,
							MENU: 93, // COMMAND_RIGHT
							NUMPAD_ADD: 107,
							NUMPAD_DECIMAL: 110,
							NUMPAD_DIVIDE: 111,
							NUMPAD_ENTER: 108,
							NUMPAD_MULTIPLY: 106,
							NUMPAD_SUBTRACT: 109,
							PAGE_DOWN: 34,
							PAGE_UP: 33,
							PERIOD: 190,
							RIGHT: 39,
							SHIFT: 16,
							SPACE: 32,
							TAB: 9,
							UP: 38,
							WINDOWS: 91 // COMMAND
						};
						$.tizen = $.tizen || {};
						tizen = $.tizen;
						tizen.loadCustomGlobalizeCulture = ns.util.globalize.loadCustomGlobalizeCulture.bind(ns.util.globalize);
						$.mobile.tizen = utilsObject.merge($.mobile.tizen, {
							_widgetPrototypes: {},
							disableSelection : function (elements) {
								$(elements).each(function () {
									ns.theme.enableSelection(this, 'none');
								});
							},
							enableSelection : function (elements, value) {
								$(elements).each(function () {
									ns.theme.enableSelection(this, value);
								});
							},
							enableContextMenu: function (elements) {
								$(elements).each(function () {
									ns.theme.enableContextMenu(this);
								});
							},
							disableContextMenu: function (elements) {
								$(elements).each(function () {
									ns.theme.disableContextMenu(this);
								});
							}
						});
						$.mobile.tizen.loadPrototype = null;

						/*
						* jqmData function from jQuery Mobile
						*/
						$.fn.jqmData = function (prop, value) {
							var result;
							if (prop !== undefined) {
								if (prop) {
									prop = $.mobile.nsNormalize(prop);
								}
								if (arguments.length < 2 || value === undefined) {
									result = this.data(prop);
								} else {
									result = this.data(prop, value);
								}
							}
							return result;
						};

						$.fn.jqmRemoveData = function (prop) {
							if (prop !== undefined) {
								if (prop) {
									prop = $.mobile.nsNormalize(prop);
								}
								this.removeData(prop);
							}
							return this;
						};

						$.jqmData = function (context, prop, value) {
							var result = $(context).jqmData(prop, value);
							return value || result;
						};

						$.jqmRemoveData = function (context, prop) {
							$(context).jqmRemoveData(prop);
						};

						$.fn.removeWithDependents = function() {
							$.removeWithDependents( this );
						};

						$.removeWithDependents = function( elem ) {
							var $elem = $( elem );

							( $elem.jqmData( 'dependents' ) || $() ).remove();
							$elem.remove();
						};

						$.fn.addDependents = function( newDependents ) {
							$.addDependents( $( this ), newDependents );
						};

						$.addDependents = function( elem, newDependents ) {
							var dependents = $( elem ).jqmData( 'dependents' ) || $();

							$( elem ).jqmData( 'dependents', $.merge( dependents, newDependents ) );
						};

						$.fn.getEncodedText = function() {
							return $( "<div/>" ).text( $( this ).text() ).html();
						};

						// fluent helper function for the mobile namespaced equivalent
						$.fn.jqmEnhanceable = function() {
							return $.mobile.enhanceable( this );
						};

						$.fn.jqmHijackable = function() {
							return $.mobile.hijackable( this );
						};

						/*
						* Add support of jqmData() in jQuery find
						*/
						oldFind = $.find;

						$.find = function (selector, context, ret, extra) {
							if (selector.indexOf(jqmDataStr) > -1) {
								selector = selector.replace(jqmDataRE, "[data-" + ($.mobile.ns || "") + "$1]");
							}
							return oldFind.call(this, selector, context, ret, extra);
						};

						$.extend($.find, oldFind);

						$.find.matches = function (expr, set) {
							return $.find(expr, null, null, set);
						};

						$.find.matchesSelector = function (node, expr) {
							return $.find(expr, null, null, [ node ]).length > 0;
						};

						/* @TODO
						 * find a better way of initializing constructos
						 * this is for jquery style extending (not jqm
						 * widget extending altough it should work to
						 * when we import $.extend function) by replacing
						 * old methods and using them inline
						 */
						document.addEventListener(ns.engine.eventType.WIDGET_BOUND, function (event) {
							var originalEvent = event.originalEvent || event,
								widget = originalEvent.detail,
								widgetName  = widget && widget.widgetName;
							widgetName = widgetName && widgetName.toLowerCase();
							if (widgetName && widget.element) {
								try {
									//>>excludeStart("tauDebug", pragmas.tauDebug);
									ns.log("Running jqm constructor for " + widgetName);
									//>>excludeEnd("tauDebug");
								} catch(e) {
									// suppress errors in not debug mode
									//>>excludeStart("tauDebug", pragmas.tauDebug);
									ns.warning("could not call jqm constructor for " + widgetName, widget, e);
									//>>excludeEnd("tauDebug");
								}

							}
						}, true);

						/* support for global object $.mobile
						* @TODO this is temporary fix, we have to think about this function
						*/
						$(document).bind('create', ns.engine._createEventHandler);
						// support creating widgets by triggering pagecreate
						$(document).bind('pagecreate', function (event) {
							var originalEvent = event.originalEvent || event,
								isPage = originalEvent.detail instanceof ns.widget.mobile.Page,
								pageWidget;
							if (!isPage) { // trigger create when the pagecrate trigger is from outside
								pageWidget = engine.instanceWidget(originalEvent.target, "Page");
								pageWidget.refresh();
								ns.engine._createEventHandler(originalEvent);
							}
						});
						$(document).bind('activePopup', function (event) {
							$.mobile.popup.active = $.mobile.popupwindow.active = event.originalEvent.detail;
						});

						// @TODO fill this object proper data
						$.tizen.frameworkData = ns.frameworkData;

						$.tizen.__tizen__ = tizen;
						tizen.libFileName = "tizen-web-ui-fw(.custom|.full)?(.min)?.js";
						tizen.log = {
							debug : function (msg) {
								if ($.tizen.frameworkData.debug) {
									console.log(msg);
								}
							},
							warn : console.warn.bind(console),
							error : console.error.bind(console),
							alert : window.alert.bind(window)
						};
						tizen.util = {
							loadScriptSync: load.scriptSync,
							isMobileBrowser: ns.theme.isMobileBrowser.bind(ns.theme)
						};
						tizen.css = {
							cacheBust: load.cacheBust,
							addElementToHead : load.addElementToHead.bind(load),
							makeLink : load.makeLink.bind(load),
							load: load.themeCSS
						};
						tizen.loadTheme = ns.theme.loadTheme.bind(ns.theme);
						tizen.loadGlobalizeCulture = ns.util.globalize.loadGlobalizeCulture.bind(ns.util.globalize);
						tizen.setGlobalize = util.globalize.setGlobalize.bind(ns.util.globalize);
						tizen.setViewport = ns.theme.setViewport.bind(ns.theme);
						tizen.scaleBaseFontSize = ns.theme.scaleBaseFontSize.bind(ns.theme);
						tizen.setScaling = ns.theme.setScaling.bind(ns.theme);
						tizen.getParams = ns.frameworkData.getParams.bind(ns.frameworkData);

						ns.setConfig('enableHWKeyHandler', $.mobile.tizen.enableHWKeyHandler);
					}
				}
			};

			// Listen when framework is ready
			document.addEventListener(ns.engine.eventType.INIT, function () {
				ns.jqm.engine.init();
			}, false);

			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return ns.jqm.engine;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window, window.document, ns, ns.jqm.jQuery));
