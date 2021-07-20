/**
 * aThemes - Container Block (save)
 * 
 */

// WordPress dependencies
const { 
    InnerBlocks 
} = wp.blockEditor;

// Save
function save(props) { 
    let wrapperStyleAtt = '';
    if( props.attributes.wrapperBackgroundType == 'image' && props.attributes.wrapperBackgroundImage != null ) {
        wrapperStyleAtt = {
            style: {
                backgroundImage: `url(${ props.attributes.wrapperBackgroundImage.url })`
            }
        }
    }
    return (
        <div id={ props.attributes.wrapperID ? props.attributes.wrapperID : `athemes-blocks-block-${props.attributes.block_id}` } className={ `athemes-blocks-block athemes-blocks-block-${props.attributes.block_id} athemes-blocks-block-container align${ props.attributes.align }` }>
            <div className="athemes-blocks-block-container-wrapper" { ...wrapperStyleAtt }>
                <div className="athemes-blocks-block-container-wrapper-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}

export default save;