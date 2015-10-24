/*global define, ns, document, window */
/* Copyright  2010 - 2014 Samsung Electronics Co., Ltd.
 * License : MIT License V2
 */
/*jslint nomen: true, plusplus: true */
/**
 * #IndexScrollbar Widget
 * Shows an index scroll bar with indices, usually for the list.
 *
 * The index scroll bar widget shows on the screen a scrollbar with indices,
 * and fires a select event when the index characters are clicked.
 * The following table describes the supported index scroll bar APIs.
 *
 * ## Manual constructor
 * For manual creation of widget you can use constructor of widget from **tau** namespace:
 *
 *		@example
 *		var indexscrollbarElement = document.getElementById('indexscrollbar'),
 *			indexscrollbar = tau.widget.IndexScrollbar(IndexScrollbar, {index: "A,B,C"});
 *
 * Constructor has one require parameter **element** which are base **HTMLElement** to create widget.
 * We recommend get this element by method *document.getElementById*. Second parameter is **options**
 * and it is a object with options for widget.
 *
 * To add an IndexScrollbar widget to the application, use the following code:
 *
 *      @example
 *      <div id="foo" class="ui-indexscrollbar" data-index="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z"></div>
 *      <script>
 *          (function() {
 *              var elem = document.getElementById("foo");
 *              tau.widget.IndexScrollbar(elem);
 *              elem.addEventListener("select", function( event ) {
 *                  var index = event.detail.index;
 *                  console.log(index);
 *              });
 *          }());
 *      </script>
 *
 * The index value can be retrieved by accessing event.detail.index property.
 *
 * In the following example, the list scrolls to the position of the list item defined using
 * the li-divider class, selected by the index scroll bar:
 *
 *      @example
 *         <div id="pageIndexScrollbar" class="ui-page">
 *             <header class="ui-header">
 *                 <h2 class="ui-title">IndexScrollbar</h2>
 *             </header>
 *             <section class="ui-content">
 *                 <div style="overflow-y:scroll;">
 *                     <div id="indexscrollbar1"
 *                          class="ui-indexscrollbar"
 *                          data-index="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z">
 *                     </div>
 *                     <ul class="ui-listview" id="list1">
 *                         <li class="li-divider">A</li>
 *                         <li>Anton</li>
 *                         <li>Arabella</li>
 *                         <li>Art</li>
 *                         <li class="li-divider">B</li>
 *                         <li>Barry</li>
 *                         <li>Bibi</li>
 *                         <li>Billy</li>
 *                         <li>Bob</li>
 *                         <li class="li-divider">D</li>
 *                         <li>Daisy</li>
 *                         <li>Derek</li>
 *                         <li>Desmond</li>
 *                     </ul>
 *                 </div>
 *             </section>
 *             <script>
 *                 (function () {
 *                     var page = document.getElementById("pageIndexScrollbar");
 *                     page.addEventListener("pagecreate", function () {
 *                         var elem = document.getElementById("indexscrollbar1"), // Index scroll bar element
 *                                 elList = document.getElementById("list1"), // List element
 *                                 elDividers = elList.getElementsByClassName("li-divider"), // List items (dividers)
 *                                 elScroller = elList.parentElement, // List's parent item (overflow-y:scroll)
 *                                 dividers = {}, // Collection of list dividers
 *                                 indices = [], // List of index
 *                                 elDivider,
 *                                 i, idx;
 *
 *                         // For all list dividers
 *                         for (i = 0; i < elDividers.length; i++) {
 *                             // Add the list divider elements to the collection
 *                             elDivider = elDividers[i];
 *                             // li element having the li-divider class
 *                             idx = elDivider.innerText;
 *                             // Get a text (index value)
 *                             dividers[idx] = elDivider;
 *                             // Remember the element
 *
 *                             // Add the index to the index list
 *                             indices.push(idx);
 *                         }
 *
 *                         // Change the data-index attribute to the indexscrollbar element
 *                         // before initializing IndexScrollbar widget
 *                         elem.setAttribute("data-index", indices.join(","));
 *
 *                         // Create index scroll bar
 *                         tau.IndexScrollbar(elem);
 *
 *                         // Bind the select callback
 *                         elem.addEventListener("select", function (ev) {
 *                             var elDivider,
 *                                     idx = ev.detail.index;
 *                             elDivider = dividers[idx];
 *                             if (elDivider) {
 *                                 // Scroll to the li-divider element
 *                                 elScroller.scrollTop = elDivider.offsetTop - elScroller.offsetTop;
 *                             }
 *                         });
 *                     });
 *                 }());
 *             </script>
 *         </div>
 *
 * The following example uses the supplementScroll argument, which shows a level 2 index scroll bar.
 * The application code must contain a level 2 index array for each level 1 index character.
 * The example shows a way to analyze list items and create a dictionary (secondIndex) for level 1
 * indices for the index scroll bar, and a dictionary (keyItem) for moving list items at runtime:
 *
 *      @example
 *         <div id="indexscrollbar2" class="ui-indexscrollbar"
 *              data-index="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z">
 *         </div>
 *         <ul class="ui-listview" id="ibar2_list2">
 *             <li>Anton</li>
 *             <li>Arabella</li>
 *             <li>Art</li>
 *             <li>Barry</li>
 *             <li>Bibi</li>
 *             <li>Billy</li>
 *             <li>Bob</li>
 *             <li>Carry</li>
 *             <li>Cibi</li>
 *             <li>Daisy</li>
 *             <li>Derek</li>
 *             <li>Desmond</li>
 *         </ul>
 *
 *         <script>
 *             (function () {
 *                 var page = document.getElementById("pageIndexScrollbar2"),
 *                         isb,
 *                         index = [],
 *                         supIndex = {},
 *                         elIndex = {};
 *                 page.addEventListener("pageshow", function () {
 *                     var elisb = document.getElementById("indexscrollbar2"),
 *                             elList = document.getElementById("ibar2_list2"), // List element
 *                             elItems = elList.children,
 *                             elScroller = elList.parentElement, // Scroller (overflow-y:hidden)
 *                             indexData = getIndexData(
 *                                     {
 *                                         array: elItems,
 *                                         getTextValue: function (array, i) {
 *                                             return array[i].innerText;
 *                                         }
 *                                     });
 *
 *                     function getIndexData(options) {
 *                         var array = options.array,
 *                                 getTextValue = options.getTextValue,
 *                                 item,
 *                                 text,
 *                                 firstIndex = [],
 *                                 secondIndex = {},
 *                                 keyItem = {},
 *                                 c1 = null,
 *                                 c2 = null,
 *                                 i;
 *
 *                         for (i = 0; i < array.length; i++) {
 *                             item = array[i];
 *                             text = getTextValue(array, i);
 *                             if (text.length > 0) {
 *                                 if (!c1 || c1 !== text[0]) {
 *                                     // New c1
 *                                     c1 = text[0];
 *                                     firstIndex.push(c1);
 *                                     keyItem[c1] = item;
 *                                     secondIndex[c1] = [];
 *                                     c2 = text[1];
 *                                     if (c2) {
 *                                         secondIndex[c1].push(c2);
 *                                     }
 *                                     else {
 *                                         c2 = '';
 *                                     }
 *                                     keyItem[c1 + c2] = item;
 *                                 }
 *                                 else {
 *                                     // Existing c1
 *                                     if (c2 !== text[1]) {
 *                                         c2 = text[1];
 *                                         secondIndex[c1].push(c2);
 *                                         keyItem[c1 + c2] = item;
 *                                     }
 *                                 }
 *                             }
 *                         }
 *                         return {
 *                             firstIndex: firstIndex,
 *                             secondIndex: secondIndex,
 *                             keyItem: keyItem
 *                         };
 *                     }
 *
 *                     // Update the data-index attribute to the indexscrollbar element, with the index list above
 *                     elisb.setAttribute("data-index", indexData.firstIndex);
 *                     // Create IndexScrollbar
 *                     isb = new tau.IndexScrollbar(elisb, {
 *                         index: indexData.firstIndex,
 *                         supplementaryIndex: function (firstIndex) {
 *                             return indexData.secondIndex[firstIndex];
 *                         }
 *                     });
 *                     // Bind the select callback
 *                     elisb.addEventListener("select", function (ev) {
 *                         var el,
 *                             index = ev.detail.index;
 *                         el = indexData.keyItem[index];
 *                         if (el) {
 *                             // Scroll to the li-divider element
 *                             elScroller.scrollTop = el.offsetTop - elScroller.offsetTop;
 *                         }
 *                     });
 *                 });
 *                 page.addEventListener("pagehide", function () {
 *                     console.log('isb2:destroy');
 *                     isb.destroy();
 *                     index.length = 0;
 *                     supIndex = {};
 *                     elIndex = {};
 *                 });
 *             }());
 *         </script>
 *
 * ##Options for widget
 *
 * Options for widget can be defined as _data-..._ attributes or give as parameter in constructor.
 *
 * You can change option for widget using method **option**.
 *
 * ##Methods
 *
 * To call method on widget you can use tau API:
 *
 * First API is from tau namespace:
 *
 *		@example
 *		var indexscrollbarElement = document.getElementById('indexscrollbar'),
 *			indexscrollbar = tau.widget.IndexScrollbar(indexscrollbarElement);
 *
 *		indexscrollbar.methodName(methodArgument1, methodArgument2, ...);
 *
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@samsung.com>
 * @author Tomasz Lukawski <t.lukawski@samsung.com>
 * @class ns.widget.wearable.IndexScrollbar
 * @extends ns.widget.BaseWidget
 */
(function (document, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../../../../../core/engine",
			"../../../../../core/event",
			"../../../../../core/event/vmouse",
			"../../../../../core/util/object",
			"../../../../../core/util/DOM/css",
			"../indexscrollbar",
			"./IndexBar",
			"./IndexIndicator",
			"../../../../../core/widget/BaseWidget"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");
			var IndexScrollbar = function() {
				// Support calling without 'new' keyword
				this.element = null;
				this.indicator = null;
				this.indexBar1 = null;	// First IndexBar. Always shown.
				this.indexBar2 = null;	// 2-depth IndexBar. shown if needed.


				this.index = null;
				this.touchAreaOffsetLeft = 0;
				this.indexElements = null;
				this.selectEventTriggerTimeoutId = null;
				this.ulMarginTop = 0;

				this.eventHandlers = {};

			},
			BaseWidget = ns.widget.BaseWidget,
			/**
			 * Alias for class {@link ns.engine}
			 * @property {Object} engine
			 * @member ns.widget.wearable.IndexScrollbar
			 * @private
			 * @static
			 */
				engine = ns.engine,

			/**
			 * Alias for class {@link ns.event}
			 * @property {Object} events
			 * @member ns.widget.wearable.IndexScrollbar
			 * @private
			 * @static
			 */
				events = ns.event,
			/**
			 * Alias for class {@link ns.util.object}
			 * @property {Object} utilsObject
			 * @member ns.widget.wearable.IndexScrollbar
			 * @private
			 * @static
			 */
				utilsObject = ns.util.object,
				IndexBar = ns.widget.wearable.indexscrollbar.IndexBar,
				IndexIndicator = ns.widget.wearable.indexscrollbar.IndexIndicator,
				EventType = {
					/**
					 * Event triggered after select index by user
					 * @event select
					 * @member ns.widget.wearable.IndexScrollbar
					 */
					SELECT: "select"
				},

				POINTER_START = 'vmousedown',
				POINTER_MOVE = 'vmousemove',
				POINTER_END = 'vmouseup',

				pointerIsPressed = false,
				prototype = new BaseWidget();

			IndexScrollbar.prototype = prototype;

			utilsObject.merge(prototype, {
				widgetName: "IndexScrollbar",
				widgetClass: "ui-indexscrollbar",

				_configure: function () {
					/**
					 * All possible widget options
					 * @property {Object} options
					 * @property {string} [options.moreChar="*"] more character
					 * @property {string} [options.selectedClass="ui-state-selected"] disabled class name
					 * @property {string} [options.delimiter=","] delimiter in index
					 * @property {string|Array} [options.index=["A","B","C","D","E","F","G","H","I",
					 * "J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1"]]
					 * String with list of letters separate be delimiter or array of letters
					 * @property {boolean} [options.maxIndexLen=0]
					 * @property {boolean} [options.indexHeight=41]
					 * @property {boolean} [options.keepSelectEventDelay=50]
					 * @property {?boolean} [options.container=null]
					 * @property {?boolean} [options.supplementaryIndex=null]
					 * @property {number} [options.supplementaryIndexMargin=1]
					 * @member ns.widget.wearable.IndexScrollbar
					 */
					this.options = {
						moreChar: "*",
						selectedClass: "ui-state-selected",
						indicatorClass: "ui-indexscrollbar-indicator",
						delimiter: ",",
						index: [
							"A", "B", "C", "D", "E", "F", "G", "H",
							"I", "J", "K", "L", "M", "N", "O", "P", "Q",
							"R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1"
						],
						maxIndexLen: 0,
						indexHeight: 41,
						keepSelectEventDelay: 50,
						container: null,
						supplementaryIndex: null,
						supplementaryIndexMargin: 1
					};
				},

				/**
				 * This method builds widget.
				 * @method _build
				 * @protected
				 * @param {HTMLElement} element
				 * @return {HTMLElement}
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_build: function (element) {
					return element;
				},

				/**
				 * This method inits widget.
				 * @method _init
				 * @protected
				 * @param {HTMLElement} element
				 * @return {HTMLElement}
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_init: function (element) {
					var self = this,
						options = self.options;
					self._setIndex(element, options.index);
					self._setMaxIndexLen(element, options.maxIndexLen);
					self._setInitialLayout();	// This is needed for creating sub objects
					self._createSubObjects();

					self._updateLayout();

					// Mark as extended
					self._extended(true);
					return element;
				},

				/**
				 * This method refreshes widget.
				 * @method _refresh
				 * @protected
				 * @return {HTMLElement}
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_refresh: function () {
					if( this._isExtended() ) {
						this._unbindEvent();
						this.indicator.hide();
						this._extended( false );
					}

					this._updateLayout();
					this.indexBar1.refresh();
					this._extended( true );
				},

				/**
				 * This method destroys widget.
				 * @method _destroy
				 * @protected
				 * @param {HTMLElement} element
				 * @return {HTMLElement}
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_destroy: function() {
					var self = this;
					if (self.isBound()) {
						self._unbindEvent();
						self._extended(false);
						self._destroySubObjects();
						self.indicator = null;
						self.index = null;
						self.eventHandlers = {};
					}
				},

				/**
				 * This method creates indexBar1 and indicator in the indexScrollbar
				 * @method _createSubObjects
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_createSubObjects: function() {
					var self =  this,
						options = self.options,
						element = self.element;
					// indexBar1
					self.indexBar1 = new IndexBar( document.createElement("UL"), {
						container: element,
						offsetLeft: 0,
						index: options.index,
						verticalCenter: true,
						indexHeight: options.indexHeight,
						maxIndexLen: options.maxIndexLen
					});

					// indexBar2
					if (typeof options.supplementaryIndex === "function") {
						self.indexBar2 = new IndexBar( document.createElement("UL"), {
							container: element,
							offsetLeft: -element.clientWidth - options.supplementaryIndexMargin,
							index: [],	// empty index
							indexHeight: options.indexHeight,
							ulClass: "ui-indexscrollbar-supplementary"
						});
						self.indexBar2.hide();
					}

					// indicator
					self.indicator = new IndexIndicator(document.createElement("DIV"), {
						container: self._getContainer(),
						referenceElement: self.element,
						className: options.indicatorClass
					});

				},

				/**
				 * This method destroys sub-elements: index bars and indicator.
				 * @method _destroySubObjects
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_destroySubObjects: function() {
					var subObjs = {
							iBar1: this.indexBar1,
							iBar2: this.indexBar2,
							indicator: this.indicator
						},
						subObj,
						el,
						i;
					for(i in subObjs) {
						subObj = subObjs[i];
						if(subObj) {
							el = subObj.element;
							subObj.destroy();
							el.parentNode.removeChild(el);
						}
					}
				},

				/**
				 * This method sets initial layout.
				 * @method _setInitialLayout
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_setInitialLayout: function () {
					var indexScrollbar = this.element,
						container = this._getContainer(),
						containerPosition = window.getComputedStyle(container).position,
						indexScrollbarStyle = indexScrollbar.style;

					// Set the indexScrollbar's position, if needed
					if (containerPosition !== "absolute" && containerPosition !== "relative") {
						indexScrollbarStyle.top = container.offsetTop + "px";
						indexScrollbarStyle.height = container.offsetHeight + "px";
					}
				},

				/**
				 * This method calculates maximum index length.
				 * @method _setMaxIndexLen
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_setMaxIndexLen: function(element, value) {
					var self = this,
						options = self.options,
						container = self._getContainer(),
						containerHeight = container.offsetHeight;

					if (value <= 0) {
						value = Math.floor( containerHeight / options.indexHeight );
					}
					if (value > 0 && value%2 === 0) {
						value -= 1;	// Ensure odd number
					}
					options.maxIndexLen = value;
				},

				/**
				 * This method updates layout.
				 * @method _updateLayout
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_updateLayout: function() {
					this._setInitialLayout();
					this._draw();

					this.touchAreaOffsetLeft = this.element.offsetLeft - 10;
				},

				/**
				 * This method draws additional sub-elements
				 * @method _draw
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_draw: function () {
					this.indexBar1.show();
					return this;
				},

				/**
				 * This method removes indicator.
				 * @method _removeIndicator
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_removeIndicator: function() {
					var indicator = this.indicator,
						parentElem = indicator.element.parentNode;

					parentElem.removeChild(indicator.element);
					indicator.destroy();
					this.indicator = null;
				},

				/**
				 * This method returns the receiver of event by position.
				 * @method _getEventReceiverByPosition
				 * @param {number} posX The position relative to the left edge of the document.
				 * @return {?ns.widget.wearable.indexscrollbar.IndexBar} Receiver of event
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_getEventReceiverByPosition: function(posX) {
					var windowWidth = window.innerWidth,
						elementWidth = this.element.clientWidth,
						receiver;

					if( this.options.supplementaryIndex ) {
						if( windowWidth - elementWidth <= posX && posX <= windowWidth) {
							receiver = this.indexBar1;
						} else {
							receiver = this.indexBar2;
						}
					} else {
						receiver = this.indexBar1;
					}
					return receiver;
				},

				/**
				 * This method updates indicator.
				 * It sets new value of indicator and triggers event "select".
				 * @method _updateIndicatorAndTriggerEvent
				 * @param {number} val The value of indicator
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_updateIndicatorAndTriggerEvent: function(val) {
					this.indicator.setValue( val );
					this.indicator.show();
					if(this.selectEventTriggerTimeoutId) {
						window.clearTimeout(this.selectEventTriggerTimeoutId);
					}
					this.selectEventTriggerTimeoutId = window.setTimeout(function() {
						this.trigger(EventType.SELECT, {index: val});
						this.selectEventTriggerTimeoutId = null;
					}.bind(this), this.options.keepSelectEventDelay);
				},

				/**
				 * This method is executed on event "touchstart"
				 * @method _onTouchStartHandler
				 * @param {Event} event Event
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_onTouchStartHandler: function(event) {
					pointerIsPressed = true;
					var touches = event.touches || event._originalEvent && event._originalEvent.touches;
					if (touches && (touches.length > 1)) {
						event.preventDefault();
						event.stopPropagation();
						return;
					}
					var pos = this._getPositionFromEvent(event),
					// At touchstart, only indexbar1 is shown.
						iBar1 = this.indexBar1,
						idx = iBar1.getIndexByPosition( pos.y ),
						val = iBar1.getValueByIndex( idx );

					iBar1.select( idx );	// highlight selected value

					this._updateIndicatorAndTriggerEvent( val );
				},

				/**
				 * This method is executed on event "touchmove"
				 * @method _onTouchMoveHandler
				 * @param {Event} event Event
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_onTouchMoveHandler: function(event) {
					var touches = event._originalEvent && event._originalEvent.touches;
					if (touches && (touches.length > 1) || !pointerIsPressed) {
						events.preventDefault(event);
						events.stopPropagation(event);
						return;
					}

					var pos = this._getPositionFromEvent( event ),
						iBar1 = this.indexBar1,
						iBar2 = this.indexBar2,
						idx,
						iBar,
						val;

					// Check event receiver: ibar1 or ibar2
					iBar = this._getEventReceiverByPosition( pos.x );
					if( iBar === iBar2 ) {
						iBar2.options.index = this.options.supplementaryIndex(iBar1.getValueByIndex(iBar1.selectedIndex));
						iBar2.refresh();
					}

					// get index and value from ibar1 or ibar2
					idx = iBar.getIndexByPosition( pos.y );
					val = iBar.getValueByIndex( idx );
					if(iBar === iBar2) {
						// Update val to make a concatenated string for indexIndicator
						val = iBar1.getValueByIndex(iBar1.selectedIndex) + val;
					} else if(iBar2 && !iBar2.isShown()) {
						// iBar1 is selected.
						// Set iBar2's paddingTop, only when the iBar2 isn't shown
						iBar2.setPaddingTop(iBar1.getOffsetTopByIndex(iBar1.selectedIndex));
					}

					// update ibars
					iBar.select(idx);	// highlight selected value
					iBar.show();
					if( iBar1 === iBar && iBar2 ) {
						iBar2.hide();
					}

					// update indicator
					this._updateIndicatorAndTriggerEvent( val );

					events.preventDefault(event);
					events.stopPropagation(event);
				},

				/**
				 * This method is executed on event "touchend"
				 * @method _onTouchEndHandler
				 * @param {Event} event Event
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_onTouchEndHandler: function( event ) {
					var self = this,
						touches = event._originalEvent && event._originalEvent.touches;

					if (touches && (touches.length === 0) ||
							!touches) {
						pointerIsPressed = false;
					}
					self.indicator.hide();
					self.indexBar1.clearSelected();
					if(self.indexBar2) {
						self.indexBar2.clearSelected();
						self.indexBar2.hide();
					}
				},

				/**
				 * This method binds events to widget.
				 * @method _bindEvents
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_bindEvents: function() {
					this._bindResizeEvent();
					this._bindEventToTriggerSelectEvent();
				},

				/**
				 * This method unbinds events to widget.
				 * @method _unbindEvent
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_unbindEvent: function() {
					this._unbindResizeEvent();
					this._unbindEventToTriggerSelectEvent();
				},

				/**
				 * This method binds event "resize".
				 * @method _bindResizeEvent
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_bindResizeEvent: function() {
					this.eventHandlers.onresize = function(/* ev */) {
						this.refresh();
					}.bind(this);

					window.addEventListener( "resize", this.eventHandlers.onresize );
				},

				/**
				 * This method unbinds event "resize".
				 * @method _bindResizeEvent
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_unbindResizeEvent: function() {
					if ( this.eventHandlers.onresize ) {
						window.removeEventListener( "resize", this.eventHandlers.onresize );
					}
				},

				/**
				 * This method binds touch events.
				 * @method _bindEventToTriggerSelectEvent
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_bindEventToTriggerSelectEvent: function() {
					var self = this;
					self.eventHandlers.touchStart = self._onTouchStartHandler.bind(self);
					self.eventHandlers.touchEnd = self._onTouchEndHandler.bind(self);
					self.eventHandlers.touchMove = self._onTouchMoveHandler.bind(self);

					self.element.addEventListener(POINTER_START, self.eventHandlers.touchStart);
					document.addEventListener(POINTER_MOVE, self.eventHandlers.touchMove);
					document.addEventListener(POINTER_END, self.eventHandlers.touchEnd);
					document.addEventListener("touchcancel", self.eventHandlers.touchEnd);
				},

				/**
				 * This method unbinds touch events.
				 * @method _unbindEventToTriggerSelectEvent
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_unbindEventToTriggerSelectEvent: function() {
					var self = this;
					self.element.removeEventListener(POINTER_START, self.eventHandlers.touchStart);
					document.removeEventListener(POINTER_MOVE, self.eventHandlers.touchMove);
					document.removeEventListener(POINTER_END, self.eventHandlers.touchEnd);
					document.removeEventListener("touchcancel", self.eventHandlers.touchEnd);
				},

				/**
				 * This method sets or gets data from widget.
				 * @method _data
				 * @param {string|Object} key
				 * @param {*} val
				 * @return {*} Return value of data or widget's object
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_data: function (key, val) {
					var el = this.element,
						d = el.__data,
						idx;
					if(!d) {
						d = el.__data = {};
					}
					if(typeof key === "object") {
						// Support data collection
						for(idx in key) {
							this._data(idx, key[idx]);
						}
						return this;
					} else {
						if("undefined" === typeof val) {	// Getter
							return d[key];
						} else {	// Setter
							d[key] = val;
							return this;
						}
					}
				},

				/**
				 * This method checks if element is valid element of widget IndexScrollbar.
				 * @method _isValidElement
				 * @param {HTMLElement} el
				 * @return {boolean} True, if element is valid.
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_isValidElement: function (el) {
					return el.classList.contains(this.widgetClass);
				},

				/**
				 * This method checks if widget is extended.
				 * @method _isExtended
				 * @return {boolean} True, if element is extended.
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_isExtended: function () {
					return !!this._data("extended");
				},

				/**
				 * This method sets value of "extended" to widget.
				 * @method _extended
				 * @param {boolean} flag Value for extended
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_extended: function (flag) {
					this._data("extended", flag);
					return this;
				},

				/**
				 * This method gets indices prepared from parameter
				 * or index of widget.
				 * @method _getIndex
				 * @param {string} [value] Indices to prepared
				 * @return {Array} Indices
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_setIndex: function (element, value) {
					var options = this.options;
					if (typeof value === "string") {
						value = value.split(options.delimiter);	// delimiter
					}
					options.index = value;
				},

				/**
				 * This method gets offset of element.
				 * @method _getOffset
				 * @param {HTMLElement} el Element
				 * @return {Object} Offset with "top" and "left" properties
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_getOffset: function( el ) {
					var left=0, top=0 ;
					do {
						top += el.offsetTop;
						left += el.offsetLeft;
						el = el.offsetParent;
					} while (el);

					return {
						top: top,
						left: left
					};
				},

				/**
				 * This method returns container of widget.
				 * @method _getContainer
				 * @return {HTMLElement} Container
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_getContainer: function() {
					return this.options.container || this.element.parentNode;
				},

				/**
				 * Returns position of event.
				 * @method _getPositionFromEvent
				 * @return {Object} Position of event with properties "x" and "y"
				 * @protected
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				_getPositionFromEvent: function( ev ) {
					return ev.type.search(/^touch/) !== -1 ?
					{x: ev.touches[0].clientX, y: ev.touches[0].clientY} :
					{x: ev.clientX, y: ev.clientY};
				},

				/**
				 * Adds event listener to element of widget.
				 * @method addEventListener
				 * @param {string} type Name of event
				 * @param {Function} listener Function to be executed
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				addEventListener: function (type, listener) {
					this.element.addEventListener(type, listener);
				},

				/**
				 * Removes event listener from element of widget.
				 * @method removeEventListener
				 * @param {string} type Name of event
				 * @param {Function} listener Function to be removed
				 * @member ns.widget.wearable.IndexScrollbar
				 */
				removeEventListener: function (type, listener) {
					this.element.removeEventListener(type, listener);
				}

			});

			// definition
			ns.widget.wearable.IndexScrollbar = IndexScrollbar;
			engine.defineWidget(
				"IndexScrollbar",
				".ui-indexscrollbar",
				[],
				IndexScrollbar,
				"wearable"
			);
			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
			return IndexScrollbar;
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window.document, ns));
