/*global window: false, define: false, Image: false,
  setTimeout: false, clearTimeout: false, Date: false,
  console: false */
/*
 * Copyright (c) 2013 - 2014 Samsung Electronics Co., Ltd
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
/*jslint nomen: true, plusplus: true, bitwise: true */
/**
 * # Gallery 3D widget
 * The gallery 3D widget enables 3-dimensional arranging and handling of images.
 *
 * The Gallery3D widget displays images along a curved path on a 3-dimensional coordinate system.
 *
 * ## Default selectors
 * In default all elements with _data-role=gallery3d_ or class _.ui-gallery3d_ are changed to Tizen Web UI Gallery3D
 *
 *		@example
 *		<div id="gallery3d" data-role="gallery3d"></div>
 *
 * ## Manual constructor
 *
 * #### Create Gallery3D widget using tau method:
 *
 *		@example
 *		<div id="gallery3d"></div>
 *		<script>
 *			var gallery3d = tau.widget.Gallery3D(document.getElementById("gallery3d"));
 *		</script>
 *
 * #### Create Gallery3D widget using jQueryMobile notation:
 *
 *		@example
 *		<div id="gallery3d"></div>
 *		<script>
 *			var gallery3d = $("#gallery3d").gallery3d();
 *		</script>
 *
 * ## Options
 *
 * ### Thumbnail Cache
 * Determines whether to cache and resize images.
 *
 * To improve performance, the size of image(s) displayed on the screen should be a square (under 128X128 pixels).
 * _data-thumbnail-cache_ option resizes the gallery images under 128x128 pixels and stores the images on a local storage.
 * So when a Gallery3D widget is re-launched, the widget reuses the storage and the launching time can be improved.
 * A browser or web runtime engine must support _Web Storage_ feature to use this option.
 *
 *		@example
 *		<div id="gallery3d" data-role="gallery3d" data-thumbnail-cache="true"></div>
 *
 * ## Events
 *
 * ### select
 * Triggered when an image is selected.
 *
 *		@example
 *		<div id="gallery3d"></div>
 *		<script>
 *			var element = document.getElementById("gallery3d"),
 *				gallery3d = tau.widget.Gallery3D(element);
 *
 *			gallery3d.add("1.jpg")
 *				.add("2.jpg")
 *				.add("3.jpg");
 *
 *			// add the event handler by the method of built-in widget
 *			gallery3d.on("select", function (event) {
 *				// Handle the select event
 *				var urlOfImage = event.detail.src;
 *			});
 *		</script>
 *
 * ##### or using standard JavaScript method
 *
 *		@example
 *		<div id="gallery3d"></div>
 *		<script>
 *			var element = document.getElementById("gallery3d"),
 *				gallery3d = tau.widget.Gallery3D(element);
 *
 *			gallery3d.add("1.jpg")
 *				.add("2.jpg")
 *				.add("3.jpg");

 *			element.addEventListener("select", function (event) {
 *				// Handle the select event
 *				var urlOfImage = event.detail.src;
 *			}, false);
 *		</script>
 *
 * ##### or JQueryMobile notation:
 *
 *		@example
 *		<div id="gallery3d"></div>
 *		<script>
 *			$("#gallery3d").gallery3d()
 *				.gallery3d("add", "1.jpg")
 *				.gallery3d("add", "2.jpg")
 *				.gallery3d("add", "3.jpg")
 *				.on("select", function (event) {
 *					// Handle the select event
 *					var urlOfImage = event.detail.src;
 *				});
 *		</script>
 *
 * Full list of available events is in [events list section](#events-list).
 *
 * ## Methods
 *
 * To call method on widget you can use tau API:
 *
 *		@example
 *		<div id="gallery3d"></div>
 *		<script>
 *			var element = document.getElementById("gallery3d"),
 *				gallery3d = tau.widget.Gallery3D(element);
 *
 *			gallery3d.methodName(methodArgument1, methodArgument2, ...);
 *
 *			// or JQueryMobile notation with chaining:
 *			$(element).gallery3d("methodName", methodArgument1, methodArgument2, ...);
 *		</script>
 *
 * @class ns.widget.mobile.Gallery3D
 * @extends ns.widget.BaseWidget
 */
(function (window, document, ns, Math, localStorage) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../../../../core/engine",
			"../../../../core/util",
			"../../../../core/util/DOM/css",
			"../../../../core/util/object",
			"../../../../core/util/easing",
			"../../../../core/util/bezierCurve",
			"../../../../jqm/support",
			"../mobile", // fetch namespace
			"./BaseWidgetMobile",
			"../../../../../../libs/gl-matrix.1.3.7.js"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");

			var nodePattern = {
					vertices: [
						-1.0, -1.0, 0.0,
						1.0, -1.0, 0.0,
						1.0,  1.0, 0.0,
						-1.0,  1.0, 0.0
					],
					textureCoords: [
						1.0, 0.0,
						0.0, 0.0,
						0.0, 1.0,
						1.0, 1.0
					],
					normalVectors: [
						0.0, 0.0, 1.0,
						0.0, 0.0, 1.0,
						0.0, 0.0, 1.0,
						0.0, 0.0, 1.0
					],
					texture: null,
					textureBuffer: null,
					textureBufferItemSize: 0,
					mashOrder: [],
					mvMatrix: null,
					level: -1,
					targetLevel: 0,
					drawable: false,
					image: null,
					imageID: 0
				},
				glMatrix = {},
				VERTEX_SHADER = "attribute vec3 aVertexPosition;" +
					"attribute vec2 aTextureCoord;" +
					"attribute vec3 aVertexNormal;" +
					"uniform mat4 uMoveMatrix;" +
					"uniform mat4 uPerspectiveMatrix;" +
					"uniform mat3 nNormalMatrix;" +
					"uniform vec3 uAmbientColor;" +
					"uniform vec3 uLightDirection;" +
					"uniform vec3 uDirectionColor;" +
					"uniform vec3 uLightDirection_first;" +
					"uniform vec3 uLightDirection_second;" +
					"varying vec2 vTextureCoord;" +
					"varying vec3 vLightWeight;" +
					"varying vec4 vFogWeight;" +

					"void main(void) {" +
					"   vec4 v_Position = uMoveMatrix * vec4(aVertexPosition, 1.0);" +
					"   gl_Position = uPerspectiveMatrix * v_Position;" +
					"   vTextureCoord = aTextureCoord;" +
					"   float fog = 1.0 - ((gl_Position.z + 1.5) / 60.0);" +
					"   vFogWeight = clamp(vec4(fog, fog, fog, 1.0), 0.6, 1.0);" +
					"   vec3 transNormalVector = nNormalMatrix * aVertexNormal;" +

					"   float vLightWeightFirst = 0.0;" +
					"   float vLightWeightSecond = max(dot(transNormalVector, uLightDirection_second), 0.0);" +
					"   vLightWeight = uAmbientColor + uDirectionColor * vLightWeightSecond;" +
					"}",
				FRAGMENT_SHADER = "precision mediump float;" +
					"varying vec2 vTextureCoord;" +
					"varying vec3 vLightWeight;" +
					"uniform sampler2D uSampler;" +
					"varying vec4 vFogWeight;" +

					"void main(void) {" +
					"   vec4 TextureColor;" +
					"   if (vTextureCoord.s <= 0.01 || vTextureCoord.s >= 0.99 || vTextureCoord.t <= 0.01 || vTextureCoord.t >= 0.99) {" +
					"	TextureColor = vec4(1.0, 1.0, 1.0, 0.5);" +
					"   } else {" +
					"	TextureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));" +
					"   }" +
					"   TextureColor *= vFogWeight;" +
					"   gl_FragColor = vec4(TextureColor.rgb * vLightWeight, TextureColor.a);" +
					"}",
				GlArray32 = window.Float32Array === undefined ?
						(window.WebGLFloatArray === undefined ? Array : window.WebGLFloatArray) : window.Float32Array,
				GlArray16 = window.Uint16Array === undefined ? Array : window.Uint16Array,
				degreeToRadian = function (degree) {
					return degree * Math.PI / 180;
				},
				getContext3D = function (canvas) {
					var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
					if (gl === null) {
						// @issue phantomjs doesn't support webgl
						throw "Unfortunately, there's a WebGL compatibility problem.\nYou may want to check your system settings.";
					}
					return gl;
				},
				MAX_ITEM_COUNT = 28,
				ANIMATION_END = 999,
				DURATION_DEFAULT = 300,
				VIEWPORT_WIDTH = 1024,
				VIEWPORT_HEIGHT = 456,
				DIRECTION_LEFT = -1,
				DIRECTION_RIGHT = +1,

				// @todo: temporary implementation;
				//-------- WEBGL SHADER HELPER -----
				webgl = {
					shader: {
						_vertexShader: null,
						_fragmentShader: null,

						deleteShaders: function (gl) {
							gl.deleteShader(this._vertexShader);
							gl.deleteShader(this._fragmentShader);
						},

						addShaderProgram: function (gl, vs, fs, isFile) {
							var shaderProgram,
								vertexShaderSource = {},
								fragmentShaderSource = {};

							if (isFile) {
								//@todo loading shaders from file
								console.warn("laod shader from file is not supported");
							} else {
								vertexShaderSource.source = vs;
								fragmentShaderSource.source = fs;
							}

							this._vertexShader = this.getShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
							this._fragmentShader = this.getShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

							shaderProgram = gl.createProgram();
							gl.attachShader(shaderProgram, this._vertexShader);
							gl.attachShader(shaderProgram, this._fragmentShader);
							gl.linkProgram(shaderProgram);

							if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
								window.alert("Could not initialize Shaders!");
							}
							return shaderProgram;
						},

						getShader: function (gl, type, script) {
							var shader;

							if (!gl || !type || !script) {
								return null;
							}

							shader = gl.createShader(type);

							gl.shaderSource(shader, script.source);
							gl.compileShader(shader);

							if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
								window.alert(gl.getShaderInfoLog(shader));
								gl.deleteShader(shader);
								return null;
							}
							return shader;
						}
					},
					buffer: {
						attribBufferData: function (gl, attribArray) {
							var attribBuffer = gl.createBuffer();

							gl.bindBuffer(gl.ARRAY_BUFFER, attribBuffer);
							gl.bufferData(gl.ARRAY_BUFFER, attribArray, gl.STATIC_DRAW);
							gl.bindBuffer(gl.ARRAY_BUFFER, null);

							return attribBuffer;
						}
					}
				},

				//------------- IMAGE LOADER ------
				_canvas = document.createElement("canvas"),
				_context = _canvas.getContext("2d"),

				fileSystemErrorMessage = function (e) {
					var FileError = window.FileError,
						msg = "";
					switch (e.code) {
					case FileError.QUOTA_EXCEEDED_ERR:
						msg = "QUOTA_EXCEEDED_ERR";
						break;
					case FileError.NOT_FOUND_ERR:
						msg = "NOT_FOUND_ERR";
						break;
					case FileError.SECURITY_ERR:
						msg = "SECURITY_ERR";
						break;
					case FileError.INVALID_MODIFICATION_ERR:
						msg = "INVALID_MODIFICATION_ERR";
						break;
					case FileError.INVALID_STATE_ERR:
						msg = "INVALID_STATE_ERR";
						break;
					default:
						msg = "Unknown Error";
						break;
					}
					return msg;
				},

				getInternalURLFromURL = function (url) {
					return url.replace(/\//gi, "_");
				},

				resize = function (imagewidth, imageheight, thumbwidth, thumbheight, fit) {
					var w = 0, h = 0, x = 0, y = 0,
						widthratio = imagewidth / thumbwidth,
						heightratio = imageheight / thumbheight,
						maxratio = Math.max(widthratio, heightratio);

					if (fit) {
						w = thumbwidth;
						h = thumbheight;
					} else {
						if (maxratio > 1) {
							w = imagewidth / maxratio;
							h = imageheight / maxratio;
						} else {
							w = imagewidth;
							h = imageheight;
						}
						x = (thumbwidth - w) / 2;
						y = (thumbheight - h) / 2;
					}

					return {w: w, h: h, x: x, y: y};
				},

				getThumbnail = function (img, thumbwidth, thumbheight, fit) {
					var dimensions, url;
					_canvas.width = thumbwidth;
					_canvas.height = thumbheight;
					dimensions = resize(img.width, img.height, thumbwidth, thumbheight, fit);
					_context.fillStyle = "#000000";
					_context.fillRect(0, 0, thumbwidth, thumbheight);
					_context.drawImage(img, dimensions.x, dimensions.y, dimensions.w, dimensions.h);
					url = _canvas.toDataURL();
					return url;
				},

				imageloader = {
					_grantedBytes: 1024 * 1024,
					getThumbnail: function (url, callback) {
						var internalURL  = getInternalURLFromURL(url),
							canvasDataURI;
						try {
							canvasDataURI = localStorage.getItem(internalURL);
							if (typeof callback === TYPE_FUNCTION) {
								callback((canvasDataURI === null) ? "NOT_FOUND_ERR" : canvasDataURI);
							}
						} catch (e) {
							if (typeof callback === TYPE_FUNCTION) {
								callback((e.type === "non_object_property_load") ? "NOT_FOUND_ERR" : null);
							}
						}
					},

					setThumbnail: function (url, callback, thumbWidth, thumbHeight, fit) {
						var image = new Image(),
							internalURL,
							canvasDataURI,
							onError = function (e) {
								var msg = fileSystemErrorMessage(e);
								if (typeof callback === TYPE_FUNCTION) {
									callback((msg === "NOT_FOUND_ERR") ? msg : null);
								}
							},
							onLoad = function () {
								internalURL = getInternalURLFromURL(url);
								canvasDataURI = getThumbnail(this, thumbWidth, thumbHeight, fit);
								try {
									localStorage.setItem(internalURL, canvasDataURI);
									if (typeof callback === TYPE_FUNCTION) {
										callback(canvasDataURI);
									}
								} catch (e) {
									if (typeof callback === TYPE_FUNCTION) {
										callback((e.type === "non_object_property_load") ? "NOT_FOUND_ERR" : null);
									}
								}
							};

						thumbWidth = thumbWidth || 128;
						thumbHeight = thumbHeight || 128;
						fit = fit || true;

						image.addEventListener("load", onLoad, false);
						image.addEventListener("error", onError, false);

						image.src = url;
					},

					removeThumbnail: function (url) {
						var internalURL;
						internalURL = getInternalURLFromURL(url);
						try {
							localStorage.removeItem(internalURL);
						} catch (e) {
							throw e;
						}
					}
				},

				/**
				 * Gallery3D event types
				 * @property {Object} eventType
				 * @static
				 * @readonly
				 * @member ns.widget.mobile.Gallery3D
				 */
				eventType = {
					/**
					 * Triggered when an image is selected.
					 * @event select
					 * @member ns.widget.mobile.Gallery3D
					 */
					SELECT: "select"
				},

				BaseWidget = ns.widget.mobile.BaseWidgetMobile,
				/**
				 * Alias for class {@link ns.engine}
				 * @property {Object} engine
				 * @member ns.widget.mobile.Gallery3D
				 * @private
				 * @static
				 */
				engine = ns.engine,
				/**
				 * Alias for class {@link ns.jqm.support}
				 * @property {Object} support
				 * @member ns.widget.mobile.Gallery3D
				 * @private
				 * @static
				 */
				support = ns.jqm.support,
				/**
				 * Alias for class {@link ns.util.DOM}
				 * @property {Object} utilsDOM
				 * @member ns.widget.mobile.Gallery3D
				 * @private
				 * @static
				 */
				utilsDOM = ns.util.DOM,
				/**
				 * Alias for class {@link ns.util.object}
				 * @property {Object} utilsObject
				 * @member ns.widget.mobile.Gallery3D
				 * @private
				 * @static
				 */
				utilsObject = ns.util.object,
				/**
				 * Alias for class {@link ns.util.easing}
				 * @property {Object} easing
				 * @member ns.widget.mobile.Gallery3D
				 * @private
				 * @static
				 */
				easing = ns.util.easing,
				/**
				 * Alias for class {@link ns.util.bezierCurve}
				 * @property {Object} bezierCurve
				 * @member ns.widget.mobile.Gallery3D
				 * @private
				 * @static
				 */
				bezier = ns.util.bezierCurve,
				/**
				 * Alias for function ns.util.requestAnimationFrame
				 * @property {Function} requestAnimationFrame
				 * @member ns.widget.mobile.Gallery3D
				 * @private
				 * @static
				 */
				requestAnimationFrame = ns.util.requestAnimationFrame,
				/**
				 * Alias for function ns.util.cancelAnimationFrame
				 * @property {Function} cancelAnimationFrame
				 * @member ns.widget.mobile.Gallery3D
				 * @private
				 * @static
				 */
				cancelAnimationFrame = ns.util.cancelAnimationFrame,
				/**
				 * Local cache of function type name
				 * @property {string} [TYPE_FUNCTION="function"]
				 * @private
				 * @static
				 * @member ns.widget.mobile.Listview.FastScroll
				 */
				TYPE_FUNCTION = "function",

				touchStartEvt = (support.touch ? "touchstart" : "mousedown"),
				touchMoveEvt = (support.touch ? "touchmove" : "mousemove"),
				touchEndEvt = (support.touch ? "touchend" : "mouseup"),
				touchMoveEvtGallery = touchMoveEvt + ".gallery3d",
				touchEndEvtGallery = touchEndEvt + ".gallery3d",

				/**
				 * Alias for object ns.widget.mobile.Gallery3D.classes
				 * @property {Object} classes
				 * @member ns.widget.mobile.Gallery3D
				 * @static
				 * @private
				 * @property {string} uiGallery3D Main class of gallery 3D
				 * @property {string} uiGallery3DCanvas Class of gallery 3D view
				 */
				classes = {
					uiGallery3D: "ui-gallery3d",
					uiGallery3DCanvas: "ui-gallery3d-canvas"
				},

				Gallery3D = function () {
					/**
					 * @property {Object} options Object with default options
					 * @member ns.widget.mobile.Gallery3D
					 */
					this.options = {};
				};

			window.initGlMatrix(glMatrix);

			Gallery3D.prototype = new BaseWidget();

			Gallery3D.classes = classes;

			/**
			 * Prepare default configuration of galery 3D widget
			 * @method _configure
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._configure = function () {
				this.options.thumbnailCache = false;
			};

			/**
			 * Destroy gallery 3D widget
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			var element = document.getElementById("gallery3d"),
			 *				gallery3d = tau.widget.Gallery3D(element);
			 *
			 *			gallery3d.add("1.jpg")
			 *				.add("2.jpg")
			 *				.add("3.jpg")
			 *				.on("gallery3dinit", function () {
			 *					gallery3d.destroy();
			 *				});
			 *		</script>
			 *
			 * or jQueryMobile notation:
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			$("#gallery3d").gallery3d()
			 *				.gallery3d("add", "1.jpg")
			 *				.gallery3d("add", "2.jpg")
			 *				.gallery3d("add", "3.jpg");
			 *				.on("gallery3dinit", function () {
			 *					$("#gallery3d").gallery3d("destroy");
			 *				});
			 *		</script>
			 *
			 * @method destroy
			 * @member ns.widget.mobile.Gallery3D
			 */
			/**
			 * Destroy gallery 3D widget
			 * @method _destroy
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._destroy = function () {
				var self = this;
				self._imageList.length = 0;
				self._path.length = 0;
				self._final();
			};

			/**
			 * Initialize Gallery 3D widget
			 * @method _init
			 * @param {HTMLElement} element
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._init = function (element) {
				var self = this,
					canvas = self._canvas;
				if (!self.element) {
					self.element = element;
				}
				if (!canvas) {
					self._canvas = canvas = element.querySelector("canvas");
				}
				self._gl = null;
				self._shaderProgram = null;
				self._positionBuffer = null;
				self._textureCoordBuffer = null;
				self._normalVectorBuffer = null;
				self._nodes = null;
				self._pMatrix = null;
				self._animationID = 0;
				self._startTime = 0;
				self._sumTime = 0;
				self._lightsPositionStack = [
					[0.0, 0.0, -1.0],   // back
					[-0.2, 0.0, 0.7]	// front
				];
				self._path = null;
				self._swipeThresholdOfBasetimeGap = (support.touch ? 30 : 70);
				self._swipeThresholdOfSensitivity = (support.touch ? 2.0 : 10.0);
				self._imageList = [];
				self._maxDrawLength = 0;
				self._firstImageNumber = 0;
				self._lastImageNumber = 0;
				self._operationQueue = [];
				self._dragInterval = 1000 / 30; // 30fps

				self._initGallery(canvas);
			};

			/**
			 * Build structure of gallery
			 * @method _build
			 * @param {HTMLElement} element
			 * @return {HTMLElement}
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._build = function (element) {
				var self = this,
					canvas;

				canvas = document.createElement("canvas");
				canvas.className = classes.uiGallery3DCanvas;
				self.element = element;
				self._canvas = canvas;
				element.classList.add(classes.uiGallery3D);
				element.appendChild(canvas);

				return element;
			};

			/**
			 * Initialize Gallery:
			 * - take GL context,
			 * - init: shaders, textures,
			 * @method _initGallery
			 * @param {HTMLElement} canvas
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._initGallery = function (canvas) {
				var self = this,
					pathPoints = [
						[40, 0, -48],
						[-12, 0, -40],  // contorl Point of Point1
						[24, 0, -9],	// contorl Point of Point2
						[-5, 0, -5]
					],
					i;

				canvas = canvas || self._canvas;
				if (!canvas) {
					return;
				}

				self._gl = self._gl || self._initGL(canvas);
				if (!self._gl) {
					return;
				}

				if (!self._imageList) {
					return;
				}

				self._shaderProgram = self._shaderProgram || self._initShader(self._gl);
				if (!self._shaderProgram) {
					return;
				}

				if (self._imageList.length > MAX_ITEM_COUNT) {
					self._firstImageNumber = self._imageList.length - 1;
					self._lastImageNumber = MAX_ITEM_COUNT - 1;
				}

				self._nodes = self._initBuffers(self._gl, self._shaderProgram);

				self._initTextures(self._gl, self._nodes);

				self._path = bezier.init({
					points: pathPoints,
					maxLevel: MAX_ITEM_COUNT
				});

				for (i = 0; i < self._nodes.length; i += 1) {
					self._path.levels[i] = self._path.levels[i + 1] || 0;
					self._nodes[i].level = i;
				}

				this._setPosition(ANIMATION_END, DIRECTION_RIGHT);

				while (this._operationQueue.length) {
					this._setPosition(ANIMATION_END, this._operationQueue.shift());
				}

			};

			/**
			 * Clear widget
			 * - removing textures,
			 * - clearing buffers,
			 * - release GL context
			 * @method _final
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._final = function () {
				var self = this,
					gl = self._gl;

				if (!gl) {
					return;
				}

				clearTimeout(this._imageLoadTimer);
				this._imageLoadTimer = null;

				self._stop();

				self._nodes.forEach(function (node) {
					if (node.texture) {
						gl.deleteTexture(node.texture);
						node.texture = null;
						node.image = null;
					}
				});
				this._nodes.length = 0;

				gl.deleteBuffer(self._positionBuffer);
				self._positionBuffer = null;
				gl.deleteBuffer(self._textureCoordBuffer);
				self._textureCoordBuffer = null;
				gl.deleteBuffer(self._normalVectorBuffer);
				self._normalVectorBuffer = null;

				webgl.shader.deleteShaders(gl);
				gl.deleteProgram(self._shaderProgram);
				self._shaderProgram = null;

				self._gl = gl = null;
			};

			/**
			 * Adding the touch handlers to gallery
			 * - scrolling gallery left/right on touch/mouse move
			 * @method _addTouchHandlers
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._addTouchHandlers = function () {
				var self = this,
					view = self.element,
					canvas = self._canvas,
					onTouchStart;

				onTouchStart = function (e) {
					var i = 0,
						startX = 0,
						deltaMaxSteps = 20,
						deltas = [deltaMaxSteps],
						deltaTimes = [deltaMaxSteps],
						deltaIndex = 0,
						dragValue = 0,
						dragDirection = false,
						prevTime = 0,
						onTouchMove,
						onTouchEnd,
						onTouchMoveGallery,
						onTouchEndGallery;

					e.preventDefault();
					e.stopPropagation();

					if (self._imageList.length <= 1) {
						return;
					}

					self._stop();

					startX =  support.touch ? e.changedTouches[0].pageX : e.pageX;
					prevTime = Date.now();

					for (i = 0; i < deltaMaxSteps; i += 1) {
						deltas[i] = startX;
						deltaTimes[i] = Date.now();
					}

					deltaIndex += 1;

					onTouchMoveGallery = function (e) {
						var x, dx, interval;

						e.preventDefault();
						e.stopPropagation();

						x =  support.touch ? e.detail.changedTouches[0].pageX : e.detail.pageX;
						dx = startX - x;

						deltas[deltaIndex] = x;
						deltaTimes[deltaIndex] = Date.now();
						interval = deltaTimes[deltaIndex] - prevTime;

						deltaIndex = (deltaIndex + 1) % deltaMaxSteps;
						// Validation of drag
						if (Math.abs(dx) >= 10 && interval >= self._dragInterval) {
							if (dragDirection !== ((dx < 0) ? DIRECTION_RIGHT : DIRECTION_LEFT)) {
								dragValue = 0;
								dragDirection = (dx < 0) ? DIRECTION_RIGHT : DIRECTION_LEFT;
							}

							dragValue += Math.abs(dx) / 100;
							if (dragValue >= 1) {
								self._setPosition(ANIMATION_END, dragDirection);
								dragValue = 0;
							} else {
								self._setPosition(dragValue, dragDirection);
							}
							self._drawScene();
							startX = x;
							prevTime = Date.now();
						}
					};
					onTouchEndGallery = function (e) {
						var baseTime,
							recent = -1,
							index = 0,
							previous = 0,
							baseTimeRatio = 0,
							fx = 0,
							lastX,
							velocityX = 0,
							isSwipe = true,
							direction;

						e.preventDefault();
						e.stopPropagation();

						// Validation of swipe
						baseTime = Date.now() - self._swipeThresholdOfBasetimeGap;
						lastX = support.touch ? e.detail.changedTouches[0].pageX : e.detail.pageX;
						startX = 0;
						for (i = 0; i < deltaMaxSteps; i += 1) {
							index = (deltaIndex + i) % deltaMaxSteps;
							if (deltaTimes[index] > baseTime) {
								recent = index;
								break;
							}
						}
						if (recent < 0) {
							isSwipe = false;
						}

						if (isSwipe) {
							previous = recent;
							for (i = 0; i < deltaMaxSteps; i += 1) {
								previous = (previous - 1 + deltaMaxSteps) % deltaMaxSteps;
								if (deltaTimes[previous] < deltaTimes[recent]) {
									break;
								}
							}
							// too slow or too fast
							if (i === deltaMaxSteps || baseTime < deltaTimes[previous]) {
								isSwipe = false;
							}
						}

						if (isSwipe) {
							baseTimeRatio = (baseTime - deltaTimes[previous]) / (deltaTimes[recent] - deltaTimes[previous]);
							fx = (1.0 - baseTimeRatio) * deltas[previous] + baseTimeRatio * deltas[recent];
							if (Math.abs(fx - lastX) < self._swipeThresholdOfSensitivity) {
								fx = lastX;
							}
							velocityX = parseInt((lastX - fx) / (Date.now() - baseTime), 10);
						}

						if (isSwipe && velocityX) {
							direction = (velocityX < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
							self._run(direction, Math.abs(velocityX), dragValue);
						} else if (dragDirection !== 0 && dragValue) {
							self._animate(null, DURATION_DEFAULT * (1 - dragValue), dragDirection, 0, dragValue);
						}

						view.removeEventListener(touchMoveEvtGallery, onTouchMoveGallery, false);
						view.removeEventListener(touchEndEvtGallery, onTouchEndGallery, false);
					};

					view.addEventListener(touchMoveEvtGallery, onTouchMoveGallery, false);
					view.addEventListener(touchEndEvtGallery, onTouchEndGallery, false);

					onTouchMove = function (e) {
						self.trigger(touchMoveEvtGallery, e);
					};
					onTouchEnd = function (e) {
						self.trigger(touchEndEvtGallery, e);
						document.removeEventListener(touchMoveEvt, onTouchMove, false);
						document.removeEventListener(touchEndEvt, onTouchEnd, false);
					};
					document.addEventListener(touchMoveEvt, onTouchMove, false);
					document.addEventListener(touchEndEvt, onTouchEnd, false);
				};
				canvas.addEventListener(touchStartEvt, onTouchStart, false);
			};

			/**
			 * Initializing GL context
			 * @method _initGL
			 * @param {HTMLCanvasElement} canvas
			 * @return {?WebGLRenderingContext}
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._initGL = function (canvas) {
				var self = this,
					mat4 = glMatrix.mat4,
					gl;

				gl = getContext3D(canvas);
				if (!gl) {
					return null;
				}

				gl.enable(gl.BLEND);
				gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

				gl.enable(gl.DEPTH_TEST);
				gl.depthFunc(gl.LEQUAL);

				// Fit the canvas size to Gallery3D widget
				canvas.style.width = "100%";

				// Set the drawing buffer size of the canvas
				canvas.width = VIEWPORT_WIDTH;
				canvas.height = VIEWPORT_HEIGHT;

				gl.viewportWidth = canvas.width;
				gl.viewportHeight = canvas.height;
				gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
				self._pMatrix = mat4.create();
				mat4.perspective(40, gl.viewportWidth / gl.viewportHeight, 0.1, 10000.0, self._pMatrix);

				gl.clearColor(0.15, 0.15, 0.15, 1.0);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

				return gl;
			};

			/**
			 * Initializing shader program
			 * - enabling atributes
			 * @method _initShader
			 * @param {WebGLRenderingContext} gl
			 * @return {WebGLProgram}
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._initShader = function (gl) {
				var self = this,
					shaderProgram;

				shaderProgram = webgl.shader.addShaderProgram(self._gl, VERTEX_SHADER, FRAGMENT_SHADER);
				gl.useProgram(shaderProgram);

				shaderProgram.vertexPositionAttr = gl.getAttribLocation(shaderProgram, "aVertexPosition");
				gl.enableVertexAttribArray(shaderProgram.vertexPositionAttr);

				shaderProgram.textureCoordAttr = gl.getAttribLocation(shaderProgram, "aTextureCoord");
				gl.enableVertexAttribArray(shaderProgram.textureCoordAttr);

				// Set light normal vectors for lighting~
				shaderProgram.vertexNormalAttr = gl.getAttribLocation(shaderProgram, "aVertexNormal");
				gl.enableVertexAttribArray(shaderProgram.vertexNormalAttr);

				shaderProgram.perspectiveMU = gl.getUniformLocation(shaderProgram, "uPerspectiveMatrix");
				shaderProgram.transformMU = gl.getUniformLocation(shaderProgram, "uMoveMatrix");
				shaderProgram.sampleUniform = gl.getUniformLocation(shaderProgram, "uSampler");

				// Set light variables~
				shaderProgram.normalMU = gl.getUniformLocation(shaderProgram, "nNormalMatrix");
				shaderProgram.ambientColorU = gl.getUniformLocation(shaderProgram, "uAmbientColor");
				shaderProgram.lightDirU_first = gl.getUniformLocation(shaderProgram, "uLightDirection_first");
				shaderProgram.lightDirU_second = gl.getUniformLocation(shaderProgram, "uLightDirection_second");
				shaderProgram.directionColorU = gl.getUniformLocation(shaderProgram, "uDirectionColor");

				return shaderProgram;
			};

			/**
			 * Initializing GL buffers
			 * Buffers of:
			 * - vertex positions,
			 * - textur positions,
			 * - normal vectors
			 * @method _initBuffers
			 * @param {WebGLRenderingContext} gl
			 * @param {WebGLProgram} shaderProgram
			 * @return {Object[]} Array of object cloned from nodePattern
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._initBuffers = function (gl, shaderProgram) {
				var self = this,
					i,
					len,
					mashBase = 0,
					vertices = [],
					textureCoords = [],
					normalVectors = [],
					nodes = [];

				for (i = 0, len = self._imageList.length + 1; i < len; i += 1) {
					nodes[i] = utilsObject.merge({}, nodePattern);
					utilsObject.merge(vertices, nodes[i].vertices);
					utilsObject.merge(textureCoords, nodes[i].textureCoords);
					utilsObject.merge(normalVectors, nodes[i].normalVectors);

					nodes[i].textureBuffer = gl.createBuffer();
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, nodes[i].textureBuffer);
					mashBase = 0;
					nodes[i].meshOrder = [
						mashBase, mashBase + 1, mashBase + 2,
						mashBase + 2, mashBase + 3, mashBase
					];
					gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new GlArray16(nodes[i].meshOrder), gl.STATIC_DRAW);
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null); // release buffer memory
					nodes[i].textureBufferItemSize = 6;
				}

				self._positionBuffer = webgl.buffer.attribBufferData(gl, new GlArray32(vertices));
				self._positionBuffer.itemSize = 3;

				self._textureCoordBuffer = webgl.buffer.attribBufferData(gl, new GlArray32(textureCoords));
				self._textureCoordBuffer.itemSize = 2;

				self._normalVectorBuffer = webgl.buffer.attribBufferData(gl, new GlArray32(normalVectors)); // Vertex's normal vector for Direction light
				self._normalVectorBuffer.itemSize = 3;

				// Ambient light
				gl.uniform3f(shaderProgram.ambientColorU, 0.1, 0.1, 0.1);
				// Direction light
				gl.uniform3f(shaderProgram.directionColorU, 1.0, 1.0, 1.0);

				return nodes;
			};

			/**
			 * Loading and initilizing textures with loop
			 * @method _initTextures
			 * @param {WebGLRenderingContext} gl
			 * @param {Object[]} nodes
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._initTextures = function (gl, nodes) {
				var self = this,
					count = 0;

				this._imageLoadTimer = setTimeout(function step() {
					var node = nodes[count], url;

					if (self._imageList[count]) {
						url = self._imageList[count].src;
						node.texture = gl.createTexture();
						self._loadImage(url, count, count, gl, nodes);
					}

					count++;
					if (count < nodes.length) {
						self._imageLoadTimer = setTimeout(step, 25);
					}
				}, 25);
			};

			/**
			 * Load image and bind to node as texture
			 * @method _loadImage
			 * @param {string} url
			 * @param {number} i node's index
			 * @param {string} imageID
			 * @param {WebGLRenderingContext} gl
			 * @param {Object[]} nodes
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._loadImage = function (url, i, imageID, gl, nodes) {
				var self = this,
					isMipmap = false,
					node,
					onLoad;

				gl = gl || self._gl;
				nodes = nodes || self._nodes;
				isMipmap = isMipmap || false;
				node = nodes[i];
				node.image = node.image || new Image();
				node.imageID = imageID;

				onLoad = function (e) {
					self._bindTexture(gl, node, this, isMipmap);

					if (!self._animationID) {
						self._setPosition(0, 0);
					}
					e.target.removeEventListener("load", onLoad, false);
				};

				node.image.addEventListener("load", onLoad, false);

				if (self.options.thumbnailCache) {
					imageloader.getThumbnail(url, function (result) {
						if (result === "NOT_FOUND_ERR") {
							imageloader.setThumbnail(url, function (result) {
								if (result && result.length > 30) {
									node.image.src = result;
									isMipmap = true;
								} else {
									node.image.src = url;
								}
							});
						} else if (result && result.length > 30) {
							node.image.src = result;
							isMipmap = true;
						} else {
							node.image.src = url;
						}
					});
				} else {
					node.image.src = url;
				}
			};

			/**
			 * Load image and bind to node as texture
			 * @method _bindTexture
			 * @param {WebGLRenderingContext} gl
			 * @param {Object} node
			 * @param {HTMLImageElement} image
			 * @param {boolean} isMipmap
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._bindTexture = function (gl, node, image, isMipmap) {
				if (!node || !node.texture) {
					return;
				}

				gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

				gl.bindTexture(gl.TEXTURE_2D, node.texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

				if (isMipmap) {
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
					gl.generateMipmap(gl.TEXTURE_2D);
				} else {
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				}

				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

				node.texture.loaded = true;

				// release texture memory
				gl.bindTexture(gl.TEXTURE_2D, null);
			};

			/**
			 * Setup of image position at gallery view
			 * @method _setPosition
			 * @param {number} progress
			 * @param {number} direction
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._setPosition = function (progress, direction) {
				var self = this,
					mat4 = glMatrix.mat4,
					nodes = self._nodes,
					node,
					nodeLevel,
					nodeMvMatrix,
					nodeImageId,
					imageList = self._imageList,
					imageListLength = imageList.length,
					displayLength = (imageListLength > MAX_ITEM_COUNT) ? MAX_ITEM_COUNT : imageListLength,
					nextLevelLength,
					i,
					t = 0,
					position = 0,
					angle = 0,
					current = 0,
					next = 0,
					nextLevel = 0,
					itemCount = MAX_ITEM_COUNT,
					path = self._path;

				nextLevelLength = (direction >= 0) ? displayLength + 1 : displayLength;

				for (i = 0; i < displayLength; i += 1) {
					node = nodes[i];
					nodeLevel = node.level;
					nodeImageId = node.imageID;

					if (!node.mvMatrix) {
						node.mvMatrix = mat4.create();
					}
					nodeMvMatrix = node.mvMatrix;

					if (direction > 0 && nodeLevel >= displayLength) {
						nodeLevel = 0;
					}

					current = path.levels[nodeLevel];
					nextLevel = (nodeLevel + nextLevelLength + direction) % nextLevelLength;
					next = path.levels[nextLevel];

					if (imageListLength > itemCount) {
						if (direction > 0 && nextLevel === 1 &&
								self._firstImageNumber !== nodeImageId) {
							self._loadImage(imageList[self._firstImageNumber].src, i, self._firstImageNumber);
						} else if (direction < 0 && nextLevel === nextLevelLength - 1 &&
								self._lastImageNumber !== nodeImageId) {
							self._loadImage(imageList[self._lastImageNumber].src, i, self._lastImageNumber);
						}
					}

					mat4.identity(nodeMvMatrix);
					mat4.translate(nodeMvMatrix, [-2.0, -2.0, 1.0]);
					mat4.rotate(nodeMvMatrix, degreeToRadian(19), [1, 0, 0]);

					t = (current + (next - current) * ((progress > 1) ? 1 : progress));

					if (progress >= ANIMATION_END) {
						nodeLevel = nextLevel || displayLength;
						t = path.levels[nodeLevel];
					}

					if ((progress < ANIMATION_END) &&
							(direction <= 0 && nodeLevel < 1)) {
						node.drawable = false;
					} else {
						node.drawable = true;
					}

					node.level = nodeLevel;
					if (progress === ANIMATION_END && nodeLevel === 1) {
						self.trigger(eventType.SELECT, imageList[nodeImageId]);
					}

					position = path.getPosition(t);
					angle = path.getAngle(t);

					mat4.translate(nodeMvMatrix, position);
					mat4.rotate(nodeMvMatrix, angle, [0, 1, 0]);
				}

				if (imageListLength > itemCount && progress >= ANIMATION_END) {
					self._firstImageNumber = (self._firstImageNumber - direction) % imageListLength;
					if (self._firstImageNumber < 0) {
						self._firstImageNumber = imageListLength - 1;
					}

					self._lastImageNumber = (self._lastImageNumber - direction) % imageListLength;
					if (self._lastImageNumber < 0) {
						self._lastImageNumber = imageListLength - 1;
					}
				}
				self._drawScene();
			};

			/**
			 * Draw scene
			 * @method _drawScene
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._drawScene = function () {
				if (!this._gl || !this._shaderProgram) {
					return;
				}

				var self = this,
					gl = self._gl,
					shaderProgram = self._shaderProgram,
					nodes = self._nodes,
					nodesLength = nodes.length,
					i;

				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

				gl.bindBuffer(gl.ARRAY_BUFFER, self._positionBuffer);
				gl.vertexAttribPointer(shaderProgram.vertexPositionAttr, self._positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ARRAY_BUFFER, self._textureCoordBuffer);
				gl.vertexAttribPointer(shaderProgram.textureCoordAttr, self._textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

				gl.bindBuffer(gl.ARRAY_BUFFER, self._normalVectorBuffer);
				gl.vertexAttribPointer(shaderProgram.vertexNormalAttr, self._normalVectorBuffer.itemSize, gl.FLOAT, false, 0, 0);
				gl.bindBuffer(gl.ARRAY_BUFFER, null);

				for (i = 0; i < nodesLength; i += 1) {
					if (nodes[i].drawable) {
						self._drawElement(self._pMatrix, nodes[i]);
					}
				}
			};

			/**
			 * Draw element (one image)
			 * @method _drawElement
			 * @param {number[]} perspectiveMatrix
			 * @param {Object} targetNode
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._drawElement = function (perspectiveMatrix, targetNode) {
				var self = this,
					gl = self._gl,
					vec3 = glMatrix.vec3,
					mat3 = glMatrix.mat3,
					mat4 = glMatrix.mat4,
					shaderProgram = self._shaderProgram,
					moveMatrix = targetNode.mvMatrix,
					texture = targetNode.texture,
					meshIndexBuffer = targetNode.textureBuffer,
					meshIndexBufferItemSize = targetNode.textureBufferItemSize,
					lightPositions = self._lightsPositionStack,
					LightDir,
					normalMatrix;

				if (!moveMatrix || !texture || !texture.loaded) {
					return;
				}

				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.uniform1i(shaderProgram.sampleUniform, 0);

				LightDir = vec3.create();
				vec3.normalize(lightPositions[0], LightDir);
				vec3.scale(LightDir, -8);
				gl.uniform3fv(shaderProgram.lightDirU_first, LightDir);

				vec3.normalize(lightPositions[1], LightDir);
				vec3.scale(LightDir, -1);
				gl.uniform3fv(shaderProgram.lightDirU_second, LightDir);
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshIndexBuffer);

				gl.uniformMatrix4fv(shaderProgram.perspectiveMU, false, perspectiveMatrix);
				gl.uniformMatrix4fv(shaderProgram.transformMU, false, moveMatrix);

				normalMatrix = mat3.create();
				mat4.toInverseMat3(moveMatrix, normalMatrix);
				mat3.transpose(normalMatrix);
				gl.uniformMatrix3fv(shaderProgram.normalMU, false, normalMatrix);

				gl.drawElements(gl.TRIANGLES, meshIndexBufferItemSize, gl.UNSIGNED_SHORT, 0);

				// release buffer memory
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

				// release texture memory
				gl.bindTexture(gl.TEXTURE_2D, null);
			};

			/**
			 * Animation step
			 * @method _animate
			 * @param {string} easingType
			 * @param {number} duration
			 * @param {number} direction
			 * @param {number} repeatCount
			 * @param {number} startValue
			 * @param {number} _removeCount
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._animate = function (easingType, duration, direction, repeatCount, startValue, _removeCount) {
				var self = this,
					timeNow = Date.now(),
					progress,
					removeCount = 0;

				easingType = easingType || "linear";
				startValue = startValue || 0;
				_removeCount = _removeCount || 0;

				if (self._sumTime >= duration) {
					self._setPosition(ANIMATION_END, direction);
					self._stop();
					return;
				}

				if (self._startTime === 0) {
					self._startTime = timeNow;
				} else {
					self._sumTime = timeNow - self._startTime;
					progress = easing[easingType](self._sumTime / duration, self._sumTime, startValue, repeatCount + 1, duration);
					removeCount = parseInt(Math.abs(progress), 10);

					if (_removeCount !== removeCount) {
						self._setPosition(ANIMATION_END, direction);
						_removeCount = removeCount;

						if ((repeatCount - _removeCount) >= 0) {
							self._animate(easingType, duration, direction, repeatCount, startValue, _removeCount);
						} else {
							self._stop();
						}
						return;
					}

					self._setPosition(progress - _removeCount, direction);
				}

				self._animationID = requestAnimationFrame(function () {
					self._animate(easingType, duration, direction, repeatCount, startValue, _removeCount);
				});
			};

			/**
			 * Animation start
			 * @method _run
			 * @param {number} direction
			 * @param {number} repeatCount
			 * @param {number} startValue
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._run = function (direction, repeatCount, startValue) {
				var self = this,
					repeat = repeatCount || 0,
					duration = DURATION_DEFAULT * (repeat + 1);

				if (!self._gl) {
					self._operationQueue.push(direction);
					return;
				}

				if (self._imageList.length <= 1) {
					return;
				}

				startValue = startValue || 0;
				duration = (duration >= 0) ? duration : 0;

				if (self._animationID) {
					self._setPosition(ANIMATION_END, direction);
					self._stop();
				}

				self._animate("easeOutExpo", duration, direction, repeat, startValue);
			};

			/**
			 * Reset widget state
			 * @method _reset
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 * @chainable
			 */
			Gallery3D.prototype._reset = function () {
				var self = this;
				if (!self._canvas || !self._gl) {
					return self;
				}

				self._final();
				self._initGallery();
				self.refresh();
				return self;
			};

			/**
			 * Animation stop
			 * @method _stop
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._stop = function () {
				var self = this;
				if (self._animationID !== 0) {
					cancelAnimationFrame(self._animationID);
				}
				self._animationID = 0;
				self._startTime = 0;
				self._sumTime = 0;
				return self;
			};

			/**
			 * Change active image to next image in gallery
			 *
			 * This method moves each image forward.
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			var element = document.getElementById("gallery3d"),
			 *				gallery3d = tau.widget.Gallery3D(element);
			 *
			 *			gallery3d.add("1.jpg")
			 *				.add("2.jpg")
			 *				.add("3.jpg")
			 *				.next();
			 *		</script>
			 *
			 * or jQueryMobile notation:
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			$("#gallery3d").gallery3d()
			 *				.gallery3d("add", "1.jpg")
			 *				.gallery3d("add", "2.jpg")
			 *				.gallery3d("add", "3.jpg")
			 *				.gallery3d("next");
			 *		</script>
			 *
			 * @method next
			 * @member ns.widget.mobile.Gallery3D
			 * @chainable
			 */
			Gallery3D.prototype.next = function () {
				var self = this;
				self._run(DIRECTION_LEFT, 0);
				return self;
			};

			/**
			 * Change active image to previous image in gallery
			 *
			 * This method moves each image backward.
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			var element = document.getElementById("gallery3d"),
			 *				gallery3d = tau.widget.Gallery3D(element);
			 *
			 *			gallery3d.add("1.jpg")
			 *				.add("2.jpg")
			 *				.add("3.jpg")
			 *				.prev();
			 *		</script>
			 *
			 * or jQueryMobile notation:
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			$("#gallery3d").gallery3d()
			 *				.gallery3d("add", "1.jpg")
			 *				.gallery3d("add", "2.jpg")
			 *				.gallery3d("add", "3.jpg")
			 *				.gallery3d("prev");
			 *			});
			 *		</script>
			 *
			 * @method prev
			 * @member ns.widget.mobile.Gallery3D
			 * @chainable
			 */
			Gallery3D.prototype.prev = function () {
				var self = this;
				self._run(DIRECTION_RIGHT, 0);
				return self;
			};

			/**
			 * Refresh Gallery3D
			 *
			 * This method updates and redraws current widget.
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			var element = document.getElementById("gallery3d"),
			 *				gallery3d = tau.widget.Gallery3D(element);
			 *
			 *			gallery3d.add("1.jpg")
			 *				.add("2.jpg")
			 *				.add("3.jpg")
			 *				.on("gallery3dinit", function () {
			 *					gallery3d.refresh();
			 *				});
			 *		</script>
			 *
			 * or jQueryMobile notation:
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			$("#gallery3d").gallery3d()
			 *				.gallery3d("add", "1.jpg")
			 *				.gallery3d("add", "2.jpg")
			 *				.gallery3d("add", "3.jpg");
			 *				.on("gallery3dinit", function () {
			 *					$("#gallery3d").gallery3d("refresh");
			 *				});
			 *		</script>
			 *
			 * @method refresh
			 * @member ns.widget.mobile.Gallery3D
			 */

			/**
			 * Refreshing of gallery
			 * @method _refresh
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype._refresh = function () {
				var self = this,
					view = self.element,
					canvas = view.querySelector("canvas.ui-gallery3d-canvas");

				if (utilsDOM.getElementWidth(canvas) !== utilsDOM.getElementWidth(view)) {
					canvas.style.width = utilsDOM.getElementWidth(view);
				}

				if (self._gl && !self._animationID) {
					self._setPosition(0, 0);
				}
				return self;
			};

			/**
			 * Set active image by index or return active image
			 *
			 * When the select method is called with an argument, the method selects the image of a given index.
			 * If the method is called with no argument, it returns the selected image's object.
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			var element = document.getElementById("gallery3d"),
			 *				gallery3d = tau.widget.Gallery3D(element);
			 *
			 *			gallery3d.add("1.jpg")
			 *				.add("2.jpg")
			 *				.add("3.jpg")
			 *				.on("gallery3dinit", function () {
			 *					gallery3d.select();
			 *				});
			 *		</script>
			 *
			 * or jQueryMobile notation:
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			$("#gallery3d").gallery3d()
			 *				.gallery3d("add", "1.jpg")
			 *				.gallery3d("add", "2.jpg")
			 *				.gallery3d("add", "3.jpg");
			 *				.on("gallery3dinit", function () {
			 *					$("#gallery3d").gallery3d("select");
			 *				});
			 *		</script>
			 *
			 * @method select
			 * @param {number} [index=undefined] Index of image which will be selected
			 * @return {?HTMLImageElement} node image
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype.select = function (index) {
				var self = this,
					nodes = self._nodes,
					i,
					imageID,
					object = null,
					target,
					direction;

				if (index && self._animationID !== 0) {
					self._stop();
				}

				for (i in nodes) {
					if (nodes.hasOwnProperty(i) && nodes[i].level === 1) {
						object = self._imageList[nodes[i].imageID];
						imageID = nodes[i].imageID;
						break;
					}
				}

				if (index === undefined) {
					return object;
				}

				if (index < 0 && index >= self._imageList.length) {
					return null;
				}

				target = index - imageID;
				direction = (target > 0) ? DIRECTION_LEFT
					: ((target < 0) ? DIRECTION_RIGHT : 0);
				if (direction) {
					self._run(direction, Math.abs(target) - 1);
				}
				return null;
			};

			/**
			 * Add new image to gallery and refresh gallery widget
			 *
			 * If the second argument is not defined, the image is added at the 0 position.
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			var element = document.getElementById("gallery3d"),
			 *				gallery3d = tau.widget.Gallery3D(element);
			 *
			 *			gallery3d.add({src: "1.jpg"})
			 *				.add("2.jpg")
			 *		</script>
			 *
			 * or jQueryMobile notation:
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			$("#gallery3d").gallery3d()
			 *				.gallery3d("add", {src: "1.jpg"});
			 *				.gallery3d("add", "2.jpg", 1);
			 *		</script>
			 *
			 * @method add
			 * @param {Object|string} item url to image source
			 * @param {string} item.src url to image source
			 * @param {number} [index=this._imageList.length]
			 * @member ns.widget.mobile.Gallery3D
			 * @chainable
			 */
			Gallery3D.prototype.add = function (item, index) {
				var self = this;
				if (!item) {
					return self;
				}

				if (typeof item === "string") {
					item = { "src" : item };
				}

				index = index || 0;
				if (typeof index !== "number" && index < 0 &&
						index >= self._imageList.length) {
					return self;
				}

				self._imageList.splice(index, 0, item);
				if (self._gl) {
					self._reset();
				}
				return self;
			};

			/**
			 * Remove image from gallery and refresh gallery widget
			 *
			 * The argument defines the index of the image to be deleted.
			 * If an argument isn't inputted, it removes current image.
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			var element = document.getElementById("gallery3d"),
			 *				gallery3d = tau.widget.Gallery3D(element);
			 *
			 *			gallery3d.add("1.jpg")
			 *				.add("2.jpg")
			 *				.add("3.jpg");
			 *
			 *			gallery3d.remove()
			 *				.remove(1);
			 *		</script>
			 *
			 * or jQueryMobile notation:
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			$("#gallery3d").gallery3d()
			 *				.gallery3d("add", "1.jpg")
			 *				.gallery3d("add", "2.jpg")
			 *				.gallery3d("add", "3.jpg");
			 *
			 *				$("#gallery3d").gallery3d("remove");
			 *				$("#gallery3d").gallery3d("remove", 1);
			 *		</script>
			 *
			 * @method remove
			 * @param {number} [index=0] Index of item to remove
			 * @member ns.widget.mobile.Gallery3D
			 * @chainable
			 */
			Gallery3D.prototype.remove = function (index) {
				var self = this;
				index = index || 0;
				if (typeof index !== "number" && index < 0 &&
						index >= self._imageList.length) {
					return self;
				}

				self._imageList.splice(index, 1);
				if (self._gl) {
					self._reset();
				}
				return self;
			};

			/**
			 * Clear thumbnail cache
			 *
			 * This method clears the cache data of all images
			 * when the thumbnailCache option is set to true.
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			var element = document.getElementById("gallery3d"),
			 *				gallery3d = tau.widget.Gallery3D(element);
			 *
			 *			gallery3d.add("1.jpg")
			 *				.add("2.jpg")
			 *				.add("3.jpg")
			 *				.clearThumbnailCache();
			 *		</script>
			 *
			 * or jQueryMobile notation:
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			$("#gallery3d").gallery3d()
			 *				.gallery3d("add", "1.jpg")
			 *				.gallery3d("add", "2.jpg")
			 *				.gallery3d("add", "3.jpg");
			 *
			 *			$("#gallery3d").gallery3d("clearThumbnailCache");
			 *		</script>
			 *
			 * @method clearThumbnailCache
			 * @member ns.widget.mobile.Gallery3D
			 * @chainable
			 */
			Gallery3D.prototype.clearThumbnailCache = function () {
				var self = this;
				if (!self._nodes || (self._nodes.length <= 0)) {
					return self;
				}

				var i, url;
				for (i = 0; i < self._imageList.length; i += 1) {
					url = self._imageList[i].src;
					imageloader.removeThumbnail(url);
				}
				return self;
			};

			/**
			 * Remove all images from gallery
			 *
			 * The method removes all of images from the gallery 3D widget.
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			var element = document.getElementById("gallery3d"),
			 *				gallery3d = tau.widget.Gallery3D(element);
			 *
			 *			gallery3d.add("1.jpg")
			 *				.add("2.jpg")
			 *				.add("3.jpg")
			 *				.empty();
			 *		</script>
			 *
			 * or jQueryMobile notation:
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			$("#gallery3d").gallery3d()
			 *				.gallery3d("add", "1.jpg")
			 *				.gallery3d("add", "2.jpg")
			 *				.gallery3d("add", "3.jpg");
			 *
			 *			$("#gallery3d").gallery3d("empty");
			 *		});
			 *		</script>
			 *
			 * @method empty
			 * @member ns.widget.mobile.Gallery3D
			 * @chainable
			 */
			Gallery3D.prototype.empty = function () {
				var self = this;
				self._imageList = [];
				self._reset();
				return self;
			};

			/**
			 * Return the count of images in gallery
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			var element = document.getElementById("gallery3d"),
			 *				gallery3d = tau.widget.Gallery3D(element);
			 *
			 *			gallery3d.add("1.jpg")
			 *				.add("2.jpg")
			 *				.add("3.jpg");
			 *
			 *			var imagesLength = gallery3d.length();
			 *			// imagesLength = 3;
			 *		</script>
			 *
			 * or jQueryMobile notation:
			 *
			 *		@example
			 *		<div id="gallery3d"></div>
			 *		<script>
			 *			$("#gallery3d").gallery3d()
			 *				.gallery3d("add", "1.jpg")
			 *				.gallery3d("add", "2.jpg")
			 *				.gallery3d("add", "3.jpg");
			 *
			 *			var imagesLength = $("#gallery3d").gallery3d("length");
			 *			// imagesLength = 3;
			 *		</script>
			 *
			 * @method length
			 * @return {number} the count of images in gallery
			 * @member ns.widget.mobile.Gallery3D
			 */
			Gallery3D.prototype.length = function () {
				return this._imageList.length;
			};

			/**
			 * Binding events to the widget elements
			 * @method _bindEvents
			 * @protected
			 * @member ns.widget.mobile.Gallery3D
			 * @chainable
			 */
			Gallery3D.prototype._bindEvents = function () {
				var self = this,
					canvas = self._canvas,
					onWindowChange = function () {
						var activePage = document.querySelector(".ui-page-active");
						if (activePage) {
							ns.engine.getBinding(activePage.querySelector(".ui-gallery3d")).refresh();
						}
					};

				canvas.addEventListener("webglcontextlost", function (e) {
					e.preventDefault();
				}, false);
				canvas.addEventListener("webglcontextrestored", function () {
					self._initGallery();
				}, false);

				self._addTouchHandlers();

				document.addEventListener("pagechange", function (e) {
					var widget = ns.engine.getBinding(e.target.querySelector(classes.uiGallery3D));
					if (widget) {
						widget.refresh();
					}
				}, false);
				window.addEventListener("orientationchange", onWindowChange, false);
				window.addEventListener("resize", onWindowChange, false);

				return self;
			};

			// definition
			ns.widget.mobile.Gallery3D = Gallery3D;
			engine.defineWidget(
				"Gallery3D",
				"[data-role='gallery3d'], .ui-gallery3d",
				["add", "remove", "next", "prev",
					"select", "clearThumbnailCache",
					"empty", "length"],
				Gallery3D,
				"tizen"
			);
			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return ns.widget.mobile.Gallery3D;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window, window.document, ns, window.Math, window.localStorage));
