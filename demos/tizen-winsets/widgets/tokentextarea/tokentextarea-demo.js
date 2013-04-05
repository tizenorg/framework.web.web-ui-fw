( function ( $, window ) {
	$( document ).one( "pagecreate", "#tokentextarea", function () {
		$( "#MBTaddItemTest" ).on( "click", function () {
			$( ":jqmData(role='tokentextarea')" ).tokentextarea( "add", "additem" );
		});

		$( "#MBTremoveItemTest" ).on( "click", function () {
			$( ":jqmData(role='tokentextarea')" ).tokentextarea( "remove", 0 );
		});

		$( "#MBTinputTextTest" ).on( "click", function () {
			$( ":jqmData(role='tokentextarea')" ).tokentextarea( "inputText", "Hello~~~" );
		});

		$( "#MBTgetInputTextTest" ).on( "click", function () {
			var input = $( ":jqmData(role='tokentextarea')" ).tokentextarea( "inputText" );
			window.alert( "input String : " + input );
		});

		$( "#MBTremoveAllItemTest" ).on( "click", function () {
			$( ":jqmData(role='tokentextarea')" ).tokentextarea( "remove" );
			$( ":jqmData(role='tokentextarea')" ).parents( ".ui-scrollview-view" ).parent().scrollview( "scrollTo", 0, 0 );
		});

		$( "#MBTgetSelectedItemTest" ).on( "click", function () {
			var content = $( ":jqmData(role='tokentextarea')" ).tokentextarea( "select" );
			window.alert( "Select content : " + content );
		});

		$( "#MBTselectItemTest" ).on( "click", function () {
			$( ":jqmData(role='tokentextarea')" ).tokentextarea( "select", 0 );
		});

		$( "#MBTlengthTest" ).on( "click", function () {
			var length = $( ":jqmData(role='tokentextarea')" ).tokentextarea( "length" );
			window.alert( "length : " + length );
		});

		$( "#MBTfocusInTest" ).on( "click", function () {
			$( ":jqmData(role='tokentextarea')" ).tokentextarea( "focusIn", 0 );
			$( ":jqmData(role='tokentextarea')" ).parents( ".ui-scrollview-view" ).parent().scrollview( "scrollTo", 0, 0 );
		});

		$( "#MBTfocusOutTest" ).on( "click", function () {
			$( ":jqmData(role='tokentextarea')" ).tokentextarea( "focusOut", 0 );
			$( ":jqmData(role='tokentextarea')" ).parents( ".ui-scrollview-view" ).parent().scrollview( "scrollTo", 0, 0 );
		});

		$( "#MBTdestroyTest" ).on( "click", function () {
			$( ":jqmData(role='tokentextarea')" ).tokentextarea( "destroy" );
		});
	});

	$( document ).one( "pagecreate", "#addressbook", function () {
		var self = this;
		self.itemSelected = false;

		$( "#addressbook" ).on( "mousedown", function () {
			self.itemSelected = false;
		});

		$( "#addressbook" ).on( "mouseup", function () {
			self.itemSelected = true;
		});

		$( "#contentList a" ).on( "click", function () {
			if ( self.itemSelected ) {
				var arg = $( this ).text();
				$( ":jqmData(role='tokentextarea')" ).tokentextarea( "add", arg );
				history.back();
			}
		});
	});
} ( jQuery, window ) );
