//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Shows list index and scroll to the index directly
//>>label: Fastscroll
//>>group: Tizen:Widgets

define( [ '../jquery.mobile.tizen.scrollview' ], function ( ) {
//>>excludeEnd("jqmBuildExclude");

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
 * Authors: Elliot Smith <elliot.smith@intel.com>
 */

// fastscroll is a scrollview controller, which binds
// a scrollview to a a list of short cuts; the shortcuts are built
// from the text on dividers in the list. Clicking on a shortcut
// instantaneously jumps the scrollview to the selected list divider;
// mouse movements on the shortcut column move the scrollview to the
// list divider matching the text currently under the touch; a popup
// with the text currently under the touch is also displayed.
//
// To apply, add the attribute data-fastscroll="true" to a listview
// (a <ul> or <ol> element inside a page). Alternatively, call
// fastscroll() on an element.
//
// The closest element with class ui-scrollview-clip is used as the
// scrollview to be controlled.
//
// If a listview has no dividers or a single divider, the widget won't
// display.

/**
	@class fastscroll
	The shortcut scroll widget shows a shortcut list that is bound to its parent scroll bar and respective list view. This widget is displayed as a text pop-up representing shortcuts to different list dividers in the list view. If you select a shortcut text from the shortcut scroll, the parent list view is moved to the location representing the selected shortcut.

	To add a shortcut scroll widget to the application, use the following code:

		<div class="content" data-role="content" data-scroll="y">
			<ul id="contacts" data-role="listview" data-fastscroll="true">
				<li>Anton</li>
			</ul>
		</div>

	For the shortcut scroll widget to be visible, the parent list view must have multiple list dividers.
*/

/**
	@property {Boolean}  data-fastscroll
	When set to true, creates a shortcut scroll using the HTML unordered list (&lt;ul&gt;) element.
*/
/**
	@method fastscroll
	The shortcut scroll is created for the closest list view with the ui-scrollview-clip class.
*/
(function ( $, undefined ) {

	$.widget( "tizen.fastscroll", $.mobile.widget, {
		options: {
			initSelector: ":jqmData(fastscroll)"
		},

		_create: function () {
			var $el = this.element,
				self = this,
				$popup,
				page = $el.closest( ':jqmData(role="page")' ),
				jumpToDivider;

			this.scrollview = $el.closest( '.ui-scrollview-clip' );
			this.shortcutsContainer = $( '<div class="ui-fastscroll"/>' );
			this.shortcutsList = $( '<ul></ul>' );

			// popup for the hovering character
			this.scrollview.append($( '<div class="ui-fastscroll-popup"></div>' ) );
			$popup = this.scrollview.find( '.ui-fastscroll-popup' );

			this.shortcutsContainer.append( this.shortcutsList );
			this.scrollview.append( this.shortcutsContainer );

			// find the bottom of the last item in the listview
			this.lastListItem = $el.children().last();

			// remove scrollbars from scrollview
			this.scrollview.find( '.ui-scrollbar' ).hide();

			jumpToDivider = function ( divider ) {
				// get the vertical position of the divider (so we can scroll to it)
				var dividerY = $( divider ).position().top,
					// find the bottom of the last list item
					bottomOffset = self.lastListItem.outerHeight( true ) + self.lastListItem.position().top,
					scrollviewHeight = self.scrollview.height(),

				// check that after the candidate scroll, the bottom of the
				// last item will still be at the bottom of the scroll view
				// and not some way up the page
					maxScroll = bottomOffset - scrollviewHeight,
					dstOffset;

				dividerY = ( dividerY > maxScroll ? maxScroll : dividerY );

				// don't apply a negative scroll, as this means the
				// divider should already be visible
				dividerY = Math.max( dividerY, 0 );

				// apply the scroll
				self.scrollview.scrollview( 'scrollTo', 0, -dividerY );

				dstOffset = self.scrollview.offset();
				$popup
					.text( $( divider ).text() )
					.css( { marginLeft: -($popup.width() / 2),
							marginTop: -($popup.height() / 2) } )
					.show();
			};

			this.shortcutsList
			// bind mouse over so it moves the scroller to the divider
				.bind( 'touchstart mousedown vmousedown touchmove vmousemove vmouseover ', function ( e ) {
					// Get coords relative to the element
					var coords = $.mobile.tizen.targetRelativeCoordsFromEvent( e ),
						shortcutsListOffset = self.shortcutsList.offset();

					// If the element is a list item, get coordinates relative to the shortcuts list
					if ( e.target.tagName.toLowerCase() === "li" ) {
						coords.x += $( e.target ).offset().left - shortcutsListOffset.left;
						coords.y += $( e.target ).offset().top  - shortcutsListOffset.top;
					}

					self.shortcutsList.find( 'li' ).each( function () {
						var listItem = $( this );
						$( listItem )
							.removeClass( "ui-fastscroll-hover" )
							.removeClass( "ui-fastscroll-hover-up" )
							.removeClass( "ui-fastscroll-hover-down" );
					});
					// Hit test each list item
					self.shortcutsList.find( 'li' ).each( function () {
						var listItem = $( this ),
							l = listItem.offset().left - shortcutsListOffset.left,
							t = listItem.offset().top  - shortcutsListOffset.top,
							r = l + Math.abs(listItem.outerWidth( true ) ),
							b = t + Math.abs(listItem.outerHeight( true ) );

						if ( coords.x >= l && coords.x <= r && coords.y >= t && coords.y <= b ) {
							jumpToDivider( $( listItem.data( 'divider' ) ) );
							$( listItem ).addClass( "ui-fastscroll-hover" );
							if ( listItem.index() > 0 ) {
								$( listItem ).siblings().eq( listItem.index() - 1 ).addClass( "ui-fastscroll-hover-up" );
							}
							$( listItem ).siblings().eq( listItem.index() ).addClass( "ui-fastscroll-hover-down" );
							return false;
						}
						return true;
					} );



					e.preventDefault();
					e.stopPropagation();
				} )
				// bind mouseout of the fastscroll container to remove popup
				.bind( 'touchend mouseup vmouseup vmouseout', function () {
					$popup.hide();
				} );

			if ( page && !( page.is( ':visible' ) ) ) {
				page.bind( 'pageshow', function () { self.refresh(); } );
			} else {
				this.refresh();
			}

			// refresh the list when dividers are filtered out
			$el.bind( 'updatelayout', function () {
				self.refresh();
			} );
		},

		refresh: function () {
			var self = this,
				shortcutsTop,
				minClipHeight,
				dividers,
				listItems;

			this.shortcutsList.find( 'li' ).remove();

			// get all the dividers from the list and turn them into shortcuts
			dividers = this.element.find( '.ui-li-divider' );

			// get all the list items
			listItems = this.element.find('li').not('.ui-li-divider');

			// only use visible dividers
			dividers = dividers.filter( ':visible' );
			listItems = listItems.filter( ':visible' );

			if ( dividers.length < 2 ) {
				this.shortcutsList.hide();
				return;
			}

			this.shortcutsList.show();

			this.lastListItem = listItems.last();

			dividers.each( function ( index, divider ) {
				self.shortcutsList
					.append( $( '<li>' + $( divider ).text() + '</li>' )
						.data( 'divider', divider ) );
			} );

			// position the shortcut flush with the top of the first list divider
			shortcutsTop = dividers.first().position().top;
			this.shortcutsContainer.css( 'top', shortcutsTop );

			// make the scrollview clip tall enough to show the whole of the shortcutslist
			minClipHeight = shortcutsTop + this.shortcutsContainer.outerHeight() + 'px';
			this.scrollview.css( 'min-height', minClipHeight );
		}
	} );

	$( document ).bind( "pagecreate create", function ( e ) {
		$( $.tizen.fastscroll.prototype.options.initSelector, e.target )
			.not( ":jqmData(role='none'), :jqmData(role='nojs')" )
			.fastscroll();
	} );

} ( jQuery ) );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
} );
//>>excludeEnd("jqmBuildExclude");
