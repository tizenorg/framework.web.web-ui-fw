$( document ).bind("pagecreate", function () {
	/* Color widget demo */
	$("input[type='checkbox'][data-widget-type-list]").bind("change", function() {
		var ls = $( this ).attr("data-widget-type-list").split(","),
			page = $( this ).closest(":jqmData(role='page')"),
			disabled = $( this ).is(":checked");

		$.each(ls, function( idx, widgetType ) {
			var ar = widgetType.split("-");

			if ( ar.length === 2 ) {
				page.find(":" + widgetType)[ar[1]]( "option", "disabled", disabled );
			}
		});
	});

	$('#scroller-demo').bind('pageshow', function ( e ) {
		$page = $( e.target );
		/*
		 * many options cannot be set without subclassing since they're
		 * used in the _create method - it seems as if these are for
		 * internal use only and scrollDuration is only changable by
		 * chance.
		 */
		var $scroller2List = $('#scroller2').find('ul');
		$scroller2List.scrollview( 'option','scrollDuration','10000' );

		// only works by manipulating css
		// the only other way is to use attribute 'scroll-method="scroll"' in html
		$('#scroller2 .ui-scrollbar').css( 'visibility','hidden' );

		/*
		 * make toggle button switch scroll bars on and off
		 */
		var scrollBarVisible = $('#scroller2').find('.ui-scrollbar').css('visibility') === "visible";

		var $toggleScrollBars = $('#toggleScrollBars');
		$toggleScrollBars.attr( "checked", scrollBarVisible ).checkboxradio("refresh");

		/* the 'label' is the thing that is clicked, not the input element */
		var $label = $toggleScrollBars.siblings('label').attr( 'for', '#toggleScrollBars' );
		$label.bind("click", function () {
			var $scrollBar = $('#scroller2').find('.ui-scrollbar');
			var scrollBarVisible = $scrollBar.css('visibility') === "visible";
			var newVisibility = scrollBarVisible ? "hidden" : "visible";
			$scrollBar.css( 'visibility', scrollBarVisible ? "hidden" : "visible" );
		});
	});

	$("#demo-date").bind("date-changed", function ( e, newDate ) {
		$("#selected-date1").text( newDate.toString() );
	});

	$("#demo-date2").bind("date-changed", function ( e, newDate ) {
		$("#selected-date2").text( newDate.toString() );
	});

	$("#demo-date3").bind("date-changed", function ( e, newDate ) {
		$("#selected-date3").text( newDate.toString() );
	});

	$("#demo-date4").bind("date-changed", function ( e, newDate ) {
		$("#selected-date4").text( newDate.toString() );
	});

	$('#noti-demo').bind('vmouseup', function ( e ) {
		$('#notification').notification('open');
	});

	$('#noti-icon1').bind('vclick', function ( e ) {
		$('#notification').notification('icon', './test/icon02.png');
	});

	$('#noti-icon2').bind('vclick', function ( e ) {
		$('#notification').notification('icon', './test/icon01.png');
	});

	$('#imageslider-add').bind('vmouseup', function ( e ) {
		$('#imageslider').imageslider('add', './test/10.jpg');
		$('#imageslider').imageslider('add', './test/11.jpg');
		$('#imageslider').imageslider('refresh');
	});

	$('#imageslider-del').bind('vmouseup', function ( e ) {
		$('#imageslider').imageslider('remove');
	});

	$('#selectioninfo-demo').bind('vmouseup', function ( e ) {
		$('#smallpopup_selectioninfo').notification( "text",
			$("#dayselector1").find(".ui-checkbox-on").length + " items are selected" );
		$('#smallpopup_selectioninfo').notification('open');
	});

	$('#groupindex-demo').bind('pageshow', function () {
		$('#groupindex').scrolllistview();
	});

	$("#showVolumeButton").bind("vclick", function ( e ) {
		$("#myVolumeControl").volumecontrol("open");
	});

	$("#volumecontrol_setBasicTone").bind("change", function ( e ) {
		var basicTone = !($("#volumecontrol_setBasicTone").next('label')
				.find(".ui-icon").hasClass("ui-icon-checkbox-on"));

		if ( basicTone ) {
			$("#myVolumeControl").volumecontrol( "option", "basicTone", true );
			$("#myVolumeControl").volumecontrol( "option", "title", "Basic Tone" );
		} else {
			$("#myVolumeControl").volumecontrol( "option", "basicTone", false );
			$("#myVolumeControl").volumecontrol( "option", "title", "Volume" );
		}
	});

	$("#myoptionheader").bind('collapse', function () {
		console.log('option header was collapsed');
	});

	$("#myoptionheader").bind('expand', function () {
		console.log('option header was expanded');
	});

	//day-selector codes...
	$("#day-selector-check-all").live('vclick', function () {
		$("#dayselector1").dayselector('selectAll');
	});

	$("#day-selector-get-days").live('vclick', function () {
		var valuesStr = $("#dayselector1").dayselector('value').join(', ');
		$(".selectedDay").text( valuesStr );
	});

	/* Gen list : Dummy DB load */
	$(".virtuallist_demo_page").live("pagecreate", function () {
		/* ?_=ts code for no cache mechanism */
		$.getScript( "./virtuallist-db-demo.js", function ( data, textStatus ) {
			$("ul").filter( function () {
				return $( this ).data("role") == "virtuallistview";
			}).addClass("vlLoadSuccess");

			$(".virtuallist_demo_page").die();
			$("ul.ui-virtual-list-container").virtuallistview("create");
		});
	});

	/*Expandable list : Dummy DB load*/
	$("#genlist_extendable_page").live("pagecreate", function ( el ) {
		/*?_=ts code for no cache mechanism*/
		$.getScript( "./virtuallist-db-demo.js", function ( data, textStatus ) {
			$("ul").filter( function () {
				return $( this ).data("role") == "extendablelist";
			}).addClass("elLoadSuccess");

			$("#genlist-extendable-page").die();
			$("ul.ui-extendable-list-container").extendablelist("create");
			// TODO: 'create' is called twice!!
		});
	});
});

$(document).ready( function () {
	// add current datetime with browser language format
	// NOTE: Globalize.* functions must be run after docoument ready.
	$('#current_date').html(Globalize.culture().name + " -- " +
				Globalize.format( new Date(), "F" ));
	$('#html_font_size').html('html font size:' + $('html').css('font-size'));
});
