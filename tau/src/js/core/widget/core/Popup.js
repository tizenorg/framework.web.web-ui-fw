/*global window, define, ns */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
 *
 * Licensed under the Flora License, Version 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://floralicense.org/license/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*jslint nomen: true, plusplus: true */
/**
 * # Popup Widget
 *
 * @author Hyunkook Cho <hk0713.cho@samsung.com>
 * @class ns.widget.core.Popup
 * @extends ns.widget.Popup
 */
(function (ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../../engine",
			"../../event",
			"../../util/object",
			"../../util/deferred",
			"../../util/selectors",
			"../BaseWidget",
			"../core"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");
				/**
				 * Alias for {@link ns.widget.BaseWidget}
				 * @property {Function} BaseWidget
				 * @member ns.widget.core.Popup
				 * @private
				 */
			var BaseWidget = ns.widget.BaseWidget,
				/**
				 * Alias for class ns.engine
				 * @property {ns.engine} engine
				 * @member ns.widget.core.Popup
				 * @private
				 */
				engine = ns.engine,
				/**
				 * Alias for class ns.util.object
				 * @property {Object} objectUtils
				 * @member ns.widget.core.Popup
				 * @private
				 */
				objectUtils = ns.util.object,
				/**
				 * Alias for class ns.util.deferred
				 * @property {Object} UtilDeferred
				 * @member ns.widget.core.Popup
				 * @private
				 */
				UtilDeferred = ns.util.deferred,
				/**
				 * Alias for class ns.util.selectors
				 * @property {Object} utilSelector
				 * @member ns.widget.core.Popup
				 * @private
				 */
				utilSelector = ns.util.selectors,
				/**
				 * Alias for class ns.event
				 * @property {Object} eventUtils
				 * @member ns.widget.core.Popup
				 * @private
				 */
				eventUtils = ns.event,

				Popup = function () {
					var self = this,
						ui = {};

					self.selectors = selectors;
					self.options = objectUtils.merge({}, Popup.defaults);
					self.storedOptions = null;
					/**
					 * Popup state flag
					 * @property {0|1|2|3} [state=null]
					 * @member ns.widget.core.Popup
					 * @private
					 */
					self.state = states.CLOSED;

					ui.overlay = null;
					ui.header = null;
					ui.footer = null;
					ui.content = null;
					ui.container = null;
					ui.wrapper = null;
					self._ui = ui;

					// event callbacks
					self._callbacks = {};
				},
				/**
				 * Object with default options
				 * @property {Object} defaults
				 * @property {string} [options.transition="none"] Sets the default transition for the popup.
				 * @property {string} [options.positionTo="window"] Sets the element relative to which the popup will be centered.
				 * @property {boolean} [options.dismissible=true] Sets whether to close popup when a popup is open to support the back button.
				 * @property {boolean} [options.overlay=true] Sets whether to show overlay when a popup is open.
				 * @property {boolean|string} [options.header=false] Sets content of header.
				 * @property {boolean|string} [options.footer=false] Sets content of footer.
				 * @property {string} [options.content=null] Sets content of popup.
				 * @property {string} [options.overlayClass=""] Sets the custom class for the popup background, which covers the entire window.
				 * @property {string} [options.closeLinkSelector="a[data-rel='back']"] Sets selector for close buttons in popup.
				 * @property {boolean} [options.history=true] Sets whether to alter the url when a popup is open to support the back button.
				 * @member ns.widget.core.Popup
				 * @static
				 */
				defaults = {
					transition: "none",
					dismissible: true,
					overlay: true,
					header: false,
					footer: false,
					content: null,
					overlayClass: "",
					closeLinkSelector: "[data-rel='back']",
					history: true
				},
				states = {
					DURING_OPENING: 0,
					OPENED: 1,
					DURING_CLOSING: 2,
					CLOSED: 3
				},
				CLASSES_PREFIX = "ui-popup",
				/**
				 * Dictionary for popup related css class names
				 * @property {Object} classes
				 * @member ns.widget.core.Popup
				 * @static
				 */
				classes = {
					popup: CLASSES_PREFIX,
					active: CLASSES_PREFIX + "-active",
					overlay: CLASSES_PREFIX + "-overlay",
					header: CLASSES_PREFIX + "-header",
					footer: CLASSES_PREFIX + "-footer",
					content: CLASSES_PREFIX + "-content",
					wrapper: CLASSES_PREFIX + "-wrapper",
					build: "ui-build"
				},
				/**
				 * Dictionary for popup related selectors
				 * @property {Object} selectors
				 * @member ns.widget.core.Popup
				 * @static
				 */
				selectors = {
					header: "." + classes.header,
					content: "." + classes.content,
					footer: "." + classes.footer
				},
				EVENTS_PREFIX = "popup",
				/**
				 * Dictionary for popup related events
				 * @property {Object} events
				 * @member ns.widget.core.Popup
				 * @static
				 */
				events = {
					/**
					 * Triggered when the popup has been created in the DOM (via ajax or other) but before all widgets have had an opportunity to enhance the contained markup.
					 * @event popupshow
					 * @member ns.widget.core.Popup
					 */
					show: EVENTS_PREFIX + "show",
					/**
					 * Triggered on the popup after the transition animation has completed.
					 * @event popuphide
					 * @member ns.widget.core.Popup
					 */
					hide: EVENTS_PREFIX + "hide",
					/**
					 * Triggered on the popup we are transitioning to, before the actual transition animation is kicked off.
					 * @event popupbeforeshow
					 * @member ns.widget.core.Popup
					 */
					before_show: EVENTS_PREFIX + "beforeshow",
					/**
					 * Triggered on the popup we are transitioning away from, before the actual transition animation is kicked off.
					 * @event popupbeforehide
					 * @member ns.widget.core.Popup
					 */
					before_hide: EVENTS_PREFIX + "beforehide"
				},

				prototype = new BaseWidget();

			Popup.classes = classes;
			Popup.events = events;
			Popup.defaults = defaults;

			/**
			 * Build the content of popup
			 * @method _buildContent
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._buildContent = function (element) {
				var self = this,
					ui = self._ui,
					selectors = self.selectors,
					options = self.options,
					content = ui.content || element.querySelector(selectors.content),
					footer = ui.footer || element.querySelector(selectors.footer),
					elementChildren = [].slice.call(element.childNodes),
					elementChildrenLength = elementChildren.length,
					i,
					node;

				if (!content) {
					content = document.createElement("div");
					content.className = classes.content;
					for (i = 0; i < elementChildrenLength; ++i) {
						node = elementChildren[i];
						if (node !== ui.footer && node !== ui.header) {
							content.appendChild(node);
						}
					}
					if (typeof options.content === "string") {
						content.innerHTML = options.content;
					}
					element.insertBefore(content, footer);
				}
				content.classList.add(classes.content);
				ui.content = content;
			};

			/**
			 * Build the header of popup
			 * @method _buildHeader
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._buildHeader = function (element) {
				var self = this,
					ui = self._ui,
					options = self.options,
					selectors = self.selectors,
					content = ui.content || element.querySelector(selectors.content),
					header = ui.header || element.querySelector(selectors.header);
				if (!header && options.header !== false) {
					header = document.createElement("div");
					header.className = classes.header;
					if (typeof options.header !== "boolean") {
						header.innerHTML = options.header;
					}
					element.insertBefore(header, content);
				}
				if (header) {
					header.classList.add(classes.header);
				}
				ui.header = header;
			};

			/**
			 * Set the header of popup.
			 * This function is called by function "option" when the option "header" is set.
			 * @method _setHeader
			 * @param {HTMLElement} element
			 * @param {boolean|string} value
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._setHeader = function (element, value) {
				var self = this,
					ui = self._ui,
					header = ui.header;
				if (header) {
					header.parentNode.removeChild(header);
					ui.header = null;
				}
				self.options.header = value;
				self._buildHeader(ui.container);
			};

			/**
			 * Build the footer of popup
			 * @method _buildFooter
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._buildFooter = function (element) {
				var self = this,
					ui = self._ui,
					options = self.options,
					footer = ui.footer || element.querySelector(self.selectors.footer);
				if (!footer && options.footer !== false) {
					footer = document.createElement("div");
					footer.className = classes.footer;
					if (typeof options.footer !== "boolean") {
						footer.innerHTML = options.footer;
					}
					element.appendChild(footer);
				}
				if (footer) {
					footer.classList.add(classes.footer);
				}
				ui.footer = footer;
			};

			/**
			 * Set the footer of popup.
			 * This function is called by function "option" when the option "footer" is set.
			 * @method _setFooter
			 * @param {HTMLElement} element
			 * @param {boolean|string} value
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._setFooter = function (element, value) {
				var self = this,
					ui = self._ui,
					footer = ui.footer;
				if (footer) {
					footer.parentNode.removeChild(footer);
					ui.footer = null;
				}
				self.options.footer = value;
				self._buildFooter(ui.container);
			};

			/**
			 * Build structure of Popup widget
			 * @method _build
			 * @param {HTMLElement} element of popup
			 * @return {HTMLElement}
			 * @protected
			 * @member ns.widget.Popup
			 */
			prototype._build = function (element) {
				var self = this,
					ui = self._ui,
					wrapper,
					child = element.firstChild;

				// set class for element
				element.classList.add(classes.popup);

				// create wrapper
				wrapper = document.createElement("div");
				wrapper.classList.add(classes.wrapper);
				ui.wrapper = wrapper;
				ui.container = wrapper;
				// move all children to wrapper
				while (child) {
					wrapper.appendChild(child);
					child = element.firstChild;
				}
				// add wrapper and arrow to popup element
				element.appendChild(wrapper);

				// build header, footer and content
				this._buildHeader(ui.container);
				this._buildFooter(ui.container);
				this._buildContent(ui.container);

				// set overlay
				this._setOverlay(element, this.options.overlay);

				return element;
			};

			/**
			 * Set overlay
			 * @method _setOverlay
			 * @param {HTMLElement} element
			 * @param {boolean} enable
			 * @protected
			 * @member ns.widget.Popup
			 */
			prototype._setOverlay = function(element, enable) {
				var self = this,
					overlayClass = self.options.overlayClass,
					ui = self._ui,
					overlay = ui.overlay;

				// if this popup is not connected with slider,
				// we create overlay, which is invisible when
				// the value of option overlay is false
				/// @TODO: get class from widget
				if (!element.classList.contains("ui-slider-popup")) {
					// create overlay
					if (!overlay) {
						overlay = document.createElement("div");
						element.parentNode.insertBefore(overlay, element);
						ui.overlay = overlay;
					}
					overlay.className = classes.overlay + (overlayClass ? " " + overlayClass : "");
					if (enable) {
						overlay.style.opacity = "";
					} else {
						// if option is set on "false", the overlay is not visible
						overlay.style.opacity = 0;
					}
				}
			};

			/**
			 * Returns the state of the popup
			 * @method _isActive
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._isActive = function () {
				var state = this.state;
				return state === states.DURING_OPENING || state === states.OPENED;
			};

			/**
			 * Returns true if popup is already opened and visible
			 * @method _isActive
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._isOpened = function () {
				return this.state === states.OPENED;
			};

			/**
			 * Init widget
			 * @method _init
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._init = function(element) {
				var self = this,
					selectors = self.selectors,
					ui = self._ui;

				ui.header = ui.header || element.querySelector(selectors.header);
				ui.footer = ui.footer || element.querySelector(selectors.footer);
				ui.content = ui.content || element.querySelector(selectors.content);
				ui.wrapper = ui.wrapper || element.querySelector("." + classes.wrapper);
				ui.container = ui.wrapper || element;

				// @todo - use selector from page's definition in engine
				ui.page = utilSelector.getClosestByClass(element, "ui-page") || window;
			};

			/**
			 * Set the state of the popup
			 * @method _setActive
			 * @param {boolean} active
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._setActive = function (active) {
				var self = this,
					activeClass = classes.active,
					elementClassList = self.element.classList,
					route = engine.getRouter().getRoute("popup"),
					options;

				// NOTE: popup's options object is stored in window.history at the router module,
				// and this window.history can't store DOM element object.
				options =  objectUtils.merge({}, self.options, {positionTo: null, link: null});

				// set state of popup and add proper class
				if (active) {
					// set global variable
					route.setActive(self, options);
					// add proper class
					elementClassList.add(activeClass);
					// set state of popup 	358
					self.state = states.OPENED;
				} else {
					// no popup is opened, so set global variable on "null"
					route.setActive(null, options);
					// remove proper class
					elementClassList.remove(activeClass);
					// set state of popup
					self.state = states.CLOSED;
				}
			};

			/**
			 * Bind events
			 * @method _bindEvents
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._bindEvents = function () {
				var self = this,
					closeButtons = self.element.querySelectorAll(self.options.closeLinkSelector);

				self._ui.page.addEventListener("pagebeforehide", self, false);
				window.addEventListener("resize", self, false);
				eventUtils.on(closeButtons, "click", self, false);
				self._bindOverlayEvents();
			};

			/**
			 * Bind "click" event for overlay
			 * @method _bindOverlayEvents
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._bindOverlayEvents = function () {
				var overlay = this._ui.overlay;
				if (overlay) {
					overlay.addEventListener("click", this, false);
				}
			};

			/**
			 * Unbind "click" event for overlay
			 * @method _bindOverlayEvents
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._unbindOverlayEvents = function () {
				var overlay = this._ui.overlay;
				if (overlay) {
					overlay.removeEventListener("click", this, false);
				}
			};

			/**
			 * Unbind events
			 * @method _bindEvents
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._unbindEvents = function () {
				var self = this;

				self._ui.page.removeEventListener("pagebeforehide", self, false);
				window.removeEventListener("resize", self, false);
				self._unbindOverlayEvents();
			};

			/**
			 * Layouting popup structure
			 * @method layout
			 * @member ns.widget.core.Popup
			 */
			prototype._layout = function (element) {
			};

			/**
			 * Open the popup
			 * @method open
			 * @param {Object=} [options]
			 * @param {string=} [options.transition] options.transition
			 * @member ns.widget.core.Popup
			 */
			prototype.open = function (options) {
				var self = this,
					newOptions;

				if (!self._isActive()) {
					/*
					 * Some passed options on open need to be kept until popup closing.
					 * For example, trasition parameter should be kept for closing animation.
					 * On the other hand, fromHashChange or x, y parameter should be removed.
					 * We store options and restore them on popup closing.
					 */
					self._storeOpenOptions(options);

					newOptions = objectUtils.merge(self.options, options);
					if (!newOptions.dismissible) {
						engine.getRouter().lock();
					}
					self._show(newOptions);
				}
			};

			/**
			 * Close the popup
			 * @method close
			 * @param {Object=} [options]
			 * @param {string=} [options.transition]
			 * @member ns.widget.core.Popup
			 */
			prototype.close = function (options) {
				var self = this,
					newOptions = objectUtils.merge(self.options, options);

				if (self._isActive()) {
					if (!newOptions.dismissible) {
						engine.getRouter().unlock();
					}
					self._hide(newOptions);
				}
			};

			/**
			 * Store Open options.
			 * @method _storeOpenOptions
			 * @param {object} options
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._storeOpenOptions = function (options) {
				var self = this,
					oldOptions = self.options,
					storedOptions = {},
					key;

				for (key in options) {
					if (options.hasOwnProperty(key)) {
						storedOptions[key] = oldOptions[key];
					}
				}

				self.storedOptions = storedOptions;
			};

			/**
			 * Restore Open options and remove some unnecessary ones.
			 * @method _storeOpenOptions
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._restoreOpenOptions = function () {
				var self = this,
					options = self.options,
					propertiesToRemove = ["x", "y", "fromHashChange"];

				// we restore opening values of all options
				options = objectUtils.merge(options, self.storedOptions);
				// and remove all values which should not be stored
				objectUtils.removeProperties(options, propertiesToRemove);
			};

			/**
			 * Show popup.
			 * @method _show
			 * @param {object} options
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._show = function (options) {
				var self = this,
					transitionOptions = objectUtils.merge({}, options),
					overlay = self._ui.overlay,
					deferred;

				// layouting
				self._layout(self.element);

				// change state of popup
				self.state = states.DURING_OPENING;
				// set transiton
				transitionOptions.ext = " in ";

				self.trigger(events.before_show);
				// show overlay
				if (overlay) {
					overlay.style.display = "block";
				}
				// start opening animation
				self._transition(transitionOptions, self._onShow.bind(self));
			};

			/**
			 * Show popup
			 * @method _onShow
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._onShow = function() {
				var self = this;
				self._setActive(true);
				self.trigger(events.show);
			};

			/**
			 * Hide popup
			 * @method _hide
			 * @param {object} options
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._hide = function (options) {
				var self = this,
					isOpened = self._isOpened(),
					callbacks = self._callbacks;

				// change state of popup
				self.state = states.DURING_CLOSING;

				self.trigger(events.before_hide);

				if (isOpened) {
					// popup is opened, so we start closing animation
					options.ext = " out ";
					self._transition(options, self._onHide.bind(self));
				} else {
					// popup is active, but not opened yet (DURING_OPENING), so
					// we stop opening animation
					if (callbacks.transitionDeferred) {
						callbacks.transitionDeferred.reject();
					}
					if (callbacks.animationEnd) {
						callbacks.animationEnd();
					}
					// and set popup as inactive
					self._onHide();
				}
			};

			/**
			 * Hide popup
			 * @method _onHide
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._onHide = function() {
				var self = this,
					overlay = self._ui.overlay;

				if (overlay) {
					overlay.style.display = "";
				}
				self._setActive(false);
				self._restoreOpenOptions();
				self.trigger(events.hide);
			};

			/**
			 * Handle events
			 * @method handleEvent
			 * @param {Event} event
			 * @member ns.widget.core.Popup
			 */
			prototype.handleEvent = function(event) {
				var self = this;
				switch(event.type) {
					case "pagebeforehide":
						// we need close active popup if exists
						engine.getRouter().close(null, {transition: "none", rel: "popup"});
						break;
					case "resize":
						self._onResize(event);
						break;
					case "click":
						if ( event.target === self._ui.overlay ) {
							self._onClickOverlay(event);
						}
						break;
				}
			};

			/**
			 * Refresh structure
			 * @method _refresh
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._refresh = function() {
				var self = this;
				self._unbindOverlayEvents();
				self._setOverlay(self.element, self.options.overlay);
				self._bindOverlayEvents();
			};

			/**
			 * Callback function fires after clicking on overlay.
			 * @method _onClickOverlay
			 * @param {Event} event
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._onClickOverlay = function(event) {
				var options = this.options;

				event.preventDefault();
				event.stopPropagation();

				if (options.dismissible) {
					engine.getRouter().close();
				}
			};

			/**
			 * Callback function fires on resizing
			 * @method _onResize
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._onResize = function() {
				if (this._isOpened()) {
					this._refresh();
				}
			};

			function clearAnimation(self, transitionClass, deferred) {
				var element = self.element,
					elementClassList = element.classList,
					overlay = self._ui.overlay,
					animationEndCallback = self._callbacks.animationEnd;

				// remove callbacks on animation events
				element.removeEventListener("animationend", animationEndCallback, false);
				element.removeEventListener("webkitAnimationEnd", animationEndCallback, false);
				element.removeEventListener("mozAnimationEnd", animationEndCallback, false);
				element.removeEventListener("oAnimationEnd", animationEndCallback, false);
				element.removeEventListener("msAnimationEnd", animationEndCallback, false);

				// clear classes
				transitionClass.split(" ").forEach(function (currentClass) {
					currentClass = currentClass.trim();
					if (currentClass.length > 0) {
						elementClassList.remove(currentClass);
						if (overlay) {
							overlay.classList.remove(currentClass);
						}
					}
				});
				if (deferred.state() === "pending") {
					// we resolve only pending (not rejected) deferred
					deferred.resolve();
				}
			}

			function setTransitionDeferred(self, resolve) {
				var deferred = new UtilDeferred();

				deferred.then(function() {
					if (deferred === self._callbacks.transitionDeferred) {
						resolve();
					}
				});

				self._callbacks.transitionDeferred = deferred;
				return deferred;
			}
			/**
			 * Animate popup opening/closing
			 * @method _transition
			 * @protected
			 * @param {Object} [options]
			 * @param {string=} [options.transition]
			 * @param {string=} [options.ext]
			 * @param {?Function} [resolve]
			 * @member ns.widget.core.Popup
			 */
			prototype._transition = function (options, resolve) {
				var self = this,
					transition = options.transition || self.options.transition || "none",
					transitionClass = transition + options.ext,
					element = self.element,
					elementClassList = element.classList,
					deferred,
					animationEndCallback;

				deferred = setTransitionDeferred(self, resolve);

				if (transition !== "none") {
					// set animationEnd callback
					animationEndCallback = clearAnimation.bind(null, self, transitionClass, deferred);
					self._callbacks.animationEnd = animationEndCallback;

					// add animation callbacks
					element.addEventListener("animationend", animationEndCallback, false);
					element.addEventListener("webkitAnimationEnd", animationEndCallback, false);
					element.addEventListener("mozAnimationEnd", animationEndCallback, false);
					element.addEventListener("oAnimationEnd", animationEndCallback, false);
					element.addEventListener("msAnimationEnd", animationEndCallback, false);
					// add transition classes
					transitionClass.split(" ").forEach(function (currentClass) {
						currentClass = currentClass.trim();
						if (currentClass.length > 0) {
							elementClassList.add(currentClass);
						}
					});
				} else {
					window.setTimeout(deferred.resolve, 0);
				}
				return deferred;
			};

			/**
			 * Destroy popup
			 * @method _destroy
			 * @protected
			 * @member ns.widget.core.Popup
			 */
			prototype._destroy = function() {
				var self = this,
					element = self.element,
					ui = self._ui,
					wrapper = ui.wrapper,
					child;

				if (wrapper) {
					// restore all children from wrapper
					child = wrapper.firstChild;
					while (child) {
						element.appendChild(child);
						child = wrapper.firstChild;
					}

					if (wrapper.parentNode) {
						wrapper.parentNode.removeChild(wrapper);
					}
				}

				self._unbindEvents(element);
				self._setOverlay(element, false);

				ui.wrapper = null;
			};

			Popup.prototype = prototype;

			ns.widget.core.Popup = Popup;

			engine.defineWidget(
				"Popup",
				"[data-role='popup'], .ui-popup",
				[
					"open",
					"close",
					"reposition"
				],
				Popup,
				"core"
			);
			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return Popup;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(ns));
