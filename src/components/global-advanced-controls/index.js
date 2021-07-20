/**
 * aThemes Blocks Component - Global Advanced Controls
 * Render all controls for the "advanced" tab in the inspector controls
 * The purpose is use this component/controls for all blocks
 * 
 */

// WordPress dependencies
const { __ } = wp.i18n
const { 
    BaseControl, 
    PanelBody, 
} = wp.components;

const { useSelect } = wp.data;

// <GlobalAdvancedControls />
function GlobalAdvancedControls( props ) {
    const deviceType = useSelect( ( select ) => {
        return select( 'core/edit-post' ).__experimentalGetPreviewDeviceType();
    }, [] );

    const {
        setAttributes
    } = props.blockProps;

    return (
        <BaseControl>
            <PanelBody title={ __( 'General', 'athemes-blocks' ) } initialOpen={ true }>
                
            </PanelBody>
        </BaseControl>
    );
}
 
export default GlobalAdvancedControls 