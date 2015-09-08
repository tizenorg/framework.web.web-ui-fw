/*global $, jQuery, JSON_DATA*/
/*jslint unparam: true */
(function ($){
	"use strict";

	$( "div.virtualgrid_grid_demo" ).one( "pagecreate", function () {
		$.getScript( "virtualgrid-db-demo.js", function ( data, textStatus, jqXHR ) {
			$( ":jqmData(role='virtualgrid')" ).virtualgrid( "create", {
				orientation: "x",
				itemData: function ( idx ) {
					return JSON_DATA[ idx ];
				},
				numItemData: JSON_DATA.length,
				cacheItemData: function ( minIdx, maxIdx ) {
					return;
				}
			});
		});
	});
} (jQuery));