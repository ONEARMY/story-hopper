$( document ).ready( function() {

	$( '#intro footer a' ).click( function(e) {

		var href = $( this ).attr( 'href' );

		$( 'html, body' ).animate({
			scrollTop: $( href ).offset().top
		}, 'slow');

		e.preventDefault();

	});

	$( '.toggle-nav' ).click( function(e) {

		$( 'body' ).toggleClass( 'hide-overflow' );

		if( $( this ).parent().attr( 'id' ) == 'movie' ) {

			var video = $( '#movie' );

			video.fadeToggle( 300, function() {
				video.find( 'iframe' ).attr( 'src', null );
			});

		} else {
			$( '#menu' ).fadeToggle();
			$( this ).toggleClass( 'on' );
		}

	});

	$( '#movies a[href*="you"]' ).click( function(e) {

		var id = $( this ).attr( 'href' ).split( 'v=' )[1],
			href = 'https://www.youtube.com/embed/' + id,
			title = $( this ).find( 'span' ).html();

		$( 'body' ).toggleClass( 'hide-overflow' );

		$( '#movie iframe' ).attr( 'src', href );
		$( '#movie h1' ).html( title );

		$( '#movie' ).fadeIn( 300 );

		e.preventDefault();

	});

	$( '#about, #movie' ).fitVids();

});