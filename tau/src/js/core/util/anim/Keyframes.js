/*global window, define, ns */
/*jslint nomen: true, plusplus: true */
/* Copyright (c) 2010 - 2014 Samsung Electronics Co., Ltd.
* License : MIT License V2
*/
/**
 * # Keyframes
 *
 * Keyframes class for easy keyframe css syntax creation and
 * managing. Each frame is specified as an element of an array 
 * with size 100.
 *
 * @example
 
 *		<div id="test"
 *				style="width: 10px; height: 10px; background: red;"></div>
 *
 *		<script>
 *		var frames = [{ "background-color": "red" }],
 *			anim,
 *			keys;
 *
 *		frames[100] = {"background-color": "blue"};
 *		keys = new tau.util.anim.Keyframes(frames);
 *		anim = new tau.util.anim.Animation({
 *				element: document.getElementById("test"),
 *				fillMode: "both",
 *				delay: "2s",
 *				duration: "5s",
 *				steps: keys,
 *				onEnd: function () {
 *					console.log("Yay, finished!");
 *				}
 *			});
 *		</script>
 *
 * @class ns.util.anim.Keyframes
 * @author Krzysztof Antoszek <k.antoszek@samsung.com>
 */
(function (document, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../../support",
			"../anim"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");
			/**
			 * Helper function for generating css string from
			 * @TODO the steps array could be propably be more
			 * optimized (most usages will use maybe up to 3-5
			 * array elements, when it has 100) but thats not
			 * important for the moment
			 * frames array
			 * @param {string} prefix
			 * @param {string} name
			 * @param {Array} steps
			 * @return {string}
			 * @private
			 * @static
			 * @method keyframesToString
			 * @member ns.utils.anim.Keyframes
			 */
			function keyframesToString(prefix, name, steps) {
				var buff = "@" + prefix + "keyframes " + name + " {",
					i,
					l,
					prop,
					step;
				for (i = 0, l = steps.length; i < l; ++i) {
					step = steps[i];
					if (!step) {
						continue;
					}
					buff += i + "% { ";
					for (prop in step) {
						if (step.hasOwnProperty(prop)) {
							buff += prop + ": " + step[prop] + "; ";
						}
					}
					buff += "} ";
				}
				buff += "} ";
				return buff;
			}
				// Reference to stylesheet
			var styleContainer = null,
				cssPropertyPrefix = ns.support.cssAnimationPrefix,
				Keyframes = function (steps) {
					var id = ns.getUniqueId(),
						element = null;
					if (!styleContainer) {
						element = document.createElement("style");
						// a text node hack, it forces the browser
						// to create a stylesheet object in the
						// HTMLStyleElement object, which we can 
						// then use
						element.appendChild(document.createTextNode(""));
						document.head.appendChild(element);
						styleContainer = element.sheet;
					}
					styleContainer.insertRule(keyframesToString(cssPropertyPrefix, id, steps),
							0);
					/**
					 * Keyframes rule reference
					 * @property {CSSRule} keyframes
					 * @readonly
					 */
					this.keyframes = styleContainer.rules[0];
					/**
					 * Keyframes name
					 * @property {string} id
					 * @readonly
					 */
					this.id = id;
				};

			/**
			 * Destroys keyframes and removes css references from stylesheet
			 * @method destroy
			 * @member ns.util.anim.Keyframes
			 */
			Keyframes.prototype.destroy = function () {
				var keyframes = this.keyframes,
					stylesheet = keyframes.parentStyleSheet,
					rules = stylesheet.rules,
					i,
					l;

				// no other way for removal than with index
				// and since it changes we have to search for it
				// :(
				for (i = 0, l = rules.length; i < l; ++i) {
					if (rules[i] === keyframes) {
						stylesheet.deleteRule(i);
						break;
					}
				}
			};

			ns.util.anim.Keyframes = Keyframes;
			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window.document, ns));
