/*
 * jQuery Mobile Widget @VERSION
 *
 * This software is licensed under the MIT licence (as defined by the OSI at
 * http://www.opensource.org/licenses/mit-license.php)
 *
 * ***************************************************************************
 * Copyright (c) 2000 - 2011 Samsung Electronics Co., Ltd.
 * Copyright (c) 2011 by Intel Corporation Ltd.
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
 * Authors: Max Waterman <max.waterman@intel.com>
 * Authors: Minkyu Kang <mk7.kang@samsung.com>
 */

/**
 * tizenslider modifies the JQuery Mobile slider and is created in the same way.
 *
 * See the JQuery Mobile slider widget for more information :
 *     http://jquerymobile.com/demos/1.0a4.1/docs/forms/forms-slider.html
 *
 * The JQuery Mobile slider option:
 *     theme: specify the theme using the 'data-theme' attribute
 *
 * Options:
 *     theme: string; the theme to use if none is specified using the 'data-theme' attribute
 *            default: 'c'
 *     popup: boolean; controls whether the popup is displayed or not
 *                   specify if the popup is enabled using the 'data-popup' attribute
 *                   set from javascript using .tizenslider('option','popup',newValue)
 *
 * Events:
 *     changed: triggers when the value is changed (rather than when the handle is moved)
 *
 * Examples:
 *
 *     <a href="#" id="popupEnabler" data-role="button" data-inline="true">Enable popup</a>
 *     <a href="#" id="popupDisabler" data-role="button" data-inline="true">Disable popup</a>
 *     <div data-role="fieldcontain">
 *         <input id="mySlider" data-theme='a' data-popup='false' type="range" name="slider" value="7" min="0" max="9" />
 *     </div>
 *     <div data-role="fieldcontain">
 *         <input id="mySlider2" type="range" name="slider" value="77" min="0" max="777" />
 *     </div>
 *
 *     // disable popup from javascript
 *     $('#mySlider').tizenslider('option','popup',false);
 *
 *     // from buttons
 *     $('#popupEnabler').bind('vclick', function() {
 *         $('#mySlider').tizenslider('option','popup',true);
 *     });
 *     $('#popupDisabler').bind('vclick', function() {
 *         $('#mySlider').tizenslider('option','popup',false);
 *     });
 */

/**
	@class Slider
	The slider widget shows a control on the screen that you can use to change values by dragging a handle on a horizontal scale. Sliders can be used in Tizen as described in the jQueryMobile documentation for sliders.

	To add a slider widget to the application, use the following code:

		<input data-popup='false' type="range" name="slider" value="5" min="0" max="10" data-icon="text" data-text-left="Min" data-text-right="Max" />

	The slider can define callbacks for events as described in the jQueryMobile documentation for slider events.
	You can use methods with the slider as described in the jQueryMobile documentation for slider methods.
*/
/**
	@property {String} data-icon
	Defines the icon style for the slider ends. The icon options are bright, volume, and text.
	The default value is text.
*/
/**
	@property {Boolean} data-popup
	Enables or disables a pop-up showing the current value while the handle is dragged.
	The default value is true.
*/
/**
	@property {String} data-text-left
	Defines the text displayed on the left side of the slider.
	The data-icon option must be set to text.
*/
/**
	@property {String} data-text-right
	Defines the text displayed on the right side of the slider.
	The data-icon option must be set to text.
*/

(function ($, window, undefined) {
	$.widget("tizen.tizenslider", $.mobile.widget, {
		options: {
			popup: true
		},

		popup: null,
		handle: null,
		handleText: null,

		_create: function () {
			this.currentValue = null;
			this.popupVisible = false;

			var self = this,
				inputElement = $( this.element ),
				slider,
				handle_press,
				popupEnabledAttr,
				icon,
				text_right,
				text_left,
				text_length,
				elem_left,
				elem_right,
				margin_left,
				margin_right;

			// apply jqm slider
			inputElement.slider();

			// hide the slider input element proper
			inputElement.hide();

			self.popup = $('<div class="ui-slider-popup"></div>');

			// set the popup according to the html attribute
			popupEnabledAttr = inputElement.jqmData('popup');
			if ( popupEnabledAttr !== undefined ) {
				self.options.popup = ( popupEnabledAttr == true );
			}

			// get the actual slider added by jqm
			slider = inputElement.next('.ui-slider');

			icon = inputElement.attr('data-icon');

			// wrap the background
			slider.wrap('<div class="ui-slider-container"></div>');

			// get the handle
			self.handle = slider.find('.ui-slider-handle');

			// remove the rounded corners from the slider and its children
			slider.removeClass('ui-btn-corner-all');
			slider.find('*').removeClass('ui-btn-corner-all');

			// add icon
			switch ( icon ) {
			case 'bright':
			case 'volume':
				elem_left = $('<div class="ui-slider-left-' + icon + '"></div>');
				elem_right = $('<div class="ui-slider-right-' + icon + '"></div>');

				slider.before( elem_left );
				slider.after( elem_right );

				margin_left = elem_left.width() + 16;
				margin_right = elem_right.width() + 16;
				break;

			case 'text':
				text_left = ( inputElement.attr('data-text-left') === undefined ) ? '' :
						inputElement.attr('data-text-left').substring( 0, 3 );
				text_right = ( inputElement.attr('data-text-right') === undefined ) ? '' :
						inputElement.attr('data-text-right').substring( 0, 3 );

				text_length = Math.max( text_left.length, text_right.length );

				margin_left = text_length + "rem";
				margin_right = text_length + "rem";

				elem_left = $('<div class="ui-slider-left-text" style="left:' +
					-( text_length ) + 'rem; width:' + text_length + 'rem;">' +
					'<span style="position:relative;top:0.4em;">' +
					text_left +
					'</span></div>');
				elem_right = $('<div class="ui-slider-right-text" style="right:' +
					-( text_length ) + 'rem; width:' + text_length + 'rem;">' +
					'<span style="position:relative;top:0.4em;">' +
					text_right +
					'</span></div>');

				slider.before( elem_left );
				slider.after( elem_right );
				break;
			}

			if ( icon ) {
				slider.parent('.ui-slider-container').css({
					"margin-left": margin_left,
					"margin-right": margin_right
				});
			}

			// handle press
			slider.append($('<div class="ui-slider-handle-press"></div>'));
			self.handle_press = slider.find('.ui-slider-handle-press');
			self.handle_press.css('display', 'none');

			// add a popup element (hidden initially)
			slider.before( self.popup );
			self.popup.hide();

			// get the element where value can be displayed
			self.handleText = slider.find('.ui-btn-text');

			// set initial value
			self.updateSlider();

			// bind to changes in the slider's value to update handle text
			this.element.bind('change', function () {
				self.updateSlider();
			});

			// bind clicks on the handle to show the popup
			self.handle.bind('vmousedown', function () {
				self.showPopup();
			});

			// watch events on the document to turn off the slider popup
			slider.add( document ).bind('vmouseup', function () {
				self.hidePopup();
			});
		},

		_handle_press_show: function () {
			this.handle_press.css('display', '');
		},

		_handle_press_hide: function () {
			this.handle_press.css('display', 'none');
		},

		// position the popup
		positionPopup: function () {
			var dstOffset = this.handle.offset();

			this.popup.offset({
				left: dstOffset.left + ( this.handle.width() - this.popup.width() ) / 2
			});

			this.handle_press.offset({
				left: dstOffset.left,
				top: dstOffset.top
			});
		},

		// show value on the handle and in popup
		updateSlider: function () {
			var font_size,
				padding_size,
				newValue;

			// remove the title attribute from the handle (which is
			// responsible for the annoying tooltip); NB we have
			// to do it here as the jqm slider sets it every time
			// the slider's value changes :(
			this.handle.removeAttr('title');

			newValue = this.element.val();

			if ( this.popupVisible ) {
				this.positionPopup();

				if ( newValue > 999 ) {
					font_size = '0.8rem';
					padding_size = '0.5rem';
				} else if ( newValue > 99 ) {
					font_size = '1rem';
					padding_size = '0.5rem';
				} else {
					font_size = '1.5rem';
					padding_size = '0.15rem';
				}

				this.popup.css({
					"font-size": font_size,
					"padding-top": padding_size
				});
			}

			if ( newValue === this.currentValue ) {
				return;
			}

			if ( newValue > 999 ) {
				font_size = '0.5rem';
			} else if ( newValue > 99 ) {
				font_size = '0.7rem';
			} else if ( newValue > 9 ) {
				font_size = '0.85rem';
			} else {
				font_size = '0.95rem';
			}

			if ( font_size != this.handleText.css('font-size') ) {
				this.handleText.css( 'font-size', font_size );
			}

			this.currentValue = newValue;
			this.handleText.text( newValue );
			this.popup.html( newValue );

			this.element.trigger( 'update', newValue );
		},

		// show the popup
		showPopup: function () {
			if ( !this.options.popup || this.popupVisible ) {
				return;
			}

			this.popup.show();
			this.popupVisible = true;
			this._handle_press_show();
		},

		// hide the popup
		hidePopup: function () {
			if ( !this.options.popup || !this.popupVisible ) {
				return;
			}

			this.popup.hide();
			this.popupVisible = false;
			this._handle_press_hide();
		},

		_setOption: function (key, value) {
			var needToChange = ( value !== this.options[key] );

			if ( !needToChange ) {
				return;
			}

			switch ( key ) {
			case 'popup':
				this.options.popup = value;

				if ( this.options.popup) {
					this.updateSlider();
				} else {
					this.hidePopup();
				}

				break;
			}
		}
	});

	// stop jqm from initialising sliders
	$( document ).bind( "pagebeforecreate", function ( e ) {
		if ( $.data( window, "jqmSliderInitSelector" ) === undefined ) {
			$.data( window, "jqmSliderInitSelector",
				$.mobile.slider.prototype.options.initSelector );
			$.mobile.slider.prototype.options.initSelector = null;
		}
	});

	// initialise sliders with our own slider
	$( document ).bind( "pagecreate", function ( e ) {
		var jqmSliderInitSelector = $.data( window, "jqmSliderInitSelector" );
		$( e.target ).find(jqmSliderInitSelector).not('select').tizenslider();
		$( e.target ).find(jqmSliderInitSelector).filter('select').slider();
	});

}( jQuery, this ));
