/**
 * aThemes - Pre made background control
 * The purpose is re-use in other blocks if needed
 * 
 */

// WordPress Dependencies
const { __ } = wp.i18n;
const { 
    ColorPaletteControl, 
    MediaUpload 
} = wp.blockEditor;

const { 
    BaseControl, 
    PanelBody, 
    SelectControl, 
    RangeControl, 
    Button, 
    ButtonGroup, 
    Placeholder
} = wp.components;

// Plugin dependencies
import { 
    media_is_image
} from '../../helpers';
 
// <CustomBackgroundControl />
function CustomBackgroundControl( props ) {
    const {
        setAttributes
    } = props.blockProps
        
    return (
        <PanelBody title={ __( 'Background', 'athemes-blocks' ) } initialOpen={ false }>
            <ButtonGroup className="athemes-blocks-button-group-control">
                <Button 
                    isPrimary={ props.blockProps.attributes.wrapperBackgroundType === 'none' }
                    aria-pressed={ props.blockProps.attributes.wrapperBackgroundType === 'none' }
                    onClick={ () => { setAttributes( { wrapperBackgroundType: 'none' } ) } }>
                    { __( 'None', 'athemes-blocks' ) }
                </Button>
                <Button 
                    isPrimary={ props.blockProps.attributes.wrapperBackgroundType === 'color' }
                    aria-pressed={ props.blockProps.attributes.wrapperBackgroundType === 'color' }
                    onClick={ () => { setAttributes( { wrapperBackgroundType: 'color' } ) } }>
                    { __( 'Color', 'athemes-blocks' ) }
                </Button>
                <Button 
                    isPrimary={ props.blockProps.attributes.wrapperBackgroundType === 'gradient' }
                    aria-pressed={ props.blockProps.attributes.wrapperBackgroundType === 'gradient' }
                    onClick={ () => { setAttributes( { wrapperBackgroundType: 'gradient' } ) } }>
                    { __( 'Gradient', 'athemes-blocks' ) }
                </Button>
                <Button 
                    isPrimary={ props.blockProps.attributes.wrapperBackgroundType === 'image' }
                    aria-pressed={ props.blockProps.attributes.wrapperBackgroundType === 'image' }
                    onClick={ () => { setAttributes( { wrapperBackgroundType: 'image' } ) } }>
                    { __( 'Image', 'athemes-blocks' ) }
                </Button>
            </ButtonGroup>
            {props.blockProps.attributes.wrapperBackgroundType == 'color' && (
                <ColorPaletteControl
                    label={ __( 'Background Color', 'athemes-blocks' ) }
                    value={ props.blockProps.attributes.wrapperBackgroundColor }
                    onChange={ (value) => setAttributes( { wrapperBackgroundColor: value } ) }
                />
            )}
            {props.blockProps.attributes.wrapperBackgroundType == 'gradient' && (
                <BaseControl>
                    <ColorPaletteControl
                        label={ __( 'Gradient Color #1', 'athemes-blocks' ) }
                        value={ props.blockProps.attributes.wrapperBackgroundGradientColor1 }
                        onChange={ (value) => value ? setAttributes( { wrapperBackgroundGradientColor1: value } ) : setAttributes( { wrapperBackgroundGradientColor1: '#f4f4f4' } ) }
                    />
                    <ColorPaletteControl
                        label={ __( 'Gradient Color #2', 'athemes-blocks' ) }
                        value={ props.blockProps.attributes.wrapperBackgroundGradientColor2 }
                        onChange={ (value) => value ? setAttributes( { wrapperBackgroundGradientColor2: value } ) : setAttributes( { wrapperBackgroundGradientColor2: '#939393' } ) }
                    />
                    <RangeControl
                        label={ __( 'Degree', 'athemes-blocks' ) }
                        value={ props.blockProps.attributes.wrapperBackgroundGradientDegree }
                        onChange={ ( value ) => setAttributes( { wrapperBackgroundGradientDegree: value } ) }
                        min={ 0 }
                        max={ 360 }
                        allowReset
                        resetFallbackValue={ 45 }
                    />
                    <RangeControl
                        label={ __( 'Color #1 position', 'athemes-blocks' ) }
                        value={ props.blockProps.attributes.wrapperBackgroundGradientColor1Position }
                        onChange={ ( value ) => setAttributes( { wrapperBackgroundGradientColor1Position: value } ) }
                        min={ 0 }
                        max={ 100 }
                        allowReset
                        resetFallbackValue={ 0 }
                    />
                    <RangeControl
                        label={ __( 'Color #2 position', 'athemes-blocks' ) }
                        value={ props.blockProps.attributes.wrapperBackgroundGradientColor2Position }
                        onChange={ ( value ) => setAttributes( { wrapperBackgroundGradientColor2Position: value } ) }
                        min={ 0 }
                        max={ 100 }
                        allowReset
                        resetFallbackValue={ 100 }
                    />
                </BaseControl>
            )}
            {props.blockProps.attributes.wrapperBackgroundType == 'image' && (
                <BaseControl>
                    <Placeholder
                        isColumnLayout
                        style={{ 
                            backgroundColor: "#e7e7e7",
                            backgroundImage: props.blockProps.attributes.wrapperBackgroundImage ? `url(${ props.blockProps.attributes.wrapperBackgroundImage.url })`: 'none', 
                            backgroundSize: 'cover',
                            padding: 0, 
                            display: 'flex', 
                            justifyContent: 'center',
                            boxShadow: 'none' 
                        }}>
                        { !props.blockProps.attributes.wrapperBackgroundImage &&
                        <div style={{ textAlign: 'center' }}>
                            <MediaUpload
                                title={ __( 'Select a image', 'athemes-blocks' ) }
                                onSelect={ (media) => { media_is_image( media, props.blockProps, 'wrapperBackgroundImage' ) } }
                                allowedTypes={ [ "image" ] }
                                value={ props.blockProps.attributes.wrapperBackgroundImage }
                                render={ ( { open } ) => (
                                    <BaseControl>
                                        <Button isSecondary onClick={ open }>
                                            { ! props.blockProps.attributes.wrapperBackgroundImage ? __( 'Select a image', 'athemes-blocks' ) : __( 'Replace image', 'athemes-blocks' ) }
                                        </Button>
                                    </BaseControl>
                                ) }
                            />
                        </div>
                        }
                    </Placeholder>
                    { props.blockProps.attributes.wrapperBackgroundImage &&
                        <BaseControl>
                            <Button 
                                className="athemes-blocks-media-upload-remove-button" 
                                onClick={ () => { setAttributes( { wrapperBackgroundImage: null } ) } } 
                                isLink 
                                isDestructive
                                style={{ marginTop: '10px' }}>
                                { __( 'Remove Image', 'athemes-blocks' ) }
                            </Button>
                        </BaseControl>
                    }
                    { props.blockProps.attributes.wrapperBackgroundImage && (
                        <BaseControl>
                            <SelectControl
                                label={ __( 'Background Size', 'athemes-blocks' ) }
                                value={ props.blockProps.attributes.wrapperBackgroundSize }
                                onChange={ ( value ) => { setAttributes( { wrapperBackgroundSize: value } ) } }
                                options={ [
                                    { value: 'auto', label: __( 'Auto', 'athemes-blocks' ) },
                                    { value: 'contain', label: __( 'Contain', 'athemes-blocks' ) },
                                    { value: 'cover', label: __( 'Cover', 'athemes-blocks' ) }
                                ] }
                            />
                            <SelectControl
                                label={ __( 'Background Position', 'athemes-blocks' ) }
                                value={ props.blockProps.attributes.wrapperBackgroundPosition }
                                onChange={ ( value ) => { setAttributes( { wrapperBackgroundPosition: value } ) } }
                                options={ [
                                    { value: 'top left', label: __( 'Top left', 'athemes-blocks' ) },
                                    { value: 'top center', label: __( 'Top center', 'athemes-blocks' ) },
                                    { value: 'top right', label: __( 'Top right', 'athemes-blocks' ) },
                                    { value: 'center left', label: __( 'Center left', 'athemes-blocks' ) },
                                    { value: 'center center', label: __( 'Center', 'athemes-blocks' ) },
                                    { value: 'center right', label: __( 'Center right', 'athemes-blocks' ) },
                                    { value: 'bottom left', label: __( 'Bottom left', 'athemes-blocks' ) },
                                    { value: 'bottom center', label: __( 'Bottom center', 'athemes-blocks' ) },
                                    { value: 'bottom right', label: __( 'Bottom right', 'athemes-blocks' ) }
                                ] }
                            />
                            <SelectControl
                                label={ __( 'Background Attachment', 'athemes-blocks' ) }
                                value={ props.blockProps.attributes.wrapperBackgroundAttachment }
                                onChange={ ( value ) => { setAttributes( { wrapperBackgroundAttachment: value } ) } }
                                options={ [
                                    { value: 'fixed', label: __( 'Fixed', 'athemes-blocks' ) },
                                    { value: 'scroll', label: __( 'Scroll', 'athemes-blocks' ) }
                                ] }
                            />
                            <SelectControl
                                label={ __( 'Background Repeat', 'athemes-blocks' ) }
                                value={ props.blockProps.attributes.wrapperBackgroundRepeat }
                                onChange={ ( value ) => { setAttributes( { wrapperBackgroundRepeat: value } ) } }
                                options={ [
                                    { value: 'no-repeat', label: __( 'No repeat', 'athemes-blocks' ) },
                                    { value: 'repeat', label: __( 'Repeat', 'athemes-blocks' ) },
                                    { value: 'repeat-x', label: __( 'Repeat X', 'athemes-blocks' ) },
                                    { value: 'repeat-y', label: __( 'Repeat Y', 'athemes-blocks' ) },
                                    { value: 'round', label: __( 'Round', 'athemes-blocks' ) },
                                    { value: 'space', label: __( 'Space', 'athemes-blocks' ) }
                                ] }
                            />
                        </BaseControl>
                    )}
                </BaseControl>
            )}
        </PanelBody>
    );
}

export default CustomBackgroundControl