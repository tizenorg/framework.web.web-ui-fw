/*
 * mobile init tests
 */
$().ready(function(){

		
		test( "page element is generated when not present in initial markup", function(){
			ok( $( ".ui-page" ).length, 1 );
		});


});
