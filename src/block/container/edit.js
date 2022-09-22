/**
 * aThemes - Container Block (edit)
 * 
 */

// WordPress Dependencies
const { __ } = wp.i18n;
const { 
    InnerBlocks, 
    InspectorControls, 
    BlockControls, 
    BlockAlignmentToolbar
} = wp.blockEditor;

const { 
    BaseControl, 
    PanelBody, 
    RangeControl, 
    Button, 
    ButtonGroup, 
    Dashicon, 
} = wp.components;

const { compose } = wp.compose;
const { withSelect } = wp.data;
const { useEffect, Fragment } = wp.element;

// Plugin dependencies
import { 
    toggle_editor_athemes_block_selected_class,
    athemes_icons 
} from '../../helpers';

import { 
    PanelTabsButtons, 
    PanelTabsContent, 
    ResponsiveControls, 
    CustomBackgroundControl,
    withCustomAdvancedControls
} from '../../components/';

// Block dependencies
import style from './style.js';

// Check if element is in viewport of gutenberg editor
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect(),
        gbEditor = document.querySelector('.interface-interface-skeleton__content').getBoundingClientRect(),
        elemTop = rect.top,
        elemBottom = rect.bottom,
        isVisible = elemTop < gbEditor.height && elemBottom >= 0;

    return isVisible;
}

// Edit
const edit = ( props ) => {

    const self = this;
    const {
        setAttributes
    } = props
    const {
        deviceType
    } = props.attributes

    // Parallax Effect
    this.parallaxEventHandler = (el) => {
        if( isElementInViewport( el ) ) {
            var top = el.getBoundingClientRect().top / 10;
            el.style = 'transform: translate3d(0, '+ ( top ) +'px, 0);';
        }
    }

    useEffect(() => {

        // Block ID
        setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

        // Set block class in the inspector wrapper
        toggle_editor_athemes_block_selected_class( props );
        
        // Parallax
        const editorWindow = document.querySelector('.interface-interface-skeleton__content');
        
        if( editorWindow !== null && props.attributes.wrapperBackgroundImageType == 'cover' && props.attributes.wrapperBackgroundEffect == 'parallax' ) {
            const el = document.querySelector(`#athemes-blocks-block-${ props.clientId.substr( 0, 8 ) } .athemes-blocks-block-container-bg-cover.athemes-blocks-block-container-bg-effect-parallax .athemes-blocks-background-image`);

            setTimeout(function(){
                editorWindow.addEventListener( 'scroll', function() {
                    self.parallaxEventHandler(el);
                } );
            }, 1500);
        }

    });

    let css       = style( props, deviceType ),
        appendCSS = '';

    if( deviceType == 'Desktop' ) {
        appendCSS = css[0];
    } else if( deviceType == 'Tablet' ) {
        appendCSS = css[1];
    } else if( deviceType == 'Mobile' ) {
        appendCSS = css[2];
    }

    if( document.querySelector(`#athemes-blocks-block-${ deviceType.toLowerCase() }-${ props.clientId.substr( 0, 8 ) }`) == null ) {
        const stylesheet = document.createElement( "style" )
        stylesheet.setAttribute( "id", `athemes-blocks-block-${ deviceType.toLowerCase() }-${ props.clientId.substr( 0, 8 ) }` )
        document.head.appendChild( stylesheet )

        stylesheet.innerHTML = appendCSS;
    } else {
        document.querySelector(`#athemes-blocks-block-${ deviceType.toLowerCase() }-${ props.clientId.substr( 0, 8 ) }`).innerHTML = appendCSS;
    }

    let backgroundImageAtts = '';
    if( props.attributes.wrapperBackgroundType == 'image' && props.attributes.wrapperBackgroundImage != null ) {
        const imageSizes = props.attributes.wrapperBackgroundImage.sizes;
        
        let srcset = '',
            sizes  = '';

        for( let key in imageSizes ) {
            srcset += `${ imageSizes[ key ].url } ${ imageSizes[ key ].width }w, `;
        }

        sizes += `(max-width: ${ props.attributes.wrapperBackgroundImage.width }px) 100vw, ${ props.attributes.wrapperBackgroundImage.width }px`;

        backgroundImageAtts = {
            className: 'athemes-blocks-background-image',
            width: props.attributes.wrapperBackgroundImage.width,
            height: props.attributes.wrapperBackgroundImage.height,
            loading: 'lazy',
            src: props.attributes.wrapperBackgroundImage.originalImageURL,
            srcSet: srcset,
            sizes: sizes,
            alt: props.attributes.wrapperBackgroundImage.alt
        }
    }

    return (
        <Fragment>
            <BlockControls>
                <BlockAlignmentToolbar
                    value={ props.attributes.align }
                    onChange={ value => {
                        setAttributes( { align: value } )
                    } }
                    controls={ [ 'center', 'wide', 'full' ] }
                />
            </BlockControls>
            <InspectorControls>
                <PanelTabsButtons blockProps={ props } dataExclude="settings" />

                <PanelTabsContent blockProps={ props } dataTabID="style">
                    <PanelBody title={ __( 'General', 'athemes-blocks' ) } initialOpen={ false }>
                        <ResponsiveControls 
                            blockProps={ props } 
                            unitsFor="contentWidthSize" 
                            units={ ['px', '%'] } />

                        { "Desktop" === deviceType && (
                        <RangeControl
                            label={ __( 'Content Width', 'athemes-blocks' ) }
                            value={ props.attributes.contentWidthSize }
                            onChange={ ( value ) => setAttributes( { contentWidthSize: value } ) }
                            min={ 1 }
                            max={ props.attributes.contentWidthSizeUnit == 'px' ? 2000 : 100 }
                        /> )}
                        { "Tablet" === deviceType && (
                        <RangeControl
                            label={ __( 'Content Width', 'athemes-blocks' ) }
                            value={ props.attributes.contentWidthSizeTablet }
                            onChange={ ( value ) => setAttributes( { contentWidthSizeTablet: value } ) }
                            min={ 1 }
                            max={ props.attributes.contentWidthSizeTabletUnit == 'px' ? 2000 : 100 }
                        /> )}
                        { "Mobile" === deviceType && (
                        <RangeControl
                            label={ __( 'Content Width', 'athemes-blocks' ) }
                            value={ props.attributes.contentWidthSizeMobile }
                            onChange={ ( value ) => setAttributes( { contentWidthSizeMobile: value } ) }
                            min={ 1 }
                            max={ props.attributes.contentWidthSizeMobileUnit == 'px' ? 2000 : 100 }
                        /> )}

                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ __( 'Border Radius', 'athemes-blocks' ) }
                                value={ props.attributes.wrapperBorderRadius }
                                onChange={ ( value ) => setAttributes( { wrapperBorderRadius: value } ) }
                                min={ 0 }
                                max={ 35 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl>
                        
                        <BaseControl 
                            className="athemes-blocks-base-control" 
                            help={ __( 'Moves the block to backward or forward', 'athemes-blocks' ) }>
                            <RangeControl
                                label={ __( 'Z-index', 'athemes-blocks' ) }
                                value={ props.attributes.wrapperZindex }
                                onChange={ ( value ) => setAttributes( { wrapperZindex: value } ) }
                                min={ -1 }
                                max={ 10 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl>
                        
                        <ResponsiveControls blockProps={ props } />
                        <BaseControl 
                            className="athemes-blocks-base-control"
                            label={ __( 'Content Alignment', 'athemes-blocks' ) } />
                        { "Desktop" === deviceType && (
                        <ButtonGroup className="athemes-blocks-button-group-control">
                            <Button 
                                isPrimary={ props.attributes.wrapperContentAlignment === 'flex-start' }
                                aria-pressed={ props.attributes.wrapperContentAlignment === 'flex-start' }
                                onClick={ () => { setAttributes( { wrapperContentAlignment: 'flex-start' } ) } }>
                                <Dashicon 
                                    icon="editor-alignleft" 
                                    style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                />
                            </Button>
                            <Button 
                                isPrimary={ props.attributes.wrapperContentAlignment === 'center' }
                                aria-pressed={ props.attributes.wrapperContentAlignment === 'center' }
                                onClick={ () => { setAttributes( { wrapperContentAlignment: 'center' } ) } }>
                                <Dashicon 
                                    icon="editor-aligncenter" 
                                    style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                />
                            </Button>
                            <Button 
                                isPrimary={ props.attributes.wrapperContentAlignment === 'flex-end' }
                                aria-pressed={ props.attributes.wrapperContentAlignment === 'flex-end' }
                                onClick={ () => { setAttributes( { wrapperContentAlignment: 'flex-end' } ) } }>
                                <Dashicon 
                                    icon="editor-alignright" 
                                    style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                />
                            </Button>
                        </ButtonGroup> )}
                        { "Tablet" === deviceType && (
                        <ButtonGroup className="athemes-blocks-button-group-control">
                            <Button 
                                isPrimary={ props.attributes.wrapperContentAlignmentTablet === 'flex-start' }
                                aria-pressed={ props.attributes.wrapperContentAlignmentTablet === 'flex-start' }
                                onClick={ () => { setAttributes( { wrapperContentAlignmentTablet: 'flex-start' } ) } }>
                                <Dashicon 
                                    icon="editor-alignleft" 
                                    style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                />
                            </Button>
                            <Button 
                                isPrimary={ props.attributes.wrapperContentAlignmentTablet === 'center' }
                                aria-pressed={ props.attributes.wrapperContentAlignmentTablet === 'center' }
                                onClick={ () => { setAttributes( { wrapperContentAlignmentTablet: 'center' } ) } }>
                                <Dashicon 
                                    icon="editor-aligncenter" 
                                    style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                />
                            </Button>
                            <Button 
                                isPrimary={ props.attributes.wrapperContentAlignmentTablet === 'flex-end' }
                                aria-pressed={ props.attributes.wrapperContentAlignmentTablet === 'flex-end' }
                                onClick={ () => { setAttributes( { wrapperContentAlignmentTablet: 'flex-end' } ) } }>
                                <Dashicon 
                                    icon="editor-alignright" 
                                    style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                />
                            </Button>
                        </ButtonGroup> )}
                        { "Mobile" === deviceType && (
                        <ButtonGroup className="athemes-blocks-button-group-control">
                            <Button 
                                isPrimary={ props.attributes.wrapperContentAlignmentMobile === 'flex-start' }
                                aria-pressed={ props.attributes.wrapperContentAlignmentMobile === 'flex-start' }
                                onClick={ () => { setAttributes( { wrapperContentAlignmentMobile: 'flex-start' } ) } }>
                                <Dashicon 
                                    icon="editor-alignleft" 
                                    style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                />
                            </Button>
                            <Button 
                                isPrimary={ props.attributes.wrapperContentAlignmentMobile === 'center' }
                                aria-pressed={ props.attributes.wrapperContentAlignmentMobile === 'center' }
                                onClick={ () => { setAttributes( { wrapperContentAlignmentMobile: 'center' } ) } }>
                                <Dashicon 
                                    icon="editor-aligncenter" 
                                    style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                />
                            </Button>
                            <Button 
                                isPrimary={ props.attributes.wrapperContentAlignmentMobile === 'flex-end' }
                                aria-pressed={ props.attributes.wrapperContentAlignmentMobile === 'flex-end' }
                                onClick={ () => { setAttributes( { wrapperContentAlignmentMobile: 'flex-end' } ) } }>
                                <Dashicon 
                                    icon="editor-alignright" 
                                    style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                />
                            </Button>
                        </ButtonGroup> )}

                        <BaseControl 
                            label={ __( 'Display On', 'athemes-blocks' ) }
                        >
                            <ButtonGroup className="athemes-blocks-button-group-control">
                                <Button 
                                    title={ __( 'Desktop', 'athemes-blocks' ) }
                                    isPrimary={ props.attributes.displayOnDesktop === true }
                                    aria-pressed={ props.attributes.displayOnDesktop === true }
                                    onClick={ () => { setAttributes( { displayOnDesktop: ! props.attributes.displayOnDesktop } ) } }>
                                    <Dashicon 
                                        icon="desktop" 
                                        style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                    />
                                </Button>
                                <Button 
                                    title={ __( 'Tablet', 'athemes-blocks' ) }
                                    isPrimary={ props.attributes.displayOnTablet === true }
                                    aria-pressed={ props.attributes.displayOnTablet === true }
                                    onClick={ () => { setAttributes( { displayOnTablet: ! props.attributes.displayOnTablet } ) } }>
                                    <Dashicon 
                                        icon="tablet" 
                                        style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                    />
                                </Button>
                                <Button 
                                    title={ __( 'Mobile', 'athemes-blocks' ) }
                                    isPrimary={ props.attributes.displayOnMobile === true }
                                    aria-pressed={ props.attributes.displayOnMobile === true }
                                    onClick={ () => { setAttributes( { displayOnMobile: ! props.attributes.displayOnMobile } ) } }>
                                    <Dashicon 
                                        icon="smartphone"
                                        style={{ fontSize: '18px', width: '18px', height: '18px' }}
                                    />
                                </Button>
                            </ButtonGroup>
                        </BaseControl>
                    </PanelBody>

                    <CustomBackgroundControl blockProps={ props } />

                    <PanelBody title={ __( 'Spacing', 'athemes-blocks' ) } initialOpen={ false }>
                        <ResponsiveControls 
                            blockProps={ props } 
                            unitsFor={ ['wrapperPaddingTop', 'wrapperPaddingRight', 'wrapperPaddingBottom', 'wrapperPaddingLeft', 'wrapperPadding'] } 
                            units={ ['px', '%', 'rem', 'em', 'vw'] } 
                            toggleSpacement="padding" />

                        <BaseControl 
                            className="athemes-blocks-base-control"
                            label={ __( 'Paddings', 'athemes-blocks' ) } /> 

                        { "Desktop" === deviceType && props.attributes.wrapperPaddingToggle === true && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'padding-all' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPadding }
                                onChange={ ( value ) => setAttributes( { wrapperPadding: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl> )}
                        { "Desktop" === deviceType && props.attributes.wrapperPaddingToggle === false && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'padding-top' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingTop }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingTop: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingTopUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 75 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'padding-right' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingRight }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingRight: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingRightUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'padding-bottom' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingBottom }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingBottom: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingBottomUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 75 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'padding-left' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingLeft }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingLeft: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingLeftUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 0 }
                            /> 
                        </BaseControl> )}
                        { "Tablet" === deviceType && props.attributes.wrapperPaddingToggleTablet === true && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'padding-all' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingTablet }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingTablet: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingTabletUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl> )}
                        { "Tablet" === deviceType && props.attributes.wrapperPaddingToggleTablet === false && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'padding-top' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingTopTablet }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingTopTablet: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingTopTabletUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 75 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'padding-right' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingRightTablet }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingRightTablet: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingRightTabletUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'padding-bottom' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingBottomTablet }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingBottomTablet: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingBottomTabletUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 75 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'padding-left' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingLeftTablet }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingLeftTablet: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingLeftTabletUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 0 }
                            /> 
                        </BaseControl> )}
                        { "Mobile" === deviceType && props.attributes.wrapperPaddingToggleMobile === true && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'padding-all' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingMobile }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingMobile: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingMobileUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl> )}
                        { "Mobile" === deviceType && props.attributes.wrapperPaddingToggleMobile === false && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'padding-top' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingTopMobile }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingTopMobile: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingTopMobileUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 75 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'padding-right' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingRightMobile }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingRightMobile: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingRightMobileUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'padding-bottom' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingBottomMobile }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingBottomMobile: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingBottomMobileUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 75 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'padding-left' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperPaddingLeftMobile }
                                onChange={ ( value ) => setAttributes( { wrapperPaddingLeftMobile: value } ) }
                                min={ 0 }
                                max={ props.attributes.wrapperPaddingLeftMobileUnit == 'px' ? 500 : 100 }
                                allowReset
                                resetFallbackValue={ 0 }
                            /> 
                        </BaseControl> )}

                        <ResponsiveControls 
                            blockProps={ props } 
                            unitsFor={ ['wrapperMarginTop', 'wrapperMarginBottom', 'wrapperMarginTopBottom'] } 
                            units={ ['px', '%', 'rem', 'em', 'vw'] } 
                            toggleSpacement="margin" />

                        <BaseControl 
                            className="athemes-blocks-base-control"
                            label={ __( 'Margins', 'athemes-blocks' ) } /> 
                                                        
                        { "Desktop" === deviceType && props.attributes.wrapperMarginToggle === true && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'margin-top-bottom' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperMarginTopBottom }
                                onChange={ ( value ) => setAttributes( { wrapperMarginTopBottom: value } ) }
                                min={ -500 }
                                max={ 500 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl> )}
                        { "Desktop" === deviceType && props.attributes.wrapperMarginToggle === false && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'margin-top' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperMarginTop }
                                onChange={ ( value ) => setAttributes( { wrapperMarginTop: value } ) }
                                min={ -500 }
                                max={ 500 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'margin-bottom' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperMarginBottom }
                                onChange={ ( value ) => setAttributes( { wrapperMarginBottom: value } ) }
                                min={ -500 }
                                max={ 500 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl> )}
                        { "Tablet" === deviceType && props.attributes.wrapperMarginToggleTablet === true && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'margin-top-bottom' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperMarginTopBottomTablet }
                                onChange={ ( value ) => setAttributes( { wrapperMarginTopBottomTablet: value } ) }
                                min={ -500 }
                                max={ 500 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl> )}
                        { "Tablet" === deviceType && props.attributes.wrapperMarginToggleTablet === false && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'margin-top' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperMarginTopTablet }
                                onChange={ ( value ) => setAttributes( { wrapperMarginTopTablet: value } ) }
                                min={ -500 }
                                max={ 500 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'margin-bottom' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperMarginBottomTablet }
                                onChange={ ( value ) => setAttributes( { wrapperMarginBottomTablet: value } ) }
                                min={ -500 }
                                max={ 500 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl> )}
                        { "Mobile" === deviceType && props.attributes.wrapperMarginToggleMobile === true && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'margin-top-bottom' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperMarginTopBottomMobile }
                                onChange={ ( value ) => setAttributes( { wrapperMarginTopBottomMobile: value } ) }
                                min={ -500 }
                                max={ 500 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl> )}
                        { "Mobile" === deviceType && props.attributes.wrapperMarginToggleMobile === false && (
                        <BaseControl className="athemes-blocks-base-control">
                            <RangeControl
                                label={ athemes_icons( 'margin-top' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperMarginTopMobile }
                                onChange={ ( value ) => setAttributes( { wrapperMarginTopMobile: value } ) }
                                min={ -500 }
                                max={ 500 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                            <RangeControl
                                label={ athemes_icons( 'margin-bottom' ) }
                                className={ "athemes-blocks-spacement-control" }
                                value={ props.attributes.wrapperMarginBottomMobile }
                                onChange={ ( value ) => setAttributes( { wrapperMarginBottomMobile: value } ) }
                                min={ -500 }
                                max={ 500 }
                                allowReset
                                resetFallbackValue={ 0 }
                            />
                        </BaseControl>)}
                    </PanelBody>
                </PanelTabsContent>

                <PanelTabsContent blockProps={ props } dataTabID="advanced">
                    { /* Future global advanced controls goes here along with default GB advanced panel */ }
                </PanelTabsContent>
            </InspectorControls>

            <div className={ `athemes-blocks-editor-preview-${ deviceType.toLowerCase() }` }>
                <div id={ props.attributes.wrapperID ? props.attributes.wrapperID : `athemes-blocks-block-${props.clientId.substr( 0, 8 )}` } className={ `athemes-blocks-block athemes-blocks-block-${props.clientId.substr( 0, 8 )} athemes-blocks-block-container` }>
                    <div className={ `athemes-blocks-block-container-wrapper athemes-blocks-block-container-bg-${ props.attributes.wrapperBackgroundImageType } athemes-blocks-block-container-bg-effect-${ props.attributes.wrapperBackgroundEffect }` }>
                        {
                            props.attributes.wrapperBackgroundType == 'image' && props.attributes.wrapperBackgroundImage != null && (
                                <img { ...backgroundImageAtts } />
                            )
                        }
                        <div className="athemes-blocks-block-container-wrapper-content">
                            <InnerBlocks
                                templateLock={ false }
                                renderAppender={ () => ! props.hasInnerBlocks ? <InnerBlocks.ButtonBlockAppender /> : <InnerBlocks.DefaultBlockAppender /> }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default compose(
    withSelect( ( props ) => { 
        return {
            deviceType: props.deviceType
        }
    }),
    withCustomAdvancedControls()
)(edit);