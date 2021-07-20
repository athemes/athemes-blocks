/**
 * aThemes - Custom Advanced Controls
 * Extend the default GB "Advanced" box with new controls
 * 
 */

/**
 * WordPress Dependencies
 */
 const { __ } = wp.i18n;
 const { Fragment }	= wp.element;
 const { InspectorAdvancedControls } = wp.editor;
 const { createHigherOrderComponent } = wp.compose;
 const { BaseControl, TextControl } = wp.components;

const withCustomAdvancedControls = () => createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
         const {
            setAttributes,
         } = props;         

         return (
             <Fragment>
                <BlockEdit {...props} />
                <InspectorAdvancedControls>
                    <BaseControl>
                        <TextControl
                            label={ __( 'Element ID', 'athemes-blocks' ) }
                            onChange={ (value) => { setAttributes( { wrapperID: value } ) } }
                            type="text"
                            value={ props.attributes.wrapperID }
                        />
                    </BaseControl>
                </InspectorAdvancedControls>
             </Fragment>
         );
     };
}, 'withCustomAdvancedControls');

export default withCustomAdvancedControls
 