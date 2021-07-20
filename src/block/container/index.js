/**
 * aThemes - Container Block
 * 
 */

// WordPress dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// Plugin dependencies
import { athemes_icons } from '../../helpers';

// Block dependencies
import attributes from './attributes.js';
import edit from './edit.js';
import save from './save.js';
import './editor.scss';
import './style.scss';

/**
 * Register - aThemes Container Block
 *
 */
registerBlockType( 'athemes/athemes-blocks-block-container', {
	title: __( 'Container Block', 'athemes-blocks' ),
	icon: athemes_icons( 'container-block' ),
	description: __( 'A style wrapper to combine different blocks in a single row.', 'athemes-blocks' ),
	category: 'common',
	keywords: [
		__( 'wrapper', 'athemes-blocks' ),
		__( 'athemes', 'athemes-blocks' ),
		__( 'container', 'athemes-blocks' ),
		__( 'section', 'athemes-blocks' ),
	],
	getEditWrapperProps(attributes) {
		const { align } = attributes; 
		return { 'data-align': align }
	},
	attributes,
	example: {
		innerBlocks: [
			{
				name: 'core/heading',
				attributes: {
					level: 3,
					content: __( 'Lorem ipsum dolor', 'athemes-blocks' ),
					textAlign: 'center'
				},
			},
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id tempus metus. Donec vestibulum, purus at eleifend maximus.', 'athemes-blocks' ),
					align: 'center'
				},
			},
		],
	},	
	edit,
	save
} );