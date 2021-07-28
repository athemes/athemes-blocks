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

// <GlobalAdvancedControls />
function GlobalAdvancedControls( props ) {

    const {
        deviceType
    } = props.blockProps.attributes

    return (
        <BaseControl>
            <PanelBody title={ __( 'General', 'athemes-blocks' ) } initialOpen={ true }>
                
            </PanelBody>
        </BaseControl>
    );
}
 
export default GlobalAdvancedControls 