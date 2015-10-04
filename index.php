<?php get_header() ?>

<section id="intro">

	<video muted loop autoplay>
		<source src="<?php the_field( 'video' ) ?>" type="video/mp4">
	</video>

	<article>

		<span class="toggle-nav">
			<b></b>
			<b></b>
			<b></b>
		</span>

		<hgroup>
			<h1><?php bloginfo( 'name' ) ?></h1>
			<h2><?php bloginfo( 'description' ) ?></h2>
		</hgroup>

		<footer>
			<a href="#movies">watch videos</a>
		</footer>

	</article>

</section>

<section id="movies">

	<div class="inner">
		<h1>the stories</h1>

		<nav>
			<?php

			$args = [
				'hide_empty' => 0
			];

			$categories = get_terms( 'movie_category', $args );

			foreach( $categories as $category ) {
				echo '<a href="#' . $category->slug . '">' . strtolower( $category->name ) . '</a>';
			}

			?>
		</nav>

	</div>

	<div class="inner">

		<?php

		$args = [
			'post_type' => 'movie',
			'order'    => 'ASC'
		];

		query_posts( $args );
		while ( have_posts() ) : the_post();

		$categories = get_the_terms( get_the_ID(), 'movie_category' );
		$video = get_field( 'url' );
		$discussion = get_field( 'discussion' ) == 0 ? 'same' : get_field( 'discussion_url' );

		?>

		<div class="item <?= $categories[0]->slug; ?>">
			<a href="<?= $video ?>" data-discussion="<?= $discussion ?>" data-slug="<?= $post->post_name; ?>">
				<figure>
					<?php the_post_thumbnail() ?>

					<figcaption>

						<img src="<?= get_stylesheet_directory_uri() ?>/vectors/play.png">

						<div class="rating">
							<?php get_rating() ?>
						</div>

					</figcaption>

				</figure>
				<span><?php the_title() ?></span>
			</a>
		</div>

		<?php endwhile; wp_reset_query(); ?>

	</div>
</section>

<section id="movie">

	<span class="toggle-nav on">
		<b></b>
		<b></b>
		<b></b>
	</span>

	<div class="inner">
		<h1>No Shampoo</h1>

		<div class="rating">
			<i></i>
			<i></i>
			<i></i>
			<i></i>
			<i></i>
		</div>

		<iframe width="854" height="480" src="https://www.youtube.com/embed/oDAw7vW7H0c" frameborder="0" allowfullscreen></iframe>
		<a href="#" target="_blank">discuss this video</a>
	</div>

</section>

<?php get_footer() ?>