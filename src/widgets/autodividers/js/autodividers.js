/* TBD */
/*
 * jQuery Mobile Widget @VERSION - listview autodividers
 *
 * This software is licensed under the MIT licence (as defined by the OSI at
 * http://www.opensource.org/licenses/mit-license.php)
 * 
 * ***************************************************************************
 * Copyright (C) 2011 by Intel Corporation Ltd.
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

// Applies dividers automatically to a listview, using link text
// (for link lists) or text (for readonly lists) as the basis for the
// divider text.
//
// Apply using autodividers({type: 'X'}) on a <ul> with
// data-role="listview", or with data-autodividers="true", where X
// is the type of divider to create. The default divider type is 'alpha',
// meaning first characters of list item text, upper-cased.
//
// The element used to derive the text for the auto dividers defaults
// to the first link inside the li; failing that, the text directly inside
// the li element is used. This can be overridden with the
// data-autodividers-selector attribute or via options; the selector
// will use each li element as its context.
//
// Any time a new li element is added to the list, or an li element is
// removed, this extension will update the dividers in the listview
// accordingly.
//
// Note that if a listview already has dividers, applying this
// extension will remove all the existing dividers and replace them
// with new, generated ones.
//
// Also note that this extension doesn't sort the list: it only creates
// dividers based on text inside list items. So if your list isn't
// alphabetically-sorted, you may get duplicate dividers.
//
// So, for example, this markup:
//
// <ul id="has-no-dividers" data-role="listview" data-autodividers="alpha">
//		<li>Barry</li>
//		<li>Carrie</li>
//		<li>Betty</li>
//		<li>Harry</li>
//		<li>Carly</li>
//		<li>Hetty</li>
// </ul>
//
// will produce dividers like this:
//
// <ul data-role="listview" data-autodividers="alpha">
//	<li data-role="list-divider">B</li>
//	<li>Barry</li>
//	<li data-role="list-divider">C</li>
//	<li>Carrie</li>
//	<li data-role="list-divider">B</li>
//	<li>Betty</li>
//	<li data-role="list-divider">H</li>
//	<li>Harry</li>
//	<li data-role="list-divider">C</li>
//	<li>Carly</li>
//	<li data-role="list-divider">H</li>
//	<li>Hetty</li>
// </ul>
//
// with each divider occuring twice.
//
// Options:
//
//	selector: The jQuery selector to use to find text for the
//			generated dividers. Default is to use the first 'a'
//			(link) element. If this selector doesn't find any
//			text, the widget automatically falls back to the text
//			inside the li (for read-only lists). Can be set to a custom
//			selector via data-autodividers-selector="..." or the 'selector'
//			option.
//
//	 type: 'alpha' (default) sets the auto divider type to "uppercased
//		 first character of text selected from each item"; "full" sets
//		 it to the unmodified text selected from each item. Set via
//		 the data-autodividers="<type>" attribute on the listview or
//		 the 'type' option.
//
// Events:
//
//	updatelayout: Triggered if the dividers in the list change;
//		this happens if list items are added to the listview,
//		which causes the autodividers to be regenerated.

(function( $, undefined ) {

var autodividers = function(options) {
	var list = $( this );
	options = options || {};

	var listview = list.data( 'listview' );

	var dividerType = options.type || list.jqmData( 'autodividers' ) || 'alpha';

	var textSelector = options.selector || list.jqmData( 'autodividers-selector' ) || 'a';

	var getDividerText = function( elt ) {
		// look for some text in the item
		var text = elt.find( textSelector ).text() || elt.text() || null;

		if ( !text ) {
			return null;
		}

		// create the text for the divider
		if ( dividerType === 'alpha' ) {
			text = text.slice( 0, 1 ).toUpperCase();
		}

		return text;
	};

	var mergeDividers = function() {
		var dividersChanged = false;

		// any dividers which are following siblings of a divider, where
		// there are no dividers with different text inbetween, can be removed
		list.find( 'li.ui-li-divider' ).each(function() {
			var divider = $( this );
			var dividerText = divider.text();
			var selector = '.ui-li-divider:not(:contains(' + dividerText + '))';
			var nextDividers = divider.nextUntil( selector );
			nextDividers = nextDividers.filter( '.ui-li-divider:contains(' + dividerText + ')' );

			if (nextDividers.length > 0) {
				nextDividers.remove();
				dividersChanged = true;
			}
		});

		if (dividersChanged) {
			list.trigger( 'updatelayout' );
		}
	};

	// check that elt is a non-divider li element
	var isNonDividerLi = function( elt ) {
		return elt.is('li') &&
		       elt.jqmData( 'role' ) !== 'list-divider';
	};

	// li element inserted, so check whether it needs a divider
	var liAdded = function( li ) {
		var dividerText = getDividerText( li );

		if ( !dividerText ) {
			listview.refresh();
			return;
		}

		// add expected divider for this li if it doesn't exist
		var existingDividers = li.prevAll( '.ui-li-divider:first:contains(' + dividerText + ')' );

		if ( existingDividers.length === 0 ) {
			var divider = $( '<li>' + dividerText + '</li>' );
			divider.attr( 'data-' + $.mobile.ns + 'role', 'list-divider' );
			li.before( divider );

			listview.refresh();

			mergeDividers();
		}
		else {
			listview.refresh();
		}
	};

	// li element removed, so check whether its divider should go
	var liRemoved = function( li ) {

		var dividerText = getDividerText( li );

		if ( !dividerText ) {
			listview.refresh();
			return;
		}

		// remove divider for this li if there are no other
		// li items for the divider before or after this li item
		var precedingItems = li.prevUntil( '.ui-li-divider:contains(' + dividerText + ')' );
		var nextItems = li.nextUntil( '.ui-li-divider' );

		if ( precedingItems.length === 0 && nextItems.length === 0 ) {
			li.prevAll( '.ui-li-divider:contains(' + dividerText + '):first' ).remove();

			listview.refresh();

			mergeDividers();
		}
		else {
			listview.refresh();
		}
	};

	// set up the dividers on first create
	list.find( 'li' ).each( function() {
		var li = $( this );

		// remove existing dividers
		if ( li.jqmData( 'role' ) === 'list-divider' ) {
			li.remove();
		}
		// make new dividers for list items
		else {
			liAdded( li );
		}
	});

	// bind to DOM events to keep list up to date
	list.bind( 'DOMNodeInserted', function( e ) {
		var elt = $( e.target );

		if ( !isNonDividerLi( elt ) ) {
			return;
		}

		liAdded( elt );
	});

	list.bind( 'DOMNodeRemoved', function( e ) {
		var elt = $( e.target );

		if ( !isNonDividerLi( elt ) ) {
			return;
		}

		liRemoved( elt );
	});
};

$.fn.autodividers = autodividers;

$( ":jqmData(role=listview)" ).live( "listviewcreate", function() {
	var list = $( this );

	if ( list.is( ':jqmData(autodividers)' ) ) {
		list.autodividers();
	}
});

})( jQuery );
