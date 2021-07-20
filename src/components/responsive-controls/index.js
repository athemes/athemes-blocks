/**
 * aThemes Blocks Component - Responsive Controls
 * Render and enable the responsive icons/controls
 * 
 */

// WordPress dependencies
const { __ } = wp.i18n;
const {
    ButtonGroup,
    Button,
    Icon,
    BaseControl
} = wp.components;

const { Fragment } = wp.element;

const { 
    useSelect, 
    useDispatch 
} = wp.data;

// Plugin dependencies
import { 
    athemes_icons 
} from '../../helpers';

// External dependencies
import map from 'lodash/map';
 
// <ResponsiveControls />
function ResponsiveControls ( props ) {
    const deviceType = useSelect( ( select ) => {
        return select( 'core/edit-post' ).__experimentalGetPreviewDeviceType();
    }, [] );
    const {
        __experimentalSetPreviewDeviceType: setPreviewDeviceType,
    } = useDispatch( 'core/edit-post' );
    const customSetPreviewDeviceType = ( device ) => {
        setPreviewDeviceType( device );
    };
    const devices = [
        {
            name: 'Desktop',
            key: 'desktop',
            title: <Icon icon={
                <svg width="15" height="15" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" height="24" rx="2" ry="2" width="30" x="1" y="1"/>
                    <polygon fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" points="21 31 11 31 12 25 20 25 21 31"/>
                    <line fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9" x2="23" y1="31" y2="31"/>
                    <line fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="1" x2="31" y1="21" y2="21"/>
                </svg>
            } />,
            itemClass: 'athemes-blocks-device-type-control-icon athemes-blocks-device-type-control-icon-desktop',
        },
        {
            name: 'Tablet',
            key: 'tablet',
            title: <Icon icon={
                <svg width="15" height="15" viewBox="-4 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" height="30" rx="2" ry="2" width="22" x="5" y="1"/>
                    <line fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14" x2="18" y1="27" y2="27"/>
                </svg>
            } />,
            itemClass: 'athemes-blocks-device-type-control-icon athemes-blocks-device-type-control-icon-tablet',
        },
        {
            name: 'Mobile',
            key: 'mobile',
            title: <Icon icon={
                <svg width="15" height="15" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" height="30" rx="2" ry="2" width="18" x="7" y="1"/>
                    <line fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="15" x2="17" y1="27" y2="27"/>
                    <path fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20,1V3a2,2,0,0,1-2,2H14a2,2,0,0,1-2-2V1"/>
                </svg>
            } />,
            itemClass: 'athemes-blocks-device-type-control-icon athemes-blocks-device-type-control-icon-mobile',
        },
    ];
    
    let unitOptions = [];
    if( typeof props.units !== 'undefined' ) {
        props.units.forEach( (unit, i) => {
            unitOptions.push( {
                value: unit,
                key: i
            } );
        } );
    }

    const customSetAttributes = ( props, value, deviceUnit, deviceType ) => {
        if( deviceType == 'Desktop' ) {
            deviceType = '';
        }

        if( typeof props.unitsFor === 'string' ) {
            props.blockProps.setAttributes( { 
                [props.unitsFor + deviceType + deviceUnit]: value,
                [props.unitsFor + deviceType]: value == '%' && props.blockProps.attributes[props.unitsFor + deviceType] > 100 ? 100 : props.blockProps.attributes[props.unitsFor + deviceType]
            } );
        } else {
            props.unitsFor.forEach( (attName) => {
                props.blockProps.setAttributes( { 
                    [attName + deviceType + deviceUnit]: value,
                    [attName + deviceType]: value == '%' && props.blockProps.attributes[attName + deviceType] > 100 ? 100 : props.blockProps.attributes[attName + deviceType] 
                } );
            } );
        }
    }

    const customGetValue = ( props, deviceType, deviceUnit ) => {
        if( deviceType == 'Desktop' ) {
            deviceType = '';
        }

        if( deviceUnit ) {
            deviceUnit = 'Unit';
        }
        
        let value = '';
        if( typeof props.unitsFor === 'string' ) {
            value = props.blockProps.attributes[props.unitsFor + deviceType + deviceUnit];
        } else {
            const attName = props.unitsFor[0];
            value = props.blockProps.attributes[attName + deviceType + deviceUnit];
        }

        return value;
    }

    let currentUnit = '';
    if( typeof props.unitsFor !== 'undefined' ) {
        currentUnit = customGetValue( props, deviceType, true );
    }

    return (
        <div className={ 'athemes-blocks-device-type-control' }>
            <div className={ `athemes-blocks-device-type-control-wrapper${ unitOptions.length == 0 || typeof props.toggleSpacement === 'undefined' ? ' no-units' : ' with-units' }` }>
                {
                    typeof props.unitsFor !== 'undefined' && (
                        <ButtonGroup className="components-tab-panel__tabs athemes-blocks-unit-control-group" aria-label={ __( 'Units', 'athemes-blocks' ) }>
                            { map( unitOptions, ( { value, key } ) => (
                                <Button
                                    key={ key }
                                    className={ `components-button components-tab-panel__tabs-item athemes-blocks-unit-control-icon${ currentUnit == value ? ` active` : `` }` }
                                    aria-pressed={ value }
                                    onClick={ () => customSetAttributes( props, value, 'Unit', deviceType ) }
                                >
                                    { value }
                                </Button>
                            ) ) }
                        </ButtonGroup>
                    )
                }
                <ButtonGroup className="components-tab-panel__tabs athemes-blocks-devicetype-control-group" aria-label={ __( 'Device', 'athemes-blocks' ) }>
                   { map( devices, ( { name, key, title, itemClass } ) => (
                        <Button
                            key={ key }
                            className={ `components-button components-tab-panel__tabs-item ${ itemClass }${ name === deviceType ? ' active-tab' : '' }` }
                            aria-pressed={ deviceType === name }
                            onClick={ () => customSetPreviewDeviceType( name ) }
                        >
                            { title }
                        </Button>
                    ) ) }
                </ButtonGroup>
                { deviceType === 'Desktop' && props.toggleSpacement === 'margin' && (
                    <Button 
                        className="athemes-blocks-spacement-toggle-icon"
                        aria-pressed={ props.blockProps.attributes.wrapperMarginToggle !== false }
                        onClick={ () => { props.blockProps.setAttributes( { wrapperMarginToggle: props.blockProps.attributes.wrapperMarginToggle ? false : true } ) } }>
                        { props.blockProps.attributes.wrapperMarginToggle && (
                            athemes_icons( 'link' )
                        )}
                        { !props.blockProps.attributes.wrapperMarginToggle && (
                            athemes_icons( 'broken-link' )
                        )}
                    </Button>    
                ) }
                { deviceType === 'Tablet' && props.toggleSpacement === 'margin' && (
                    <Button 
                        className="athemes-blocks-spacement-toggle-icon"
                        aria-pressed={ props.blockProps.attributes.wrapperMarginToggleTablet !== false }
                        onClick={ () => { props.blockProps.setAttributes( { wrapperMarginToggleTablet: props.blockProps.attributes.wrapperMarginToggleTablet ? false : true } ) } }>
                        { props.blockProps.attributes.wrapperMarginToggleTablet && (
                            athemes_icons( 'link' )
                        )}
                        { !props.blockProps.attributes.wrapperMarginToggleTablet && (
                            athemes_icons( 'broken-link' )
                        )}
                    </Button>    
                ) }
                { deviceType === 'Mobile' && props.toggleSpacement === 'margin' && (
                    <Button 
                        className="athemes-blocks-spacement-toggle-icon"
                        aria-pressed={ props.blockProps.attributes.wrapperMarginToggleMobile !== false }
                        onClick={ () => { props.blockProps.setAttributes( { wrapperMarginToggleMobile: props.blockProps.attributes.wrapperMarginToggleMobile ? false : true } ) } }>
                        { props.blockProps.attributes.wrapperMarginToggleMobile && (
                            athemes_icons( 'link' )
                        )}
                        { !props.blockProps.attributes.wrapperMarginToggleMobile && (
                            athemes_icons( 'broken-link' )
                        )}
                    </Button>    
                ) }
                { deviceType === 'Desktop' && props.toggleSpacement === 'padding' && (
                    <Button 
                        className="athemes-blocks-spacement-toggle-icon"
                        aria-pressed={ props.blockProps.attributes.wrapperPaddingToggle !== false }
                        onClick={ () => { props.blockProps.setAttributes( { wrapperPaddingToggle: props.blockProps.attributes.wrapperPaddingToggle ? false : true } ) } }>
                        { props.blockProps.attributes.wrapperPaddingToggle && (
                            athemes_icons( 'link' )
                        )}
                        { !props.blockProps.attributes.wrapperPaddingToggle && (
                            athemes_icons( 'broken-link' )
                        )}
                    </Button>
                ) }
                { deviceType === 'Tablet' && props.toggleSpacement === 'padding' && (
                    <Button 
                        className="athemes-blocks-spacement-toggle-icon"
                        aria-pressed={ props.blockProps.attributes.wrapperPaddingToggleTablet !== false }
                        onClick={ () => { props.blockProps.setAttributes( { wrapperPaddingToggleTablet: props.blockProps.attributes.wrapperPaddingToggleTablet ? false : true } ) } }>
                        { props.blockProps.attributes.wrapperPaddingToggleTablet && (
                            athemes_icons( 'link' )
                        )}
                        { !props.blockProps.attributes.wrapperPaddingToggleTablet && (
                            athemes_icons( 'broken-link' )
                        )}
                    </Button>
                ) }
                { deviceType === 'Mobile' && props.toggleSpacement === 'padding' && (
                    <Button 
                        className="athemes-blocks-spacement-toggle-icon"
                        aria-pressed={ props.blockProps.attributes.wrapperPaddingToggleMobile !== false }
                        onClick={ () => { props.blockProps.setAttributes( { wrapperPaddingToggleMobile: props.blockProps.attributes.wrapperPaddingToggleMobile ? false : true } ) } }>
                        { props.blockProps.attributes.wrapperPaddingToggleMobile && (
                            athemes_icons( 'link' )
                        )}
                        { !props.blockProps.attributes.wrapperPaddingToggleMobile && (
                            athemes_icons( 'broken-link' )
                        )}
                    </Button>
                ) }
            </div>
        </div>
    );
}

export default ResponsiveControls 