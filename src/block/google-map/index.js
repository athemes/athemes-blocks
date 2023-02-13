/**
 * aThemes - Google Map Block
 */

// WordPress dependencies
import {
	__
} from '@wordpress/i18n';

import {
	registerBlockType
} from '@wordpress/blocks';

// Plugin dependencies
import {
	athemes_icons
} from '../../helpers';

import './editor.scss';
import './style.scss';

import edit from './edit.js';
import save from './save.js';
import attributes from './attributes.js';

/**
 * Register - aThemes Google Map Block
 */
registerBlockType( 'athemes/athemes-blocks-block-google-map', {
  apiVersion: 2,
	title: __( 'Google Map Block', 'athemes-blocks' ),
	icon: athemes_icons( 'google-map-block' ),
	description: __( 'A simple google map block.', 'athemes-blocks' ),
	category: 'common',
	keywords: [
		__( 'athemes', 'athemes-blocks' ),
		__( 'google', 'athemes-blocks' ),
		__( 'map', 'athemes-blocks' ),
	],
  supports: {
    align: true,
  },
	attributes,
	edit,
	save,
} );