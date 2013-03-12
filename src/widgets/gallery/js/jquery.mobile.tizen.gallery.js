/* ***************************************************************************
 * Copyright (c) 2000 - 2011 Samsung Electronics Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 * ***************************************************************************
 *
 *	Author: Minkyu Kang <mk7.kang@samsung.com>
 */

/*
 * Gallery widget
 *
 * HTML Attributes
 *
 *  data-role: set to 'gallery'
 *  data-index: start index
 *  data-vertical-align: set to top or middle or bottom.
 *
 * APIs
 *
 *  add(file): add the image (parameter: url of iamge)
 *  remove(index): remove the image (parameter: index of image)
 *  refresh(index): refresh the widget, should be called after add or remove. (parameter: start index)
 *  empty: remove all of images from the gallery
 *  length: get length of images
 *  value(index): get or set current index of gallery (parameter: index of image)
 *
 * Events
 *
 *  N/A
 *
 * Example
 *
 * <div data-role="gallery" id="gallery" data-index="3" data-vertical-align="middle">
 *	<img src="01.jpg">
 *	<img src="02.jpg">
 *	<img src="03.jpg">
 *	<img src="04.jpg">
 *	<img src="05.jpg">
 * </div>
 *
 *
 * $('#gallery-add').bind('vmouseup', function ( e ) {
 *	$('#gallery').gallery('add', '9.jpg');
 *	$('#gallery').gallery('add', '10.jpg');
 *	$('#gallery').gallery('refresh');
 * });
 *
 * $('#gallery-del').bind('vmouseup', function ( e ) {
 *	$('#gallery').gallery('remove');
 * });
 *
 */

 /**
	@class Gallery
	The gallery widget shows images in a gallery on the screen. <br/><br/> To add an gallery widget to the application, use the following code:

		<div data-role="gallery" id="gallery" data-vertical-align="middle" data-index="3">
			<img src="01.jpg">
			<img src="02.jpg">
			<img src="03.jpg">
			<img src="04.jpg">
			<img src="05.jpg">
		</div>
*/
/**
	@property {Integer} data-index
	Defines the index number of the first image in the gallery.
	<br/>The default value is 0.
*/
/**
	@property {String} data-vertical-align
	Defines the image alignment. The alignment options are top, middle, and bottom.
	<br/>The default value is top.
*/
/**
	@method add
	The add method is used to add an image to the gallery. The image_file attribute defines the image file URL.

		<div id="gallery" data-role="gallery" data-vertical-align="middle"></div>
		$("#gallery").gallery('add', [image_file]);
*/
/**
	@method remove
	The remove method is used to delete an image from the gallery. The image_index attribute defines the index of the image to be deleted. If not set removes current image.

		<div id="gallery" data-role="gallery" data-vertical-align="middle"></div>
		$("#gallery").gallery('remove', [image_index]);
*/
/**
	@method refresh
	The refresh method is used to refresh the gallery. This method must be called after adding images to the gallery.

		<div id="gallery" data-role="gallery" data-vertical-align="middle"></div>
		$("#gallery").gallery('refresh');
*/
/**
	@method empty
	The empty method is used to remove all of images from the gallery.

		<div id="gallery" data-role="gallery" data-vertical-align="middle"></div>
		$("#gallery").gallery('empty');
*/
/**
	@method length
	The length method is used to get length of images.

		<div id="gallery" data-role="gallery" data-vertical-align="middle"></div>
		length = $("#gallery").gallery('length');
*/
/**
	@method value
	The value method is used to get or set current index of gallery. The image_index attribute defines the index of the image to be set. If not get current index.

		<div id="gallery" data-role="gallery" data-vertical-align="middle"></div>
		value = $("#gallery").gallery('value');
		$("#gallery").gallery('value', [image_index]);
*/
(function ( $, window, undefined ) {
	$.widget( "tizen.gallery", $.mobile.widget, {
		options: {
			flicking: false,
			duration: 500
		},

		dragging: false,
		moving: false,
		max_width: 0,
		max_height: 0,
		org_x: 0,
		org_time: null,
		cur_img: null,
		prev_img: null,
		next_img: null,
		images: [],
		images_hold: [],
		index: 0,
		align_type: null,
		direction: 1,
		container: null,

		_resize: function ( index ) {
			var img = this.images[index],
				width = this.images[index].width(),
				height = this.images[index].height(),
				margin = 0,
				ratio,
				img_max_width = this.max_width - margin,
				img_max_height = this.max_height - margin;

			ratio = height / width;

			if ( width > img_max_width ) {
				img.width( img_max_width );
				img.height( img_max_width * ratio );
			}

			height = img.height();

			if ( height > img_max_height ) {
				img.height( img_max_height );
				img.width( img_max_height / ratio );
			}
		},

		_align: function ( index, obj ) {
			var img = this.images[index],
				img_top = 0;

			if ( !obj ) {
				return;
			}
			if ( !obj.length ) {
				return;
			}

			if ( this.align_type == "middle" ) {
				img_top = ( this.max_height - img.height() ) / 2;
			} else if ( this.align_type == "bottom" ) {
				img_top = this.max_height - img.height();
			} else {
				img_top = 0;
			}

			obj.css( 'top', img_top + 'px' );
		},

		_attach: function ( index, obj ) {
			var self = this,
				processing = function () {
					self._resize( index );
					self._align( index, obj );
				},
				loading = function () {
					if ( self.images[index] === undefined ) {
						return;
					}

					if ( !self.images[index].height() ) {
						setTimeout( loading, 10 );
						return;
					}

					processing();
				};

			if ( !obj ) {
				return;
			}
			if ( !obj.length ) {
				return;
			}
			if ( index < 0 ) {
				return;
			}
			if ( !this.images.length ) {
				return;
			}
			if ( index >= this.images.length ) {
				return;
			}

			obj.css( "display", "block" );
			obj.append( this.images[index] );

			loading();
		},

		_detach: function ( index, obj ) {
			if ( !obj ) {
				return;
			}
			if ( !obj.length ) {
				return;
			}
			if ( index < 0 ) {
				return;
			}
			if ( index >= this.images.length ) {
				return;
			}

			obj.css( "display", "none" );
			this.images[index].removeAttr("style");
			this.images[index].detach();
		},

		_detach_all: function () {
			var i;

			for ( i = 0; i < this.images.length; i++ ) {
				this.images[i].detach();
			}
		},

		_drag: function ( _x ) {
			var delta,
				coord_x;

			if ( !this.dragging ) {
				return;
			}

			if ( this.options.flicking === false ) {
				delta = this.org_x - _x;

				// first image
				if ( delta < 0 && !this.prev_img.length ) {
					return;
				}
				// last image
				if ( delta > 0 && !this.next_img.length ) {
					return;
				}
			}

			coord_x = _x - this.org_x;

			this.cur_img.css( 'left', coord_x + 'px' );
			if ( this.next_img.length ) {
				this.next_img.css( 'left', coord_x + this.window_width + 'px' );
			}
			if ( this.prev_img.length ) {
				this.prev_img.css( 'left', coord_x - this.window_width + 'px' );
			}
		},

		_move: function ( _x ) {
			var delta = this.org_x - _x,
				flip = 0,
				drag_time,
				sec,
				self;

			if ( delta == 0 ) {
				return;
			}

			if ( delta > 0 ) {
				flip = delta < ( this.max_width * 0.45 ) ? 0 : 1;
			} else {
				flip = -delta < ( this.max_width * 0.45 ) ? 0 : 1;
			}

			if ( !flip ) {
				drag_time = Date.now() - this.org_time;

				if ( Math.abs( delta ) / drag_time > 1 ) {
					flip = 1;
				}
			}

			if ( flip ) {
				if ( delta > 0 && this.next_img.length ) {
					/* next */
					this._detach( this.index - 1, this.prev_img );

					this.prev_img = this.cur_img;
					this.cur_img = this.next_img;
					this.next_img = this.next_img.next();

					this.index++;

					if ( this.next_img.length ) {
						this.next_img.css( 'left', this.window_width + 'px' );
						this._attach( this.index + 1, this.next_img );
					}

					this.direction = 1;

				} else if ( delta < 0 && this.prev_img.length ) {
					/* prev */
					this._detach( this.index + 1, this.next_img );

					this.next_img = this.cur_img;
					this.cur_img = this.prev_img;
					this.prev_img = this.prev_img.prev();

					this.index--;

					if ( this.prev_img.length ) {
						this.prev_img.css( 'left', -this.window_width + 'px' );
						this._attach( this.index - 1, this.prev_img );
					}

					this.direction = -1;
				}
			}

			sec = this.options.duration;
			self = this;

			this.moving = true;

			setTimeout( function () {
				self.moving = false;
			}, sec - 50 );

			this.cur_img.animate( { left: 0 }, sec );
			if ( this.next_img.length ) {
				this.next_img.animate( { left: this.window_width }, sec );
			}
			if ( this.prev_img.length ) {
				this.prev_img.animate( { left: -this.window_width }, sec );
			}
		},

		_add_event: function () {
			var self = this,
				date;

			this.container.bind( 'vmousemove', function ( e ) {
				e.preventDefault();

				if ( self.moving ) {
					return;
				}
				if ( !self.dragging ) {
					return;
				}

				self._drag( e.pageX );
			} );

			this.container.bind( 'vmousedown', function ( e ) {
				e.preventDefault();

				if ( self.moving ) {
					return;
				}

				self.dragging = true;

				self.org_x = e.pageX;

				self.org_time = Date.now();
			} );

			this.container.bind( 'vmouseup', function ( e ) {
				if ( self.moving ) {
					return;
				}

				self.dragging = false;

				self._move( e.pageX );
			} );

			this.container.bind( 'vmouseout', function ( e ) {
				if ( self.moving ) {
					return;
				}
				if ( !self.dragging ) {
					return;
				}

				if ( ( e.pageX < 20 ) ||
						( e.pageX > ( self.max_width - 20 ) ) ) {
					self._move( e.pageX );
					self.dragging = false;
				}
			} );
		},

		_del_event: function () {
			this.container.unbind( 'vmousemove' );
			this.container.unbind( 'vmousedown' );
			this.container.unbind( 'vmouseup' );
			this.container.unbind( 'vmouseout' );
		},

		_show: function () {
			/* resizing */
			this.window_width = $( window ).width();
			this.max_width = this._get_width();
			this.max_height = this._get_height();
			this.container.css( 'height', this.max_height );

			this.cur_img = $( 'div' ).find( '.ui-gallery-bg:eq(' + this.index + ')' );
			this.prev_img = this.cur_img.prev();
			this.next_img = this.cur_img.next();

			this._attach( this.index - 1, this.prev_img );
			this._attach( this.index, this.cur_img );
			this._attach( this.index + 1, this.next_img );

			if ( this.prev_img.length ) {
				this.prev_img.css( 'left', -this.window_width + 'px' );
			}

			this.cur_img.css( 'left', '0px' );

			if ( this.next_img.length ) {
				this.next_img.css( 'left', this.window_width + 'px' );
			}
		},

		show: function () {
			if ( !this.images.length ) {
				return;
			}

			this._show();
			this._add_event();
		},

		_hide: function () {
			this._detach( this.index - 1, this.prev_img );
			this._detach( this.index, this.cur_img );
			this._detach( this.index + 1, this.next_img );
		},

		hide: function () {
			this._hide();
			this._del_event();
		},

		_get_width: function () {
			return $( this.element ).width();
		},

		_get_height: function () {
			var $page = $( this.element ).parentsUntil( 'ui-page' ),
				$content = $page.children( '.ui-content' ),
				header_h = $page.children( '.ui-header' ).outerHeight() || 0,
				footer_h = $page.children( '.ui-footer' ).outerHeight() || 0,
				padding = parseFloat( $content.css( 'padding-top' ) )
					+ parseFloat( $content.css( 'padding-bottom' ) ),
				content_h = $( window ).height() - header_h - footer_h - padding;

			return content_h;
		},

		_create: function () {
			var temp_img,
				self = this,
				index,
				i = 0;

			$( this.element ).wrapInner( '<div class="ui-gallery"></div>' );
			$( this.element ).find( 'img' ).wrap( '<div class="ui-gallery-bg"></div>' );

			this.container = $( this.element ).find('.ui-gallery');

			temp_img = $( 'div' ).find( '.ui-gallery-bg:first' );

			while ( temp_img.length ) {
				this.images[i] = temp_img.find( 'img' );
				temp_img = temp_img.next();
				i++;
			}

			this._detach_all();

			index = parseInt( $( this.element ).jqmData( 'index' ), 10 );
			if ( !index ) {
				index = 0;
			}
			if ( index < 0 ) {
				index = 0;
			}
			if ( index >= this.images.length ) {
				index = this.images.length - 1;
			}

			this.index = index;

			this.align_type = $( this.element ).jqmData( 'vertical-align' );

			$( window ).bind( 'resize', function () {
				self.refresh();
			});
		},

		_update: function () {
			var image_file,
				bg_html,
				temp_img;

			while ( this.images_hold.length ) {
				image_file = this.images_hold.shift();

				bg_html = $( '<div class="ui-gallery-bg"></div>' );
				temp_img = $( '<img src="' + image_file + '"></div>' );

				bg_html.append( temp_img );
				this.container.append( bg_html );
				this.images.push( temp_img );
			}

			this._detach_all();
		},

		refresh: function ( start_index ) {
			this._update();

			this._hide();

			if ( start_index === undefined ) {
				start_index = this.index;
			}
			if ( start_index < 0 ) {
				start_index = 0;
			}
			if ( start_index >= this.images.length ) {
				start_index = this.images.length - 1;
			}

			this.index = start_index;

			this._show();

			return this.index;
		},

		add: function ( file ) {
			this.images_hold.push( file );
		},

		remove: function ( index ) {
			var temp_img;

			if ( index === undefined ) {
				index = this.index;
			}

			if ( index < 0 || index >= this.images.length ) {
				return;
			}

			if ( index == this.index ) {
				temp_img = this.cur_img;

				if ( this.index == 0 ) {
					this.direction = 1;
				} else if ( this.index == this.images.length - 1 ) {
					this.direction = -1;
				}

				if ( this.direction < 0 ) {
					this.cur_img = this.prev_img;
					this.prev_img = this.prev_img.prev();
					if ( this.prev_img.length ) {
						this.prev_img.css( 'left', -this.window_width );
						this._attach( index - 2, this.prev_img );
					}
					this.index--;
				} else {
					this.cur_img = this.next_img;
					this.next_img = this.next_img.next();
					if ( this.next_img.length ) {
						this.next_img.css( 'left', this.window_width );
						this._attach( index + 2, this.next_img );
					}
				}

				this.cur_img.animate( { left: 0 }, this.options.duration );

			} else if ( index == this.index - 1 ) {
				temp_img = this.prev_img;
				this.prev_img = this.prev_img.prev();
				if ( this.prev_img.length ) {
					this.prev_img.css( 'left', -this.window_width );
					this._attach( index - 1, this.prev_img );
				}
				this.index--;

			} else if ( index == this.index + 1 ) {
				temp_img = this.next_img;
				this.next_img = this.next_img.next();
				if ( this.next_img.length ) {
					this.next_img.css( 'left', this.window_width );
					this._attach( index + 1, this.next_img );
				}

			} else {
				temp_img = $( 'div' ).find( '.ui-gallery-bg:eq(' + index + ')' );
			}

			this.images.splice( index, 1 );
			temp_img.detach();
		},

		empty: function () {
			this.images.splice( 0, this.images.length );
			this.container.find('.ui-gallery-bg').detach();
		},

		length: function () {
			return this.images.length;
		},

		value: function ( index ) {
			if ( index === undefined ) {
				return this.index;
			}

			this.refresh( index );
		}
	}); /* End of widget */

	// auto self-init widgets
	$( document ).bind( "pagecreate create", function ( e ) {
		$( e.target ).find( ":jqmData(role='gallery')" ).gallery();
	});

	$( document ).bind( "pageshow", function ( e ) {
		$( e.target ).find( ":jqmData(role='gallery')" ).gallery( 'show' );
	});

	$( document ).bind( "pagebeforehide", function ( e ) {
		$( e.target ).find( ":jqmData(role='gallery')" ).gallery( 'hide' );
	} );

}( jQuery, this ) );