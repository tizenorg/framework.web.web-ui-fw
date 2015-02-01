/*global module, asyncTest, $, equal, ej, ok, start, stop, MouseEvent, test */
(function (tau) {
	"use strict";
	var events = tau.event;

	module("widget.mobile.FastScroll", {});

	document.addEventListener('DOMContentLoaded', function(){
		asyncTest("Contacts", 21, function(){
			var fastScroll = document.getElementsByClassName('ui-fastscroll'),
				contactsUl = document.getElementById('contacts'),
				contactsDividers = contactsUl.getElementsByClassName('ui-li-divider'),
				fastScrollDividers = fastScroll[0].getElementsByTagName('li'),
				popup = document.getElementsByClassName('ui-fastscroll-popup')[0],
				dividerText,
				i,
				length,
				afterDestroy;

			ok(fastScroll.length > 0,"FastScroll container exists");
			//LI count must be greater by one then contactsDividers.length
			ok(fastScrollDividers.length - 1 === contactsDividers.length, "Dividers number is the same");

			ok(fastScrollDividers[0].innerText === "#", "Check if exists: divider #");

			if (fastScrollDividers.length - 1 === contactsDividers.length && contactsDividers.length > 0) {
				for (i = 1, length = fastScrollDividers.length; i < length; i++) {
					dividerText = fastScrollDividers[i].innerText;
					ok(dividerText === contactsDividers[i - 1].innerText, "Divider " + dividerText + " exists");
					events.trigger(fastScrollDividers[i], "vmouseover");
					ok(popup.style.display === "block", "Popup is visible on mouse over on: divider " + dividerText);

					events.trigger(fastScrollDividers[i], "vmouseout");
					ok(popup.style.display === "none", "Popup is visible on mouse over on divider " + dividerText);

				}
			}

			afterDestroy = function (event) {
				start();
				ok(true, '"destroyed" event was triggered on document');
				equal(event.detail.widget, 'FastScroll', 'destroyed event has detail.widget == "FastScroll"');
				ok(event.detail.parent !== undefined, 'destroyed event sends parent node as detail.parent');
			};

			document.addEventListener('destroyed', afterDestroy, true);
			$(contactsUl).fastscroll('destroy');
		});
	});

}(window.tau));