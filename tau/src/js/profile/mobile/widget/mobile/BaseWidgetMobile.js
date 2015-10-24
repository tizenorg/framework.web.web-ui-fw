/*global window, define, ns */
/*
* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/*jslint nomen: true */
/**
 * #BaseWidgetMobile
 * Extenstion of class BaseWidget for mobile profile.
 * This class has compability properties and methods with jQuery Mobile Widget.
 * @class ns.widget.mobile.BaseWidgetMobile
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../../../../core/widget/BaseWidget",
			"../mobile"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");

			var BaseWidgetMobile = function () {
					this.options = {};
				},
				BaseWidget = ns.widget.BaseWidget,
				basePrototype = BaseWidget.prototype,
				parent_configure = basePrototype.configure,
				parent_disable = basePrototype.disable,
				parent_enable = basePrototype.enable,
				prototype = new BaseWidget(),
				disableClass = "ui-state-disabled",
				ariaDisabled = "aria-disabled",
				slice = [].slice;

			BaseWidgetMobile.classes = {
				disable: disableClass
			};

			/**
			 * Configures widget object from definition.
			 * @method configure
			 * @param {Object} definition
			 * @param {string} definition.name Name of widget
			 * @param {string} definition.selector Selector of widget
			 * @param {string} definition.binding Path to file with widget (without extension)
			 * @param {HTMLElement} element
			 * @param {Object} options Configure options
			 * @member ns.widget.mobile.BaseWidgetMobile
			 * @chainable
			 * @instance
			 */
			prototype.configure = function (definition, element, options) {
				var self = this,
					definitionName,
					widgetName;
				parent_configure.call(self, definition, element, options);
				if (definition) {
					definitionName = definition.name;
					widgetName = definitionName && definitionName.toLowerCase();
					/**
					 * @property {string} widgetName Widget base class
					 * @member ns.widget.mobile.BaseWidgetMobile
					 * @instance
					 */
					self.widgetName = widgetName;
					/**
					* @property {string} widgetBaseClass Widget base class
					* @member ns.widget.mobile.BaseWidgetMobile
					* @instance
					*/
					self.widgetBaseClass = self.namespace + '-' + widgetName;
					/**
					* @property {number} uuid Number id of widget instance
					* @member ns.widget.mobile.BaseWidgetMobile
					* @instance
					*/
					self.uuid = ns.getNumberUniqueId();

					/**
					 * @property {string} eventNamespace Namespace of widget events (suffix for events)
					 * @member ns.widget.mobile.BaseWidgetMobile
					 * @instance
					 */
					self.eventNamespace = '.' + widgetName + (self.uuid || '');

					/**
					 * @property {string} [defaultElement='<div>'] Default element for the widget
					 * @member ns.widget.mobile.BaseWidgetMobile
					 * @instance
					 */
					self.defaultElement = '<div>';
				}

				return this;
			};

			/**
			* Disables widget.
			* @method disable
			* @member ns.widget.mobile.BaseWidgetMobile
			* @instance
			*/
			prototype.disable = function () {
				var self = this,
					element = self.element,
					elementClasses = element.classList,
					args = slice.call(arguments);

				parent_disable.apply(self, args);
				elementClasses.add(self.widgetFullName + "-disabled");
				elementClasses.add(disableClass);
				element.setAttribute(ariaDisabled, true);
				// @TODO
				//this.hoverable.removeClass( "ui-state-hover" );
				//this.focusable.removeClass( "ui-state-focus" );
			};

			/**
			* Enables widget.
			* @method enable
			* @member ns.widget.mobile.BaseWidgetMobile
			* @instance
			*/
			prototype.enable = function () {
				var self = this,
					element = self.element,
					elementClasses = element.classList,
					args = slice.call(arguments);

				parent_enable.apply(self, args);
				elementClasses.remove(self.widgetFullName + "-disabled");
				elementClasses.remove(disableClass);
				element.setAttribute(ariaDisabled, false);
				// @TODO
				//this.hoverable.removeClass( "ui-state-hover" );
				//this.focusable.removeClass( "ui-state-focus" );
			};

			/**
			* Throws exception.
			* @method raise
			* @param {?string} msg Message of throw
			* @member ns.widget.mobile.BaseWidgetMobile
			* @instance
			*/
			prototype.raise = function (msg) {
				throw "Widget [" + this.widgetName + "]: " + msg;
			};

			/**
			 * Enhances all the children of all elements in the set of matched elements.
			 * @method enhanceWithin
			 * @member ns.widget.mobile.BaseWidgetMobile
			 * @instance
			 * @removed 2.3
			 */
			prototype.enhanceWithin = function () {
				ns.log('method enhanceWithin is deprecated');
			};

			/**
			 * Enhances all the children of all elements in the set of matched elements.
			 * @method enhance
			 * @member ns.widget.mobile.BaseWidgetMobile
			 * @instance
			 * @removed 2.3
			 */
			prototype.enhance = function () {
				ns.log('method enhance is deprecated');
			};
			

			/**
			* Returns element of widget.
			* @method widget
			* @member ns.widget.mobile.BaseWidgetMobile
			* @return {HTMLElement}
			* @instance
			*/
			prototype.widget = function () {
				return this.element;
			};

			BaseWidgetMobile.prototype = prototype;

			// definition
			ns.widget.mobile.BaseWidgetMobile = BaseWidgetMobile;

			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return BaseWidgetMobile;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window.document, ns));
