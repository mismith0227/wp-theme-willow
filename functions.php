<?php
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
  wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}

//hooks
add_filter( 'the_content' , 'willow_the_content_filter' );

function willow_the_content_filter( $content ) {
    if ( is_home() || is_archive() ){
        $content = willow_make_excerpt($content);
    }
    return $content;
}

function willow_make_excerpt($content){
    global $post;
    $length = 110;
    $content = mb_substr( strip_tags( $post -> post_content ), 0, $length );
    $content = $content . "...";
    return $content;
}

function register_script(){
    wp_register_script( 'willow', get_stylesheet_directory_uri() . '/js/willow.js', array( 'jquery' ), '', true);
}
function add_script() {
    register_script();
    wp_enqueue_script('willow');
}
add_action('wp_enqueue_scripts', 'add_script');
