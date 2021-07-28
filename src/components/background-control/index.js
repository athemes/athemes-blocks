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
                                label={ __( 'Background Image Type', 'athemes-blocks' ) }
                                value={ props.blockProps.attributes.wrapperBackgroundImageType }
                                onChange={ ( value ) => { setAttributes( { wrapperBackgroundImageType: value } ) } }
                                options={ [
                                    { value: 'contain', label: __( 'Contain', 'athemes-blocks' ) },
                                    { value: 'cover', label: __( 'Cover', 'athemes-blocks' ) }
                                ] }
                            />
                            <SelectControl
                                label={ __( 'Background Position', 'athemes-blocks' ) }
                                value={ props.blockProps.attributes.wrapperBackgroundPosition }
                                onChange={ ( value ) => { setAttributes( { wrapperBackgroundPosition: value } ) } }
                                options={ 
                                    'cover' === props.blockProps.attributes.wrapperBackgroundImageType ?
                                        [
                                            { value: 'top', label: __( 'Top', 'athemes-blocks' ) },
                                            { value: 'center', label: __( 'Center', 'athemes-blocks' ) },
                                            { value: 'bottom', label: __( 'Bottom', 'athemes-blocks' ) }
                                        ]
                                    :
                                        [
                                            { value: 'center', label: __( 'Center', 'athemes-blocks' ) },
                                            { value: 'left', label: __( 'Left', 'athemes-blocks' ) },
                                            { value: 'right', label: __( 'Right', 'athemes-blocks' ) }
                                        ]
                                }
                            />
                            {
                                'cover' === props.blockProps.attributes.wrapperBackgroundImageType && (
                                    <SelectControl
                                        label={ __( 'Background Effect', 'athemes-blocks' ) }
                                        value={ props.blockProps.attributes.wrapperBackgroundEffect }
                                        onChange={ ( value ) => { setAttributes( { wrapperBackgroundEffect: value } ) } }
                                        options={ [
                                            { value: 'parallax', label: __( 'Fixed / Parallax', 'athemes-blocks' ) },
                                            { value: 'scroll', label: __( 'Scroll', 'athemes-blocks' ) }
                                        ] }
                                    />
                                )
                            }
                            
                        </BaseControl>
                    )}
                </BaseControl>
            )}
        </PanelBody>
    );
}

export default CustomBackgroundControl