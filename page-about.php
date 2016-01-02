<?php

/*
  Template Name: About the project (new)
*/

get_header();

?>

<section id="about">

  <span class="toggle-nav">
    <b></b>
    <b></b>
    <b></b>
  </span>

  <div class="inner">
    <h1><?php the_title() ?></h1>
    <iframe width="640" height="360" src="//www.youtube.com/embed/<?= explode( '?v=', get_field( 'video' ) )[1] ?>" frameborder="0" allowfullscreen>
    </iframe>
  </div>

</section>

<?php get_footer() ?>
