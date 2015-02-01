(function() {
	var page = document.getElementById("pageTestVirtualList"),
		vlist;

	document.addEventListener("pageshow", function() {
		var elList = document.getElementById("vlist1");
		if (elList) {
			vlist = tau.widget.VirtualGrid(elList);
			vlist.option({
				dataLength: JSON_DATA.length,
				bufferSize: 40
			});

			// Update listitem
			vlist.setListItemUpdater(function (elListItem, newIndex) {
				//TODO: Update listitem here
				var data = JSON_DATA[newIndex];
				elListItem.innerHTML = '<a class="grid-thumbnail ' + (newIndex === 2 ? "ui-selected" : "") + '"> <div class="grid-thumbnail-pic-full"><img class="grid-thumbnail-pic-img" src="' + data.TEAM_LOGO + '"  /></div><div class="grid-thumbnail-contents"><span class="grid-thumbnail-content">' + data.NAME + '</span></div></a>'
				tau.widget.Button(elListItem.firstElementChild);
			});
			// Draw child elements
			vlist.draw();
		}
	});
	document.addEventListener("pagehide", function() {
		// Remove all children in the vlist
		if (vlist) {
			vlist.destroy();
		}
	});
}());
