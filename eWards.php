<?php 
/** 
* @package           eWards
 *
 * @wordpress-plugin
 * Plugin Name:      eWards
 * Plugin URI:        https://github.com/MuhammadFaizanHaidar/wp-react-app
 * Description:       Integrates react into WordPress admin pages.
 * Version:           1.0.0
 * Author:            Kloc
 * Author URI:        www.klocapps.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       
 * Domain Path:       /languages
 */

 if (!defined('ABSPATH')) {
    die;
 }

define('ewards_DIR', plugin_dir_path(__FILE__));
define('ewards_URL', plugins_url('/', __FILE__));

 class Ewards
 {
    public function __construct() {
        // add_action('init',array($this, 'custom_post_type'));
        add_action( 'admin_menu', [ $this, 'create_admin_menu' ] );
        add_shortcode('ewards-cupons',array($this, 'load_shotcode'));
        
    }

    function register() {
        add_action('admin_enqueue_scripts',array($this,'enqueue'));
    }

    public function create_admin_menu() {
        $capability = 'manage_options';
        $slug = 'ewards-settings';

        add_menu_page(
            __( 'eWards', 'eWards-app' ),
            __( 'eWards', 'eWards-app' ),
            $capability,
            $slug,
            [ $this, 'menu_page_template' ],
            'dashicons-buddicons-replies'
        );
    }

    public function menu_page_template() {
        echo '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </head>
        <body>
            <div class="wrap"><div id="wprk-admin-app"></div></div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        </html>
        ';
    }


    function activate(){
        $this->custom_post_type();

        flush_rewrite_rules();
    }

    function deactivate(){

        flush_rewrite_rules();
    }

    function custom_post_type(){
        $args = array(
            'public' => true,
            'has_archive' => true,
            'capability' => 'manage_options',
            'labels' => array(
                'name' => 'Ewards',
                'singular_name' => 'Ewards'
            )
            );
        register_post_type('ewards', $args);
    }

    function enqueue(){
        wp_enqueue_script( 'ewards_scripts', ewards_URL . 'dist/bundle.js', [ 'jquery', 'wp-element' ], wp_rand(), true );
        wp_localize_script( 'ewards_scripts', 'appLocalizer', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
        ] );
        wp_localize_script('ewards_scripts','PRDOUCTION_VAR',array(
            "PRDOUCTION_URL" => "https://d-ewards-woocommerce.klocapps.com"
        ));
    }
 }
 
if (class_exists('Ewards')) {
    $ewardsPlugin = new Ewards();
    $ewardsPlugin->register();

}


//activate 
register_activation_hook(__FILE__,array($ewardsPlugin,'activate'));

//deactivate
register_deactivation_hook(__FILE__,array($ewardsPlugin,'deactivate'));


 // call API



