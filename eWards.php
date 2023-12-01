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
        add_action('init',array($this, 'custom_post_type'));
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
        echo '<div class="wrap"><div id="wprk-admin-app"></div></div>';
    }

    function load_shotcode()
    {?>
         <div class="cart-content"><div id="cart-cupons-section">TEST</div></div>
    <?php }

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



