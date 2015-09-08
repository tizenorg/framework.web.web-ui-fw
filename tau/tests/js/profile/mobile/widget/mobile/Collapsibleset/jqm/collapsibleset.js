/*
 * mobile collapsible unit tests
 */

// TODO split out into seperate test files
$ ( document ).ready ( function ( ) {

	module( "profile/mobile/widget/mobile/Collapsibleset");

	asyncTest( "The page should be enhanced correctly", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#basic-collapsible-test" );
			},
			function() {
				ok($( "#basic-collapsible-test .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be collapsed");
				$( "#basic-collapsible-test .ui-collapsible-heading-toggle" ).eq(0).click();
				ok(!$( "#basic-collapsible-test .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be expanded after click");
				$( "#basic-collapsible-test .ui-collapsible-heading-toggle" ).eq(0).click();
				ok($( "#basic-collapsible-test .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be collapsed");
				start();
			}
		]);
	});

	asyncTest( "Expand/Collapse", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#basic-collapsible-test" );
			},

			function() {
				var $page = $( "#basic-collapsible-test");
				ok($page.find( ".ui-scrollview-view >:eq(0)" ).hasClass( "ui-collapsible" ), ".ui-collapsible class added to collapsible elements" );
				ok($page.find( ".ui-scrollview-view >:eq(0) >:header" ).hasClass( "ui-collapsible-heading" ), ".ui-collapsible-heading class added to collapsible heading" );
				ok($page.find( ".ui-scrollview-view >:eq(0) > div" ).hasClass( "ui-collapsible-content" ), ".ui-collapsible-content class added to collapsible content" );
				ok($page.find( ".ui-scrollview-view >:eq(0)" ).hasClass( "ui-collapsible-collapsed" ), ".ui-collapsible-collapsed added to collapsed elements" );
				ok(!$page.find( ".ui-scrollview-view >:eq(1)" ).hasClass( "ui-collapsible-collapsed" ), ".ui-collapsible-collapsed not added to expanded elements" );
				ok($page.find( ".ui-collapsible.ui-collapsible-collapsed" ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-top ui-corner-bottom" ), "Collapsible header should have class ui-corner-all" );
				start();
			}
		]);
	});

	module( "profile/mobile/widget/mobile/Collapsibleset");

	asyncTest( "The page should be enhanced correctly", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#basic-collapsible-set-test" );
			},

			function() {
				var $page = $( "#basic-collapsible-set-test" );

				ok($page.find( ".ui-scrollview-view >:eq(0)" ).hasClass( "ui-collapsible-set" ), ".ui-collapsible-set class added to collapsible set" );
				ok($page.find( ".ui-scrollview-view >:eq(0) > div" ).hasClass( "ui-collapsible" ), ".ui-collapsible class added to collapsible elements" );
				$page.find( ".ui-collapsible-set" ).each(function() {
					var $this = $( this );
					ok($this.find( ".ui-collapsible" ).first().find( ".ui-collapsible-heading" ).hasClass( "ui-corner-top" ), "First collapsible header should have class ui-corner-top" );
					ok($this.find( ".ui-collapsible" ).last().find( ".ui-collapsible-heading" ).hasClass( "ui-corner-bottom" ), "Last collapsible header should have class ui-corner-bottom" );
				});

				start();
			}
		]);
	});

	asyncTest( "Collapsible set with only one collapsible", function() {
		$.testHelper.pageSequence([
			function(){
                $.testHelper.openPage( "#collapsible-set-with-lonely-collapsible-test" );
			},

			function() {
				var $page = $( "#collapsible-set-with-lonely-collapsible-test" );
				$page.find( ".ui-collapsible-set" ).each(function() {
					var $this = $( this );
					ok($this.find( ".ui-collapsible" ).first().find( ".ui-collapsible-heading" ).hasClass( "ui-corner-top" ), "First collapsible header should have class ui-corner-top" );
					ok($this.find( ".ui-collapsible" ).last().find( ".ui-collapsible-heading" ).hasClass( "ui-corner-bottom" ), "Last collapsible header should have class ui-corner-bottom" );
				});

				start();
			}
		]);
	});

	asyncTest( "Section expanded by default", function(){
		$.testHelper.pageSequence([
			function(){
                $.testHelper.openPage( "#basic-collapsible-set-test");
			},

			function() {
				equal($( "#basic-collapsible-set-test .ui-scrollview-view >:eq(0) .ui-collapsible-collapsed" ).length, 2, "There should be 2 section collapsed" );
				ok(!$( "#basic-collapsible-set-test .ui-scrollview-view >:eq(0) >:eq(1)" ).hasClass( "ui-collapsible-collapsed" ), "Section B should be expanded" );
				start();
			}
		]);
	});

	asyncTest( "Collapsible Set with dynamic content", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-set-with-dynamic-content");
			},

			function() {
				var set = $( ".ui-scrollview-view" ).find( ".ui-collapsible-set"),
					i;
				for (i = 0; i < 3; i++ ) {
					$( '<div data-'+ $.mobile.ns +'role="collapsible"><h3>Collapsible Item ' + i + '</h3></div>' ).appendTo( set );
				}
				set.collapsibleset( "refresh" );
				equal( set.find( ".ui-collapsible" ).length, 3, "The 3 collapsibles should be enhanced" );
				ok( set.find( ".ui-collapsible" ).eq( 0 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-top" ), "The 1st collapsible should have top corners" );
				ok( !set.find( ".ui-collapsible" ).eq( 0 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-bottom" ), "The 1st collapsible should NOT have bottom corners" );
				ok( !set.find( ".ui-collapsible" ).eq( 1 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-top" ), "The 2nd collapsible should NOT have top corners" );
				ok( !set.find( ".ui-collapsible" ).eq( 1 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-bottom" ), "The 2nd collapsible should NOT have bottom corners" );
				ok( set.find( ".ui-collapsible" ).eq( 2 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-bottom" ), "The 3rd collapsible should have bottom corners" );
				ok( !set.find( ".ui-collapsible" ).eq( 2 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-top" ), "The 3rd collapsible should NOT have top corners" );
				start();
			}
		]);
	});

	asyncTest( "Expand/Collapse", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#basic-collapsible-set-test" );
			},

			function() {
				ok($( "#basic-collapsible-set-test .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be collapsed");
				$( "#basic-collapsible-set-test .ui-collapsible-heading-toggle" ).eq(0).click();
				ok(!$( "#basic-collapsible-set-test .ui-collapsible" ).eq(0).hasClass( "ui-collapsible-collapsed" ), "First collapsible should be expanded after click");
				$( "#basic-collapsible-set-test .ui-collapsible-heading-toggle" ).eq(0).click();
				ok($( "#basic-collapsible-set-test .ui-collapsible" ).hasClass( "ui-collapsible-collapsed" ), "All collapsible should be collapsed");
				start();
			}
		]);
	});

	asyncTest( "Collapsible Set with static and dynamic content", function(){
		$.testHelper.pageSequence([
			function(){
   				$.testHelper.openPage( "#collapsible-set-with-static-and-dynamic-content" );
   			},

   			function() {
   				var set = $( "#collapsible-set-with-static-and-dynamic-content" ).find( ".ui-collapsible-set"),
					i;
   				for (i = 0; i < 2; i++ ) {
   					$( '<div data-'+ $.mobile.ns +'role="collapsible"><h3>Collapsible Item ' + i + '</h3></div>' ).appendTo( set );
   				}
   				set.collapsibleset( "refresh" );
   				equal( set.find( ".ui-collapsible" ).length, 3, "The 3 collapsibles should be enhanced" );
   				ok( set.find( ".ui-collapsible" ).eq( 0 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-top" ), "The 1st collapsible should have top corners" );
   				ok( !set.find( ".ui-collapsible" ).eq( 0 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-bottom" ), "The 1st collapsible should NOT have bottom corners" );
   				ok( !set.find( ".ui-collapsible" ).eq( 1 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-top" ), "The 2nd collapsible should NOT have top corners" );
   				ok( !set.find( ".ui-collapsible" ).eq( 1 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-bottom" ), "The 2nd collapsible should NOT have bottom corners" );
   				ok( set.find( ".ui-collapsible" ).eq( 2 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-bottom" ), "The 3rd collapsible should have bottom corners" );
   				ok( !set.find( ".ui-collapsible" ).eq( 2 ).find( ".ui-collapsible-heading" ).hasClass( "ui-corner-top" ), "The 3rd collapsible should NOT have top corners" );
   				start();
   			}
   		]);
   	});

	asyncTest( "Collapsible set with last collapsible expanded", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-set-with-last-collapsible-expanded");
			},

			function() {
				var collapsibles = $("#collapsible-set-with-last-collapsible-expanded").find( ".ui-collapsible" );
				ok( collapsibles.last().find( ".ui-collapsible-content" ).hasClass( "ui-corner-bottom" ), "Content of last collapsible should have class ui-corner-bottom");
				start();
			}
		]);
	});

	asyncTest( "Collapsible Set with legends", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-set-with-legends" );
			},

			function() {
				var collapsibles = $("#collapsible-set-with-legends").find( ".ui-collapsible-heading" );
				ok( !collapsibles.eq(0).find( ".ui-btn" ).is( ".ui-corner-bottom" ), "First collapsible should NOT have class ui-corner-bottom");
				ok( !collapsibles.eq(1).find( ".ui-btn" ).is( ".ui-corner-bottom,.ui-corner-top" ), "Middle collapsible should NOT have class ui-corner-top or ui-corner-bottom");
				ok( !collapsibles.eq(2).find( ".ui-btn" ).is( ".ui-corner-top" ), "Last collapsible should NOT have class ui-corner-top");
				start();
			}
		]);
	});
	
	module( "profile/mobile/widget/mobile/Collapsibleset");

	asyncTest( "Collapsible with custom icons", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-with-custom-icons" );
			},

			function() {
				var collapsibles = $("#collapsible-with-custom-icons").find( ".ui-collapsible" );
				//Changed due to 'ui-icon-arrow-u' - default value in ej
				ok( collapsibles.eq(0).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-arrow-u" ), "Heading of first collapsible should have class ui-icon-arrow-u");
				//Changed due to 'ui-icon-arrow-d' - default value in ej
				ok( collapsibles.eq(1).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-arrow-d" ), "Heading of second collapsible should have class ui-icon-arrow-d");
				ok( collapsibles.eq(2).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-arrow-r" ), "Heading of third collapsible should have class ui-icon-arrow-r");
				ok( collapsibles.eq(3).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-arrow-d" ), "Heading of fourth collapsible should have class ui-icon-arrow-d");

				// issue #4801: BEGIN
				ok( collapsibles.eq(4).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-info" ), "Heading of fifth collapsible should have class ui-icon-info");
				collapsibles.eq( 4 ).trigger( "expand" );
				ok( collapsibles.eq(4).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-info" ), "Heading of fifth collapsible should STILL have class ui-icon-info after click");
				// issue #4801: END
				start();
			}
		]);
	});

	asyncTest( "Collapsible sets with custom icons", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-set-with-custom-icons" );
			},

			function() {
				var collapsibles = $("#collapsible-set-with-custom-icons").find( ".ui-collapsible" );
                ok( collapsibles.eq(0).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-arrow-u" ), "Heading of first collapsible should have class ui-icon-arrow-u");
				ok( collapsibles.eq(1).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-arrow-d" ), "Heading of second collapsible should have class ui-icon-arrow-d");
				ok( collapsibles.eq(2).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-arrow-r" ), "Heading of third collapsible should have class ui-icon-arrow-r");
				ok( collapsibles.eq(3).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-arrow-d" ), "Heading of fourth collapsible should have class ui-icon-arrow-d");
				ok( collapsibles.eq(4).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-arrow-l" ), "Heading of fifth collapsible should have class ui-icon-arrow-l");
				ok( collapsibles.eq(5).find( ".ui-collapsible-heading-toggle" ).hasClass( "ui-icon-arrow-u" ), "Heading of sixth collapsible should have class ui-icon-arrow-u");
				start();
			}
		]);
	});

	module( "profile/mobile/widget/mobile/Collapsibleset");

	asyncTest( "Collapsible", 2, function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-with-theming" );
			},

			function() {
				var collapsibles = $("#collapsible-with-theming").find( ".ui-collapsible" );
				ok( collapsibles.eq(1).find( ".ui-collapsible-content" ).hasClass( "ui-body-b" ), "Content of second collapsible should have class ui-btn-up-b");
				ok( collapsibles.eq(2).find( ".ui-collapsible-content" ).hasClass( "ui-body-c" ), "Content of third collapsible should have class ui-btn-up-c");
				start();
			}
		]);
	});

	asyncTest( "Collapsible Set", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage( "#collapsible-set-with-theming" );
			},

			function() {
                var collapsibles = $("#collapsible-set-with-theming").find( ".ui-collapsible" );
				ok( !collapsibles.eq(0).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of first collapsible should NOT have class ui-body-up-[a,b,c]");
				ok( collapsibles.eq(0).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of first collapsible should NOT have class ui-btn-up-d");
				ok( !collapsibles.eq(1).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-c,.ui-body-d" ), "Content of second collapsible should NOT have class ui-btn-up-[a,c,d]");
				ok( collapsibles.eq(1).find( ".ui-collapsible-content" ).hasClass( "ui-body-b" ), "Content of second collapsible should have class ui-btn-up-b");
				ok( !collapsibles.eq(2).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of third collapsible should NOT have class ui-btn-up-[a,b,c]");
				ok( collapsibles.eq(2).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of third collapsible should have class ui-btn-up-d");
				ok( !collapsibles.eq(2).find( ".ui-collapsible-content" ).hasClass( "ui-collapsible-content-collapsed" ), "Content of third collapsible should NOT have class ui-collapsible-content-collapsed");
				ok( !collapsibles.eq(3).find( ".ui-collapsible-content" ).is( ".ui-body-a,.ui-body-b,.ui-body-c" ), "Content of fourth collapsible should NOT have class ui-btn-up-[a,b,c]");
				ok( collapsibles.eq(3).find( ".ui-collapsible-content" ).hasClass( "ui-body-d" ), "Content of fourth collapsible should have class ui-btn-up-d");
				start();
			}
		]);
	});
	
});
