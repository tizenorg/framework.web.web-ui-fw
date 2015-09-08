/*global define, ns, document, window */
/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd
 *
 * Licensed under the Flora License, Version 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://floralicense.org/license/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*jslint nomen: true, plusplus: true */
/**
 * #IndexBar widget
 * Widget creates bar with index.
 * @author Maciej Urbanski <m.urbanski@samsung.com>
 * @author Jadwiga Sosnowska <j.sosnowska@samsung.com>
 * @class ns.widget.wearable.indexscrollbar.IndexBar
 */
(function (document, ns) {
	"use strict";
	//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
	define(
		[
			"../indexscrollbar",
			"../../../util/object",
			"../../../util/DOM/css"
		],
		function () {
			//>>excludeEnd("tauBuildExclude");
			var utilsObject = ns.util.object,
				utilsDOM = ns.util.DOM;

			function IndexBar(element, options) {
				this.element = element;
				this.options = utilsObject.merge(options, this._options, false);
				this.container = this.options.container;

				this.indices = {
					original: this.options.index,
					merged: []
				};

				this._init();

				return this;
			}
			IndexBar.prototype = {
				_options: {
					container: null,
					offsetLeft: 0,
					index: [],
					verticalCenter: false,
					moreChar: "*",
					indexHeight: 41,
					selectedClass: "ui-state-selected",
					ulClass: null,
					maxIndexLen : 0
				},
				_init: function() {
					this.indices.original = this.options.index;
					this.indexLookupTable = [];
					this.indexElements = null;
					this.selectedIndex = -1;
					this.visiblity = "hidden";

					this._setMaxIndexLen();
					this._makeMergedIndices();
					this._drawDOM();
					this._appendToContainer();
					if(this.options.verticalCenter) {
						this._adjustVerticalCenter();
					}
					this._setIndexCellInfo();
				},

				_clear: function() {
					while(this.element.firstChild) {
						this.element.removeChild(this.element.firstChild);
					}

					this.indices.merged.length = 0;
					this.indexLookupTable.length = 0;
					this.indexElements = null;
					this.selectedIndex = -1;
					this.visiblity = null;
				},

				/**
				 * Refreshes widget.
				 * @method refresh
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				refresh: function() {
					this._clear();
					this._init();
				},

				/**
				 * Destroys widget.
				 * @method destroy
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				destroy: function() {
					this._clear();
				},

				/**
				 * Shows widget.
				 * @method show
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				show: function() {
					this.visibility = "visible";
					this.element.style.visibility = this.visibility;
				},

				/**
				 * Hides widget.
				 * @method hide
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				hide: function() {
					this.visibility = "hidden";
					this.element.style.visibility = this.visibility;
				},

				/**
				 * Get if the visibility status is shown or not
				 * @method isShown
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				isShown: function() {
					return "visible" === this.visibility;
				},

				_setMaxIndexLen: function() {
					var maxIndexLen,
						containerHeight = this.container.offsetHeight;
					maxIndexLen = Math.floor( containerHeight / this.options.indexHeight );
					if(maxIndexLen > 0 && maxIndexLen%2 === 0) {
						maxIndexLen -= 1;	// Ensure odd number
					}
					this.options.maxIndexLen = this.options.maxIndexLen > 0 ? Math.min(maxIndexLen, this.options.maxIndexLen) : maxIndexLen;
				},

				_makeMergedIndices: function() {
					var origIndices = this.indices.original,
						origIndexLen = origIndices.length,
						visibleIndexLen = Math.min(this.options.maxIndexLen, origIndexLen),
						totalLeft = origIndexLen - visibleIndexLen,
						nIndexPerItem = parseInt(totalLeft / parseInt(visibleIndexLen/2, 10), 10),
						leftItems = totalLeft % parseInt(visibleIndexLen/2, 10),
						indexItemSize = [],
						mergedIndices = [],
						i, len, position=0;

					for(i = 0, len = visibleIndexLen; i < len; i++) {
						indexItemSize[i] = 1;
						if (i % 2) {	// even number: omitter
							indexItemSize[i] += nIndexPerItem + (leftItems-- > 0 ? 1 : 0);
						}
						position +=  indexItemSize[i];
						mergedIndices.push( {
							start: position-1,
							length: indexItemSize[i]
						});
					}
					this.indices.merged = mergedIndices;
				},

				_drawDOM: function() {
					var origIndices = this.indices.original,
						indices = this.indices.merged,
						indexLen = indices.length,
					//container = this.container,
					//containerHeight = container.offsetHeight,
						indexHeight = this.options.indexHeight,
					//maxIndexLen = Math.min(this.maxIndexLen, indices.length),
						moreChar = this.options.moreChar,
						addMoreCharLineHeight = 9,
						text,
						frag,
						li,
						i,
						m;

					frag = document.createDocumentFragment();
					for(i=0; i < indexLen; i++) {
						m = indices[i];
						text = m.length === 1 ? origIndices[m.start] : moreChar;
						li = document.createElement("li");
						li.innerText = text.toUpperCase();
						li.style.height = indexHeight + "px";
						li.style.lineHeight = text === moreChar ? indexHeight + addMoreCharLineHeight + "px" : indexHeight + "px";
						frag.appendChild(li);
					}
					this.element.appendChild(frag);

					if(this.options.ulClass) {
						this.element.classList.add( this.options.ulClass );
					}
				},

				_adjustVerticalCenter: function() {
					var nItem = this.indices.merged.length,
						totalIndexLen = nItem * this.options.indexHeight,
						vPadding = parseInt((this.container.offsetHeight - totalIndexLen) / 2, 10);
					this.element.style.paddingTop = vPadding + "px";
				},

				_appendToContainer: function() {
					this.container.appendChild(this.element);
					this.element.style.left = this.options.offsetLeft + "px";
				},

				/**
				 * Sets padding top for element.
				 * @method setPaddingTop
				 * @param {number} paddingTop
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				setPaddingTop: function(paddingTop) {
					var height = this.element.clientHeight,
						oldPaddingTop = this.element.style.paddingTop,
						containerHeight = this.container.clientHeight;

					if(oldPaddingTop === "") {
						oldPaddingTop = 0;
					} else {
						oldPaddingTop = parseInt(oldPaddingTop, 10);
					}

					height = height - oldPaddingTop;

					if(height > containerHeight) {
						paddingTop -= (paddingTop + height - containerHeight);
					}
					this.element.style.paddingTop = paddingTop + "px";

					this._setIndexCellInfo();	// update index cell info
				},

				/**
				 * Returns element's offsetTop of given index.
				 * @method getOffsetTopByIndex
				 * @param {number} index
				 * @return {number}
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				getOffsetTopByIndex: function(index) {
					var cellIndex = this.indexLookupTable[index].cellIndex,
						el = this.indexElements[cellIndex],
						offsetTop = el.offsetTop;

					return offsetTop;
				},

				_setIndexCellInfo: function() {
					var element = this.element,
						mergedIndices = this.indices.merged,
						containerOffsetTop = utilsDOM.getElementOffset(this.container).top,
						listitems = this.element.querySelectorAll("LI"),
						lookupTable = [];

					[].forEach.call(listitems, function(node, idx) {
						var m = mergedIndices[idx],
							i = m.start,
							len = i + m.length,
							top = containerOffsetTop + node.offsetTop,
							height = node.offsetHeight / m.length;

						for ( ; i < len; i++ ) {
							lookupTable.push({
								cellIndex: idx,
								top: top,
								range: height
							});
							top += height;
						}
					});
					this.indexLookupTable = lookupTable;
					this.indexElements = element.children;
				},

				/**
				 * Returns index for given position.
				 * @method getIndexByPosition
				 * @param {number} posY
				 * @return {number}
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				getIndexByPosition: function(posY) {
					var table = this.indexLookupTable,
						info,
						i, len, range;

					// boundary check
					if( table[0] ) {
						info = table[0];
						if(posY < info.top) {
							return 0;
						}
					}
					if( table[table.length -1] ) {
						info = table[table.length -1];
						if(posY >= info.top + info.range) {
							return table.length - 1;
						}
					}
					for ( i=0, len=table.length; i < len; i++) {
						info = table[i];
						range = posY - info.top;
						if ( range >= 0 && range < info.range ) {
							return i;
						}
					}
					return 0;
				},

				/**
				 * Returns value for given index.
				 * @method getValueByIndex
				 * @param {number} idx
				 * @return {number}
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				getValueByIndex: function(idx) {
					if(idx < 0) { idx = 0; }
					return this.indices.original[idx];
				},

				/**
				 * Select given index
				 * @method select
				 * @param {number} idx
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				select: function(idx) {
					var cellIndex,
						eCell;

					this.clearSelected();

					if(this.selectedIndex === idx) {
						return;
					}
					this.selectedIndex = idx;

					cellIndex = this.indexLookupTable[idx].cellIndex;
					eCell = this.indexElements[cellIndex];
					eCell.classList.add(this.options.selectedClass);
				},

				/**
				 * Clears selected class.
				 * @method clearSelected
				 * @member ns.widget.wearable.indexscrollbar.IndexBar
				 */
				clearSelected: function() {
					var el = this.element,
						selectedClass = this.options.selectedClass,
						selectedElement = el.querySelectorAll("."+selectedClass);

					[].forEach.call(selectedElement, function(node) {
						node.classList.remove(selectedClass);
					});
					this.selectedIndex = -1;
				}
			};

			ns.widget.core.indexscrollbar.IndexBar = IndexBar;

			//>>excludeStart("tauBuildExclude", pragmas.tauBuildExclude);
		}
	);
	//>>excludeEnd("tauBuildExclude");
}(window.document, ns));
