/*
* jQuery Mobile Framework : "textinput" plugin for text inputs, textareas
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
* Authors: Jinhyuk Jun <jinhyuk.jun@samsung.com>
*/

/**
 * Searchbar can be created using <input> element with type=tizen-search
 * <input type="tizen-search" name="search" id="search1" value=""  />
 *
 * Searchbar can be inserted 3 cases
 * content : seachbar behave same as content element
 * header : searchbar placed below title(header), It doesn't move when scrolling page
 * inside optionheader : Searchbar placed inside optionheader, searchbar can be seen only expand optionheader
 *
 * Examples:
 *
 *     HTML markup for creating Searchbar
 *         <input type="tizen-search"/>
 *
 *     How to make searchbar in content
 *         <input type="tizen-search" name="" id="" value=""  />
 *
 *     How to make searchbar in title
 *         <div data-role="header" data-position ="fixed" >
 *	           <h1>Searchbar</h1>
 *             <input type="tizen-search" name="" id="" value=""  />
 *         </div>
 *
 *     How to make searchbar inside optionheader
 *         <div data-role="header" data-position ="fixed" >
 *	           <h1>Searchbar</h1>
 *             <div id="myoptionheader2" data-role="optionheader">
 *                 <input type="tizen-search" name="" id="" value=""  />
 *             </div>
 *         </div>
*/

(function( $, undefined ) {

$.widget( "tizen.searchbar", $.mobile.widget, {
	options: {
		theme: null,
		initSelector: "input[type='tizen-search'],:jqmData(type='tizen-search')"
	},

	_create: function() {

		var input = this.element,
			o = this.options,
			theme = o.theme || $.mobile.getInheritedTheme( this.element, "c" ),
			themeclass  = " ui-body-" + theme,
			focusedEl, clearbtn,
			currentPage = input.closest(".ui-page");
		
		$( "label[for='" + input.attr( "id" ) + "']" ).addClass( "ui-input-text" );

		focusedEl = input.addClass("ui-input-text ui-body-"+ theme );

		// XXX: Temporary workaround for issue 785 (Apple bug 8910589).
		//      Turn off autocorrect and autocomplete on non-iOS 5 devices
		//      since the popup they use can't be dismissed by the user. Note
		//      that we test for the presence of the feature by looking for
		//      the autocorrect property on the input element. We currently
		//      have no test for iOS 5 or newer so we're temporarily using
		//      the touchOverflow support flag for jQM 1.0. Yes, I feel dirty. - jblas
		if ( typeof input[0].autocorrect !== "undefined" && !$.support.touchOverflow ) {
			// Set the attribute instead of the property just in case there
			// is code that attempts to make modifications via HTML.
			input[0].setAttribute( "autocorrect", "off" );
			input[0].setAttribute( "autocomplete", "off" );
		}

		focusedEl = input.wrap( "<div class='ui-input-search ui-shadow-inset ui-corner-all ui-btn-shadow" + themeclass + "'></div>" ).parent();
		clearbtn = $( "<a href='#' class='ui-input-clear' title='clear text'>clear text</a>" )
		.tap(function( event ) {
			input.val( "" )
				.blur()
				.focus()
				.trigger( "change" )
				.trigger( "input" );
			clearbtn.addClass( "ui-input-clear-hidden" );
			event.stopPropagation();
		})
		.appendTo( focusedEl )
		.buttonMarkup({
			icon: "deleteSearch",
			iconpos: "notext",
			corners: true,
			shadow: true
		});
		
		toggleClear();
		
		input.keyup( toggleClear );
		
		input.bind('paste cut keyup focus change blur', toggleClear);

		//SLP --start search bar with cancel button
		focusedEl.wrapAll( "<div class='input-search-bar'></div>" );

		input.tap(function( event ) {
			var inputedText = input.val();
			input.blur();
			input.focus();
		});

		var searchicon = $("<div class='ui-image-search ui-image-searchfield'></div>");
		searchicon.tap(function( event ) {
			searchicon.hide();
			
			input
				.blur()
				.focus();
		})
		.appendTo( focusedEl );

		var cancelbtn = $( "<a href='#' class='ui-input-cancel' title='clear text'>Cancel</a>" )
		.tap(function( event ) {
			input.val( "" );
			hideCancel();
			input.blur();
			input.trigger( "change" );
			event.stopPropagation();
		})
		.appendTo( focusedEl.parent() )
		.buttonMarkup({
			iconpos: "cancel",
			corners: true,
			shadow: true
		});

		// Input Focused
		input.focus(function() {
			showCancel();
			focusedEl.addClass( "ui-focus" );
		});
		
		// Input Blured
		/* When user touch on page, it's same to blur */
		$("form.search").tap(function( event ){
			input.focus();
			event.stopPropagation();
		});

		$( currentPage ).bind("vclick", function(e) {
			focusedEl.removeClass( "ui-focus" );
			hideCancel();
			input.trigger( "change" );
		});

		// Autogrow
		if ( input.is( "textarea" ) ) {
			var extraLineHeight = 15,
				keyupTimeoutBuffer = 100,
				keyup = function() {
					var scrollHeight = input[ 0 ].scrollHeight,
						clientHeight = input[ 0 ].clientHeight;

					if ( clientHeight < scrollHeight ) {
						input.height(scrollHeight + extraLineHeight);
					}
				},
				keyupTimeout;

				input.keyup(function() {
					clearTimeout( keyupTimeout );
					keyupTimeout = setTimeout( keyup, keyupTimeoutBuffer );
				});

			// binding to pagechange here ensures that for pages loaded via
			// ajax the height is recalculated without user input
			$( document ).one( "pagechange", keyup );

			// Issue 509: the browser is not providing scrollHeight properly until the styles load
			if ( $.trim( input.val() ) ) {
				// bind to the window load to make sure the height is calculated based on BOTH
				// the DOM and CSS
				$( window ).load( keyup );
			}
		}

		// Default Text
		var defaultText = input.jqmData("default-text");
		
		if ((defaultText != undefined) && (defaultText.length > 0))
		{
			var defaultTextClass = "ui-input-default-text";
			var trimedText = defaultText.replace(/\s/g, "");

			/* Make new class for default text string */
			var newClassName = defaultTextClass + "-" + trimedText;
			var newStyle = $("<style>" + '.' + newClassName + ":after" + "{content:" + "'" + defaultText + "'"+ "}" + "</style>");
			$('html > head').append(newStyle);

			/* Make new empty <DIV> for default text */
			var newDiv = $("<div></div>");			
			
			/* Add class and append new div */
			newDiv.addClass(defaultTextClass);
			newDiv.addClass(newClassName);
			newDiv.tap(function( event ) {
				input.blur();
				input.focus();
			});
			
			input.parent().append(newDiv);
			
			/* When focus, default text will be hide. */
			input.focus(function() {
				input.parent().find("div.ui-input-default-text").addClass( "ui-input-default-hidden" );
			})
			.blur(function(){
				var inputedText = input.val();
				if (inputedText.length > 0)	{
					input.parent().find("div.ui-input-default-text").addClass( "ui-input-default-hidden" );
				}
				else {
					input.parent().find("div.ui-input-default-text").removeClass( "ui-input-default-hidden" );
				}
			});			
		}
		
		function toggleClear() {
			if ( !input.val() ) {
				clearbtn.addClass( "ui-input-clear-hidden" );
			} else {
				clearbtn.removeClass( "ui-input-clear-hidden" );
			}
		}
		
		function showCancel() {
			focusedEl.addClass( "ui-input-search-default" )
			.removeClass( "ui-input-search-wide" );
			cancelbtn.addClass( "ui-btn-cancel-show" )
			.removeClass( "ui-btn-cancel-hide" );
			searchicon.hide();
		}

		function hideCancel() {
			focusedEl.addClass( "ui-input-search-wide" )
			.removeClass( "ui-input-search-default" );
			cancelbtn.addClass( "ui-btn-cancel-hide" )
			.removeClass( "ui-btn-cancel-show" );
			
			if( input.val() =="" ) {
				searchicon.show();
			}
			
			toggleClear();
		}		
	},

	disable: function(){
		( this.element.attr( "disabled", true ).is( "[type='tizen-search'],:jqmData(type='tizen-search')" ) ?
			this.element.parent() : this.element ).addClass( "ui-disabled" );
	},

	enable: function(){
		( this.element.attr( "disabled", false).is( "[type='tizen-search'],:jqmData(type='tizen-search')" ) ?
			this.element.parent() : this.element ).removeClass( "ui-disabled" );
	}
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$.tizen.searchbar.prototype.enhanceWithin( e.target );
});

})( jQuery );
