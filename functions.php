<?php

// Unhooked functions

function get_post_id( $slug, $post_type ) {

	$query = new WP_Query([
		'name' => $slug,
		'post_type' => $post_type
	]);

    $query->the_post();
    return get_the_ID();

}

function get_rating() {

	global $post;

	$slug = $post->post_name;
	$i = 1;
	$count = isset( $_COOKIE[$slug] ) ? json_decode( base64_decode($_COOKIE[$slug] ) )->count : 0;

	while( $i <= 5 ) {
		$class = $i <= $count ? 'full' : '';
		echo '<i class="' . $class . '"></i>';
		$i++;
	}

}

// Hooked functions

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