<?php

// Unhooked functions

function capture_rating( $post ) {

	$slug = $post->post_name;
	$cookie = isset( $_COOKIE[$slug] ) ? json_decode( stripslashes( urldecode( $_COOKIE[$slug] ) ) ) : false;
	$current = [];

	$old = [
		'rating_count',
		'rating_amount'
	];

	if( !$cookie || $cookie->synced ) {
		return;
	}

	foreach( $old as $key => $value ) {
		$name = explode( '_', $value )[1];
		$get = get_post_meta( $post->ID, $value, true );
		$current[$name] = !empty( $get ) ? $get : 0;
	}

	foreach( $old as $key => $value ) {
		$new = strpos( $value, 'count' ) !== false ? $current['count'] + 1 : $cookie->count + $current['amount'];
		update_post_meta( $post->ID, $value, $new );
	}

	$cookie->synced = true;
	$expire = time() + ( 10 * 365 * 24 * 60 * 60 );

	setrawcookie( $slug, urlencode( json_encode( $cookie ) ), $expire, '/' );

}

function post_direction( $dir ) {

	$next = $dir == 'next' ? get_next_post() : get_previous_post();

	if( empty( $next ) ) {
		return '#';
	}

	$categories = get_the_terms( $next->ID, 'movie_category' );
	$url = $categories[0]->slug == 'nolink' ? '#' : get_permalink( $next->ID );

	return $url;

}

function get_post_id( $slug, $post_type ) {

	$query = new WP_Query([
		'name' => $slug,
		'post_type' => $post_type
	]);

    $query->the_post();
    return get_the_ID();

}

function single_rating() {

	global $post;

	if( substr( $_COOKIE[$slug], -1 ) == '=' ) {
		return;
	}

	$slug = $post->post_name;
	$i = 1;

	if( isset( $_COOKIE[$slug] ) ) {
		$count = substr( $_COOKIE[$slug], -1 ) == '=' ? 0 : json_decode( stripslashes( urldecode( $_COOKIE[$slug] ) ) )->count;
	} else {
		$count = 0;
	}

	while( $i <= 5 ) {
		$class = $i <= $count ? 'full' : '';
		echo '<i class="' . $class . '"></i>';
		$i++;
	}

}

function get_average() {

	global $post;

	$i = 1;
	$count = get_post_meta( $post->ID, 'rating_count', true );
	$amount = get_post_meta( $post->ID, 'rating_amount', true );

	$all = round( $amount / $count );

	while( $i <= 5 ) {
		$class = $i <= $all ? 'full' : '';
		echo '<i class="' . $class . '"></i>';
		$i++;
	}

}

// Hooked functions

function look_for_ratings() {

	if( is_admin() ) {
		return;
	}

	foreach( $_COOKIE as $name => $value ) {

		if( substr( $value, -1 ) == '=' ) {
			continue;
		}

		$is_movie = get_page_by_path( esc_sql( $name ), OBJECT, 'movie' );

		if( !$is_movie ) {
			continue;
		}

		capture_rating( $is_movie );

	}

}

add_action( 'init', 'look_for_ratings' );

function manage_menu() {

	global $submenu;

	if( current_user_can( 'manage_options') ) {

		$submenu['options-general.php'][] = [
			'Savvii',
			'manage_options',
			admin_url( 'admin.php' ) . '?page=savvii_dashboard'
		];

	}

	remove_menu_page( 'savvii_dashboard' );

}

add_action( 'admin_menu', 'manage_menu', 999 );

function register_menus() {

	$menus = [
		'menu' => __( 'Toggled menu' ),
		'social' => __( 'Footer' )
	];

	register_nav_menus( $menus );

}

add_action( 'init', 'register_menus' );

function add_taxonomies() {

	$details = [

		'labels' => [
			'name' => __( 'Categories' ),
			'singular_name' => __( 'Category' ),
			'add_new_item' => __( 'Add New Category' )
		],

		'hierarchical' => true

	];

	register_taxonomy( 'movie_category', 'movie', $details );

}

add_action( 'init', 'add_taxonomies' );

function custom_theme_setup() {

	$support = [
		'post-thumbnails',
		'title-tag'
	];

	foreach( $support as $item ) {
		add_theme_support( $item );
	}

}

add_action( 'after_setup_theme', 'custom_theme_setup' );

function remove_menu_items() {

	if( !is_admin() ) {
		return;
	}

	$remove = [
		'edit.php',
		'edit-comments.php'
	];

	foreach( $remove as $page ) {
		remove_menu_page( $page );
	}

}

add_action( 'admin_init', 'remove_menu_items' );

function add_post_types() {

	$details = [

		'labels' => [
			'name' => __( 'Movies' ),
			'singular_name' => __( 'Movie' ),
			'all_items' => __( 'All Movies' )
		],

		'show_ui' => true,
		'menu_icon' => 'dashicons-video-alt',
		'menu_position' => 5,
		'taxonomies' => [ 'movie-category' ],

		'supports' => [
			'title',
			'thumbnail'
		],

		'public' => true

	];

	register_post_type( 'movie', $details );

}

add_action( 'init', 'add_post_types' );

function remove_admin_bar_items( $bar ) {
	$bar->remove_node( 'comments' );
}

add_action( 'admin_bar_menu', 'remove_admin_bar_items', 999 );

function remove_supports() {

	$types = [

		'page' => [
			'comments',
			'custom-fields'
		]

	];

	foreach( $types as $type => $items ) {

		if( !is_array( $items ) ) {
			break;
		}

		foreach( $items as $item ) {
			remove_post_type_support( $type, $item );
		}

	}

}

add_action( 'init', 'remove_supports' );

?>