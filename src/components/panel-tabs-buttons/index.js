/**
 * aThemes Blocks Component - Tabs Buttons
 * Control to render the tabs buttons at inspector controls
 * Should be used in conjuction with panel tabs content control
 * 
 */

// WordPress dependencies
const { __ } = wp.i18n;

// Plugin dependencies
import { athemes_icons } from '../../helpers';
 
// <PanelTabsButtons />
function PanelTabsButtons( props ) {
    const {
        setAttributes
    } = props.blockProps

    return (
        <div className="athemes-blocks-inspector-tabs-buttons-wrapper">
            { props.dataExclude != 'settings' && (
            <button className="athemes-blocks-inspector-tabs-button-layout" onClick={() => setAttributes( { tabSelected: 'settings' } )}>
                { athemes_icons( 'settings' ) }
                { __( 'Settings', 'athemes-blocks' ) }
            </button>
            )}
            { props.dataExclude != 'style' && (
            <button className="athemes-blocks-inspector-tabs-button-style" onClick={() => setAttributes( { tabSelected: 'style' } )}>
                { athemes_icons( 'style' ) }
                { __( 'Style', 'athemes-blocks' ) }
            </button>
            )}
            { props.dataExclude != 'advanced' && (
            <button className="athemes-blocks-inspector-tabs-button-advanced" onClick={() => setAttributes( { tabSelected: 'advanced' } )}>
                { athemes_icons( 'advanced' ) }
                { __( 'Advanced', 'athemes-blocks' ) }
            </button>
            )}
        </div>
    );
}

export default PanelTabsButtons