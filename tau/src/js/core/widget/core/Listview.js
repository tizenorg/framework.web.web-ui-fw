/*global window, define */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true */
/**
 * # Listview Widget
 * Shows a list view.
 *
 * The list widget is used to display, for example, navigation data, results, and data entries. The following table describes the supported list classes.
 *
 * ## Default selectors
 *
 * Default selector for listview widget is class *ui-listview*.
 *
 * To add a list widget to the application, use the following code:
 *
 * ### List with basic items
 *
 * You can add a basic list widget as follows:
 *
 *      @example
 *         <ul class="ui-listview">
 *             <li>1line</li>
 *             <li>2line</li>
 *             <li>3line</li>
 *             <li>4line</li>
 *             <li>5line</li>
 *         </ul>
 *
 * ### List with link items
 *
 * You can add a list widget with a link and press effect that allows the user to click each list item as follows:
 *
 *      @example
 *         <ul class="ui-listview">
 *             <li>
 *                 <a href="#">1line</a>
 *             </li>
 *             <li>
 *                 <a href="#">2line</a>
 *             </li>
 *             <li>
 *                 <a href="#">3line</a>
 *             </li>
 *             <li>
 *                 <a href="#">4line</a>
 *             </li>
 *             <li>
 *                 <a href="#">5line</a>
 *             </li>
 *         </ul>
 *
 * ## JavaScript API
 *
 * Listview widget hasn't JavaScript API.
 *
 * @class ns.widget.core.Listview
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../core",
			"../BaseWidget"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");
			var BaseWidget = ns.widget.BaseWidget,
				engine = ns.engine,
				Listview = function () {
					return this;
				},
				classes = {
					LISTVIEW: "ui-listview"
				},
				prototype = new BaseWidget();

			Listview.events = {};

			prototype._changeLinksToButton = function(item) {
				engine.instanceWidget(
					item,
					"Button"
				);
			};

			/**
			* build Listview
			* @method _build
			* @private
			* @param {HTMLElement} element
			* @return {HTMLElement}
			* @member ns.widget.core.Listview
			*/
			prototype._build = function (element) {
				rebuild(this, element);
				return element;
			};

			/**
			* Init Listview Widget
			* @method _init
			* @param {HTMLElement} element
			* @member ns.widget.core.Listview
			* @protected
			*/
			prototype._init = function (element) {
				return element;
			};

			/**
			* Bind events to widget
			* @method _bindEvents
			* @param {HTMLElement} element
			* @member ns.widget.core.Listview
			* @protected
			*/
			prototype._bindEvents = function (element) {
				return element;
			};

			/**
			* refresh structure
			* @method _refresh
			* @return {HTMLElement}
			* @member ns.widget.core.Listview
			*/
			prototype._refresh = function () {
				var self = this,
					element = self.element;

				rebuild(self, element);

				return element;
			};

			/**
			 * Method rebuild widget.
			 * @method rebuild
			 * @param {Listview} self
			 * @param {HTMLElement} element
			 * @private
			 * @static
			 * @member ns.widget.core.Listview
			 */
			function rebuild(self, element) {
				var items = element.children,
					itemsLength = items.length,
					item,
					i;

				element.classList.add(classes.LISTVIEW);

				for (i=0; i<itemsLength; i++) {
					item = items[i];
					if (item.firstElementChild && item.firstElementChild.tagName === "A") {
						self._changeLinksToButton(item.firstElementChild);
					}
				}
			}

			/**
			* @method _destroy
			* @private
			* @member ns.widget.core.Listview
			*/
			prototype._destroy = function () {
				return null;
			};

			Listview.prototype = prototype;
			ns.widget.core.Listview = Listview;

			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return Listview;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window.document, ns));
