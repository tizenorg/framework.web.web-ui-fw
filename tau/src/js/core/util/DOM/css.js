/*global window, define */
/*jslint plusplus: true */
/*jshint -W069 */
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
/*
 * @author Jadwiga Sosnowska <j.sosnowska@partner.samsung.com>
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 * @author Maciej Moczulski <m.moczulski@samsung.com>
 * @author Piotr Karny <p.karny@samsung.com>
 */
(function (window, document, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../DOM"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");

			var DOM = ns.util.DOM,
				DASH_TO_UPPER_CASE_REGEXP = /-([a-z])/gi;

			/**
			 * Returns css property for element
			 * @method getCSSProperty
			 * @param {HTMLElement} element
			 * @param {string} property
			 * @param {string|number|null} [def=null] default returned value
			 * @param {"integer"|"float"|null} [type=null] auto type casting
			 * @return {string|number|null}
			 * @member ns.util.DOM
			 * @static
			 */
			function getCSSProperty(element, property, def, type) {
				var style = window.getComputedStyle(element),
					value = null,
					result = def;
				if (style) {
					value = style.getPropertyValue(property);
					if (value) {
						switch (type) {
						case "integer":
							value = parseInt(value, 10);
							if (!isNaN(value)) {
								result = value;
							}
							break;
						case "float":
							value = parseFloat(value);
							if (!isNaN(value)) {
								result = value;
							}
							break;
						default:
							result = value;
							break;
						}
					}
				}
				return result;
			}

			/**
			 * Extracts css properties from computed css for an element.
			 * The properties values are applied to the specified
			 * properties list (dictionary)
			 * @method extractCSSProperties
			 * @param {HTMLElement} element
			 * @param {Object} properties
			 * @param {?string} [pseudoSelector=null]
			 * @param {boolean} [noConversion=false]
			 * @member ns.util.DOM
			 * @static
			 */
			function extractCSSProperties (element, properties, pseudoSelector, noConversion) {
				var style = window.getComputedStyle(element, pseudoSelector),
					property,
					value = null,
					utils = ns.util;

				// @TODO extractCSSProperties should rather return raw values (with units)
				for (property in properties) {
					if (properties.hasOwnProperty(property)) {
						value = style.getPropertyValue(property);
						if (utils.isNumber(value) && !noConversion) {
							if (value.match(/\./gi)) {
								properties[property] = parseFloat(value);
							} else {
								properties[property] = parseInt(value, 10);
							}
						} else {
							properties[property] = value;
						}
					}
				}
			}

			/**
			 * Returns elements height from computed style
			 * @method getElementHeight
			 * @param {HTMLElement} element
			 * if null then the "inner" value is assigned
			 * @param {"outer"|null} [type=null]
			 * @param {boolean} [includeOffset=false]
			 * @param {boolean} [includeMargin=false]
			 * @param {?string} [pseudoSelector=null]
			 * @param {boolean} [force=false] check even if element is hidden
			 * @return {number}
			 * @member ns.util.DOM
			 * @static
			 */
			function getElementHeight(element, type, includeOffset, includeMargin, pseudoSelector, force) {
				var height = 0,
					style,
					value,
					originalDisplay = null,
					originalVisibility = null,
					originalPosition = null,
					outer = (type && type === "outer") || false,
					offsetHeight = 0,
					property,
					props = {
						"height": 0,
						"margin-top": 0,
						"margin-bottom": 0,
						"padding-top": 0,
						"padding-bottom": 0,
						"border-top-width": 0,
						"border-bottom-width": 0,
						"box-sizing": ""
					};
				if (element) {
					style = element.style;

					if (style.display !== "none") {
						extractCSSProperties(element, props, pseudoSelector, true);
						offsetHeight = element.offsetHeight;
					} else if (force) {
						originalDisplay = style.display;
						originalVisibility = style.visibility;
						originalPosition = style.position;

						style.display = "block";
						style.visibility = "hidden";
						style.position = "relative";

						extractCSSProperties(element, props, pseudoSelector, true);
						offsetHeight = element.offsetHeight;

						style.display = originalDisplay;
						style.visibility = originalVisibility;
						style.position = originalPosition;
					}

					// We are extracting raw values to be able to check the units
					if(typeof props["height"] === "string" && props["height"].indexOf("px") === -1){
						//ignore non px values such as auto or %
						props["height"] = 0;
					}

					for (property in props) {
						if (props.hasOwnProperty(property) && property !== "box-sizing"){
							value = parseFloat(props[property]);
							if (isNaN(value)) {
								value = 0;
							}
							props[property] = value;
						}
					}

					height += props["height"];

					if (props["box-sizing"] !== 'border-box') {
						height += props["padding-top"] + props["padding-bottom"];
					}

					if (includeOffset) {
						height = offsetHeight;
					} else if (outer && props["box-sizing"] !== 'border-box') {
						height += props["border-top-width"] + props["border-bottom-width"];
					}

					if (includeMargin) {
						height += Math.max(0, props["margin-top"]) + Math.max(0, props["margin-bottom"]);
					}
				}
				return height;
			}

			/**
			 * Returns elements width from computed style
			 * @method getElementWidth
			 * @param {HTMLElement} element
			 * if null then the "inner" value is assigned
			 * @param {"outer"|null} [type=null]
			 * @param {boolean} [includeOffset=false]
			 * @param {boolean} [includeMargin=false]
			 * @param {?string} [pseudoSelector=null]
			 * @param {boolean} [force=false] check even if element is hidden
			 * @return {number}
			 * @member ns.util.DOM
			 * @static
			 */
			function getElementWidth(element, type, includeOffset, includeMargin, pseudoSelector, force) {
				var width = 0,
					style,
					value,
					originalDisplay = null,
					originalVisibility = null,
					originalPosition = null,
					offsetWidth = 0,
					property,
					outer = (type && type === "outer") || false,
					props = {
						"width": 0,
						"margin-left": 0,
						"margin-right": 0,
						"padding-left": 0,
						"padding-right": 0,
						"border-left-width": 0,
						"border-right-width": 0,
						"box-sizing": ""
					};

				if (element) {
					style = element.style;

					if (style.display !== "none") {
						extractCSSProperties(element, props, pseudoSelector, true);
						offsetWidth = element.offsetWidth;
					} else if (force) {
						originalDisplay = style.display;
						originalVisibility = style.visibility;
						originalPosition = style.position;

						style.display = "block";
						style.visibility = "hidden";
						style.position = "relative";

						extractCSSProperties(element, props, pseudoSelector, true);

						style.display = originalDisplay;
						style.visibility = originalVisibility;
						style.position = originalPosition;
					}

					if(typeof props["width"] === 'string' && props["width"].indexOf("px") === -1) {
						//ignore non px values such as auto or %
						props["width"] = 0;
					}
					for (property in props) {
						if (props.hasOwnProperty(property) && property !== "box-sizing"){
							value = parseFloat(props[property]);
							if (isNaN(value)) {
								value = 0;
							}
							props[property] = value;
						}
					}

					width += props["width"];
					if (props["box-sizing"] !== 'border-box') {
						width += props["padding-left"] + props["padding-right"];
					}

					if (includeOffset) {
						width = offsetWidth;
					} else if (outer && props["box-sizing"] !== 'border-box') {
						width += props["border-left-width"] + props["border-right-width"];
					}

					if (includeMargin) {
						width += Math.max(0, props["margin-left"]) + Math.max(0, props["margin-right"]);
					}
				}
				return width;
			}

			/**
			 * Returns offset of element
			 * @method getElementOffset
			 * @param {HTMLElement} element
			 * @return {Object}
			 * @member ns.util.DOM
			 * @static
			 */
			function getElementOffset(element) {
				var left = 0,
					top = 0;
				do {
					top += element.offsetTop;
					left += element.offsetLeft;
					element = element.offsetParent;
				} while (element !== null);

				return {
					top: top,
					left: left
				};
			}

			/**
			 * Check if element occupies place at view
			 * @method isOccupiedPlace
			 * @param {HTMLElement} element
			 * @return {boolean}
			 * @member ns.util.DOM
			 * @static
			 */
			function isOccupiedPlace(element) {
				return !(element.offsetWidth <= 0 && element.offsetHeight <= 0);
			}

			function toUpperCaseFn(match, value) {
				return value.toLocaleUpperCase();
			}

			function dashesToCamelCase(str) {
				return str.replace(DASH_TO_UPPER_CASE_REGEXP, toUpperCaseFn);
			}

			function firstToUpperCase(str) {
				return str.charAt(0).toLocaleUpperCase() + str.substring(1);
			}

			/**
			 * Set values for element with prefixes for browsers
			 * @method setPrefixedStyle
			 * @param {HTMLElement} element
			 * @param {string} property
			 * @param {string|Object|null} value
			 * @member ns.util.DOM
			 * @static
			 */
			function setPrefixedStyle(element, property, value) {
				var style = element.style,
					propertyForPrefix = firstToUpperCase(dashesToCamelCase(property)),
					values = (typeof value === "string") ? {
						webkit: value,
						moz: value,
						o: value,
						ms: value,
						normal: value
					} : value;

				style[property] = values.normal;
				style["webkit" + propertyForPrefix] = values.webkit;
				style["moz" + propertyForPrefix] = values.moz;
				style["o" + propertyForPrefix] = values.o;
				style["ms" + propertyForPrefix] = values.ms;
			}

			/**
			 * Get value from element with prefixes for browsers
			 * @method getCSSProperty
			 * @param {string} value
			 * @return {Object}
			 * @member ns.util.DOM
			 * @static
			 */
			function getPrefixedValue(value) {
				return {
					webkit: "-webkit-" + value,
					moz: "-moz-" + value,
					o: "-ms-" + value,
					ms: "-o-" + value,
					normal: value
				};
			}

			/**
			 * Returns style value for css property with browsers prefixes
			 * @method getPrefixedStyle
			 * @param {HTMLStyle} styles
			 * @param {string} property
			 * @return {Object}
			 * @member ns.util.DOM
			 * @static
			 */
			function getPrefixedStyleValue(styles, property) {
				var prefixedProperties = getPrefixedValue(property),
					value,
					key;

				for (key in prefixedProperties) {
					value = styles[prefixedProperties[key]];
					if (value && value !== "none") {
						return value;
					}
				}
				return value;
			}


			// assign methods to namespace
			DOM.getCSSProperty = getCSSProperty;
			DOM.extractCSSProperties = extractCSSProperties;
			DOM.getElementHeight = getElementHeight;
			DOM.getElementWidth = getElementWidth;
			DOM.getElementOffset = getElementOffset;
			DOM.isOccupiedPlace = isOccupiedPlace;
			DOM.setPrefixedStyle = setPrefixedStyle;
			DOM.getPrefixedValue = getPrefixedValue;
			DOM.getPrefixedStyleValue = getPrefixedStyleValue;

			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return ns.util.DOM;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window, window.document, ns));