<?php

/*
  Template Name: News
*/

get_header();

?>


<section id="newsbig">

  <span class="toggle-nav">
    <b></b>
    <b></b>
    <b></b>
  </span>

  <h1>News</h1>

  <div class="inner">
    <div class="news">
    <?php if (have_posts()) : while (have_posts()) : the_post();?>
    <?php the_content(); ?>
    <?php endwhile; endif; ?>


    </div>
  </div>
</section>


<?php get_footer() ?>
