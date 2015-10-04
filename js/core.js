$( document ).ready( function() {

	$( '#movie .rating i' ).click( function() {

		var index = $( this ).index(),
			slug = document.URL.split( '/' )[4];

		$( this ).closest( '.rating' ).find( 'i' ).each( function() {

			if( $( this ).index() <= index ) {
				$( this ).addClass( 'full' );
			} else {
				$( this ).removeClass( 'full' );
			}

		});

		var data = {
			count: index + 1,
			synced: false
		};

		document.cookie = slug + '=' + window.btoa( JSON.stringify( data ) ) + '; ' + 'path=/';

	});

	if( jQuery().isotope ) {

		var grid = $( '#movies .inner:last-child' ).isotope({
			itemSelector: '.item'
		});

	}

	$( '#movies nav a' ).click( function(e) {

		var group = $( this ).attr( 'href' ).split( '#' )[1],
			isActive = $( this ).hasClass( 'active' );

		grid.isotope({
			filter: isActive ? '*' : '.' + group
		});

		if( !isActive ) {
			$( this ).closest( 'nav' ).find( '.active' ).removeClass( 'active' );
		}

		$( this ).toggleClass( 'active' );
		e.preventDefault();

	});

	$( '#intro footer a' ).click( function(e) {

		var href = $( this ).attr( 'href' );

		$( 'html, body' ).animate({
			scrollTop: $( href ).offset().top
		}, 'slow');

		e.preventDefault();

	});

	$( '.toggle-nav' ).click( function(e) {

		if( $( e.target ).closest( 'a' ).length ) {
			return;
		}

		$( 'body' ).toggleClass( 'hide-overflow' );

		if( $( this ).parent().attr( 'id' ) == 'movie' ) {

			var video = $( '#movie' );

			video.fadeToggle( 300, function() {
				video.find( 'iframe' ).attr( 'src', null );
			});

			document.title = $( 'body' ).data( 'old-title' );
			window.history.pushState( null, null, '/' );

		} else {
			$( '#menu' ).fadeToggle();
			$( this ).toggleClass( 'on' );
		}

	});

	$( '#movies a[href*="you"]' ).click( function(e) {

		var id = $( this ).attr( 'href' ).split( 'v=' )[1],
			href = 'https://www.youtube.com/embed/' + id,
			title = $( this ).find( 'span' ).html(),
			discuss = $( this ).attr( 'data-discussion' );

		var movie = $( '#movie' );

		$( 'body' ).toggleClass( 'hide-overflow' );

		movie.find( 'iframe' ).attr( 'src', href );
		movie.find( 'h1' ).html( title );

		movie.fadeIn( 300 );

		var url = '/movie/' + $( this ).attr( 'data-slug' );

		$( 'body' ).data( 'old-title', document.title );
		document.title = title + ' | Story Hopper';

		window.history.pushState( null, null, url );

		movie.find( 'a:last-child' ).attr( 'href', function() {
			return discuss == 'same' ? $( this ).attr( 'href' ) : discuss;
		}.bind( this ));

		e.preventDefault();

	});

	$( '#about, #movie' ).fitVids();

});