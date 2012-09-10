/*
 * jQuery UI Progressbar @VERSION
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 * Original file:
 *   jquery.ui.progressbar.js
 */
/* This is from jquery ui plugin - progressbar 11/16/2011 */

(function ( $, window, undefined ) {

	$.widget( "tizen.progressbar", $.mobile.widget, {
		options: {
			value: 0,
			max: 100
		},

		min: 0,

		_create: function () {
			this.element
				.addClass( "ui-progressbar" )
				.attr( {
					role: "progressbar",
					"aria-valuemin": this.min,
					"aria-valuemax": this.options.max,
					"aria-valuenow": this._value()
				} );

			this.valueDiv = $( "<div class='ui-progressbar-value'></div>" )
				.appendTo( this.element );

			this.oldValue = this._value();
			this._refreshValue();
		},

		_destroy: function () {
			this.element
				.removeClass( "ui-progressbar" )
				.removeAttr( "role" )
				.removeAttr( "aria-valuemin" )
				.removeAttr( "aria-valuemax" )
				.removeAttr( "aria-valuenow" );

			this.valueDiv.remove();
		},

		value: function ( newValue ) {
			if ( newValue === undefined ) {
				return this._value();
			}

			this._setOption( "value", newValue );
			return this;
		},

		_setOption: function ( key, value ) {
			if ( key === "value" ) {
				this.options.value = value;
				this._refreshValue();
				if ( this._value() === this.options.max ) {
					this._trigger( "complete" );
				}
			}
			// jquery.ui.widget.js MUST be updated to new version!
			//this._super( "_setOption", key, value );
		},

		_value: function () {
			var val = this.options.value;
			// normalize invalid value
			if ( typeof val !== "number" ) {
				val = 0;
			}
			return Math.min( this.options.max, Math.max( this.min, val ) );
		},

		_percentage: function () {
			return 100 * this._value() / this.options.max;
		},

		_refreshValue: function () {
			var value = this.value(),
				percentage = this._percentage();

			if ( this.oldValue !== value ) {
				this.oldValue = value;
				this._trigger( "change" );
			}

			this.valueDiv
				.toggle( value > this.min )
				.width( percentage.toFixed(0) + "%" );
			this.element.attr( "aria-valuenow", value );
		}
	} );

	// auto self-init widgets
	$( document ).bind( "pagecreate", function ( e ) {
		$( e.target ).find( ":jqmData(role='progressbar')" ).progressbar();
	} );

}( jQuery, this ) );
