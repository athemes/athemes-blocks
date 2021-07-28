/**
 * aThemes - Container Block (editor style)
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
        tabletSelectors = {},
        mobileSelectors = {};

    // Container Wrapper 
    desktopSelectors['.athemes-blocks-block-container-wrapper'] = {}
    tabletSelectors['.athemes-blocks-block-container-wrapper']  = {}
    mobileSelectors['.athemes-blocks-block-container-wrapper']  = {}

    // Container Wrapper Background Image
    desktopSelectors['.athemes-blocks-block-container-wrapper > .athemes-blocks-background-image'] = {}

    // Container Wrapper Content
    desktopSelectors['.athemes-blocks-block-container-wrapper > .athemes-blocks-block-container-wrapper-content'] = {}
    tabletSelectors['.athemes-blocks-block-container-wrapper > .athemes-blocks-block-container-wrapper-content']  = {}
    mobileSelectors['.athemes-blocks-block-container-wrapper > .athemes-blocks-block-container-wrapper-content']  = {}

    // Content Size
    desktopSelectors['.athemes-blocks-block-container-wrapper > .athemes-blocks-block-container-wrapper-content']['max-width'] = atts.contentWidthSize + atts.contentWidthSizeUnit;
    tabletSelectors['.athemes-blocks-block-container-wrapper > .athemes-blocks-block-container-wrapper-content']['max-width'] = atts.contentWidthSizeTablet + atts.contentWidthSizeTabletUnit;
    mobileSelectors['.athemes-blocks-block-container-wrapper > .athemes-blocks-block-container-wrapper-content']['max-width'] = atts.contentWidthSizeMobile + atts.contentWidthSizeMobileUnit;

    // Content Aligment
    desktopSelectors['.athemes-blocks-block-container-wrapper']['justify-content'] = atts.wrapperContentAlignment;
    tabletSelectors['.athemes-blocks-block-container-wrapper']['justify-content'] = atts.wrapperContentAlignmentTablet;
    mobileSelectors['.athemes-blocks-block-container-wrapper']['justify-content'] = atts.wrapperContentAlignmentMobile;

    // Border Radius
    desktopSelectors['.athemes-blocks-block-container-wrapper']['border-radius'] = atts.wrapperBorderRadius + 'px';

    // Z-index
    desktopSelectors['.athemes-blocks-block-container-wrapper']['z-index'] = atts.wrapperZindex;

    // Background
    if( atts.wrapperBackgroundType == 'color' ) {
        desktopSelectors['.athemes-blocks-block-container-wrapper']['background-color'] = atts.wrapperBackgroundColor;
    }
    if( atts.wrapperBackgroundType == 'gradient' ) {
        desktopSelectors['.athemes-blocks-block-container-wrapper']['background'] = `linear-gradient( ${ atts.wrapperBackgroundGradientDegree }deg, ${ atts.wrapperBackgroundGradientColor1 } ${ atts.wrapperBackgroundGradientColor1Position }%, ${ atts.wrapperBackgroundGradientColor2 } ${ atts.wrapperBackgroundGradientColor2Position }% );`;
    }
    if( atts.wrapperBackgroundType == 'image' && atts.wrapperBackgroundImage != null ) {
        desktopSelectors['.athemes-blocks-block-container-wrapper > .athemes-blocks-background-image']['object-fit'] = atts.wrapperBackgroundImageType;
        desktopSelectors['.athemes-blocks-block-container-wrapper > .athemes-blocks-background-image']['object-position'] = atts.wrapperBackgroundPosition;
    }

    // Margins
    desktopSelectors['.athemes-blocks-block-container-wrapper']['margin-top'] = get_spacement_value( atts, 'wrapperMarginTop', '' ) + atts.wrapperMarginTopUnit;
    desktopSelectors['.athemes-blocks-block-container-wrapper']['margin-bottom'] = get_spacement_value( atts, 'wrapperMarginBottom', '' ) + atts.wrapperMarginBottomUnit;

    tabletSelectors['.athemes-blocks-block-container-wrapper']['margin-top'] = get_spacement_value( atts, 'wrapperMarginTop', 'Tablet' ) + atts.wrapperMarginTopTabletUnit;
    tabletSelectors['.athemes-blocks-block-container-wrapper']['margin-bottom'] = get_spacement_value( atts, 'wrapperMarginBottom', 'Tablet' ) + atts.wrapperMarginBottomTabletUnit;

    mobileSelectors['.athemes-blocks-block-container-wrapper']['margin-top'] = get_spacement_value( atts, 'wrapperMarginTop', 'Mobile' ) + atts.wrapperMarginTopMobileUnit;
    mobileSelectors['.athemes-blocks-block-container-wrapper']['margin-bottom'] = get_spacement_value( atts, 'wrapperMarginBottom', 'Mobile' ) + atts.wrapperMarginBottomMobileUnit;

    // Paddings
    desktopSelectors['.athemes-blocks-block-container-wrapper']['padding-top'] = get_spacement_value( atts, 'wrapperPaddingTop', '' ) + atts.wrapperPaddingTopUnit;
    desktopSelectors['.athemes-blocks-block-container-wrapper']['padding-right'] = get_spacement_value( atts, 'wrapperPaddingRight', '' ) + atts.wrapperPaddingRightUnit;
    desktopSelectors['.athemes-blocks-block-container-wrapper']['padding-bottom'] = get_spacement_value( atts, 'wrapperPaddingBottom', '' ) + atts.wrapperPaddingBottomUnit;
    desktopSelectors['.athemes-blocks-block-container-wrapper']['padding-left'] = get_spacement_value( atts, 'wrapperPaddingLeft', '' ) + atts.wrapperPaddingLeftUnit;

    tabletSelectors['.athemes-blocks-block-container-wrapper']['padding-top'] = get_spacement_value( atts, 'wrapperPaddingTop', 'Tablet' ) + atts.wrapperPaddingTopTabletUnit;
    tabletSelectors['.athemes-blocks-block-container-wrapper']['padding-right'] = get_spacement_value( atts, 'wrapperPaddingRight', 'Tablet' ) + atts.wrapperPaddingRightTabletUnit;
    tabletSelectors['.athemes-blocks-block-container-wrapper']['padding-bottom'] = get_spacement_value( atts, 'wrapperPaddingBottom', 'Tablet' ) + atts.wrapperPaddingBottomTabletUnit;
    tabletSelectors['.athemes-blocks-block-container-wrapper']['padding-left'] = get_spacement_value( atts, 'wrapperPaddingLeft', 'Tablet' ) + atts.wrapperPaddingLeftTabletUnit;

    mobileSelectors['.athemes-blocks-block-container-wrapper']['padding-top'] = get_spacement_value( atts, 'wrapperPaddingTop', 'Mobile' ) + atts.wrapperPaddingTopMobileUnit;
    mobileSelectors['.athemes-blocks-block-container-wrapper']['padding-right'] = get_spacement_value( atts, 'wrapperPaddingRight', 'Mobile' ) + atts.wrapperPaddingRightMobileUnit;
    mobileSelectors['.athemes-blocks-block-container-wrapper']['padding-bottom'] = get_spacement_value( atts, 'wrapperPaddingBottom', 'Mobile' ) + atts.wrapperPaddingBottomMobileUnit;
    mobileSelectors['.athemes-blocks-block-container-wrapper']['padding-left'] = get_spacement_value( atts, 'wrapperPaddingLeft', 'Mobile' ) + atts.wrapperPaddingLeftMobileUnit;
    // Container Wrapper - End

    let desktopCss = '';
    desktopCss += mount_css( `.athemes-blocks-block-${props.clientId.substr( 0, 8 )} >`, desktopSelectors, deviceType );

    let tabletCss = '';
    tabletCss += mount_css( `.athemes-blocks-block-${props.clientId.substr( 0, 8 )} >`, tabletSelectors, deviceType );

    let mobileCss = '';
    mobileCss += mount_css( `.athemes-blocks-block-${props.clientId.substr( 0, 8 )} >`, mobileSelectors, deviceType );
    
    return [ desktopCss, tabletCss, mobileCss ];
}

function get_spacement_value( atts, attName, deviceType ) {
    const type = attName.indexOf('Margin') > 0 ? 'margin' : 'padding'; 
    let value = '';

    if( type == 'margin' ) {
        if( atts[ 'wrapperMarginToggle' + deviceType ] ) {
            value = atts['wrapperMarginTopBottom' + deviceType];
        } else {
            value = atts[attName + deviceType];
        }
    } else if( type == 'padding' ) {
        if( atts[ 'wrapperPaddingToggle' + deviceType ] ) {
            value = atts['wrapperPadding' + deviceType];
        } else {
            value = atts[attName + deviceType];
        }
    }

    return value;
}

export default style;