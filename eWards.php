<?php 
/** 
* @package           eWards
 *
 * @wordpress-plugin
 * Plugin Name:      eWards
 * Plugin URI:        
 * Description:       eWards is an Integrated platform for customer retention and marketing automation.
 * Version:           1.0.4
 * Author:            Kloc Technologies PVT LTD
 * Author URI:        https://kloctechnologies.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Tested up to:      7.4
 * Requires PHP:      7.4
 * Stable tag:        1.0.4
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
        add_action( 'woocommerce_register_form_start', array($this,'wooc_extra_register_fields') );
        add_action( 'woocommerce_register_post', array($this,'wooc_validate_extra_register_fields'),10,3);
        add_action( 'woocommerce_created_customer', [$this ,'wooc_save_extra_register_fields'] );
        add_action( 'woocommerce_save_account_details_errors',[$this ,'billing_mobile_phone_field_validation'], 20, 1 );
        add_action( 'woocommerce_edit_account_form_start',[$this , 'add_billing_mobile_phone_to_edit_account_form'] );
        add_action( 'woocommerce_save_account_details', [$this ,'my_account_saving_billing_mobile_phone'], 20, 1 );

        add_action( 'init', [$this,'ewards_block'] );
        add_action( 'wp_enqueue_scripts', [$this,'ewards_block_front_scipts'] );
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
           
        </head>
        <body>
            <div class="wrap"><div id="wprk-admin-app"></div></div>
        </body>

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
            "PRDOUCTION_URL" => "https://master.p-woo-commerce-ewards.c66.me"
        ));
    }


    function ewards_block() {
        $styleURI = plugin_dir_url( __FILE__  ).'block/src/style.css';
    
        //Enquee style
        wp_enqueue_style( 
            'test-block-style', 
            $styleURI, 
         );
    
        // Register JavasScript File build/index.js
        wp_register_script( 
            'ewards-block',
            plugins_url( 'block/build/index.js', __FILE__ ),
            array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        );
        // Register editor style src/editor.css
        wp_register_style(
            'ewards-block-editor-style',
            plugins_url( 'block/src/editor.css', __FILE__ ),
        );
        // Register block
        register_block_type( 'gutenreact/ewards-block', array(
            'editor_script' => 'ewards-block',
            'editor_style' => 'ewards-block-editor-style',
        ) );
    }

    function ewards_block_front_scipts(){
        $asset_file_front = include( plugin_dir_path( __FILE__ ) . 'block/build/front.asset.php');
        wp_enqueue_script(
            'block-scripts-front',
            plugins_url( 'block/build/front.js', __FILE__ ),
            $asset_file_front['dependencies'],
            $asset_file_front['version']
        );
        // wp_localize_script('block-scripts-front','PRDOUCTION_VAR',array(
        //     "PRDOUCTION_URL" => "https://f1b2-106-51-79-143.ngrok-free.app"
        // ));
        // wp_enqueue_style('test-block-style-front', plugin_dir_url(__FILE__) . 'node_modules/@wordpress/components/build-style/style.css');
        wp_enqueue_style('ewards-block-style-front-v2', plugin_dir_url(__FILE__) . 'block/build/front.css');
        // wp_enqueue_style('test-block-style-front-v2', plugin_dir_url(__FILE__) . 'build/style.css');
    }

    /**
    * register fields Validating.
    */

    function wooc_extra_register_fields() {
        ?>
        <p class="form-row form-row-first">
            <label for="reg_billing_first_name"><?php esc_attr_e( 'First name', 'woocommerce' ); ?><span class="required">*</span></label>
            <input type="text" class="input-text" name="billing_first_name" id="reg_billing_first_name" value="<?php if ( ! empty( $_POST['billing_first_name'] ) ) esc_attr( $_POST['billing_first_name'] ); ?>" />
        </p>
        <p class="form-row form-row-last">
            <label for="reg_billing_last_name"><?php esc_attr_e( 'Last name', 'woocommerce' ); ?><span class="required">*</span></label>
            <input type="text" class="input-text" name="billing_last_name" id="reg_billing_last_name" value="<?php if ( ! empty( $_POST['billing_last_name'] ) ) esc_attr( $_POST['billing_last_name'] ); ?>" />
        </p>
        <p class="form-row form-row-wide">
        <label for="reg_billing_phone"><?php esc_attr_e( 'Mobile', 'woocommerce' ); ?><span class="required">*</span></label>
        <input type="text" class="input-text" name="billing_phone" id="reg_billing_phone" value="<?php if ( ! empty( $_POST['billing_phone'] ) ) esc_attr( $_POST['billing_phone'] ); ?>" />
        </p>
        
        <div class="clear"></div>
       <?php
    }

    /**
    * register fields Validating.
    */

    function wooc_validate_extra_register_fields( $username, $email,$validation_errors) {
        $is_correct = preg_match('/^[6-9]\d{9}$/', $_POST['billing_phone']);

        if ( isset( $_POST['billing_first_name'] ) && empty( $_POST['billing_first_name'] ) ) {
            $validation_errors->add( 'billing_first_name_error', __( '<strong>Error</strong>: First name is required!', 'woocommerce' ) );
        }

        if ( isset( $_POST['billing_phone'] ) ) {
            $hasPhoneNumber= get_users('meta_value='.$_POST['billing_phone']);
            if ( !empty($hasPhoneNumber)) {
            $validation_errors->add( 'billing_phone_error', __( 'Mobile number is already used!.', 'woocommerce' ) );
            }
        }
        if ( isset( $_POST['billing_last_name'] ) && empty( $_POST['billing_last_name'] ) ) {
            $validation_errors->add( 'billing_last_name_error', __( '<strong>Error</strong>: Last name is required!.', 'woocommerce' ) );
        }
        if ( isset( $_POST['billing_phone'] ) && empty( $_POST['billing_phone'] ) ) {
            $validation_errors->add( 'billing_phone_error', __( '<strong>Error</strong>: Mobile number is required!.', 'woocommerce' ) );
        }
        if ( isset($_POST['billing_phone']) && !$is_correct) {

            $validation_errors->add( 'billing_phone_error', __("Incorrect Mobile Number! Please enter valid 10 digits mobile number." ,'woocommerce') );
        }
        return $validation_errors;
    }

    /**
    * Below code save extra fields.
    */
    function wooc_save_extra_register_fields( $customer_id ) {
        $is_correct = preg_match('/^[0-9]{8}$/', $_POST['billing_phone']);

        if ( isset( $_POST['billing_phone'] ) ) {
                    // Phone input filed which is used in WooCommerce
                    update_user_meta( $customer_id, 'billing_phone', sanitize_text_field( $_POST['billing_phone'] ) );
            }
        if ( isset( $_POST['billing_first_name'] ) ) {
                //First name field which is by default
                update_user_meta( $customer_id, 'first_name', sanitize_text_field( $_POST['billing_first_name'] ) );
                // First name field which is used in WooCommerce
                update_user_meta( $customer_id, 'billing_first_name', sanitize_text_field( $_POST['billing_first_name'] ) );
        }
        if ( isset( $_POST['billing_last_name'] ) ) {
                // Last name field which is by default
                update_user_meta( $customer_id, 'last_name', sanitize_text_field( $_POST['billing_last_name'] ) );
                // Last name field which is used in WooCommerce
                update_user_meta( $customer_id, 'billing_last_name', sanitize_text_field( $_POST['billing_last_name'] ) );
        }
    }

    // Display the mobile phone field
    // add_action( 'woocommerce_edit_account_form_start', 'add_billing_mobile_phone_to_edit_account_form' ); // At start
    // add_action( 'woocommerce_edit_account_form', 'add_billing_mobile_phone_to_edit_account_form' ); // After existing fields
    function add_billing_mobile_phone_to_edit_account_form() {
        $user = wp_get_current_user();
        ?>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
            <label for="reg_billing_phone"><?php esc_attr_e( 'Mobile number', 'woocommerce' ); ?> <span class="required">*</span></label>
            <input type="text" class="input-text" name="billing_phone" id="reg_billing_phone" value="<?php echo esc_attr( get_user_meta($user->id,'billing_phone',true) ); ?>" />
        </p>
        <?php
    }

    // Check and validate the mobile phone
    
    function billing_mobile_phone_field_validation( $args ){
        $user = wp_get_current_user();
        $is_correct = preg_match('/^[6-9]\d{9}$/', $_POST['billing_phone']);
        if ( isset($_POST['billing_phone']) && empty($_POST['billing_phone']) )
            $args->add( 'billing_phone_error', __( 'Please fill in your mobile number', 'woocommerce' ),'');

        if ( isset($_POST['billing_phone']) && !$is_correct) {
            $args->add('billing_phone_error', __("Incorrect Mobile Number! Please enter valid 10 digits mobile number."  ,'woocommerce'),'');
        }    
        $hasPhoneNumber= get_users('meta_value='.$_POST['billing_phone']);
        if ( isset( $_POST['billing_phone'] ) ) {
            // $hasNewPhoneNumber = get_user_meta($user->id,'billing_phone')
            if ( !empty($hasPhoneNumber) && $hasNewPhoneNumber !== $hasPhoneNumber ) {
                $args->add( 'billing_phone_error', __( 'Mobile number is already used!.', 'woocommerce' ) );
            }
        }
    }

    // Save the mobile phone value to user data
    function my_account_saving_billing_mobile_phone( $user_id ) {
        if( isset($_POST['billing_phone']) && ! empty($_POST['billing_phone']) )
        update_user_meta( $user_id, 'billing_phone', sanitize_text_field($_POST['billing_phone']) );
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



