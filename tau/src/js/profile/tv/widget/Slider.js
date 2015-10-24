/*global window, define, ns */
/*
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true */
/*
 * # Slider Widget
 * Creates horizontal axis with a draggable handle. It can be used to set singular value from within
 * lower and upper boundries.
 *
 * ## Using
 * User can drag the handle using touch capabilities. The other way, using remote control, is focusing
 * Slider using arrows and selecting it with OK [Enter if using keyboard]. Now you can adjust Slider
 * value using left/down right/up arrows. To apply new value use OK [Enter] button.
 *
 * ## Default selectors
 * All **INPUT** tags with _type="range"_ are changed into slider.
 *
 * ### HTML Examples
 *
 * #### Create slider input
 *
 *		@example
 *		<input id="slider-1" name="slider-1" type="range" value="5" min="0" max="10"/>
 *
 * ## Manual constructor
 * For manual creation of slider widget you can use constructor of widget
 * from **tau** namespace:
 *
 *		@example
 *		<input id="slider-1" name="slider-1" type="range" value="5" min="0" max="10"/>
 *		<script>
 *			var sliderElement = document.getElementById("slider-1"),
 *				slider = tau.widget.TizenSlider(sliderElement);
 *		</script>
 *
 * Constructor has one required parameter **element** which
 * is base **HTMLElement** to create widget. We recommend get this element
 * by method *document.getElementById*. Second parameter is **options**
 * and it is a object with options for widget.
 *
 *		@example
 *		<input id="slider-1" name="slider-1" type="range" value="5" min="0" max="10"/>
 *		<script>
 *			var sliderElement = document.getElementById("slider-1"),
 *				slider = tau.widget.TizenSlider(sliderElement, {data-popup: true});
 *		</script>
 *
 * ##Methods
 *
 * To call method on widget you can use one of existing API:
 *
 * First API is from tau namespace:
 *
 *		@example
 *		<input id="slider-1" name="slider-1" type="range" value="5" min="0" max="10"/>
 *		<script>
 *		var slider = document.getElementById("slider"),
 *			slider = tau.widget.TizenSlider(slider);
 *
 *		// slider.methodName(methodArgument1, methodArgument2, ...);
 *		// for example
 *		var value = slider.value("5");
 *		</script>
 *
 * @class ns.widget.tv.Slider
 * @extends ns.widget.mobile.TizenSlider
 * @author Jadwiga Sosnowska <j.sosnowska@samsung.com>
 */
(function (document, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../../../profile/mobile/widget/mobile/TizenSlider",
			"../../../core/engine",
			"../../../core/theme",
			"../../../core/util/selectors",
			"../../../core/util/object",
			"./BaseKeyboardSupport",
			"../tv"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");
			var BaseSlider = ns.widget.mobile.TizenSlider,
				BaseSliderPrototype = BaseSlider.prototype,
				BaseKeyboardSupport = ns.widget.tv.BaseKeyboardSupport,
				Slider = function () {
					var self = this;
					BaseSlider.call(self);
					BaseKeyboardSupport.call(self);
					self._pageWidget = null;
					self._callbacks = {};
					self.status = false;
				},
				engine = ns.engine,
				selectors = ns.util.selectors,
				objectUtils = ns.util.object,
				// Slider inherits TizenSlider classes with additional
				// "ui-focus".
				classes = objectUtils.merge({}, BaseSlider.classes, {
					focus: "ui-focus"
				}),
				FUNCTION_TYPE = "function",
				prototype = new BaseSlider(),
				KEY_CODES = BaseKeyboardSupport.KEY_CODES;

			Slider.classes = classes;
			Slider.prototype = prototype;

			/**
			 * Shows popup with current Slider value
			 * @method showPopup
			 * @param {ns.widget.tv.Slider} self
			 * @private
			 * @static
			 * @member ns.widget.tv.Slider
			 */
			function showPopup(self) {
				if (self.options.popup) {
					self._updateSlider();
					self._showPopup();
				}
			}

			/**
			 * Keyup event-handling method.
			 * @method onKeyup
			 * @param {ns.widget.tv.Slider} self
			 * @param {Event} event
			 * @private
			 * @static
			 * @member ns.widget.tv.Slider
			 */
			function onKeyup(self, event) {
				var status = self.status;

				if (event.keyCode === KEY_CODES.enter) {
					if (status) {
						self._ui.container.focus();
						self._pageWidget.enableKeyboardSupport();
					} else {
						self._ui.handle.focus();
						showPopup(self);
						self._pageWidget.disableKeyboardSupport();
					}
					self.status = !status;
				}
			}

			/**
			 * Keydown event-handling method.
			 * @method onKeydown
			 * @param {ns.widget.tv.Slider} self
			 * @param {Event} event
			 * @private
			 * @static
			 * @member ns.widget.tv.Slider
			 */
			function onKeydown(self, event) {
				if (event.keyCode !== KEY_CODES.enter && !self.status) {
					event.preventDefault();
					event.stopPropagation();
				}
			}

			/**
			 * Focus event-handling method.
			 * @method onFocus
			 * @param {ns.widget.tv.Slider} self
			 * @private
			 * @static
			 * @member ns.widget.tv.Slider
			 */
			function onFocus(self) {
				self._ui.container.classList.add("ui-focus");
			}

			/**
			 * Blur event-handling method.
			 * @method onBlur
			 * @param {ns.widget.tv.Slider} self
			 * @private
			 * @static
			 * @member ns.widget.tv.Slider
			 */
			function onBlur(self) {
				self._ui.container.classList.remove("ui-focus");
			}

			/**
			 * Build structure of slider widget
			 * @method _build
			 * @param {HTMLInputElement|HTMLSelectElement} element
			 * @return {HTMLInputElement|HTMLSelectElement}
			 * @protected
			 * @member ns.widget.tv.Slider
			 */
			prototype._build = function(element) {
				var ui = this._ui,
					pageElement = selectors.getClosestByClass(element, "ui-page"),
					container,
					containerStyle,
					handler;
				this._pageWidget = engine.getBinding(pageElement, "page");

				element = BaseSliderPrototype._build.call(this, element);
				// focus is enabled only on container
				container = ui.container;
				container.classList.add(BaseKeyboardSupport.classes.focusEnabled);
				container.setAttribute("tabindex", 0);
				// focus is disabled on handler
				handler =  ui.handle;
				handler.classList.add(BaseKeyboardSupport.classes.focusDisabled);

				// change margin on paddings
				if (this.options.icon) {
					containerStyle = container.style;
					if (containerStyle.marginLeft) {
						containerStyle.paddingLeft = containerStyle.marginLeft;
						containerStyle.marginLeft = 0;
					}
					if (containerStyle.marginRight) {
						containerStyle.paddingRight = containerStyle.marginRight;
						containerStyle.marginRight = 0;
					}
				}
				return element;
			};

			/**
			 * Init widget
			 * @method _init
			 * @param {HTMLInputElement|HTMLSelectElement} element
			 * @protected
			 * @member ns.widget.tv.Slider
			 */
			prototype._init = function(element) {
				var pageElement = selectors.getClosestByClass(element, "ui-page");

				BaseSliderPrototype._init.call(this, element);

				this.enableKeyboardSupport();
				this._pageWidget = this._pageWidget || engine.getBinding(pageElement, "page");
			};

			/**
			 * Bind events to widget
			 * @method _bindEvents
			 * @param {HTMLInputElement|HTMLSelectElement} element
			 * @protected
			 * @member ns.widget.tv.Slider
			 */
			prototype._bindEvents = function(element) {
				var container = this._ui.container,
					callbacks = this._callbacks;

				BaseSliderPrototype._bindEvents.call(this, element);

				callbacks.onKeyup = onKeyup.bind(null, this);
				callbacks.onKeydown = onKeydown.bind(null, this);
				callbacks.onFocus = onFocus.bind(null, this);
				callbacks.onBlur = onBlur.bind(null, this);

				this._bindEventKey();

				container.addEventListener("keyup", callbacks.onKeyup, false);
				container.addEventListener("keydown", callbacks.onKeydown, true);
				container.addEventListener("focus", callbacks.onFocus, true);
				container.addEventListener("blur", callbacks.onBlur, true);
			};

			/**
			 * Creates popup element and appends it container passed as argument
			 * @method _createPopup
			 * @return {ns.widget.Popup} reference to new widget instance
			 * @protected
			 * @member ns.widget.tv.Slider
			 * TODO: use TizenSlider when Core Popup is used in mobile profile
			 */
			prototype._createPopup = function () {
				var classes = Slider.classes,
					pageElement,
					popup,
					popupInstance;

				// Create element and append it to slider
				popup = document.createElement("div");
				pageElement = (this._pageWidget && this._pageWidget.element) || document.body;
				pageElement.appendChild(popup);
				// Create widget instance out of popup element
				popupInstance = engine.instanceWidget(popup, "Popup", {
					positionTo: "#" + this._ui.handle.id, // positioned to slider's element
					transition: "none",
					overlay: false,
					arrow: "b,t",
					distance: 10,
					specialContainerClass: classes.uiSliderPopupContainer
				});
				popup.classList.add(classes.uiSliderPopup);

				return popupInstance;
			};

			/**
			 * Updates popup state
			 * @method _updateSlider
			 * @protected
			 * @member ns.widget.tv.Slider
			 * TODO: use TizenSlider when Core Popup is used in mobile profile
			 */
			prototype._updateSlider = function () {
				var self = this,
					newValue,
					element = self.element,
					popupElement;

				// As the options.popup could change
				// it may be required to create popup
				if (self.options.popup){
					if (!self._popup) {
						self._popup = self._createPopup(self._ui.container);
					}

					popupElement = self._popup.element;
				}

				self._ui.handle.removeAttribute("title");

				newValue = parseInt(element.value, 10);

				if (newValue !== self.currentValue) {
					self.currentValue = newValue;

					// Set same value for popup element if it exists
					if (popupElement) {
						// @CHANGED now popup has wrapper and arrow, and value is set in container
						self._popup._ui.container.innerHTML = newValue;
					}

					self._refresh();

					self.trigger("update", newValue);
				} else {
					// If text doesn't change reposition only popup
					// no need to run full refresh
					if (self._popup) {
						self._popup.reposition();
					}
				}
			};

			/**
			 * Destroys widget and removes added content.
			 * @method _destroy
			 * @protected
			 * @member ns.widget.tv.Slider
			 */
			prototype._destroy = function() {
				var ui = this._ui,
					container = ui.container,
					callbacks = this._callbacks;

				this._destroyEventKey();
				container.removeEventListener("keyup", callbacks.onKeyup, false);
				container.removeEventListener("keydown", callbacks.onKeydown, false);
				ui.handle.removeEventListener("focus", callbacks.onFocus, true);
				container.removeEventListener("blur", callbacks.onBlur, true);

				if (typeof BaseSliderPrototype._destroy === FUNCTION_TYPE) {
					BaseSliderPrototype._destroy.call(this);
				}
			};


			// definition
			ns.widget.tv.Slider = Slider;

			engine.defineWidget(
				"TizenSlider",
				"input[type='range'], :not(select)[data-role='slider'], :not(select)[data-type='range']",
				[],
				Slider,
				"tv",
				true
			);
			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return ns.widget.tv.Slider;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window.document, ns));
