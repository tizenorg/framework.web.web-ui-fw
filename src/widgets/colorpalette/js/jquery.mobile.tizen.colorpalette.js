/* TBD */
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
 * Authors: Gabriel Schulhof <gabriel.schulhof@intel.com>
 */

// It displays a grid two rows by five columns of colors.
//
// The colors are automatically computed based on the hue
// of the color set by the color attribute (see below).
//
// One of the displayed colors is the color attribute itself
// and the others are multiples of 360/10 away from that color;
// 10 is the total number of colors displayed (2 rows by 5 columns).
//
// To apply, add the attribute data-role="colorpalette" to a <div>
// element inside a page. Alternatively, call colorpalette() on an
// element.
//
// Options:
//
//     color: String; initial color can be specified in html
//            using the data-color="#ff00ff" attribute or
//            when constructed in javascript, eg :
//                $("#mycolorpalette").colorpalette({ color: "#ff00ff" });
//            where the html might be :
//                <div id="mycolorpalette"></div>
//            The color can be changed post-construction like this :
//                $("#mycolorpalette").colorpalette("option", "color", "#ABCDEF");
//            Default: "#1a8039"

/*
 * Colorpalette displays a grid two rows by five columns of colors.
 *
 * The colors are automatically computed based on the hue
 * of the color set by the color attribute (see below).
 *
 * One of the displayed colors is the color attribute itself
 * and the others are multiples of 360/10 away from that color;
 * 10 is the total number of colors displayed (2 rows by 5 columns).
 *
 * HTML attributes:
 *
 * To apply, add the attribute data-role="colorpalette" to a <div>
 * element inside a page. Alternatively, call colorpalette() on an
 * element.
 *
 *     data-role: Myst have 'colorpalette'.
 *     data-color: String; initial color can be specified in html
 *            using the data-color="#ff00ff" attribute or
 *            when constructed in javascript, eg :
 *                $("#mycolorpalette").colorpalette({ color: "#ff00ff" });
 *            where the html might be :
 *                <div id="mycolorpalette"></div>
 *            The color can be changed post-construction like this :
 *                $("#mycolorpalette").colorpalette("option", "color", "#ABCDEF");
 *            Default: "#1a8039"
 *
 *APIs:
 *		$('obj').colorpalette() : Make an object to a colorpalette widget.
 *
 *Events:
 *		No event.
 *
 *Examples:
 *		<div data-role="colorpalette" data-color: "#ffffff"></div>
 *
 *		<div id="toBeColorpalette"></div>
 *		<script>
 *			$("#toBeColorpalette").colorpalette({ color: "#ffffff" });
 *		</script>
 *
 */

( function ( $, undefined ) {

	$.widget( "tizen.colorpalette", $.tizen.colorwidget, {
		options: {
			showPreview: false,
			initSelector: ":jqmData(role='colorpalette')"
		},

		_htmlProto: {
			ui: {
				clrpalette: "#colorpalette",
				preview: "#colorpalette-preview",
				previewContainer: "#colorpalette-preview-container"
			}
		},

		_create: function () {
			var self = this;

			this.element
				.css( "display", "none" )
				.after( this._ui.clrpalette );

			this._ui.clrpalette.find( "[data-colorpalette-choice]" ).bind( "vclick", function ( e ) {
				var clr = $.tizen.colorwidget.prototype._getElementColor.call(this, $(e.target)),
					Nix,
					nChoices = self._ui.clrpalette.attr( "data-" + ( $.mobile.ns || "" ) + "n-choices" ),
					choiceId,
					rgbMatches;

				rgbMatches = clr.match(/rgb\(([0-9]*), *([0-9]*), *([0-9]*)\)/);

				if ( rgbMatches && rgbMatches.length > 3 ) {
					clr = $.tizen.colorwidget.clrlib.RGBToHTML( [
						parseInt(rgbMatches[1], 10) / 255,
						parseInt(rgbMatches[2], 10) / 255,
						parseInt(rgbMatches[3], 10) / 255] );
				}

				for ( Nix = 0 ; Nix < nChoices ; Nix++ ) {
					self._ui.clrpalette.find( "[data-colorpalette-choice=" + Nix + "]" ).removeClass( "colorpalette-choice-active" );
				}

				$(e.target).addClass( "colorpalette-choice-active" );
				$.tizen.colorwidget.prototype._setColor.call( self, clr );
				$.tizen.colorwidget.prototype._setElementColor.call( self, self._ui.preview, $.tizen.colorwidget.clrlib.RGBToHSL( $.tizen.colorwidget.clrlib.HTMLToRGB( clr ) ), "background" );
			} );
		},

		_setShowPreview: function ( show ) {
			if ( show ) {
				this._ui.previewContainer.removeAttr( "style" );
			} else {
				this._ui.previewContainer.css( "display", "none" );
			}

			this.element.attr( "data-" + ( $.mobile.ns || "" ) + "show-preview", show );
			this.options.showPreview = show;
		},

		widget: function ( value ) {
			return this._ui.clrpalette;
		},

		_setDisabled: function ( value ) {
			$.tizen.widgetex.prototype._setDisabled.call( this, value );
			this._ui.clrpalette[value ? "addClass" : "removeClass"]( "ui-disabled" );
			$.tizen.colorwidget.prototype._displayDisabledState.call( this, this._ui.clrpalette );
		},

		_setColor: function ( clr ) {
			if ( $.tizen.colorwidget.prototype._setColor.call( this, clr ) ) {
				clr = this.options.color;

				var Nix,
					activeIdx = -1,
					nChoices = this._ui.clrpalette.attr( "data-" + ( $.mobile.ns || "" ) + "n-choices" ),
					hsl = $.tizen.colorwidget.clrlib.RGBToHSL( $.tizen.colorwidget.clrlib.HTMLToRGB( clr ) ),
					origHue = hsl[0],
					offset = hsl[0] / 36,
					theFloor = Math.floor( offset ),
					newClr,
					currentlyActive;

				$.tizen.colorwidget.prototype._setElementColor.call( this, this._ui.preview,
						$.tizen.colorwidget.clrlib.RGBToHSL( $.tizen.colorwidget.clrlib.HTMLToRGB( clr ) ), "background" );

				offset = ( offset - theFloor < 0.5 )
					? ( offset - theFloor )
					: ( offset - ( theFloor + 1 ) );

				offset *= 36;

				for ( Nix = 0 ; Nix < nChoices ; Nix++ ) {
					hsl[0] = Nix * 36 + offset;
					hsl[0] = ( ( hsl[0] < 0) ? ( hsl[0] + 360 ) : ( ( hsl[0] > 360 ) ? ( hsl[0] - 360 ) : hsl[0] ) );

					if ( hsl[0] === origHue ) {
						activeIdx = Nix;
					}

					newClr = $.tizen.colorwidget.clrlib.RGBToHTML( $.tizen.colorwidget.clrlib.HSLToRGB( hsl ) );

					$.tizen.colorwidget.prototype._setElementColor.call( this, this._ui.clrpalette.find( "[data-colorpalette-choice=" + Nix + "]" ),
							$.tizen.colorwidget.clrlib.RGBToHSL( $.tizen.colorwidget.clrlib.HTMLToRGB( newClr ) ), "background" );
				}

				if (activeIdx != -1) {
					currentlyActive = parseInt( this._ui.clrpalette.find( ".colorpalette-choice-active" ).attr( "data-" + ($.mobile.ns || "" ) + "colorpalette-choice" ), 10 );
					if ( currentlyActive != activeIdx ) {
						this._ui.clrpalette.find( "[data-colorpalette-choice=" + currentlyActive + "]" ).removeClass( "colorpalette-choice-active" );
						this._ui.clrpalette.find( "[data-colorpalette-choice=" + activeIdx + "]" ).addClass( "colorpalette-choice-active" );
					}
				}
			}
		}
	});

	$( document ).bind( "pagecreate create", function ( e ) {
		$( $.tizen.colorpalette.prototype.options.initSelector, e.target )
			.not( ":jqmData(role='none'), :jqmData(role='nojs')" )
			.colorpalette();
	});

}( jQuery ) );