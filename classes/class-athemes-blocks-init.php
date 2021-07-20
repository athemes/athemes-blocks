<?php
/**
 * Initalize Blocks
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATBLOCKS_Init' ) ) {

    class ATBLOCKS_Init {

        public $css = '';

        public function __construct() {
            add_action( 'init', array( $this, 'athemes_blocks_assets' ) );
            add_action( 'enqueue_block_assets', array( $this, 'athemes_blocks_add_css_global_vars' ) );
            add_action( 'enqueue_block_assets', array( $this, 'append_frontend_css' ) );
        }

        public function athemes_blocks_assets() {
            // Register block styles for both frontend + backend.
            wp_register_style(
                'athemes-blocks-style',
                plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), 
                is_admin() ? array( 'wp-editor' ) : null, 
                ATBLOCKS_VERSION 
            );
        
            // Register block editor script for backend.
            wp_register_script(
                'athemes-blocks-editor',
                plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), 
                array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
                ATBLOCKS_VERSION,
                true
            );
        
            // Register block editor styles for backend.
            wp_register_style(
                'athemes-blocks-editor-style',
                plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
                array( 'wp-edit-blocks' ),
                ATBLOCKS_VERSION
            );

            // WP Localized globals. Use dynamic PHP stuff in JavaScript via `athemesGlobal` object.
            wp_localize_script(
                'athemes-blocks-editor',
                'athemesGlobal',
                [
                    'pluginDirPath' => plugin_dir_path( __DIR__ ),
                    'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
                ]
            );
        
            /**
             * Register Gutenberg block on server-side.
             *
             * Register the block on server-side to ensure that the block
             * scripts and styles for both frontend and backend are
             * enqueued when the editor loads.
             *
             */
            register_block_type(
                'athemes/block-athemes-blocks', array(
                    'style'         => 'athemes-blocks-style',
                    'editor_script' => 'athemes-blocks-editor',
                    'editor_style'  => 'athemes-blocks-editor-style',
                )
            );
        }
    
        /**
         * Add global variables
         *
         */
        public function athemes_blocks_add_css_global_vars() {
            
            // Content width
            global $content_width;
            $block_content_full_width = isset( $content_width ) ? $content_width : 1140;

            wp_localize_script(
                'athemes-blocks-editor',
                'athemesBlocksThemeDefaults',
                [
                    'contentWidth' => $block_content_full_width
                ]
            );
        }

        /**
         * Append athemes blocks CSS
         * 
         */
        public function append_frontend_css() {
            if( ! is_admin() ) {
                global $post;
                
                if( has_blocks( $post ) ) {
                    $post_blocks = parse_blocks( $post->post_content );

                    foreach( $post_blocks as $block ) {
                        
                        $this->generate_athemes_blocks_css( $block );

                        // Blocks inside Inner Blocks
                        if( isset( $block['innerBlocks'] ) && count( $block['innerBlocks'] ) > 0 ) {
                            $this->search_inner_blocks_for_athemes_blocks( $block['innerBlocks'] );
                        }
                    }
                }

                wp_add_inline_style( 'athemes-blocks-style', $this->css );
            }
        }

        /**
         * Generate athemes blocks CSS
         * 
         */
        public function generate_athemes_blocks_css( $block ) {
            $athemes_blocks = apply_filters( 'athemes_blocks_generate_css_for', array(
                'athemes/athemes-blocks-block-container'
            ) );

            if( in_array( $block['blockName'], $athemes_blocks ) ) {

                // Container Block
                if( $block['blockName'] == 'athemes/athemes-blocks-block-container' ) {
                    $this->css .= ATBLOCKS_Css_Output::get_container_block_css( $block['attrs'], 'athemes-blocks-block-' . $block['attrs']['block_id'] );
                }

            }
        }

        /**
         * Recursive loop trough innerBlocks to find athemes blocks and generate the needed CSS
         * 
         */
        public function search_inner_blocks_for_athemes_blocks( $innerBlocks ) {
            foreach( $innerBlocks as $block ) {

                $this->generate_athemes_blocks_css( $block );

                if( isset( $block['innerBlocks'] ) && count( $block['innerBlocks'] ) > 0 ) {
                    $this->search_inner_blocks_for_athemes_blocks( $block['innerBlocks'] );
                }
            }

        }

    }

    new ATBLOCKS_Init;
}