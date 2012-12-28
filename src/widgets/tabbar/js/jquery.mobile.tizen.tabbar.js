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
 * jQuery Mobile Framework : "tabbar" plugin
 * Copyright (c) jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 * Authors: Jinhyuk Jun <jinhyuk.jun@samsung.com>
*/

/**
 *  Tabbar can be created using data-role = "tabbar" inside footer 
 *  Framework determine which tabbar will display with tabbar attribute
 *
 * Examples:
 *         
 *     HTML markup for creating tabbar: ( 2 ~ 5 li item available )
 *     icon can be changed data-icon attribute (customized icon need)
 *         <div data-role="footer" data-position ="fixed">
 *              <div data-role="tabbar">
 *                     <ul>
 *                            <li><a href="#" class="ui-btn-active">Menu</a></li>
 *                            <li><a href="#">Save</a></li>
 *                            <li><a href="#">Share</a></li>
 *                     </ul>
 *             </div>
 *      </div>
*/

(function ( $, undefined ) {

	$.widget( "tizen.tabbar", $.mobile.widget, {
		options: {
			iconpos: "top",
			grid: null,
			initSelector: ":jqmData(role='tabbar')"
		},

		_create: function () {

			var $tabbar = this.element,
				$tabbtns,
				textpos,
				iconpos,
				theme = $.mobile.listview.prototype.options.theme,	/* Get current theme */
				ww = window.innerWidth || $( window ).width(),
				wh = window.innerHeight || $( window ).height(),
				isLandscape;

			isLandscape = ww > wh && ( ww - wh );

			if ( isLandscape ) {
				$tabbar.removeClass( "ui-portrait-tabbar" ).addClass( "ui-landscape-tabbar" );
			} else {
				$tabbar.removeClass( "ui-landscape-tabbar" ).addClass( "ui-portrait-tabbar" );
			}

			if ( $tabbar.find( "a" ).length ) {
				$tabbtns = $tabbar.find( "a" );
				iconpos = $tabbtns.filter( ":jqmData(icon)" ).length ? this.options.iconpos : undefined;
				textpos = $tabbtns.html().length ? true : false;
			}

			$tabbar.addClass( "ui-navbar" )
				.find( "ul" )
				.grid( { grid: this.options.grid } );

			if ( $tabbar.parents( ".ui-footer" ).length  ) {
				$tabbar.find( "li" ).addClass( "ui-tab-btn-style" );
			}

			/* title tabbar */
			if ( $tabbar.siblings( ".ui-title" ).length ) {
				$tabbar.parents( ".ui-header" ).addClass( "ui-title-tabbar" );
			}

			if ( !iconpos ) {
				$tabbar.addClass( "ui-tabbar-noicons" );
			}
			if ( !textpos ) {
				$tabbar.addClass( "ui-tabbar-notext" );
			}
			if ( textpos && iconpos ) {
				$tabbar.parents( ".ui-header" ).addClass( "ui-title-tabbar-multiline" );
			}

			if ( $tabbar.find( "a" ).length ) {
				$tabbtns.buttonMarkup({
					corners:	false,
					shadow:		false,
					iconpos:	iconpos
				});
			}

			if ( $tabbar.find( ".ui-state-persist" ).length ) {
				$tabbar.addClass( "ui-tabbar-persist" );
			}

			$tabbar.delegate( "a", "vclick", function ( event ) {
				$tabbtns.not( ".ui-state-persist" ).removeClass( $.mobile.activeBtnClass );
				$( this ).addClass( $.mobile.activeBtnClass );
			});

			$tabbar.addClass( "ui-tabbar");

			$( document ).bind( "pagebeforeshow", function ( event, ui ) {
				var footer_filter = $( event.target ).find( ":jqmData(role='footer')" ),
					tabbar_filter = footer_filter.find( ":jqmData(role='tabbar')" ),
					$elFooterMore = tabbar_filter.siblings( ":jqmData(icon='naviframe-more')" ),
					$elFooterBack = tabbar_filter.siblings( ".ui-btn-back" );

					footer_filter
						.css( "position", "fixed" )
						.css( "bottom", 0 )
						.css( "height", tabbar_filter.height() );
					if ( $elFooterMore.length )
						tabbar_filter.addClass( "ui-tabbar-margin-more" );
					if ( $elFooterBack.length )
						tabbar_filter.addClass( "ui-tabbar-margin-back" );
			});

			$( document ).bind( "pageshow", function ( e, ui ) {
				var tabbar_filter = $( ".ui-page-active" ).find( ":jqmData(role='footer')" ).eq( 0 ).find( ":jqmData(role='tabbar')" ),
					element_width = 0,
					element_count = tabbar_filter.find( 'li' ).length;

				if ( tabbar_filter.length ) {
					element_width = tabbar_filter.find("li:first").width();
					tabbar_filter.find("li:last").width( tabbar_filter.width() - element_width * ( element_count - 1 ) );
				}
			});

			$( window ).bind( "resize", function ( e ) {
				var tabbar_filter = $( ".ui-page-active" ).find( ":jqmData(role='footer')" ).eq( 0 ).find( ":jqmData(role='tabbar')" ),
					element_width = 0,
					element_count = tabbar_filter.find( 'li' ).length;

				if ( tabbar_filter.length ) {
					element_width = tabbar_filter.find("li:first").width();
					tabbar_filter.find("li:last").width( tabbar_filter.width() - element_width * ( element_count - 1 ) );
				}
			});

			this._bindTabbarEvents();
		},

		_bindTabbarEvents: function () {
			var $tabbar = this.element;

			$( window ).bind( "orientationchange", function ( e, ui ) {
				var ww = window.innerWidth || $( window ).width(),
					wh = window.innerHeight || $( window ).height(),
					isLandscape = ww > wh && ( ww - wh );

				if ( isLandscape ) {
					$tabbar.removeClass( "ui-portrait-tabbar" ).addClass( "ui-landscape-tabbar" );
				} else {
					$tabbar.removeClass( "ui-landscape-tabbar" ).addClass( "ui-portrait-tabbar" );
				}
			});
		},

		_setDisabled: function ( value, cnt ) {
			this.element.find( "li" ).eq( cnt ).attr( "disabled", value );
			this.element.find( "li" ).eq( cnt ).attr( "aria-disabled", value );
		},

		disable: function ( cnt ) {
			this._setDisabled( true, cnt );
			this.element.find( "li" ).eq( cnt ).addClass( "ui-disabled" );
		},

		enable: function ( cnt ) {
			this._setDisabled( false, cnt );
			this.element.find( "li" ).eq( cnt ).removeClass( "ui-disabled" );
		}
	});

	//auto self-init widgets
	$( document ).bind( "pagecreate create", function ( e ) {
		$( $.tizen.tabbar.prototype.options.initSelector, e.target ).tabbar();
	});
}( jQuery ) );
