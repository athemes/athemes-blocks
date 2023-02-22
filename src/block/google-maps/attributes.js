/**
 * aThemes - Google Maps Block (attributes)
 */

// Plugin dependencies
import {
    createResponsiveAttributes
} from '../../helpers';

export default {
    block_id: {
      type: 'string',
      default: ''
    },
    deviceType: {
        type: 'string',
        default: 'Desktop'
    },
    ...createResponsiveAttributes( 'contentWidthSize', {
        type: 'number',
        default: 100
    }, '%' ),
    ...createResponsiveAttributes( 'contentHeightSize', {
        type: 'number',
        default: 500
    }, 'px' ),
    align: {
        type: 'string',
        default: '',
    },
    iframe: {
        type: 'string',
        default: '',
    },
};