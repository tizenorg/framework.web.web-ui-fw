/*global window, define, Object, Element */
/* 
 * Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/**
 * #Data Attributes Utility
 * Object menages data attributes
 * @class ns.util.data
 */
(function (window, document, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../util", // fetch namespace
			"../util/object",
			"../event"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");
			var hashMap = {},
				eventUtils = ns.event,
				objectUtils = ns.util.object,
				body = document.body,
				/**
				 * Return hash for object
				 * @method fetchDom
				 * @param {HTMLElement} element
				 * @param {string} key
				 * @return {?Object}
				 * @member ns.util.data
				 * @static
				 * @private
				 */
				fetchDom = function (element, key) {
					var dataKey = 'data-' + key,
						data,
						result;
					if (element.hasAttribute(dataKey)) {
						data = element.getAttribute(dataKey);
						try {
							result = JSON.parse(data);
						} catch (ignore) {}
					}
					return result;
				},
				/**
				 * Remove attribute from element
				 * @method removeDom
				 * @param {HTMLElement} element
				 * @param {string} key
				 * @member ns.util.data
				 * @static
				 * @private
				 */
				removeDom = function (element, key) {
					var dataKey = 'data-' + key;
					if (element.hasAttribute(dataKey)) {
						element.removeAttribute(dataKey);
					}
				},
				/**
				 * Return hash for object
				 * @method hashObject
				 * @param {*} value
				 * @return {string}
				 * @member ns.util.data
				 * @static
				 * @private
				 */
				hashObject = function (value) {
					if (value === undefined ||
							value === null ||
							value === false) {
						throw "Hashed object/primitive can not be undefined, null or false";
					}

					if (value instanceof Element && value.hasAttribute("data-ns-hash")) {
						return value.getAttribute("data-ns-hash");
					}

					if (value instanceof Object) {
						value.__tau_hash = value.__tau_hash || ns.getUniqueId();
					}
					var h = (typeof value) + "-" + (value instanceof Object ?
								value.__tau_hash : value.toString());

					if (value instanceof Element) {
						value.setAttribute("data-ns-hash", h);
					}
					return h;
				};

			ns.util.data = {
				/**
				 * Set value for element
				 * @method set
				 * @param {HTMLElement} element
				 * @param {string} key
				 * @param {*} value
				 * @return {*}
				 * @member ns.util.data
				 * @static
				 */
				set: function (element, key, value) {
					var hash = hashObject(element);
					if (!hash) {
						return false;
					}

					if (!hashMap[hash]) {
						hashMap[hash] = {};
					}

					hashMap[hash][key] = value;

					if (element instanceof Element) {
						eventUtils.trigger(element, "setData", {"key": key, "value": value});
					}
					eventUtils.trigger(body, "globalSetData", {"element": element, "key": key, "value": value});

					return value;
				},

				/**
				 * Get value for element
				 * @method get
				 * @param {HTMLElement} element
				 * @param {string} key
				 * @param {?*} defaultValue
				 * @return {Mixed}
				 * @member ns.util.data
				 * @static
				 */
				get: function (element, key, defaultValue) {
					var hash = hashObject(element),
						value;
					if (hash) {
						if (hashMap[hash] && hashMap[hash][key] !== undefined) {
							value = hashMap[hash][key];
						}

						if (element instanceof Element) {
							if (value === undefined) {
								value = fetchDom(element, key);
								// pass it to memory HashMap
								hashMap[hash] = hashMap[hash] || {};
								hashMap[hash][key] = hashMap[hash][key] || value;
							}
							eventUtils.trigger(element, "getData", {"key": key, "value": value});
						}
						eventUtils.trigger(body, "globalGetData", {"element": element, "key": key, "value": value});

						return value;
					}

					return defaultValue;
				},

				/**
				 * remove value for element
				 * @method remove
				 * @param {HTMLElement} element
				 * @param {string} key
				 * @return {boolean}
				 * @member ns.util.data
				 * @static
				 */
				remove: function (element, key) {
					var hash = hashObject(element),
						value;

					if (hash && hashMap[hash] && hashMap[hash][key] !== undefined) {
						value = hashMap[hash][key];

						// Delete keyword has a performance impact on the execution, that's why we assign undefined
						hashMap[hash][key] = undefined;

						// If any property is defined we cannot clear the hashMap[hash]
						if (objectUtils.hasPropertiesOfValue(hashMap[hash], undefined)) {
							hashMap[hash] = undefined;
						}

						if (element instanceof Element) {
							removeDom(element, key);
							eventUtils.trigger(element, "removeData", {"key": key, "value": value});
						}
						eventUtils.trigger(body, "globalRemoveData", {"element": element, "key": key, "value": value});

						return true;
					}
					return false;
				}
			};
			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return ns.util.data;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window, window.document, ns));
