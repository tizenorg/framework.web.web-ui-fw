/*global window, define, $, ej, ok, equal, test, JSON_DATA */
/*jslint nomen: true, browser: true*/
/*
 * Unit Test: VirtualListview
 *
 * Michał Szepielak <m.szepielak@samsung.com>
 *
 * Testing only verticall list.
 */


'use strict';
var unit_virtuallistview = function (element, templateName) {
	function checkWidgetStructure(widget, element, templateName) {
		var listviewClasses = ej.widget.mobile.Listview.classes,
			tmpElement = null,
			testPass,
			i;

		//Check UL CSS classes
		ok(element.classList.contains(listviewClasses.uiListview), "[HTML] UL was created with Listview class");
		ok(element.classList.contains('ui-virtual-list-container'), "[HTML] UL was created with VirtualListview class");

		//Check children
		equal(widget.options.row, 100, '[HTML] Option.row set is correct');

		//Binding data with widget
		//NOTE: JSON_DATA it's global variable declared in file with demo database
		widget.create({
			itemData: function (idx) {
				return JSON_DATA[idx];
			},
			numItemData: JSON_DATA.length
		});

		equal(element.childElementCount, 100, '[HTML] Number of children in result set is correct');

		//Check LI structure with Template
		testPass = true;
		i = 100;
		tmpElement = widget.element.firstElementChild;
		do {
			if (templateName === 'tmp-2line-star1') {
				testPass = tmpElement.classList.contains('ui-li-has-multiline') ? testPass : false;
				testPass = tmpElement.classList.contains('test') ? testPass : false;
				testPass = tmpElement.firstElementChild.classList.contains('ui-li-text-main') ? testPass : false;

				testPass = tmpElement.firstElementChild.nextElementSibling.classList.contains('ui-li-text-sub') ? testPass : false;
				testPass = tmpElement.firstElementChild.nextElementSibling.firstElementChild.classList.contains('ui-li-icon-sub') ? testPass : false;

				testPass = tmpElement.firstElementChild.nextElementSibling.nextElementSibling.classList.contains('ui-li-text-sub2') ? testPass : false;
			}
			tmpElement = tmpElement.nextElementSibling;
			i -= 1;
		} while (i > 0 && testPass);
		ok(testPass, '[HTML] All LI was created with template structure');

		//Check LI CSS classes
		testPass = true;
		i = 100;
		tmpElement = widget.element.firstElementChild;
		do {
			testPass = tmpElement.classList.contains(listviewClasses.uiLi) ? testPass : false;
			testPass = tmpElement.classList.contains(listviewClasses.uiLiStatic) ? testPass : false;
			i -= 1;
			tmpElement = tmpElement.nextElementSibling;
		} while (i > 0 && testPass);
		ok(testPass, '[HTML] All LI was created with Listview classes');

		return true;
	}

	var virtuallistview,
		resultsetHeight,
		itemSize,
		jump,
		spanText,
		scrollViewStyle;

	/* Create */
	virtuallistview = ej.engine.getBinding(element);
	ok(virtuallistview.name === 'VirtualListview', "Create VirtualListview object");

	scrollViewStyle = virtuallistview._ui.scrollview.element.style;

	/* Check widget structure */
	checkWidgetStructure(virtuallistview, element, templateName);

	//Prepare scroll Clip
	//NOTE: this is obligatory to compute scroll height in qUnit
	scrollViewStyle.position = "relative";
	scrollViewStyle.height = "1000px";

	/**
	 * qUnit scroll event workaround
	 * NOTE: qUnit cleans objects, that classic event does not receive scroll coords.
	 * You should manually trigger event in qUnit test.
	 *
	 *  virtuallistview.ui.scrollview.scrollTo(0, 400, 0);
	 *  ej.event.trigger(virtuallistview.ui.scrollview.element, 'scrollstart');
	 */

		//clipHeight = virtuallistview.ui.scrollview.element.clientHeight;
	itemSize = virtuallistview._ui.itemSize;
	resultsetHeight = itemSize * 100;

	/*
	 * Scrolling DOWN less then 1/3 of resultset height

	jump = Math.floor(resultsetHeight / 3) - 10;
	virtuallistview.ui.scrollview.scrollTo(0, jump, 0);
	ej.event.trigger(virtuallistview.ui.scrollview.element, 'scrollstart');
	spanText = virtuallistview.element.firstChild.firstElementChild.innerText;
	equal(virtuallistview._currentIndex, 0, '[Event] Data index after jump < 1/3 is correct');
	equal(spanText, 'Abdelnaby, Alaa', '[DB] Data value at index 0 is correct');


	 * Scrolling DOWN more then 2/3 of scroll height

	jump = Math.round(resultsetHeight / 3 * 2) * 2 + 10;
	virtuallistview.ui.scrollview.scrollTo(0, jump, 0);
	ej.event.trigger(virtuallistview.ui.scrollview.element, 'scrollstart');
	spanText = virtuallistview.element.firstChild.firstElementChild.innerText;
	equal(virtuallistview._currentIndex, 66, '[Event] Data index after 2/3 scroll from top is correct');
	equal(spanText, 'Ball, Cedric', '[DB] Data value at index 66 is correct');



	 * Scrolling DOWN more then 4/3 of scroll height

	jump = Math.round(resultsetHeight + resultsetHeight / 3 * 2);
	virtuallistview.ui.scrollview.scrollTo(0, jump, 0);
	ej.event.trigger(virtuallistview.ui.scrollview.element, 'scrollstart');
	spanText = virtuallistview.element.firstChild.firstElementChild.innerText;
	equal(virtuallistview._currentIndex, 116, '[Event] Data index after 4/3 scroll from top is correct');
	equal(spanText, 'Cambridge, Dexter', '[DB] Data value at index 116 is correct');




	 * Scrolling TOP to top

	jump = 300;
	virtuallistview.ui.scrollview.scrollTo(0, jump, 0);
	ej.event.trigger(virtuallistview.ui.scrollview.element, 'scrollstart');

	virtuallistview.ui.scrollview.scrollTo(0, 0, 0);
	ej.event.trigger(virtuallistview.ui.scrollview.element, 'scrollupdate');
	spanText = virtuallistview.element.firstChild.firstElementChild.innerText;
	equal(virtuallistview._currentIndex, 0, '[Event] Data index after TOP scroll from top is correct');
	equal(spanText, 'Abdelnaby, Alaa', '[DB] Data value at index 0 is correct');
	*/
};

/**
 * Tests
 */
var elements = [document.getElementById("vlist")];

test("Template 2line Star1 ", function () {
	unit_virtuallistview(elements[0], 'tmp-2line-star1');
});