<!DOCTYPE html>
<html>

	<head>

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1"/>

		<link rel="stylesheet" href="<?= get_stylesheet_uri() ?>">
		<link href="//fonts.googleapis.com/css?family=Open+Sans:400,400italic,700,700italic,300,300italic" rel="stylesheet" type="text/css">

		<?php wp_head() ?>

	</head>

	<?php if( get_the_ID() == 26 ): ?>
		<body class="blue">
	<?php else: ?>
		<body>
	<?php endif; ?>

		<nav id="menu">
			<h1>Menu</h1>

			<?php

			$args = [
				'container' => false,
				'theme_location' => 'menu'
			];

			wp_nav_menu( $args );

			?>

		</nav>