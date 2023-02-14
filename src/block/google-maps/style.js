/**
 * aThemes - Google Maps Block (editor style)
 * Render the block CSS in the editor
 *  
 */

// Plugin dependencies
import { 
    mount_css 
} from '../../helpers';

// Style
function style( props, deviceType ) {

    const atts = props.attributes;
    
    let desktopSelectors = {},
        tabletSelectors  = {},
        mobileSelectors  = {};

    // Iframe
    desktopSelectors['iframe'] = {};
    tabletSelectors['iframe']  = {};
    mobileSelectors['iframe']  = {};

    // Iframe Width
    desktopSelectors['iframe']['width'] = atts.contentWidthSize + atts.contentWidthSizeUnit;
    tabletSelectors['iframe']['width']  = atts.contentWidthSizeTablet + atts.contentWidthSizeTabletUnit;
    mobileSelectors['iframe']['width']  = atts.contentWidthSizeMobile + atts.contentWidthSizeMobileUnit;

    // Iframe Height
    desktopSelectors['iframe']['height'] = atts.contentHeightSize + atts.contentHeightSizeUnit;
    tabletSelectors['iframe']['height']  = atts.contentHeightSizeTablet + atts.contentHeightSizeTabletUnit;
    mobileSelectors['iframe']['height']  = atts.contentHeightSizeMobile + atts.contentHeightSizeMobileUnit;

    let desktopCss = '';
    desktopCss += mount_css( `.athemes-blocks-block-${props.clientId.substr( 0, 8 )} >`, desktopSelectors, deviceType );

    let tabletCss = '';
    tabletCss += mount_css( `.athemes-blocks-block-${props.clientId.substr( 0, 8 )} >`, tabletSelectors, deviceType );

    let mobileCss = '';
    mobileCss += mount_css( `.athemes-blocks-block-${props.clientId.substr( 0, 8 )} >`, mobileSelectors, deviceType );
    
    return [ desktopCss, tabletCss, mobileCss ];

}

export default style;