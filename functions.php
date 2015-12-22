<?php
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

function willow_register_script(){
    wp_register_script( 'willow', get_stylesheet_directory_uri() . '/js/willow.js', array( 'jquery' ), '', true);
}
function willow_add_script() {
    willow_register_script();
    wp_enqueue_script('willow');
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}
add_action('wp_enqueue_scripts', 'willow_add_script');
