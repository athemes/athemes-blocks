/**
 * aThemes - Container Block (attributes)
 * 
 */

// Plugin dependencies
import { 
    control_atts, 
    createResponsiveAttributes 
} from '../../helpers';

// Attributes
export default {
    deviceType: {
        type: 'string',
        default: 'Desktop'
    },
    // Block ID
    block_id: {
        type: 'string',
        default: ''
    },
	// Tabbed Atts
    tabSelected: {
        type: 'string',
        default: 'style'
    },
    // Block Alignment
    align: {
        type: 'string',
        default: 'full'
    },
    // Layout
    layout: {
        type: 'string',
        default: 'card'
    },
    // Style
    ...createResponsiveAttributes( 'contentWidthSize', {
        type: 'number',
        default: parseInt(athemesBlocksThemeDefaults.contentWidth)
    }, 'px' ),
    ...createResponsiveAttributes( 'wrapperContentAlignment', {
        type: 'string',
        default: 'center'
    } ),
    ...createResponsiveAttributes( 'contentPaddingLeftRight', {
        type: 'number',
        default: 15
    }, true ),
    linkColorHover: {
        type: 'string',
        default: ''
    },
    // Paddings
    ...createResponsiveAttributes( 'wrapperPaddingToggle', {
        type: 'boolean',
        default: true
    }, true ),
    ...createResponsiveAttributes( 'wrapperPadding', {
        type: 'number',
        default: 30
    }, true ),
    ...createResponsiveAttributes( 'wrapperPaddingTop', {
        type: 'number',
        default: 75
    }, true ),
    ...createResponsiveAttributes( 'wrapperPaddingBottom', {
        type: 'number',
        default: 75
    }, true ),
    ...createResponsiveAttributes( 'wrapperPaddingLeft', {
        type: 'number',
        default: 0
    }, true ),
    ...createResponsiveAttributes( 'wrapperPaddingRight', {
        type: 'number',
        default: 0
    }, true ),
    // Margins
    ...createResponsiveAttributes( 'wrapperMarginToggle', {
        type: 'boolean',
        default: false
    }, true ),
    ...createResponsiveAttributes( 'wrapperMarginTopBottom', {
        type: 'number',
        default: 0
    }, true ),
    ...createResponsiveAttributes( 'wrapperMarginTop', {
        type: 'number',
        default: 0
    }, true ),
    ...createResponsiveAttributes( 'wrapperMarginBottom', {
        type: 'number',
        default: 0
    }, true ),
    wrapperID: {
        type: 'string',
        default: ''
    },
    wrapperBorderRadius: {
        type: 'number',
        default: 0
    },
    wrapperZindex: {
        type: 'number',
        default: 0
    },
    displayOnDesktop: {
        type: 'boolean',
        default: true
    },
    displayOnTablet: {
        type: 'boolean',
        default: true
    },
    displayOnMobile: {
        type: 'boolean',
        default: true
    },
    ...control_atts( 'background' )
}