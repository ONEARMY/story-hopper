<?php

/*
  Template Name: Share your story
*/

get_header();

?>

<section id="details">

  <span class="toggle-nav">
    <b></b>
    <b></b>
    <b></b>
  </span>

  <h1>Share your story</h1>

  <div class="inner">

    <?php while ( have_rows( 'details' ) ) : the_row(); ?>

    <figure>
      <img src="<?php the_sub_field( 'roof' ) ?>">
      <figcaption>
        <h2><?php the_sub_field( 'heading' ) ?></h2>
        <p><?php the_sub_field( 'description' ) ?></p>
      </figcaption>
    </figure>

    <?php endwhile; ?>

    <a href="<?php the_field( 'kit' ) ?>" download>Download<br>start-kit</a>

  </div>

</section>

<section id="apply">

  <div class="inner">
    <h1>Video ready?<br>Submit!</h1>
    <?= do_shortcode( '[contact-form-7 id="68" title="Apply"]' ) ?>
  </div>

</section>

<?php get_footer() ?>
