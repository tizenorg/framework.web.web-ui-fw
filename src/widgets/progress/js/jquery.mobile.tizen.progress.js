/* ***************************************************************************
 * Copyright (c) 2000 - 2011 Samsung Electronics Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software" ),
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
 *	Author: Koeun Choi <koeun.choi@samsung.com>
 */

/*
 * Progressing widget
 *
 * HTML Attributes
 *
 *  data-role: set to 'progressing'.
 *  data-style: 'circle' or 'pending'.
 *
 * APIs
 *
 *  show(): show the progressing.
 *  hide(): hide the progressing.
 *  running(boolean): start or stop the running.
 *
 * Events
 *
 *  N/A
 *
 * Examples
 *
 * <li data-role="list-divider">Progress Pending</li>
 * <li>
 *	<div data-role="progressing" data-style="pending" id="pending"></div>
 * </li>
 * <li data-role="list-divider">Progress ~ing</li>
 * <li>
 *	<div data-role="progressing" data-style="circle" id="progressing"></div>Loading..
 * </li>
 *
 * $("#pending").progress( "running", true );
 * $("#progressing").progress( "running", true );
 *
 */

(function ( $, window, undefined ) {
	$.widget( "tizen.progress", $.mobile.widget, {
		options: {
			style: "circle",
			running: false
		},

		show: function () {
			$( this.element ).show();
		},

		hide: function () {
			$( this.element ).hide();
		},

		_start: function () {
			if ( !this.init ) {
				$( this.element ).append( this.html );
				this.init = true;
			}

			this.show();

			$( this.element )
				.find( ".ui-progress-" + this.options.style )
				.addClass( this.runningClass );
		},

		_stop: function () {
			$( this.element )
				.find( ".ui-progress-" + this.options.style )
				.removeClass( this.runningClass );
		},

		running: function ( running ) {
			if ( running === undefined ) {
				return this.options.running;
			}

			this._setOption( "running", running );
		},

		_setOption: function ( key, value ) {
			if ( key === "running" ) {
				if ( typeof value !== "boolean" ) {
					window.alert( "running value MUST be boolean type!" );
					return;
				}

				this.options.running = value;
				this._refresh();
			}
		},

		_refresh: function () {
			if ( this.options.running ) {
				this._start();
			} else {
				this._stop();
			}
		},

		_create: function () {
			var self = this,
				element = this.element,
				style = element.jqmData( "style" ),
				runningClass;

			if ( style ) {
				this.options.style = style;
			} else {
				style = this.options.style;
			}

			this.html = $( '<div class="ui-progress-container-' + style + '">' +
						'<div class="ui-progress-' + style + '"></div>' +
					'</div>' );

			runningClass = "ui-progress-" + style + "-running";

			$.extend( this, {
				init: false,
				runningClass: runningClass
			} );
			this._refresh();
		}
	} ); /* End of widget */

	$( document ).bind( "pagecreate", function ( e ) {
		$( e.target ).find( ":jqmData(role='progressing')" ).progress();
	} );
}( jQuery, this ));
