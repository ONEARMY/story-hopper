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

  movie.find( '.direction' ).each( calibrateDir.bind( this, id, movie ) );

  movie.fadeIn(300);

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

  if ($('#newsbig')) {
    $.ajax({
      type: 'GET',
      url: 'https://davehakkens.nl/category/storyhopper/feed/',
      success: function (xml) {
        $(xml).find('item').each(function (index) {
          var article = $('<article />')

          var title = $(this).find('title').text()
          var description = $($(this).find('description').text())[1]
          var url = $(this).find('link').text()

          var preview = $($(this).find('description').text()).find('.wp-post-image')
          var figure = $('<figure></figure>')

          figure.append(preview)
          article.append(figure)
          article.append('<a href="' + url +  '" class="title" target="_blank">' + title + '</a>')

          var descText = $(description).text()

          if (descText.indexOf('-source') == -1 && descText.indexOf(title) == -1) {
            article.append('<p>' + descText + '</p>')
          }

          var news = $('#newsbig .news')

          news.find('.loading').hide()
          news.append(article)

          if (index == 9) {
            return false
          }
        })
      }
    })
  }

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

  $( '.overlay .close' ).click( function( e ) {
  $( this ).closest( '.overlay' ).fadeOut( 300 );
  e.preventDefault();
});


$('#info .').click(function(event) {
  $('#overlay').addClass('open')
  event.preventDefault()
})

$('#overlay .close').click(function(event) {
  $(this).closest('#overlay').removeClass('open')
  event.preventDefault()
})

});
