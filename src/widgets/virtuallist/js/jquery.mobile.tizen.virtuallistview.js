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
 *	Author: Wongi Lee <wongi11.lee@samsung.com>
 */

/**
 * Virtual List Widget for unlimited data.
 * To support more then 1,000 items, special list widget developed. 
 * Fast initialize and light DOM tree.
 * DB connection and works like DB cursor.     
 * 
 * HTML Attributes:
 *
 *		data-role:	virtuallistview
 *		data-template : jQuery.template ID that populate into virtual list 
 *		data-row : Optional. Set number of <li> elements that are used for data handling. 
 *		
 *		ID : <UL> element that has "data-role=virtuallist" must have ID attribute.
 *
 * * APIs:
 *
 *		create ( {
 *				itemData: function ( idx ) { return json_obj; },
 *				numItemData: number or function () { return number; },
 *				cacheItemData: function ( minIdx, maxIdx ) {}
 *				} )
 *			: Create a virtuallist widget. At this moment, _create method is called.
 *			args : A collection of options
 *				itemData: A function that returns JSON object for given index. Mandatory.
 *				numItemData: Total number of itemData. Mandatory.
 *				cacheItemData: Virtuallist will ask itemData between minIdx and maxIdx.
 *				               Developers can implement this function for preparing data.
 *				               Optional.
 *
 * Events:
 *
 *		touchstart : Temporary preventDefault applied on touchstart event to avoid broken screen.
 *
 * Examples:
 *
 *		<script id="tmp-3-2-7" type="text/x-jquery-tmpl">
 *			<li class="ui-li-3-2-7">
 *				<span class="ui-li-text-main">${NAME}</span>
 *				<img src="00_winset_icon_favorite_on.png" class="ui-li-icon-sub">
 *				<span class="ui-li-text-sub">${ACTIVE}</span>
 *				<span class="ui-li-text-sub2">${FROM}</span>
 *			</li>
 *		</script>
 *
 *		<ul id="virtuallist-normal_3_2_7_ul" data-role="virtuallistview" data-template="tmp-3-2-7" data-dbtable="JSON_DATA" data-row="100">
 *		</ul>
 *
 */

/**
	@class VirtualList
	In the Web environment, it is challenging to display a large amount of data in a list, such as displaying a contact list of over 1000 list items. It takes time to display the entire list in HTML and the DOM manipulation is complex.

	The virtual list widget is used to display a list of unlimited data elements on the screen for better performance. This widget provides easy access to databases to retrieve and display data. Virtual lists are based on the jQuery.template plugin as described in the jQuery documentation for jQuery.template plugin.

	To add a virtual list widget to the application, use the following code:

		<script id="tmp-3-2-7" type="text/x-jquery-tmpl">
			<li class="ui-li-3-2-7">
				<span class="ui-li-text-main">${NAME}</span>
				<img src="00_winset_icon_favorite_on.png" class="ui-li-icon-sub"/>
				<span class="ui-li-text-sub">${ACTIVE}</span>
				<span class="ui-li-text-sub2">${FROM}</span>
			</li>
		</script>
		<ul id="vlist" data-role="virtuallistview" data-template="tmp-3-2-7" data-dbtable="JSON_DATA" data-row="100"></ul>
*/
/**
	@property {String} data-role
	Creates the virtual list view. The value must be set to virtuallistview.
	Only the &gt;ul&lt; element, which a id attribute defined, supports this option. Also, the vlLoadSuccess class attribute must be defined in the &gt;ul&lt; element to ensure that loading data from the database is complete.
*/
/**
	@property {String} data-template
	Defines the jQuery.template element ID.
	The jQuery.template must be defined. The template style can use rem units to support scalability.
*/
/**
	@property {Number} data-row
	Defines the number of virtual list child elements.
	The minimum value is 20 and the default value is 100. As the value gets higher, the loading time increases while the system performance improves. So you need to pick a value that provides the best performance without excessive loading time.
*/
/**
	@method create
	@param {function} itemData(index)
	: function itemData(index) returns the JSON object matched with the given index. The index value is between 0 and numItemData-1.
	@param {Number} numItemData
	: number numItemData or function numItemData() defines or returns a static number of items.
	@param {function} cacheItemData(minIndex, maxIndex)
	: function cacheItemData(minIndex, maxIndex) prepares the JSON data. This method is called before calling the itemData() method with index values between minIndex and maxIndex.
*/

(function ( $, undefined ) {

	/* Code for Virtual List Demo */
	var listCountPerPage = {},	/* Keeps track of the number of lists per page UID. This allows support for multiple nested list in the same page. https://github.com/jquery/jquery-mobile/issues/1617 */
		_NO_SCROLL = 0,					/* ENUM */
		_SCROLL_DOWN = 1,				/* ENUM */
		_SCROLL_UP = -1;					/* ENUM */

	$.widget( "tizen.virtuallistview", $.mobile.widget, {
		options: {
			theme: "s",
			countTheme: "c",
			headerTheme: "b",
			dividerTheme: "b",
			splitIcon: "arrow-r",
			splitTheme: "b",
			inset: false,
			id:	"",					/* Virtual list UL elemet's ID */
			childSelector: " li",	/* To support swipe list */
			dbtable: "",
			template : "",
			dbkey: false,			/* Data's unique Key */
			scrollview: false,
			row: 100,
			page_buf: 50,
			initSelector: ":jqmData(role='virtuallistview')"
		},

		_stylerMouseUp: function () {
			$( this ).addClass( "ui-btn-up-s" );
			$( this ).removeClass( "ui-btn-down-s" );
		},

		_stylerMouseDown: function () {
			$( this ).addClass( "ui-btn-down-s" );
			$( this ).removeClass( "ui-btn-up-s" );
		},

		_stylerMouseOver: function () {
			$( this ).toggleClass( "ui-btn-hover-s" );
		},

		_stylerMouseOut: function () {
			$( this ).toggleClass( "ui-btn-hover-s" );
			$( this ).addClass( "ui-btn-up-s" );
			$( this ).removeClass( "ui-btn-down-s" );
		},

		_pushData: function ( template ) {
			var o = this.options,
				i,
				myTemplate = $( "#" + template ),
				lastIndex = ( o.row > this._numItemData ? this._numItemData : o.row ),
				htmlData;

			for ( i = 0; i < lastIndex; i++ ) {
				htmlData = myTemplate.tmpl( this._itemData( i ) );
				$( o.id ).append( $( htmlData ).attr( 'id', 'li_' + i ) );
			}

			/* After push data, re-style virtuallist widget */
			$( o.id ).trigger( "create" );
		},

		_reposition: function ( event ) {
			var o,
				t = this,
				padding;

			if ( event.data ) {
				o = event.data;
			} else {
				o = event;
			}

			if ( $( o.id + o.childSelector ).size() > 0 ) {
				t._title_h = $( o.id + o.childSelector + ':first' ).position().top;
				t._line_h = $( o.id + o.childSelector + ':first' ).outerHeight();

				t._container_w = $( o.id ).innerWidth();

				padding = parseInt( $( o.id + o.childSelector ).css( "padding-left" ), 10 ) + parseInt( $( o.id + o.childSelector ).css( "padding-right" ), 10 );

				/* Add style */
				$( o.id + ">" + o.childSelector )
					.addClass( "position_absolute" )
					.addClass( "ui-btn-up-s" )
					.bind( "mouseup", t._stylerMouseUp )
					.bind( "mousedown", t._stylerMouseDown )
					.bind( "mouseover", t._stylerMouseOver )
					.bind( "mouseout", t._stylerMouseOut );
			}

			$( o.id + ">" + o.childSelector ).each( function ( index ) {
				$( this ).css( "top", t._title_h + t._line_h * index + 'px' )
					.css( "width", t._container_w - padding );
			} );

			/* Set Max List Height */
			$( o.id ).height( t._numItemData * t._line_h );
		},

		_resize: function ( event ) {
			var o,
				t = this,
				padding;

			if ( event.data ) {
				o = event.data;
			} else {
				o = event;
			}

			t._container_w = $( o.id ).innerWidth();

			padding = parseInt( $( o.id + o.childSelector ).css( "padding-left" ), 10 ) + parseInt( $( o.id + o.childSelector ).css( "padding-right" ), 10 );

			$( o.id + o.childSelector ).each( function (index) {
				$( this ).css( "width", t._container_w - padding );
			} );
		},

		_scrollmove: function ( event ) {
			var t = event.data,	// document
				o = t.options,
				velocity = 0,
				i,
				_replace,		/* Function */
				_moveTopBottom,	/* Function */
				_moveBottomTop,	/* Function */
				_matrixToArray,	/* Function */
				$el,
				transformValue,
				curWindowTop,
				cur_num_top_items;

			/* Text & image src replace function */
			_replace = function ( oldItem, newItem, key ) {
				var oldObj,
					newText,
					newImg;

				$( oldItem ).find( ".ui-li-text-main", ".ui-li-text-sub", "ui-btn-text" ).each( function ( index ) {
					oldObj = $( this );
					newText = $( newItem ).find( ".ui-li-text-main", ".ui-li-text-sub", "ui-btn-text" ).eq( index ).text();

					$( oldObj).contents().filter( function () {
						return ( this.nodeType == 3 );
					} ).get( 0 ).data = newText;
				} );

				$( oldItem ).find( "img" ).each( function ( imgIndex ) {
					oldObj = $( this );
					newImg = $( newItem ).find( "img" ).eq( imgIndex ).attr( "src" );

					$( oldObj ).attr( "src", newImg );
				} );

				$( oldItem ).removeData( );	// Clear old data

				if (key) {
					$( oldItem ).data( key, $( newItem ).data( key ) );
				}
			};

			//Move older item to bottom
			_moveTopBottom = function ( v_firstIndex, v_lastIndex, num, key ) {
				var myTemplate,
					htmlData,
					cur_item;

				if (v_firstIndex < 0) {
					return;
				}

				for ( i = 0; i < num; i++ ) {
					if ( v_lastIndex + i > t._numItemData ) {
						break;
					}

					cur_item = $( '#li_' + ( v_firstIndex + i ) );

					if ( cur_item ) {
						/* Make New <LI> element from template. */
						myTemplate = $( "#" + o.template );
						htmlData = myTemplate.tmpl( t._itemData( v_lastIndex + i ) );

						/* Copy all data to current item. */
						_replace( cur_item, htmlData, key );

						// Clear temporary htmlData to free cache
						htmlData.remove();

						/* Set New Position */
						( cur_item ).css( 'top', t._title_h + t._line_h * ( v_lastIndex + 1 + i ) ).attr( 'id', 'li_' + ( v_lastIndex + 1 + i ) );

					} else {
						break;
					}
				}
			};

			// Move older item to bottom
			_moveBottomTop = function ( v_firstIndex, v_lastIndex, num, key ) {
				var myTemplate,
					htmlData,
					cur_item;

				if ( v_firstIndex < 0 ) {
					return;
				}

				for ( i = 0; i < num; i++ ) {
					cur_item = $( '#li_' + ( v_lastIndex - i ) );

					if ( cur_item ) {
						if ( v_firstIndex - 1 - i < 0 ) {
							break;
						}

						/* Make New <LI> element from template. */
						myTemplate = $( "#" + o.template );
						htmlData = myTemplate.tmpl( t._itemData( v_firstIndex - 1 - i ) );

						/* Copy all data to current item. */
						_replace( cur_item, htmlData, key );

						// Clear temporary htmlData to free cache
						htmlData.remove();

						/* Set New Position */
						$( cur_item ).css( 'top', t._title_h + t._line_h * ( v_firstIndex - 1 - i ) ).attr( 'id', 'li_' + ( v_firstIndex - 1 - i ) );

					} else {
						break;
					}
				}
			};

			/* Matrix to Array function written by Blender@stackoverflow.nnikishi@emich.edu*/
			_matrixToArray = function ( matrix ) {
				var contents = matrix.substr( 7 );

				contents = contents.substr( 0, contents.length - 1 );

				return contents.split( ', ' );
			};

			// Get scroll direction and velocity
			/* with Scroll view */
			if ( o.scrollview ) {
				$el = $( o.id ).parentsUntil( ".ui-page" ).find( ".ui-scrollview-view" );
				transformValue = _matrixToArray( $el.css( "-webkit-transform" ) );
				curWindowTop = Math.abs( transformValue[ 5 ] );	/* Y vector */
			} else {
				curWindowTop = $( window ).scrollTop() - t._line_h;
			}

			cur_num_top_items = $( o.id + o.childSelector ).filter( function () {
				return (parseInt( $( this ).css( "top" ), 10 ) < curWindowTop );
			} ).size();

			if ( t._num_top_items < cur_num_top_items ) {
				t._direction = _SCROLL_DOWN;
				velocity = cur_num_top_items - t._num_top_items;
				t._num_top_items = cur_num_top_items;
			} else if ( t._num_top_items > cur_num_top_items ) {
				t._direction = _SCROLL_UP;
				velocity = t._num_top_items - cur_num_top_items;
				t._num_top_items = cur_num_top_items;
			}

			// Move items
			if ( t._direction == _SCROLL_DOWN ) {
				if ( cur_num_top_items > o.page_buf ) {
					if ( t._last_index + velocity > t._numItemData ) {
						velocity = t._numItemData - t._last_index - 1;
					}

					/* Prevent scroll touch event while DOM access */
					$(document).bind( "touchstart.virtuallist", function (event) {
						event.preventDefault();
					});

					_moveTopBottom( t._first_index, t._last_index, velocity, o.dbkey );

					t._first_index += velocity;
					t._last_index += velocity;
					t._num_top_items -= velocity;

					/* Unset prevent touch event */
					$( document ).unbind( "touchstart.virtuallist" );
				}
			} else if ( t._direction == _SCROLL_UP ) {
				if ( cur_num_top_items <= o.page_buf ) {
					if ( t._first_index < velocity ) {
						velocity = t._first_index;
					}

					/* Prevent scroll touch event while DOM access */
					$( document ).bind( "touchstart.virtuallist", function ( event ) {
						event.preventDefault();
					});

					_moveBottomTop( t._first_index, t._last_index, velocity, o.dbkey );

					t._first_index -= velocity;
					t._last_index -= velocity;
					t._num_top_items += velocity;

					/* Unset prevent touch event */
					$( document ).unbind( "touchstart.virtuallist" );
				}

				if ( t._first_index < o.page_buf ) {
					t._num_top_items = t._first_index;
				}
			}
		},

		_recreate: function ( newArray ) {
			var t = this,
				o = this.options;

			$( o.id ).empty();

			t._numItemData = newArray.length;
			t._direction = _NO_SCROLL;
			t._first_index = 0;
			t._last_index = o.row - 1;

			t._pushData( o.template );

			if (o.childSelector == " ul" ) {
				$( o.id + " ul" ).swipelist();
			}

			$( o.id ).virtuallistview();

			t.refresh( true );

			t._reposition( o );
		},

		_initList: function () {
			var t = this,
				o = this.options;

			/* After AJAX loading success */

			/* Make Gen list by template */
			t._pushData( o.template );

			$( o.id ).parentsUntil( ".ui-page" ).parent().one( "pageshow", function () {
				setTimeout( function () {
					t._reposition( o );
				}, 0);
			});

			/* Scrollview */
			$( document ).bind( "scrollstop.virtuallist", t, t._scrollmove );

			$( window ).bind( "resize.virtuallist", t._resize );

			if ( o.childSelector == " ul" ) {
				$( o.id + " ul" ).swipelist();
			}

			t.refresh( true );
		},

		create: function () {
			var o = this.options;

			/* external API for AJAX callback */
			this._create.apply( this, arguments );

			this._reposition( o );
		},

		_create: function ( args ) {
			// Extend required vars
			$.extend( this, {
				_itemData : function ( idx ) { return null; },
				_numItemData : 0,
				_cacheItemData : function ( minIdx, maxIdx ) { },
				_line_h : 0,
				_title_h : 0,
				_container_w : 0,
				_minimum_row : 20,
				_direction : _NO_SCROLL,
				_first_index : 0,
				_last_index : 0,
				_num_top_items : 0	// By scroll move, number of hidden elements.
			} );

			var t = this,
				o = this.options,
				$el = this.element,
				shortcutsContainer = $('<div class="ui-virtuallist"/>'),
				shortcutsList = $('<ul></ul>'),
				dividers = $el.find(':jqmData(role="virtuallistview" )'),
				lastListItem = null,
				shortcutscroll = this,
				dbtable_name,
				dbtable;


			// create listview markup
			t.element.addClass( function ( i, orig ) {
				return orig + " ui-listview ui-virtual-list-container" + ( t.options.inset ? " ui-listview-inset ui-corner-all ui-shadow " : "" );
			});

			o.id = "#" + $el.attr( "id" );

			$( o.id ).bind( "pagehide", function ( e ) {
				$( o.id ).empty();
			});

			/* Scroll view */
			if ( $( ".ui-scrollview-clip" ).size() > 0 ) {
				o.scrollview = true;
			} else {
				o.scrollview = false;
			}

			/* Init list and page buf */
			if ( $el.data( "row" ) ) {
				o.row = $el.data( "row" );

				if ( o.row < t._minimum_row ) {
					o.row = t._minimum_row;
				}

				o.page_buf = parseInt( ( o.row / 2 ), 10 );
			}

			// Get arguments
			if ( args ) {
				if ( args.itemData && typeof args.itemData == 'function'  ) {
					t._itemData = args.itemData;
				} else {
					return;
				}
				if ( args.numItemData ) {
					if ( typeof args.numItemData == 'function' ) {
						t._numItemData = args.numItemData( );
					} else if ( typeof args.numItemData == 'number' ) {
						t._numItemData = args.numItemData;
					} else {
						return;
					}
				} else {
					return;
				}
			} else {	// No option is given
				// Legacy support: dbtable
				console.log("WARNING: The data interface of virtuallist is changed. \nOld data interface(data-dbtable) is still supported, but will be removed in next version. \nPlease fix your code soon!");

				/* After DB Load complete, Init Vritual list */
				if ( $( o.id ).hasClass( "vlLoadSuccess" ) ) {
					dbtable_name = $el.jqmData('dbtable');
					dbtable = window[ dbtable_name ];

					$( o.id ).empty();

					if ( !dbtable ) {
						dbtable = { };
					}

					t._itemData = function ( idx ) {
						return dbtable[ idx ];
					};
					t._numItemData = dbtable.length;
				} else {
					return;	// Do nothing
				}
			}

			if ( $el.data( "template" ) ) {
				o.template = $el.data( "template" );

				/* to support swipe list, <li> or <ul> can be main node of virtual list. */
				if ( $el.data( "swipelist" ) == true ) {
					o.childSelector = " ul";
				} else {
					o.childSelector = " li";
				}
			}

			/* Set data's unique key */
			if ( $el.data( "dbkey" ) ) {
				o.dbkey = $el.data( "dbkey" );
			}

			t._first_index = 0;			//first id of <li> element.
			t._last_index = o.row - 1;		//last id of <li> element.
			t._initList();
		},

		destroy : function () {
			var o = this.options;

			$( document ).unbind( "scrollstop" );

			$( window ).unbind( "resize.virtuallist" );

			$( o.id ).empty();
		},

		_itemApply: function ( $list, item ) {
			var $countli = item.find( ".ui-li-count" );

			if ( $countli.length ) {
				item.addClass( "ui-li-has-count" );
			}

			$countli.addClass( "ui-btn-up-" + ( $list.jqmData( "counttheme" ) || this.options.countTheme ) + " ui-btn-corner-all" );

			// TODO class has to be defined in markup
			item.find( "h1, h2, h3, h4, h5, h6" ).addClass( "ui-li-heading" ).end()
				.find( "p, dl" ).addClass( "ui-li-desc" ).end()
				.find( ">img:eq(0), .ui-link-inherit>img:eq(0)" ).addClass( "ui-li-thumb" ).each( function () {
					item.addClass( $( this ).is( ".ui-li-icon" ) ? "ui-li-has-icon" : "ui-li-has-thumb" );
				}).end()
				.find( ".ui-li-aside" ).each(function () {
					var $this = $( this );
					$this.prependTo( $this.parent() ); //shift aside to front for css float
				} );
		},

		_removeCorners: function ( li, which ) {
			var top = "ui-corner-top ui-corner-tr ui-corner-tl",
				bot = "ui-corner-bottom ui-corner-br ui-corner-bl";

			li = li.add( li.find( ".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb" ) );

			if ( which === "top" ) {
				li.removeClass( top );
			} else if ( which === "bottom" ) {
				li.removeClass( bot );
			} else {
				li.removeClass( top + " " + bot );
			}
		},

		_refreshCorners: function ( create ) {
			var $li,
				$visibleli,
				$topli,
				$bottomli;

			if ( this.options.inset ) {
				$li = this.element.children( "li" );
				// at create time the li are not visible yet so we need to rely on .ui-screen-hidden
				$visibleli = create ? $li.not( ".ui-screen-hidden" ) : $li.filter( ":visible" );

				this._removeCorners( $li );

				// Select the first visible li element
				$topli = $visibleli.first()
					.addClass( "ui-corner-top" );

				$topli.add( $topli.find( ".ui-btn-inner" ) )
					.find( ".ui-li-link-alt" )
						.addClass( "ui-corner-tr" )
					.end()
					.find( ".ui-li-thumb" )
						.not( ".ui-li-icon" )
						.addClass( "ui-corner-tl" );

				// Select the last visible li element
				$bottomli = $visibleli.last()
					.addClass( "ui-corner-bottom" );

				$bottomli.add( $bottomli.find( ".ui-btn-inner" ) )
					.find( ".ui-li-link-alt" )
						.addClass( "ui-corner-br" )
					.end()
					.find( ".ui-li-thumb" )
						.not( ".ui-li-icon" )
						.addClass( "ui-corner-bl" );
			}
		},

		refresh: function ( create ) {
			this.parentPage = this.element.closest( ".ui-page" );
			this._createSubPages();

			var o = this.options,
				$list = this.element,
				self = this,
				dividertheme = $list.jqmData( "dividertheme" ) || o.dividerTheme,
				listsplittheme = $list.jqmData( "splittheme" ),
				listspliticon = $list.jqmData( "spliticon" ),
				li = $list.children( "li" ),
				counter = $.support.cssPseudoElement || !$.nodeName( $list[ 0 ], "ol" ) ? 0 : 1,
				item,
				itemClass,
				temTheme,
				a,
				last,
				splittheme,
				countParent,
				icon,
				pos,
				numli,
				itemTheme;

			if ( counter ) {
				$list.find( ".ui-li-dec" ).remove();
			}

			for ( pos = 0, numli = li.length; pos < numli; pos++ ) {
				item = li.eq( pos );
				itemClass = "ui-li";

				// If we're creating the element, we update it regardless
				if ( create || !item.hasClass( "ui-li" ) ) {
					itemTheme = item.jqmData( "theme" ) || o.theme;
					a = item.children( "a" );

					if ( a.length ) {
						icon = item.jqmData( "icon" );

						item.buttonMarkup({
							wrapperEls: "div",
							shadow: false,
							corners: false,
							iconpos: "right",
							/* icon: a.length > 1 || icon === false ? false : icon || "arrow-r",*/
							icon: false,	/* Remove unnecessary arrow icon */
							theme: itemTheme
						});

						if ( ( icon != false ) && ( a.length == 1 ) ) {
							item.addClass( "ui-li-has-arrow" );
						}

						a.first().addClass( "ui-link-inherit" );

						if ( a.length > 1 ) {
							itemClass += " ui-li-has-alt";

							last = a.last();
							splittheme = listsplittheme || last.jqmData( "theme" ) || o.splitTheme;

							last.appendTo(item)
								.attr( "title", last.getEncodedText() )
								.addClass( "ui-li-link-alt" )
								.empty()
								.buttonMarkup({
									shadow: false,
									corners: false,
									theme: itemTheme,
									icon: false,
									iconpos: false
								})
								.find( ".ui-btn-inner" )
								.append(
									$( "<span />" ).buttonMarkup({
										shadow: true,
										corners: true,
										theme: splittheme,
										iconpos: "notext",
										icon: listspliticon || last.jqmData( "icon" ) || o.splitIcon
									})
								);
						}
					} else if ( item.jqmData( "role" ) === "list-divider" ) {

						itemClass += " ui-li-divider ui-btn ui-bar-" + dividertheme;
						item.attr( "role", "heading" );

						//reset counter when a divider heading is encountered
						if ( counter ) {
							counter = 1;
						}

					} else {
						itemClass += " ui-li-static ui-body-" + itemTheme;
					}
				}

				if ( counter && itemClass.indexOf( "ui-li-divider" ) < 0 ) {
					countParent = item.is( ".ui-li-static:first" ) ? item : item.find( ".ui-link-inherit" );

					countParent.addClass( "ui-li-jsnumbering" )
						.prepend( "<span class='ui-li-dec'>" + (counter++) + ". </span>" );
				}

				item.add( item.children( ".ui-btn-inner" ) ).addClass( itemClass );

				self._itemApply( $list, item );
			}

			this._refreshCorners( create );
		},

		//create a string for ID/subpage url creation
		_idStringEscape: function ( str ) {
			return str.replace(/\W/g , "-");
		},

		_createSubPages: function () {
			var parentList = this.element,
				parentPage = parentList.closest( ".ui-page" ),
				parentUrl = parentPage.jqmData( "url" ),
				parentId = parentUrl || parentPage[ 0 ][ $.expando ],
				parentListId = parentList.attr( "id" ),
				o = this.options,
				dns = "data-" + $.mobile.ns,
				self = this,
				persistentFooterID = parentPage.find( ":jqmData(role='footer')" ).jqmData( "id" ),
				hasSubPages,
				newRemove;

			if ( typeof listCountPerPage[ parentId ] === "undefined" ) {
				listCountPerPage[ parentId ] = -1;
			}

			parentListId = parentListId || ++listCountPerPage[ parentId ];

			$( parentList.find( "li>ul, li>ol" ).toArray().reverse() ).each(function ( i ) {
				var self = this,
					list = $( this ),
					listId = list.attr( "id" ) || parentListId + "-" + i,
					parent = list.parent(),
					nodeEls,
					title = nodeEls.first().getEncodedText(),//url limits to first 30 chars of text
					id = ( parentUrl || "" ) + "&" + $.mobile.subPageUrlKey + "=" + listId,
					theme = list.jqmData( "theme" ) || o.theme,
					countTheme = list.jqmData( "counttheme" ) || parentList.jqmData( "counttheme" ) || o.countTheme,
					newPage,
					anchor;

				nodeEls = $( list.prevAll().toArray().reverse() );
				nodeEls = nodeEls.length ? nodeEls : $( "<span>" + $.trim( parent.contents()[ 0 ].nodeValue ) + "</span>" );

				//define hasSubPages for use in later removal
				hasSubPages = true;

				newPage = list.detach()
							.wrap( "<div " + dns + "role='page' " +	dns + "url='" + id + "' " + dns + "theme='" + theme + "' " + dns + "count-theme='" + countTheme + "'><div " + dns + "role='content'></div></div>" )
							.parent()
								.before( "<div " + dns + "role='header' " + dns + "theme='" + o.headerTheme + "'><div class='ui-title'>" + title + "</div></div>" )
								.after( persistentFooterID ? $( "<div " + dns + "role='footer' " + dns + "id='" + persistentFooterID + "'>" ) : "" )
								.parent()
								.appendTo( $.mobile.pageContainer );

				newPage.page();

				anchor = parent.find('a:first');

				if ( !anchor.length ) {
					anchor = $( "<a/>" ).html( nodeEls || title ).prependTo( parent.empty() );
				}

				anchor.attr( "href", "#" + id );

			}).virtuallistview();

			// on pagehide, remove any nested pages along with the parent page, as long as they aren't active
			// and aren't embedded
			if ( hasSubPages &&
						parentPage.is( ":jqmData(external-page='true')" ) &&
						parentPage.data( "page" ).options.domCache === false ) {

				newRemove = function ( e, ui ) {
					var nextPage = ui.nextPage, npURL;

					if ( ui.nextPage ) {
						npURL = nextPage.jqmData( "url" );
						if ( npURL.indexOf( parentUrl + "&" + $.mobile.subPageUrlKey ) !== 0 ) {
							self.childPages().remove();
							parentPage.remove();
						}
					}
				};

				// unbind the original page remove and replace with our specialized version
				parentPage
					.unbind( "pagehide.remove" )
					.bind( "pagehide.remove", newRemove );
			}
		},

		// TODO sort out a better way to track sub pages of the virtuallistview this is brittle
		childPages: function () {
			var parentUrl = this.parentPage.jqmData( "url" );

			return $( ":jqmData(url^='" +  parentUrl + "&" + $.mobile.subPageUrlKey + "')" );
		}
	});

	//auto self-init widgets
	$( document ).bind( "pagecreate create", function ( e ) {
		$( $.tizen.virtuallistview.prototype.options.initSelector, e.target ).virtuallistview();
	});

} ( jQuery ) );
