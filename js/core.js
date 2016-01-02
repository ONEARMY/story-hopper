var setRating = function() {

  var index = $( this ).index(),
    slug = document.URL.split( '/' )[4],
    date = new Date();

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

  date.setDate( date.getDate() + 1200 );
  document.cookie = slug + '=' + encodeURIComponent( JSON.stringify( data ) ) + '; ' + 'path=/; expires=' + date.toUTCString() + ';';

}

var getRating = function( slug ) {

  var cookies = document.cookie,
    singles = cookies.split( '; ' ),
    html = '',
    data = 0;

  for( cookie in singles ) {

    var mixed = singles[cookie].split( '=' );

    if( mixed[1].slice( -1 ) == '0' ) {
      continue;
    }

    if( mixed[0] == slug ) {
      data = JSON.parse( decodeURIComponent( mixed[1] ) ).count;
      break;
    }

  }

  for( i = 1; i < 6; i++ ) {
    var attr = i <= data ? 'full' : '';
    html += '<i class="' + attr + '"></i>';
  }

  return html;

}

var calibrateDir = function( id, movie ) {

  var current = $( '#movies a[href*="' + id + '"]' ).closest( '.item' ),
    next = current.next(),
    previous = current.prev();

  movie.find( '.next' ).attr( 'href', function() {
    return !next[0] || next.hasClass( 'nolink' ) ? '#' : next.find( 'a' ).attr( 'href' );
  });

  movie.find( '.prev' ).attr( 'href', function() {
    return !previous[0] || previous.hasClass( 'nolink' ) ? '#' : previous.find( 'a' ).attr( 'href' );
  });

}

var switchMovie = function( id, event ) {

  var href = '//www.youtube.com/embed/' + id,
    title = $( this ).find( 'span' ).html(),
    discuss = $( this ).attr( 'data-discussion' ),
    slug = $( this ).attr( 'data-slug' );

  var movie = $( '#movie' );

  $( 'body' ).addClass( 'hide-overflow' );

  movie.find( 'iframe' ).attr( 'src', href );
  movie.find( 'h1' ).html( title );

  movie.find( '.rating' ).html( getRating.bind( this, slug ) );
  movie.find( '.direction' ).each( calibrateDir.bind( this, id, movie ) );

  movie.fadeIn( 300, function() {
    movie.find( '.rating i' ).click( setRating );
  });

  var url = '/movie/' + slug;

  $( 'body' ).data( 'old-title', document.title );
  document.title = title + ' | Story Hopper';

  window.history.pushState( null, null, url );

  movie.find( '.discuss' ).attr( 'href', function() {
    return discuss == 'same' ? $( this ).attr( 'href' ) : discuss;
  }.bind( this ));

  event.preventDefault();

}

$( document ).ready( function() {

  $( '#menu li:first-child a' ).each( function() {

    var old = $( this ).attr( 'href' );

    $( this ).click( function( e ) {

      if( $( '#movies' ).length > 0 ) {
        $( '#intro .toggle-nav' ).trigger( 'click' );
      }

    });

    $( this ).attr( 'href', old + '#movies' );

  });

  if( jQuery().isotope ) {

    var grid = $( '#movies .inner:last-child' ).isotope({
      itemSelector: '.item',
      filter: '.original'
    });

  }

  $( '#movie.single .rating i' ).click( setRating );

  $( '#movie:not(.single) .direction a' ).on( 'click', function( event ) {

    if( $( this ).attr( 'href' ) == '#' ) {
      return;
    }

    var id = $( this ).attr( 'href' ).split( 'v=' )[1];
    switchMovie.call( $( '#movies a[href*="' + id + '"]' ), id, event );

  });

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

  $( '#movies a[href*="you"]' ).click( function( event ) {
    var id = $( this ).attr( 'href' ).split( 'v=' )[1];
    switchMovie.call( this, id, event );
  });

  $( '#about, #movie' ).fitVids();

});
