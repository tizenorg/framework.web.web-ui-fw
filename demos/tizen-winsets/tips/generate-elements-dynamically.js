var myArray = [];
function addCheckbox(){
	var newhtml,
		i = myArray.length;

	myArray[myArray.length] = 'Item - ' + myArray.length;
		newhtml = '<input type="checkbox" name="checkbox-'+i+'a" id="checkbox-'+i+'a" class="custom" />' ;
		newhtml += '<label for="checkbox-'+i+'a">'+myArray[i]+'</label>';
	$( "#checkboxItems" ).append( newhtml );
	$( "#checkboxItems" ).trigger( "create" );
}


$( '#bAdd' ).live( 'vclick', function () {
	addCheckbox();
} );

$( "#ButtonAdd" ).live( "vclick", function() {
	/* Append new button */
	var buttonTemplate = "<div data-role='button' data-inline='true' " +
							"data-icon='call' data-style='circle' " +
							"data-theme='s' class='newbutton'></div>";
	$( buttonTemplate ).buttonMarkup().appendTo( "#buttonItems" );

	/* Same works */
	/*$("#buttonItems").trigger("create");*/
} );

$( "#ListAdd" ).live( "vclick", function() {
	var listTemplate = "<li>Appended New Item</li>";
	$( listTemplate ).appendTo( "#listview" );
	$( "#listview" ).listview( "refresh");
} );
