(function( $, undefined ) {

	$.widget( "mobile.barlayout", $.mobile.widget, {
		options: {
			addBackBtn: false ,
			backBtnText: "Back",

			initSelector: ":jqmData(role='header'), :jqmData(role='footer')"
			},
		_create: function() {
			var self = this;

			/* this call api will be moved to jquery.mobile.page.section.js patch */
			/* call _generateFooter in header(just 1 time in first step) because to calculate another layout width footer/header */
			/* skip below step to attach bind/addclass only 1 time */
			self._generateFooter();
			self._addBackbutton();
			self._disableSelection();
			self._disableContext();
		},

		/* Make dummy footer
		*  because minimum fixed bar needs to attach back button
		*  check footer exist on current page, then check footer-Exist option check */
		_generateFooter: function(){
			var self = this,
				$el = self.element,
				$elPage = $el.closest( ".ui-page" ),
				dummyFooter;

				if ( $elPage.children(":jqmData(role='footer')").length == 0 && $elPage.data().page.options.footerExist != false ) {
					dummyFooter = $( "<div data-role='footer' class='ui-footer ui-bar-s ui-footer-fixed fade ui-fixed-overlay' data-position='fixed'></div>" )
						.insertAfter( $elPage.find( ".ui-content" ) );
			}
		},

		_addBackbutton: function( target, status ) {
			// need to add parameter target wherels this requert occurs header/footer
			var self = this,
				$el = self.element,
				$elHeader = $( this.element ).jqmData( "role" )=="header" ? self.element : $el.siblings( ":jqmData(role='header')" ),
				$elFooter = $( this.element ).jqmData( "role" )=="footer" ? self.element : $el.siblings( ":jqmData(role='footer')" ),
				$elPage = $el.closest( ".ui-page" ),
				backBtn,
				attachElement = $elFooter,
				o = $elPage.data( "page" ).options;

				/* Back button skip case :
				* 1. tabbar
				* 2. footer does not exit
				* 3. user define data-add-Back-Btn = "false"
				*/
				if ( status != "external" ) {
					if ( $elFooter.children( ":jqmData(role='controlbar')" ).jqmData( "style" ) == "tabbar" || $elPage.data().page.options.footerExist == false || $elPage.data().page.options.addBackBtn == "none"  ) {
						return true;
					}
				}

				$elPage.data().page.options.addBackBtn == "header"?	attachElement = $elHeader : attachElement = $elFooter;

				backBtn = $( "<a href='#' class='ui-btn-back' data-"+ $.mobile.ns +"rel='back'></a>" )
						.buttonMarkup( {icon: "header-back-btn", theme : "s"} );

				if ( status == "external" ) {
					if ( $el.is(".ui-page") ) {
						$elHeader = $el.find( ":jqmData(role='header')" );
						$elFooter = $el.find( ":jqmData(role='footer')" );
						target == "header" ? attachElement = $elHeader : attachElement = $elFooter;
					} else {
						attachElement = $el;
					}
					if ( attachElement.find(".ui-btn-back").length == 0 ) {
						backBtn.prependTo( attachElement );
					}
				}

				if ( $elPage.jqmData( "url" ) !== $.mobile.path.stripHash( location.hash ) ) {
					if ( attachElement.find(".ui-btn-back").length == 0) {
						backBtn.prependTo( attachElement );
					}
				}

/* jQM 1.1.0 do not need this code
* navigation.js control whote back button  */
/*				backBtn.bind( "vclick", function( event ) {
					window.history.back();
				});*/
		},

		_disableSelection : function() {
			var self = this,
                                $el = self.element,
                                $elHeader = $( this.element ).jqmData( "role" )=="header" ? self.element : $el.siblings( ":jqmData(role='header')" ),
				$elFooter = $( this.element ).jqmData( "role" )=="footer" ? self.element : $el.siblings( ":jqmData(role='footer')" );

			$.mobile.tizen.disableSelection( $elHeader );
			$.mobile.tizen.disableSelection( $elFooter );
		},

		_disableContext : function() {
			var self = this,
				$el = self.element,
				$elHeader = $( this.element ).jqmData( "role" )=="header" ? self.element : $el.siblings( ":jqmData(role='header')" ),
				$elFooter = $( this.element ).jqmData( "role" )=="footer" ? self.element : $el.siblings( ":jqmData(role='footer')" );

			$.mobile.tizen.disableContextMenu( $elHeader );
			$.mobile.tizen.disableContextMenu( $elFooter );
		},

		addBackBtn : function(target) {
			this._addBackbutton( target, "external" );
		},


		show: function(){
			var self = $( this.element );
			self.show();
			self.siblings( ".ui-content" ).pagelayout( "updatePageLayout" );
		},

		hide: function(){
			var self = $( this.element );
			self.hide();
			self.siblings( ".ui-content" ).pagelayout( "updatePageLayout" );
		},

	});
	$( document ).bind("pagecreate", function( e ){
		$.mobile.barlayout.prototype.enhanceWithin( e.target );
	});
})( jQuery );
