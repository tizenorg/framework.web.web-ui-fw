/*
* Module Name : widgets/jquery.mobile.tizen.gallery3d
* Copyright (c) 2013 Samsung Electronics Co., Ltd.
* License : Flora License
*/
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: 3D photo gallery widget.
//>>label: Gallery3d
//>>group: Tizen:Widgets

define( [
	'license/FLORA', 
	'jquery',
	"jqm/jquery.mobile.widget",
	'libs/jquery.easing.1.3',
	"libs/gl-matrix",
	"./components/imageloader",
	"./components/motionpath",
	"./components/webgl"
	], function ( jQuery ) {

//>>excludeEnd("jqmBuildExclude");

/**
 *	The gallery 3D widget enables 3-dimensional arranging and handling of images.
 *
 *	HTML Attributes:
 *
 *		data-thumbnail-cache : Determines whether to cache and resize images.
 *		To improve performance, the size of image(s) displayed on the screen should be a square (under 128X128 pixels).
 *		"data-thumbnail-cache" option resizes the gallery images under 128x128 pixels and stores the images on a local storage.
 *		So when a gallery3D widget is re-launched, the widget reuses the storage and the launching time can be improved.
 *		A browser or web runtime engine must support "Web Storage" feature to use this option.
 *
 *	APIs:
 *
 *		next ( void )
 *			: This method moves each image forward.
 *		prev ( void )
 *			: This method moves each image backward.
 *		select ( [number] )
 *			: When the select method is called with an argument, the method selects the image of a given index.
 *			If the method is called with no argument, it returns the selected image's object.
 *		add ( object or string [, number] )
 *			This method adds an image to the gallery 3D widget.
 *			If the second argument is not defined, the image is added at the 0 position.
 *		remove ( [number] )
 *			: This method deletes an image from the gallery 3D widget.
 *			The argument defines the index of the image to be deleted.
 *			If the argument is not defined, the current image is removed.
 *		clearThumbnailCache ( void )
 *			: This method clears the cache data of all images when the thumbnailCache option is set to true.
 *		refresh ( void )
 *			: This method updates and redraws current widget.
 *		empty ( void )
 *			: This method removes all of images from the gallery 3D widget.
 *		length ( void )
 *			: This method gets the number of images.
 *
 *	Events:
 *
 *		select : Triggered when an image is selected.
 *
 *	Examples:
 *
 *		<script>
 *			$( "#gallery3d" ).on( "gallery3dcreate", function () {
 *				$( "#gallery3d" ).gallery3d( "add", "01.jpg" );
 *			});
 *		</script>
 *		<div id="gallery3d" data-role="gallery3d"></div>
 */

/**
	@class Gallery3D
	The gallery3d widget displays images along a curved path on a 3-dimensional coordinate system.
	<br/><br/>To add an gallery3d widget to the application, use the following code:

		<script>
			$( "#gallery3d" ).on( "gallery3dcreate", function () {
				$( "#gallery3d" ).gallery3d( "add", "01.jpg" );
			});
		</script>
		<div id="gallery3d" data-role="gallery3d"></div>
*/
/**
	@property {Boolean} data-thumbnail-cache
	Determines whether to cache and resize images.
	To improve performance, the size of image(s) displayed on the screen should be a square (under 128X128 pixels).
	"data-thumbnail-cache" option resizes the gallery images under 128x128 pixels and stores the images on a local storage.
	So when a gallery3D widget is re-launched, the widget reuses the storage and the launching time can be improved.
	A browser or web runtime engine must support "Web Storage" feature to use this option.
*/
/**
	@event select
	Triggered when an image is selected.

		<script>
			$( "#gallery3d" ).on( "gallery3dcreate", function () {
				$( "#gallery3d" ).gallery3d( "add", { src: "1.jpg" } )
					.gallery3d( "add", { src: "2.jpg" } )
					.gallery3d( "add", { src: "3.jpg" } );
			}).on( "select", function ( event, data, index ) {
				// Handle the select event
				var urlOfImage = data.src, indexOfImage = index;
			});
		</script>
		<div id="gallery3d" data-role="gallery3d"></div>
*/
/**
	@method next
	This method moves each image forward.

		<script>
			$( "#gallery3d" ).on( "gallery3dcreate", function () {
				$( "#gallery3d" ).gallery3d( "add", { src: "1.jpg" } )
					.gallery3d( "add", { src: "2.jpg" } )
					.gallery3d( "add", { src: "3.jpg" } )
					.gallery3d( "next" );
			});
		</script>
		<div id="gallery3d" data-role="gallery3d"></div>
*/
/**
	@method prev
	This method moves each image backward.

		<script>
			$( "#gallery3d" ).on( "gallery3dcreate", function () {
				$( "#gallery3d" ).gallery3d( "add", { src: "1.jpg" } )
					.gallery3d( "add", { src: "2.jpg" } )
					.gallery3d( "add", { src: "3.jpg" } )
					.gallery3d( "prev" );
			});
		</script>
		<div id="gallery3d" data-role="gallery3d"></div>
*/
/**
	@method select
	When the select method is called with an argument, the method selects the image of a given index.
	If the method is called with no argument, it returns the selected image's object.

		<script>
			$("#gallery3d").on("gallery3dcreate", function () {
				$("#gallery3d").gallery3d("add", {src: "1.jpg"})
					.gallery3d("add", {src: "2.jpg"})
					.gallery3d("add", {src: "3.jpg"});
			}).on( "gallery3dinit", function () {
				$("#gallery3d").gallery3d("select");
			});
		</script>
		<div id="gallery3d" data-role="gallery3d"></div>
*/
/**
	@method add
	This method adds an image to the gallery 3D widget.
	If the second argument is not defined, the image is added at the 0 position.

		<script>
			$( "#gallery3d" ).on( "gallery3dcreate", function () {
				$( "#gallery3d" ).gallery3d( "add", { src: "1.jpg" } );
				$( "#gallery3d" ).gallery3d( "add", "2.jpg", 1 );
			});
		</script>
		<div id="gallery3d" data-role="gallery3d"></div>
*/
/**
	@method remove
	This method deletes an image from the gallery 3D widget.
	The argument defines the index of the image to be deleted.
	If an argument isn't inputted, it removes current image.

		<script>
			$( "#gallery3d" ).on( "gallery3dcreate", function () {
				$( "#gallery3d" ).gallery3d( "add", { src: "1.jpg" } )
					.gallery3d( "add", { src: "2.jpg" } )
					.gallery3d( "add", { src: "3.jpg" } );

				$( "#gallery3d" ).gallery3d( "remove" );
				$( "#gallery3d" ).gallery3d( "remove", 1 );
			});
		</script>
		<div id="gallery3d" data-role="gallery3d"></div>
*/
/**
	@method clearThumbnailCache
	This method clears the cache data of all images when the thumbnailCache option is set to true.

		<script>
			$( "#gallery3d" ).on( "gallery3dcreate", function () {
				$( "#gallery3d" ).gallery3d( "add", { src: "1.jpg" } )
					.gallery3d( "add", { src: "2.jpg" } )
					.gallery3d( "add", { src: "3.jpg" } );

				$( "#gallery3d" ).gallery3d( "clearThumbnailCache" );
			});
		</script>
		<div id="gallery3d" data-role="gallery3d" data-thumbnail-cache="true"></div>
*/
/**
	@method refresh
	This method updates and redraws current widget.

		<script>
			$( "#gallery3d" ).on( "gallery3dcreate", function () {
				$( "#gallery3d" ).gallery3d( "add", { src: "1.jpg" } )
					.gallery3d( "add", { src: "2.jpg" } )
					.gallery3d( "add", { src: "3.jpg" } );
				}).on("gallery3dinit", function () {
					$("#gallery3d").gallery3d("refresh");
				});
		</script>
		<div id="gallery3d" data-role="gallery3d"></div>
*/
/**
	@method empty
	This method removes all of images from the gallery 3D widget.

		<script>
			$( "#gallery3d" ).on( "gallery3dcreate", function () {
				$( "#gallery3d" ).gallery3d( "add", { src: "1.jpg" } )
					.gallery3d( "add", { src: "2.jpg" } )
					.gallery3d( "add", { src: "3.jpg" } );

				$( "#gallery3d" ).gallery3d( "empty" );
			});
		</script>
		<div id="gallery3d" data-role="gallery3d"></div>
*/
/**
	@method length
	This method gets the number of images.

		<script>
			$( "#gallery3d" ).on( "gallery3dcreate", function () {
				$( "#gallery3d" ).gallery3d( "add", { src: "1.jpg" } )
					.gallery3d( "add", { src: "2.jpg" } )
					.gallery3d( "add", { src: "3.jpg" } );

				var imagesLength = $( "#gallery3d" ).gallery3d( "length" );
				// imagesLength = 3;
			});
		</script>
		<div id="gallery3d" data-role="gallery3d"></div>
*/

( function ( $, document, window, undefined ) {
	function Node() {
		this.vertices = [
			-1.0, -1.0, 0.0,
			1.0, -1.0, 0.0,
			1.0,  1.0, 0.0,
			-1.0,  1.0, 0.0
		];
		this.textureCoords = [
			1.0, 0.0,
			0.0, 0.0,
			0.0, 1.0,
			1.0, 1.0
		];
		this.normalVectors = [
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0
		];
		this.texture = null;
		this.textureBuffer = null;
		this.textureBufferItemSize = 0;
		this.mashOrder = [];
		this.mvMatrix = null;
		this.level = -1;
		this.targetLevel = 0;
		this.drawable = false;
		this.image = null;
		this.imageID = 0;
	}

	var isPreInitailization  = false,
		glMatrix = {},
		VERTEX_SHADER,
		FRAGMENT_SHADER,
		GlArray32,
		GlArray16,
		preInitialize = function () {
			if ( isPreInitailization ) {
				return;
			}

			window.initGlMatrix( glMatrix );

			VERTEX_SHADER = [
				"attribute vec3 aVertexPosition;",
				"attribute vec2 aTextureCoord;",
				"attribute vec3 aVertexNormal;",
				"uniform mat4 uMoveMatrix;",
				"uniform mat4 uPerspectiveMatrix;",
				"uniform mat3 nNormalMatrix;",
				"uniform vec3 uAmbientColor;",
				"uniform vec3 uLightDirection;",
				"uniform vec3 uDirectionColor;",
				"uniform vec3 uLightDirection_first;",
				"uniform vec3 uLightDirection_second;",
				"varying vec2 vTextureCoord;",
				"varying vec3 vLightWeight;",
				"varying vec4 vFogWeight;",

				"void main(void) {",
				"	vec4 v_Position = uMoveMatrix * vec4(aVertexPosition, 1.0);",
				"	gl_Position = uPerspectiveMatrix * v_Position;",
				"	vTextureCoord = aTextureCoord;",
				"	float fog = 1.0 - ((gl_Position.z + 1.5) / 60.0);",
				"	vFogWeight = clamp( vec4( fog, fog, fog, 1.0), 0.6, 1.0);",
				"	vec3 transNormalVector = nNormalMatrix * aVertexNormal;",

				"	float vLightWeightFirst = 0.0;",
				"	float vLightWeightSecond = max( dot(transNormalVector, uLightDirection_second), 0.0 );",

				"	vLightWeight = uAmbientColor + uDirectionColor * vLightWeightSecond;",
				"}"
			].join( "\n" );

			FRAGMENT_SHADER = [
				"precision mediump float;",
				"varying vec2 vTextureCoord;",
				"varying vec3 vLightWeight;",
				"uniform sampler2D uSampler;",
				"varying vec4 vFogWeight;",

				"void main(void) {",
				"	vec4 TextureColor;",
				"	if ( vTextureCoord.s <= 0.01 || vTextureCoord.s >= 0.99 || vTextureCoord.t <= 0.01 || vTextureCoord.t >= 0.99 ) {",
				"		TextureColor = vec4(1.0, 1.0, 1.0, 0.5);",
				"	} else {",
				"		TextureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));",
				"	}",
				"	TextureColor *= vFogWeight;",
				"	gl_FragColor = vec4(TextureColor.rgb * vLightWeight, TextureColor.a);",
				"}"
			].join( "\n" );

			GlArray32 = ( typeof window.Float32Array !== "undefined" ?
					window.Float32Array :
						( typeof window.WebGLFloatArray !== "undefined" ? window.WebGLFloatArray : Array ) );

			GlArray16 = ( typeof window.Uint16Array !== "undefined" ? window.Uint16Array : Array );

			isPreInitailization = true;
		},
		degreeToRadian = function ( degree ) {
			return degree * Math.PI / 180;
		},
		getContext3D = function ( canvas ) {
			var gl, i,
				contextNames = [ "experimental-webgl", "webkit-3d", "webgl", "moz-webgl" ],
				errorMessage = "Unfortunately, there's a WebGL compatibility problem.\nYou may want to check your system settings.";

			for ( i = 0; i < contextNames.length; i += 1 ) {
				try {
					gl = canvas.getContext( contextNames[i] );
					if ( gl ) {
						break;
					}
				} catch ( e ) {
					alert(  errorMessage );
					return;
				}
			}

			if ( !gl ) {
				alert(  errorMessage );
				return;
			}

			return gl;
		},
		requestAnimationFrame = function ( callback ) {
			var id = window.setTimeout( callback, 1000 / 60 );
			return id;
		},
		cancelAnimationFrame = function ( id ) {
			window.clearTimeout( id );
		};

	$.widget( "tizen.gallery3d", $.mobile.widget, {
		options: {
			thumbnailCache:	false
		},

		_MAX_ITEM_COUNT: 28,
		_ANIMATION_END: 999,
		_DURATION_DEFAULT: 300,
		_DURATION_FIRST: 1600,
		_VIEWPORT_WIDTH: 1024,
		_VIEWPORT_HEIGHT: 456,
		_DIRECTION_LEFT: -1,
		_DIRECTION_RIGHT: +1,

		_gl: null,
		_shaderProgram : null,
		_positionBuffer : null,
		_textureCoordBuffer : null,
		_normalVectorBuffer : null,
		_nodes: null,
		_pMatrix : null,
		_animationID: 0,
		_dragInterval : 0,
		_startTime : 0,
		_sumTime : 0,
		_lightsPositionStack : [
			[0.0, 0.0, -1.0],	// back
			[-0.2, 0.0, 0.7]	// front
		],
		_path: null,
		_swipeThresholdOfBasetimeGap: ( $.support.touch ? 30 : 70 ),
		_swipeThresholdOfSensitivity: ( $.support.touch ? 2.0 : 10.0 ),
		_canvas: null,
		_imageList: [],
		_maxDrawLength: 0,
		_firstImageNumber: 0,
		_lastImageNumber: 0,
		_operationQueue: [],

		_create: function () {
			var self = this,
				view = self.element,
				option = self.options;

			preInitialize();

			self._canvas = $( "<canvas class='ui-gallery3d-canvas'></canvas>" );

			view.addClass( "ui-gallery3d" ).append( self._canvas );
			self._addBehavier();

			self._dragInterval = 1000 / 30;	// 30fps

			$.each( self.options, function ( key, value ) {
				self.options[ key ] = undefined;
				self._setOption( key, value );
			});
		},

		destroy: function () {
			this._imageList.length = 0;
			this._path.length = 0;
			this._final();
			$.mobile.widget.prototype.destroy.call( this );
		},

		_setOption: function ( key, value ) {
			switch ( key ) {
			case "thumbnailCache" :
				if ( typeof value === "string" ) {
					value = ( value === "true" ) ? true : false;
				} else {
					value = !!value;
				}
				this._reset();
				break;
			}

			$.mobile.widget.prototype._setOption.call( this, key, value );
		},

		_init: function ( canvas ) {
			var self = this,
				pathPoints = [
					[40, 0, -48],
					[-12, 0, -40],	// contorl Point of Point1
					[24, 0, -9],		// contorl Point of Point2
					[-5, 0, -5]
				],
				i;

			canvas = canvas || self._canvas;
			if ( !canvas ) {
				return;
			}

			self._gl = self._gl || self._initGL( canvas[0] );
			if ( !self._gl ) {
				return;
			}

			if ( !self._imageList ) {
				return;
			}

			self._shaderProgram = self._shaderProgram || self._initShader( self._gl );
			if ( !self._shaderProgram ) {
				return;
			}

			if ( self._imageList.length > self._MAX_ITEM_COUNT ) {
				self._firstImageNumber = self._imageList.length - 1;
				self._lastImageNumber = self._MAX_ITEM_COUNT - 1;
			}

			self._nodes = self._initBuffers( self._gl, self._shaderProgram );

			self._initTextures( self._gl, self._nodes );

			self._path = $.motionpath( "bezier2d", {
				points: pathPoints,
				maxLevel: self._MAX_ITEM_COUNT
			} );

			for ( i = 0; i < self._nodes.length; i += 1 ) {
				self._path.levels[i] = self._path.levels[i + 1] || 0;
				self._nodes[i].level = i;
			}

			this._setPosition( self._ANIMATION_END, this._DIRECTION_RIGHT );

			while ( this._operationQueue.length ) {
				this._setPosition( self._ANIMATION_END, this._operationQueue.shift() );
			}
		},

		_final: function ( canvas ) {
			var self = this,
				gl = self._gl;

			if ( !gl ) {
				return;
			}

			clearTimeout( this._imageLoadTimer );
			this._imageLoadTimer = null;

			self._stop();

			canvas = canvas || self._canvas;

			$( self._nodes ).each( function ( i ) {
				var node = self._nodes[i];

				if ( node.texture ) {
					gl.deleteTexture( node.texture );
					node.texture = null;
					delete node.image;
					node.image = null;
				}
			});
			this._nodes.length = 0;

			gl.deleteBuffer( self._positionBuffer );
			self._positionBuffer = null;
			gl.deleteBuffer( self._textureCoordBuffer );
			self._textureCoordBuffer = null;
			gl.deleteBuffer( self._normalVectorBuffer );
			self._normalVectorBuffer = null;

			$.webgl.shader.deleteShaders( gl );
			gl.deleteProgram( self._shaderProgram );
			self._shaderProgram = null;

			self._gl = gl = null;
		},

		_addBehavier : function () {
			var self = this,
				view = self.element,
				canvas = self._canvas,
				touchStartEvt = ( $.support.touch ? "touchstart" : "mousedown" ),
				touchMoveEvt = ( $.support.touch ? "touchmove" : "mousemove" ) + ".gallery3d",
				touchEndEvt = ( $.support.touch ? "touchend" : "mouseup" ) + ".gallery3d",
				$document = $( document );

			canvas.on( "webglcontextlost", function ( e ) {
				e.preventDefault();
			}).on( "webglcontextrestored", function ( e ) {
				self._init();
			}).on( touchStartEvt, function ( e ) {
				var i = 0,
					startX = 0,
					deltaMaxSteps = 20,
					deltas = [ deltaMaxSteps ],
					deltaTimes = [ deltaMaxSteps ],
					deltaIndex = 0,
					dragValue = 0,
					dragDirection = false,
					prevTime = 0;

				e.preventDefault();
				e.stopPropagation();

				if ( self._imageList.length <= 1 ) {
					return;
				}

				self._stop();

				startX =  $.support.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
				prevTime = $.now();

				for ( i = 0; i < deltaMaxSteps; i += 1 ) {
					deltas[i] = startX;
					deltaTimes[i] = $.now();
				}

				deltaIndex += 1;

				view.on( touchMoveEvt, function ( e ) {
					var x, dx, interval;

					e.preventDefault();
					e.stopPropagation();

					x =  $.support.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
					dx = startX - x;

					deltas[deltaIndex] = x;
					deltaTimes[deltaIndex] = $.now();
					interval = deltaTimes[deltaIndex] - prevTime;

					deltaIndex = ( deltaIndex + 1 ) % deltaMaxSteps;

					// Validation of drag
					if ( Math.abs( dx ) >= 10 && interval >= self._dragInterval ) {
						if ( dragDirection !== ( ( dx < 0 ) ? self._DIRECTION_RIGHT : self._DIRECTION_LEFT ) ) {
							dragValue = 0;
							dragDirection = ( dx < 0 ) ? self._DIRECTION_RIGHT : self._DIRECTION_LEFT;
						}

						dragValue += Math.abs( dx ) / 100;
						if ( dragValue >= 1 ) {
							self._setPosition( self._ANIMATION_END, dragDirection );
							dragValue = 0;
						} else {
							self._setPosition( dragValue, dragDirection );
						}
						self._drawScene();
						startX = x;
						prevTime = $.now();
					}
				}).on( touchEndEvt, function ( e ) {
					var baseTime = 0,
						recent = -1,
						index = 0,
						previous = 0,
						baseTimeRatio = 0,
						fx = 0,
						lastX = 0,
						velocityX = 0,
						dx = 0,
						isSwipe = true,
						direction;

					e.preventDefault();
					e.stopPropagation();

					// Validation of swipe
					baseTime = $.now() - self._swipeThresholdOfBasetimeGap;
					lastX = $.support.touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
					dx = startX - lastX;
					startX = 0;
					for ( i = 0; i < deltaMaxSteps; i += 1 ) {
						index = ( deltaIndex + i ) % deltaMaxSteps;
						if ( deltaTimes[index] > baseTime ) {
							recent = index;
							break;
						}
					}
					if ( recent < 0 ) {
						isSwipe = false;
					}

					if ( isSwipe ) {
						previous = recent;
						for ( i = 0; i < deltaMaxSteps; i += 1 ) {
							previous = ( previous - 1 + deltaMaxSteps ) % deltaMaxSteps;
							if ( deltaTimes[previous] < deltaTimes[recent] ) {
								break;
							}
						}
						// too slow or too fast
						if ( i === deltaMaxSteps || baseTime < deltaTimes[previous] ) {
							isSwipe = false;
						}
					}

					if ( isSwipe ) {
						baseTimeRatio = ( baseTime - deltaTimes[previous] ) / ( deltaTimes[recent] - deltaTimes[previous] );
						fx = ( 1.0 - baseTimeRatio ) * deltas[previous] + baseTimeRatio * deltas[recent];
						if ( Math.abs( fx - lastX ) < self._swipeThresholdOfSensitivity ) {
							fx = lastX;
						}
						velocityX = parseInt( ( lastX - fx ) / ( $.now() - baseTime ), 10 );
					}

					if ( isSwipe && velocityX ) {
						direction = ( velocityX < 0 ) ? self._DIRECTION_LEFT : self._DIRECTION_RIGHT;
						self._run( direction, Math.abs( velocityX ), dragValue );
					} else if ( dragDirection !== 0 && dragValue ) {
						self._animate( null, self._DURATION_DEFAULT * ( 1 - dragValue ), dragDirection, 0, dragValue );
					}

					view.off( ".gallery3d" );
					$document.off( ".gallery3d" );
				});

				$document.on( touchMoveEvt + " " + touchEndEvt, function () {
					view.trigger( touchEndEvt );
				});
			});
		},

		// ----------------------------------------------------------
		// WebGL
		// ----------------------------------------------------------
		_initGL: function ( canvas ) {
			var self = this,
				mat4 = glMatrix.mat4,
				gl;

			gl = getContext3D( canvas );
			if ( !gl ) {
				return null;
			}

			gl.enable( gl.BLEND );
			gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

			gl.enable( gl.DEPTH_TEST );
			gl.depthFunc( gl.LEQUAL );

			canvas.style.width = "100%";
			canvas.width = self._VIEWPORT_WIDTH;
			canvas.height = self._VIEWPORT_HEIGHT;
			gl.viewportWidth = canvas.width;
			gl.viewportHeight = canvas.height;
			gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
			self._pMatrix = mat4.create();
			mat4.perspective( 40, gl.viewportWidth / gl.viewportHeight, 0.1, 10000.0, self._pMatrix );

			gl.clearColor( 0.15, 0.15, 0.15, 1.0 );
			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

			return gl;
		},

		_initShader : function ( gl ) {
			var self = this,
				shaderProgram;

			shaderProgram = $.webgl.shader.addShaderProgram( self._gl, VERTEX_SHADER, FRAGMENT_SHADER );
			gl.useProgram( shaderProgram );

			shaderProgram.vertexPositionAttr = gl.getAttribLocation( shaderProgram, "aVertexPosition" );
			gl.enableVertexAttribArray( shaderProgram.vertexPositionAttr );

			shaderProgram.textureCoordAttr = gl.getAttribLocation( shaderProgram, "aTextureCoord" );
			gl.enableVertexAttribArray( shaderProgram.textureCoordAttr );

			// Set light normal vectors for lighting~
			shaderProgram.vertexNormalAttr = gl.getAttribLocation( shaderProgram, "aVertexNormal" );
			gl.enableVertexAttribArray( shaderProgram.vertexNormalAttr );

			shaderProgram.perspectiveMU = gl.getUniformLocation( shaderProgram, "uPerspectiveMatrix");
			shaderProgram.transformMU = gl.getUniformLocation( shaderProgram, "uMoveMatrix");
			shaderProgram.sampleUniform = gl.getUniformLocation( shaderProgram, "uSampler");

			// Set light variables~
			shaderProgram.normalMU = gl.getUniformLocation( shaderProgram, "nNormalMatrix");
			shaderProgram.ambientColorU = gl.getUniformLocation( shaderProgram, "uAmbientColor");
			shaderProgram.lightDirU_first = gl.getUniformLocation( shaderProgram, "uLightDirection_first");
			shaderProgram.lightDirU_second = gl.getUniformLocation( shaderProgram, "uLightDirection_second");
			shaderProgram.directionColorU = gl.getUniformLocation( shaderProgram, "uDirectionColor");

			return shaderProgram;
		},

		_initBuffers: function ( gl, shaderProgram ) {
			var self = this,
				i = 0,
				mashBase = 0,
				vertices = [],
				textureCoords = [],
				normalVectors = [],
				nodes = [],
				maxDrawLength = self._MAX_ITEM_COUNT;

			for ( i = 0; i < self._imageList.length + 1; i += 1 ) {
				nodes[i] = new Node();
				$.merge( vertices, nodes[i].vertices );
				$.merge( textureCoords, nodes[i].textureCoords );
				$.merge( normalVectors, nodes[i].normalVectors );

				nodes[i].textureBuffer = gl.createBuffer();
				gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, nodes[i].textureBuffer );
				mashBase = i * 4;
				nodes[i].meshOrder = [
					mashBase, mashBase + 1, mashBase + 2,
					mashBase + 2, mashBase + 3, mashBase
				];
				gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new GlArray16( nodes[i].meshOrder ), gl.STATIC_DRAW );
				gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null ); // release buffer memory
				nodes[i].textureBufferItemSize = 6;
			}

			self._positionBuffer = $.webgl.buffer.attribBufferData( gl, new GlArray32( vertices ) );
			self._positionBuffer.itemSize = 3;

			self._textureCoordBuffer = $.webgl.buffer.attribBufferData( gl, new GlArray32( textureCoords ) );
			self._textureCoordBuffer.itemSize = 2;

			self._normalVectorBuffer = $.webgl.buffer.attribBufferData( gl, new GlArray32( normalVectors ) ); // Vertex's normal vector for Direction light
			self._normalVectorBuffer.itemSize = 3;

			// Ambient light
			gl.uniform3f( shaderProgram.ambientColorU, 0.1, 0.1, 0.1 );
			// Direcntion light
			gl.uniform3f( shaderProgram.directionColorU, 1.0, 1.0, 1.0 );

			return nodes;
		},

		// ----------------------------------------------------------
		// Texture
		// ----------------------------------------------------------
		_initTextures: function ( gl, nodes ) {
			var self = this,
				count = 0;

			this._imageLoadTimer = setTimeout( function step() {
				var node = nodes[count], url;

				if ( self._imageList[count] ) {
					url = self._imageList[count].src;
					node.texture = gl.createTexture();
					self._loadImage( url, count, count, gl, nodes );
				}

				count++;
				if ( count < nodes.length ) {
					self._imageLoadTimer = setTimeout( step, 25 );
				}
			}, 25 );
		},

		_loadImage: function ( url, i, imageID, gl, nodes ) {
			var self = this,
				isMipmap = false,
				node;

			gl = gl || self._gl;
			nodes = nodes || self._nodes;
			isMipmap = isMipmap || false;
			node = nodes[i];
			node.image = node.image || new Image();
			node.imageID = imageID;

			$( node.image ).one( "load", function ( e ) {
				self._bindTexture( gl, node, this, isMipmap );

				if ( !self._animationID ) {
					self._setPosition( 0, 0 );
				}
			});

			if ( self.options.thumbnailCache ) {
				$.imageloader.getThumbnail( url, function ( result ) {
					if ( result === "NOT_FOUND_ERR" ) {
						$.imageloader.setThumbnail( url, function ( result ) {
							if ( result && result.length > 30 ) {
								node.image.src = result;
								isMipmap = true;
							} else {
								node.image.src = url;
							}
						});
					} else if ( result && result.length > 30 ) {
						node.image.src = result;
						isMipmap = true;
					} else {
						node.image.src = url;
					}
				});
			} else {
				node.image.src = url;
			}
		},

		_bindTexture: function ( gl, node, image, isMipmap ) {
			if ( !node || !node.texture ) {
				return;
			}

			gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );

			gl.bindTexture( gl.TEXTURE_2D, node.texture );
			gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );

			if ( isMipmap ) {
				gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
				gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST );
				gl.generateMipmap( gl.TEXTURE_2D );
			} else {
				gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
				gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
			}

			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );

			node.texture.loaded = true;

			// release texture memory
			gl.bindTexture( gl.TEXTURE_2D, null );
		},

		// ----------------------------------------------------------
		// rendering
		// ----------------------------------------------------------
		_setPosition: function ( progress, direction ) {
			var self = this,
				mat4 = glMatrix.mat4,
				nodes = self._nodes,
				imageList = self._imageList,
				imageListLength = imageList.length,
				itemCount = self._MAX_ITEM_COUNT,
				displayLength = ( imageListLength > itemCount ) ? itemCount : imageListLength,
				nextLevelLenth = 0,
				i = 0,
				t = 0,
				position = 0,
				angle = 0,
				current = 0,
				next = 0,
				nextLevel = 0,
				path = self._path;

			nextLevelLenth = ( direction >= 0 ) ? displayLength + 1 : displayLength;

			for ( i = 0; i < displayLength; i += 1 ) {
				if ( !nodes[i].mvMatrix ) {
					nodes[i].mvMatrix = mat4.create();
				}

				if ( direction > 0 && nodes[i].level >= displayLength ) {
					nodes[i].level = 0;
				}

				current = path.levels[nodes[i].level];
				nextLevel = ( nodes[i].level + nextLevelLenth + direction ) % nextLevelLenth;
				next = path.levels[nextLevel];

				if ( imageListLength > itemCount ) {
					if ( direction > 0 && nextLevel === 1
							&& self._firstImageNumber !== nodes[i].imageID ) {
						self._loadImage( imageList[self._firstImageNumber].src, i, self._firstImageNumber );
					} else if ( direction < 0 && nextLevel === nextLevelLenth - 1
							&& self._lastImageNumber !== nodes[i].imageID ) {
						self._loadImage( imageList[self._lastImageNumber].src, i, self._lastImageNumber );
					}
				}

				mat4.identity( nodes[i].mvMatrix );
				mat4.translate( nodes[i].mvMatrix, [-2.0, -2.0, 1.0] );
				mat4.rotate( nodes[i].mvMatrix, degreeToRadian( 19 ), [1, 0, 0] );

				t = ( current + ( next - current ) * ( ( progress > 1 ) ? 1 : progress ) );

				if ( progress >= self._ANIMATION_END ) {
					nodes[i].level = nextLevel || displayLength;
					t = path.levels[nodes[i].level];
				}

				if ( ( progress < self._ANIMATION_END )
						&& ( direction <= 0 && nodes[i].level < 1 ) ) {
					nodes[i].drawable = false;
				} else {
					nodes[i].drawable = true;
				}

				if ( progress === self._ANIMATION_END && nodes[i].level === 1 ) {
					self.element.trigger( "select", [imageList[nodes[i].imageID], nodes[i].imageID] );
				}

				position = path.getPosition( t );
				angle = path.getAngle( t );

				mat4.translate( nodes[i].mvMatrix, position );
				mat4.rotate( nodes[i].mvMatrix, angle, [0, 1, 0] );
			}

			if ( imageListLength > itemCount && progress >= self._ANIMATION_END ) {
				self._firstImageNumber = ( self._firstImageNumber - direction ) % imageListLength;
				if ( self._firstImageNumber < 0 ) {
					self._firstImageNumber = imageListLength - 1;
				}

				self._lastImageNumber = ( self._lastImageNumber - direction ) % imageListLength;
				if ( self._lastImageNumber < 0 ) {
					self._lastImageNumber = imageListLength - 1;
				}
			}
			self._drawScene();
		},

		_drawScene: function () {
			if ( !this._gl || !this._shaderProgram ) {
				return;
			}

			var self = this,
				gl = self._gl,
				shaderProgram = self._shaderProgram,
				nodes = self._nodes,
				nodesLength = nodes.length,
				i;

			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

			gl.bindBuffer( gl.ARRAY_BUFFER, self._positionBuffer );
			gl.vertexAttribPointer( shaderProgram.vertexPositionAttr, self._positionBuffer.itemSize, gl.FLOAT, false, 0, 0 );
			gl.bindBuffer( gl.ARRAY_BUFFER, null );

			gl.bindBuffer( gl.ARRAY_BUFFER, self._textureCoordBuffer );
			gl.vertexAttribPointer( shaderProgram.textureCoordAttr, self._textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0 );
			gl.bindBuffer( gl.ARRAY_BUFFER, null );

			gl.bindBuffer( gl.ARRAY_BUFFER, self._normalVectorBuffer );
			gl.vertexAttribPointer( shaderProgram.vertexNormalAttr, self._normalVectorBuffer.itemSize, gl.FLOAT, false, 0, 0 );
			gl.bindBuffer( gl.ARRAY_BUFFER, null );

			for ( i = 0; i < nodesLength; i += 1 ) {
				if ( nodes[i].drawable ) {
					self._drawElement( self._pMatrix, nodes[i] );
				}
			}
		},

		_drawElement: function ( perspectiveMatrix, targetNode ) {
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

			if ( !moveMatrix || !texture || !texture.loaded ) {
				return;
			}

			gl.activeTexture( gl.TEXTURE0 );
			gl.bindTexture( gl.TEXTURE_2D, texture );
			gl.uniform1i( shaderProgram.sampleUniform, 0 );

			LightDir = vec3.create();
			vec3.normalize( lightPositions[0], LightDir );
			vec3.scale( LightDir, -8 );
			gl.uniform3fv( shaderProgram.lightDirU_first, LightDir );

			vec3.normalize( lightPositions[1], LightDir );
			vec3.scale( LightDir, -1 );
			gl.uniform3fv( shaderProgram.lightDirU_second, LightDir );
			gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, meshIndexBuffer );

			gl.uniformMatrix4fv( shaderProgram.perspectiveMU, false, perspectiveMatrix );
			gl.uniformMatrix4fv( shaderProgram.transformMU, false, moveMatrix );

			normalMatrix = mat3.create();
			mat4.toInverseMat3( moveMatrix, normalMatrix );
			mat3.transpose( normalMatrix );
			gl.uniformMatrix3fv( shaderProgram.normalMU, false, normalMatrix );

			gl.drawElements( gl.TRIANGLES, meshIndexBufferItemSize, gl.UNSIGNED_SHORT, 0 );

			// release buffer memory
			gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );

			// release texture memory
			gl.bindTexture( gl.TEXTURE_2D, null );
		},

		// ----------------------------------------------------------
		// Animation
		// ----------------------------------------------------------
		_animate: function ( easingType, duration, direction, repeatCount, startValue, _removeCount ) {
			var self = this,
				timeNow = $.now(),
				progress,
				removeCount = 0;

			easingType = easingType || "linear";
			startValue = startValue || 0;
			_removeCount = _removeCount || 0;

			if ( self._sumTime >= duration ) {
				self._setPosition( self._ANIMATION_END, direction );
				self._stop();
				return;
			}

			if ( self._startTime === 0 ) {
				self._startTime = timeNow;
			} else {
				self._sumTime = timeNow - self._startTime;
				progress = $.easing[ easingType ]( self._sumTime / duration, self._sumTime, startValue, repeatCount + 1, duration );
				removeCount = parseInt( Math.abs( progress ), 10 );

				if ( _removeCount !== removeCount ) {
					self._setPosition( self._ANIMATION_END, direction );
					_removeCount = removeCount;

					if ( ( repeatCount - _removeCount ) >= 0 ) {
						self._animate( easingType, duration, direction, repeatCount, startValue, _removeCount );
					} else {
						self._stop();
					}
					return;
				}

				self._setPosition( progress - _removeCount, direction );
			}

			self._animationID = requestAnimationFrame( function () {
				self._animate( easingType, duration, direction, repeatCount, startValue, _removeCount );
			});
		},

		_run: function ( direction, repeatCount, startValue ) {
			var self = this,
				repeat = repeatCount || 0,
				duration = self._DURATION_DEFAULT * ( repeat + 1 );

			if ( !self._gl ) {
				self._operationQueue.push( direction );
				return;
			}

			if ( self._imageList.length <= 1 ) {
				return;
			}

			startValue = startValue || 0;
			duration = ( duration >= 0 ) ? duration : 0;

			if ( self._animationID ) {
				self._setPosition( self._ANIMATION_END, direction );
				self._stop();
			}

			self._animate( "easeOutExpo", duration, direction, repeat, startValue );
		},

		_reset: function () {
			if ( !this._canvas || !this._gl ) {
				return;
			}

			this._final();
			this._init();
			this.refresh();
		},

		_stop: function () {
			if ( this._animationID ) {
				cancelAnimationFrame( this._animationID );
			}
			this._animationID = 0;

			this._startTime = 0;
			this._sumTime = 0;
		},

		next: function () {
			this._run( this._DIRECTION_LEFT , 0 );
		},

		prev: function () {
			this._run( this._DIRECTION_RIGHT, 0 );
		},

		refresh: function () {
			var view = this.element,
				canvas = view.find( "canvas.ui-gallery3d-canvas" );

			if ( canvas.width() !== view.width() ) {
				canvas.width( view.width() );
			}

			if ( this._gl && !this._animationID ) {
				this._setPosition( 0, 0 );
			}
		},

		select: function ( index ) {
			var nodes = this._nodes,
				repeat,
				i,
				imageID,
				object = null,
				target = 0,
				direction = 0;

			if ( index && this._animationID ) {
				this._stop();
			}

			for ( i in nodes ) {
				if ( nodes[i].level === 1 ) {
					object = this._imageList[ nodes[i].imageID ];
					imageID = nodes[i].imageID;
					break;
				}
			}

			if ( !index ) {
				return object;
			}

			if ( index < 0 && index >= this._imageList.length ) {
				return;
			}

			target = index - imageID;
			direction = ( target > 0 ) ? this._DIRECTION_LEFT
				: ( ( target < 0 ) ? this._DIRECTION_RIGHT : 0 );
			if ( direction ) {
				this._run( direction, Math.abs( target ) - 1  );
			}
		},

		add: function ( item, index ) {
			if ( !item ) {
				return;
			}

			if ( typeof item === "string" ) {
				item = { "src" : item };
			}

			index = index || 0;
			if ( typeof index !== "number" && index < 0
					&& index >= this._imageList.length ) {
				return;
			}

			this._imageList.splice( index, 0, item );
			if ( this._gl ) {
				this._reset();
			}
		},

		remove: function ( index ) {
			index = index || 0;
			if ( typeof index !== "number" && index < 0
					&& index >= this._imageList.length ) {
				return;
			}

			this._imageList.splice( index, 1 );
			if ( this._gl ) {
				this._reset();
			}
		},

		clearThumbnailCache: function () {
			if ( !this._nodes || ( this._nodes.length <= 0 ) ) {
				return;
			}

			var i, url;
			for ( i = 0; i < this._imageList.length; i += 1 ) {
				url = this._imageList[i].src;
				$.imageloader.removeThumbnail( url );
			}
		},

		empty: function () {
			this._imageList = [];
			this._reset();
		},

		length: function () {
			return this._imageList.length;
		}
	});

	$( document ).on( "pagecreate create", function ( e ) {
		$( ":jqmData(role='gallery3d')" ).gallery3d();
	}).on( "pagechange", function ( e ) {
		$( e.target ).find( ".ui-gallery3d" ).gallery3d( "refresh" );
	});

	$( window ).on( "resize orientationchange", function ( e ) {
		$( ".ui-page-active" ).find( ".ui-gallery3d" ).gallery3d( "refresh" );
	});

} ( jQuery, document, window ) );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
} );
//>>excludeEnd("jqmBuildExclude");
