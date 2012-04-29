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
 *	Author: Kangsik Kim <kangsik81.kim@samsung.com>
*/

/**
 *	Multibuttonentry widget is a kind of button widget.
 *	When a user inputs a text and the text gets an change event,
 *	the text can be changed from it to a button widget.
 *
 *	HTML Attributes:
 *
 *		data-listUrl : This attribute is represent a 'id' about page.
 *				This page is containing prepared data for provide to user.
 *				For example, like address book.
 *		data-label:	This attribute is providing label for user-guide. (Default : 'To : ')
 *		data-descMessage : This attribute is managing message format.
 *				 This message is displayed when widget status was changed to 'focusout'.
 *
 *	APIs:
 *
 *		inputtext ( void )
 *			: Get a string from inputbox.
 *		inputtext (  [string]  )
 *			: If argument is not exist, will get a string from inputbox.
 *			If argument is exist, will set a string to inputbox.
 *		select (  [number]  )
 *			: If argument is not exist, will act  as a getter.
 *			Get a string of selected block.
 *			If widget is not exist a selected button, it will return 'null'.
 *			Select a button located on the index. (number : index of button)
 *		add ( text, [number] )
 *			: If second argument is not exist, will insert to a new textblock at last position.
 *			Insert a new button at position that is pointed by index. (number : index of button)
 *		remove ( [number] )
 *			: If argument is not exist, will remove all buttons.
 *			Remove a button that is pointed by index. (number : index of button)
 *		length ( void )
 *			: Get a number of buttons.
 *		foucsIn ( void )
 *			: This method change a status to 'focusin'.
 *			This status is able to manage a widget.
 *		focusOut ( void )
 *			: This method change a status to 'focusout'.
 *			This status is not able to manage a widget.
 *
 *
 *	Events:
 *
 *		select : This event will occur when select a button.
 *		add : This event will occur when insert new button.
 *		remove : This event will occur when remove a button.
 *
 *	Examples:
 *
 *		<div data-role="multibuttonentry" data-label="To : " data-listUrl:"#addressbook" data-descMessage="{0} & {1} more...">
 *		</div>
 *
 */

( function ( $, window, document, undefined ) {
	$.widget( "tizen.multibuttonentry", $.mobile.widget, {
		_focusStatus : null,
		_items : null,
		_viewWidth : 0,
		_reservedWidth : 0,
		_currentWidth : 0,
		_fontSize : 0,
		_anchorWidth : 0,
		_labelWidth : 0,
		_marginWidth : 0,
		options : {
			label : "To : ",
			listUrl : "#addressbook",
			descMessage : "{0} & {1} more..."
		},
		_create : function () {
			var self = this,
				$view = this.element,
				role = $view.jqmData( "role" ),
				option = this.options,
				inputbox = $( document.createElement( "input" ) ),
				labeltag = $( document.createElement( "label" ) ),
				moreBlock = $( document.createElement( "a" ) );

			$view.hide().empty().addClass( "ui-" + role );

			// create a label tag.
			$( labeltag ).text( this.options.label ).addClass( "ui-multibuttonentry-label" );
			$view.append( labeltag );

			// create a input tag
			$( inputbox ).text( option.label ).addClass( "ui-multibuttonentry-input" );
			$view.append( inputbox );

			// create a anchor tag.
			$( moreBlock ).text( "+" ).attr( "href", option.listUrl ).addClass( "ui-multibuttonentry-link" );

			// append default htmlelements to main widget.
			$view.append( moreBlock );

			// bind a event
			this._bindEvents();
			self._focusStatus = "init";
			// display widget
			$view.show();
			$view.attr( "tabindex", -1 ).focusin( function ( e ) {
				self.focusIn();
			});

			// assign global variables
			self._viewWidth = $view.innerWidth();
			self._reservedWidth += self._calcBlockWidth( moreBlock );
			self._reservedWidth += self._calcBlockWidth( labeltag );
			self._fontSize = parseInt( $( moreBlock ).css( "font-size" ), 10 );
			self._currentWidth = self._reservedWidth;
		},
		// bind events
		_bindEvents : function () {
			var self = this,
				$view = self.element,
				option = self.options,
				inputbox = $view.find( ".ui-multibuttonentry-input" ),
				moreBlock = $view.find( ".ui-multibuttonentry-link" );

			inputbox.bind( "keydown", function ( event ) {
				// 8  : backspace
				// 13 : Enter
				var keyValue = event.keyCode,
					valueString = $( inputbox ).val();

				if ( keyValue == 8 ) {
					if ( valueString.length === 0 ) {
						self._validateTargetBlock();
					}
				} else if ( keyValue == 13 ) {
					if ( valueString.length !== 0 ) {
						self._addTextBlock( valueString );
					}
					inputbox.val( "" );
				} else {
					self._unlockTextBlock();
				}
			});

			moreBlock.click( function () {
				$.mobile.changePage( option.listUrl, {
					transition: "slide",
					reverse: false,
					changeHash: false
				} );
			} );

			$( document ).bind( "pagechange.mbe", function ( event ) {
				if ( $view.innerWidth() === 0 ) {
					return ;
				}
				var inputBox = $view.find( ".ui-multibuttonentry-input" );
				if ( self._labelWidth === 0 ) {
					self._labelWidth = $view.find( ".ui-multibuttonentry-label" ).outerWidth( true );
					self._anchorWidth = $view.find( ".ui-multibuttonentry-link" ).outerWidth( true );
					self._marginWidth = parseInt( ( $( inputBox ).css( "margin-left" ) ), 10 );
					self._marginWidth += parseInt( ( $( inputBox ).css( "margin-right" ) ), 10 );
					self._viewWidth = $view.innerWidth();
				}
				self._modifyInputBoxWidth();
			});
		},
		// create a textbutton and append this button to parent layer.
		// @param arg1 : string
		// @param arg2 : index
		_addTextBlock : function ( messages, blcokIndex ) {
			if ( arguments.length === 0 ) {
				return;
			}

			if ( ! messages ) {
				return ;
			}

			var self = this,
				$view = self.element,
				content = messages,
				index = blcokIndex,
				blocks = null,
				dataBlock = null,
				displayText = null,
				textBlock = null;

			if ( self._viewWidth === 0 ) {
				self._viewWidth = $view.innerWidth();
			}
			// save src data
			dataBlock = $( document.createElement( 'input' ) );
			dataBlock.val( content ).addClass( "ui-multibuttonentry-data" ).hide();

			// Create a new text HTMLDivElement.
			textBlock = $( document.createElement( 'div' ) );
			displayText = self._ellipsisTextBlock( content ) ;
			textBlock.text( displayText ).addClass( "ui-multibuttonentry-block" );
			textBlock.append( dataBlock );
			// bind a event to HTMLDivElement.
			textBlock.bind( "vclick", function ( event ) {
				if ( self._focusStatus === "focusOut" ) {
					self.focusInEvent();
					return;
				}

				if ( $( this ).hasClass( "ui-multibuttonentry-sblock" ) ) {
					// If block is selected, it will be removed.
					self._removeTextBlock();
				}

				var lockBlock = $view.find( "div.ui-multibuttonentry-sblock" );
				if ( typeof lockBlock != "undefined" ) {
					lockBlock.removeClass( "ui-multibuttonentry-sblock" ).addClass( "ui-multibuttonentry-block" );
				}
				$( this ).removeClass( "ui-multibuttonentry-block" ).addClass( "ui-multibuttonentry-sblock" );
				self._trigger( "select" );
			});

			blocks = $view.find( "div" );
			if ( index !== null && index <= blocks.length ) {
				$( blocks[index] ).before( textBlock );
			} else {
				$view.find( ".ui-multibuttonentry-input" ).before( textBlock );
			}

			self._currentWidth += self._calcBlockWidth( textBlock );
			self._modifyInputBoxWidth();
			self._trigger( "add" );
		},
		_removeTextBlock : function () {
			var self = this,
				$view = this.element,
				targetBlock = null,
				lockBlock = $view.find( "div.ui-multibuttonentry-sblock" );

			if ( lockBlock !== null && lockBlock.length > 0 ) {
				self._currentWidth -= self._calcBlockWidth( lockBlock );
				lockBlock.remove();
				self._modifyInputBoxWidth();
				this._trigger( "remove" );
			} else {
				$view.find( "div:last" ).removeClass( "ui-multibuttonentry-block" ).addClass( "ui-multibuttonentry-sblock" );
			}
		},
		_calcBlockWidth : function ( block ) {
			var blockWidth = 0;
			blockWidth = $( block ).outerWidth( true );
			return blockWidth;
		},
		_unlockTextBlock : function () {
			var $view = this.element,
				lockBlock = $view.find( "div.ui-multibuttonentry-sblock" );
			if ( lockBlock !== null ) {
				lockBlock.removeClass( "ui-multibuttonentry-sblock" ).addClass( "ui-multibuttonentry-block" );
			}
		},
		// call when remove text block by backspace key.
		_validateTargetBlock : function () {
			var self = this,
				$view = self.element,
				lastBlock = $view.find( "div:last" ),
				tmpBlock = null;

			if ( lastBlock.hasClass( "ui-multibuttonentry-sblock" ) ) {
				self._removeTextBlock();
			} else {
				tmpBlock = $view.find( "div.ui-multibuttonentry-sblock" );
				tmpBlock.removeClass( "ui-multibuttonentry-sblock" ).addClass( "ui-multibuttonentry-block" );
				lastBlock.removeClass( "ui-multibuttonentry-block" ).addClass( "ui-multibuttonentry-sblock" );
			}
		},
		_ellipsisTextBlock : function ( text ) {
			var self = this,
				str = text,
				length = 0,
				maxWidth = self._viewWidth,
				maxCharCnt = parseInt( ( self._viewWidth / self._fontSize ), 10 ) - 5,
				ellipsisStr = null;
			if ( str ) {
				length = str.length ;
				if ( length > maxCharCnt ) {
					ellipsisStr = str.substring( 0, maxCharCnt );
					ellipsisStr += "...";
				} else {
					ellipsisStr = str;
				}
			}
			return ellipsisStr;
		},
		_modifyInputBoxWidth : function () {
			var self = this,
				$view = self.element,
				labelWidth = self._labelWidth,
				anchorWidth = self._anchorWidth,
				inputBoxWidth = self._viewWidth - labelWidth - anchorWidth,
				blocks = $view.find( "div" ),
				blockWidth = 0,
				index = 0,
				margin = self._marginWidth,
				inputBox = $view.find( ".ui-multibuttonentry-input" );

			if ( $view.width() === 0 ) {
				return ;
			}

			for ( index = 0; index < blocks.length; index += 1 ) {
				blockWidth = self._calcBlockWidth( blocks[index] );
				inputBoxWidth = inputBoxWidth - blockWidth;
				if ( inputBoxWidth <= 0 ) {
					if ( inputBoxWidth + anchorWidth >= 0 ) {
						inputBoxWidth = self._viewWidth - anchorWidth;
					} else {
						inputBoxWidth = self._viewWidth - blockWidth - anchorWidth;
					}
				}
			}
			$( inputBox ).width( inputBoxWidth - margin - 1 );
		},
		_stringFormat : function ( expression ) {
			var pattern = null,
				message = expression,
				i = 0;
			for ( i = 1; i < arguments.length; i += 1 ) {
				pattern = "{" + ( i - 1 ) + "}";
				message = message.replace( pattern, arguments[i] );
			}
			return message;
		},
		_resizeBlock : function () {
			var self = this,
				$view = self.element,
				dataBlocks = $( ".ui-multibuttonentry-data" ),
				blocks = $view.find( "div" ),
				srcTexts = [],
				index = 0;

			$view.hide();
			for ( index = 0 ; index < dataBlocks.length ; index += 1 ) {
				srcTexts[index] = $( dataBlocks[index] ).val();
				self._addTextBlock( srcTexts[index] );
			}
			blocks.remove();
			$view.show();
		},

		//----------------------------------------------------//
		//					Public Method					//
		//----------------------------------------------------//
		//
		// Focus In Event
		//
		focusIn : function () {
			if ( this._focusStatus === "focusIn" ) {
				return;
			}

			var $view = this.element;

			$view.find( "label" ).show();
			$view.find( ".ui-multibuttonentry-desclabel" ).remove();
			$view.find( "div.ui-multibuttonentry-sblock" ).removeClass( "ui-multibuttonentry-sblock" ).addClass( "ui-multibuttonentry-block" );
			$view.find( "div" ).show();
			$view.find( ".ui-multibuttonentry-input" ).show();
			$view.find( "a" ).show();

			// change focus state.
			this._modifyInputBoxWidth();
			this._focusStatus = "focusIn";
		},
		focusOut : function () {
			if ( this._focusStatus === "focusOut" ) {
				return;
			}

			var self = this,
				$view = self.element,
				tempBlock = null,
				statement = "",
				index = 0,
				lastIndex = 10,
				label = $view.find( "label" ),
				more = $view.find( "span" ),
				blocks = $view.find( "div" ),
				currentWidth = $view.outerWidth( true ) - more.outerWidth( true ) - label.outerWidth( true ),
				textWidth = currentWidth;

			$view.find( ".ui-multibuttonentry-input" ).hide();
			$view.find( "a" ).hide();
			blocks.hide();

			// div button
			currentWidth = currentWidth - self._reservedWidth;
			for ( index = 0; index < blocks.length; index += 1 ) {
				currentWidth = currentWidth - $( blocks[index] ).outerWidth( true );
				statement += ", " + $( blocks[index] ).text();
				if ( currentWidth <= 0 ) {
					statement = "," + $( blocks[0] ).text();
					statement = self._stringFormat( self.options.descMessage, statement, blocks.length - 1 );
					break;
				}
				lastIndex = statement.length;
			}
			tempBlock = $( document.createElement( 'input' ) );
			tempBlock.val( statement.substr( 1, statement.length ) );
			tempBlock.addClass( "ui-multibuttonentry-desclabel" ).addClass( "ui-multibuttonentry-desclabel" );
			tempBlock.width( textWidth - ( self._reservedWidth ) );
			tempBlock.attr( "disabled", true );
			$view.find( "label" ).after( tempBlock );
			// update foucs state
			this._focusStatus = "focusOut";
		},
		inputText : function ( message ) {
			var $view = this.element;

			if ( arguments.length === 0 ) {
				return $view.find( ".ui-multibuttonentry-input" ).val();
			}
			$view.find( ".ui-multibuttonentry-input" ).val( message );
			return message;
		},
		select : function ( index ) {
			var $view = this.element,
				lockBlock = null,
				blocks = null;

			if ( this._focusStatus === "focusOut" ) {
				return;
			}

			if ( arguments.length === 0 ) {
				// return a selected block.
				lockBlock = $view.find( "div.ui-multibuttonentry-sblock" );
				if ( lockBlock) {
					return lockBlock.text();
				}
				return null;
			}
			// 1. unlock all blocks.
			this._unlockTextBlock();
			// 2. select pointed block.
			blocks = $view.find( "div" );
			if ( blocks.length > index ) {
				$( blocks[index] ).removeClass( "ui-multibuttonentry-block" ).addClass( "ui-multibuttonentry-sblock" );
				this._trigger( "select" );
			}
			return null;
		},
		add : function ( message, position ) {
			if ( this._focusStatus === "focusOut" ) {
				return;
			}

			this._addTextBlock( message, position );
		},
		remove : function ( position ) {
			var self = this,
				$view = this.element,
				blocks = $view.find( "div" ),
				index = 0;
			if ( this._focusStatus === "focusOut" ) {
				return;
			}

			if ( arguments.length === 0 ) {
				blocks.remove();
				this._trigger( "clear" );
			} else if ( typeof position == "number" ) {
				// remove selected button
				index = ( ( position < blocks.length ) ? position : ( blocks.length - 1 ) );
				$( blocks[index] ).remove();
				this._trigger( "remove" );
			}
			self._modifyInputBoxWidth();
		},
		length : function () {
			return this.element.find( "div" ).length;
		},
		refresh : function () {
			var self = this;
			self.element.hide();
			self.element.show();
		},
		destory : function () {
			var $view = this.element;

			$view.find( "label" ).remove();
			$view.find( "div" ).unbind( "vclick" ).remove();
			$view.find( "a" ).remove();
			$view.find( ".ui-multibuttonentry-input" ).unbind( "keydown" ).remove();

			this._trigger( "destory" );
		}
	});

	$( document ).bind( "pagecreate create", function () {
		$( ":jqmData(role='multibuttonentry')" ).multibuttonentry();
	});

	$( window ).bind( "resize", function () {
		$( ":jqmData(role='multibuttonentry')" ).multibuttonentry( "refresh" );
	});
} ( jQuery, window, document ) );
