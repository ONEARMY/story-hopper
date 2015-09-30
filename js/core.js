$( document ).ready( function() {

	$( '.toggle-nav' ).click( function(e) {

		if( $( this ).parent().attr( 'id' ) == 'movie' ) {
			$( '#movie' ).fadeToggle();
		} else {
			$( '#menu' ).fadeToggle();
			$( this ).toggleClass( 'on' );
		}

	});

	$( '#movies a[href*="you"]' ).click( function(e) {

		var id = $( this ).attr( 'href' ).split( 'v=' )[1],
			href = 'https://www.youtube.com/embed/' + id,
			title = $( this ).find( 'span' ).html();

		$( '#movie iframe' ).attr( 'src', href );
		$( '#movie h1' ).html( title );

		$( '#movie' ).fadeIn( 300 );

		e.preventDefault();

	});

	$( '#about, #movie' ).fitVids();

});