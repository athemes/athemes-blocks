/**
 * aThemes - Google Map Block (edit)
 */

// WordPress dependencies
import {
    __
} from '@wordpress/i18n';

import {
    useBlockProps,
    InspectorControls
} from '@wordpress/block-editor';

import {
    PanelBody,
    TextControl,
    RangeControl,
    ToggleControl,
    TextareaControl
} from '@wordpress/components';

import {
    RawHTML,
    useEffect
} from '@wordpress/element';

// Plugin dependencies
import style from './style.js';

import { 
    ResponsiveControls
} from '../../components/';

const edit = ( props ) => {

    const blockProps = useBlockProps();

    const { 'data-title': blockTitle } = blockProps;

    const { attributes, setAttributes } = props;

    const { iframe, deviceType } = attributes;

    const blockClassName = `athemes-blocks-block athemes-blocks-block-${props.clientId.substr( 0, 8 )} athemes-blocks-block-google-map`;

    useEffect(() => {
      setAttributes({ block_id: props.clientId.substr( 0, 8 ) });
    });

    let css = style( props, deviceType ),
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

    return (
        <div { ...blockProps }>
            <InspectorControls>
                <PanelBody title={ __( 'Settings', 'athemes-blocks' ) }>
                    <TextareaControl
                        label={ __( 'Iframe Embed Code', 'athemes-blocks' ) }
                        value={ iframe }
                        rows="7"
                        onChange={ (value) => { setAttributes({ iframe: value }) } }
                    />
                    <ResponsiveControls 
                        blockProps={ props } 
                        unitsFor="contentWidthSize" 
                        units={ ['%', 'px'] }
                    />
                    { "Desktop" === deviceType && (
                        <RangeControl
                            label={ __( 'Width', 'athemes-blocks' ) }
                            value={ props.attributes.contentWidthSize }
                            onChange={ ( value ) => setAttributes( { contentWidthSize: value } ) }
                            min={ 1 }
                            max={ props.attributes.contentWidthSizeUnit === '%' ? 100 : 2000 }
                        />
                    )}
                    { "Tablet" === deviceType && (
                        <RangeControl
                            label={ __( 'Width', 'athemes-blocks' ) }
                            value={ props.attributes.contentWidthSizeTablet }
                            onChange={ ( value ) => setAttributes( { contentWidthSizeTablet: value } ) }
                            min={ 1 }
                            max={ props.attributes.contentWidthSizeTabletUnit === '%' ? 100 : 2000 }
                        />
                    )}
                    { "Mobile" === deviceType && (
                        <RangeControl
                            label={ __( 'Width', 'athemes-blocks' ) }
                            value={ props.attributes.contentWidthSizeMobile }
                            onChange={ ( value ) => setAttributes( { contentWidthSizeMobile: value } ) }
                            min={ 1 }
                            max={ props.attributes.contentWidthSizeMobileUnit === '%' ? 100 : 2000 }
                        />
                    )}

                    <ResponsiveControls 
                        blockProps={ props } 
                        unitsFor="contentHeightSize" 
                        units={ ['px'] }
                    />
                    { "Desktop" === deviceType && (
                        <RangeControl
                            label={ __( 'Height', 'athemes-blocks' ) }
                            value={ props.attributes.contentHeightSize }
                            onChange={ ( value ) => setAttributes( { contentHeightSize: value } ) }
                            min={ 1 }
                            max={ 2000 }
                        />
                    )}
                    { "Tablet" === deviceType && (
                        <RangeControl
                            label={ __( 'Height', 'athemes-blocks' ) }
                            value={ props.attributes.contentHeightSizeTablet }
                            onChange={ ( value ) => setAttributes( { contentHeightSizeTablet: value } ) }
                            min={ 1 }
                            max={ 2000 }
                        />
                    )}
                    { "Mobile" === deviceType && (
                        <RangeControl
                            label={ __( 'Height', 'athemes-blocks' ) }
                            value={ props.attributes.contentHeightSizeMobile }
                            onChange={ ( value ) => setAttributes( { contentHeightSizeMobile: value } ) }
                            min={ 1 }
                            max={ 2000 }
                        />
                    )}

                </PanelBody>
            </InspectorControls>
            <div className={ `athemes-blocks-editor athemes-blocks-editor-preview-${ deviceType.toLowerCase() }` }>
                <RawHTML className={ blockClassName }>{ iframe }</RawHTML>
            </div>
        </div>
    );

}

export default edit;