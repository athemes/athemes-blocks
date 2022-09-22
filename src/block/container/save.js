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
            src: props.attributes.wrapperBackgroundImage.originalImageURL,
            srcSet: srcset,
            sizes: sizes,
            alt: props.attributes.wrapperBackgroundImage.alt
        }

        if( props.attributes.wrapperBackgroundImageLazyLoading ) {
        	backgroundImageAtts.loading = 'lazy';
        }

    }

    let showHideOn = '';

    if( ! props.attributes.displayOnDesktop ) {
        showHideOn += ' athemes-blocks-block-hide-on-desktop';
    }

    if( ! props.attributes.displayOnTablet ) {
        showHideOn += ' athemes-blocks-block-hide-on-tablet';
    }

    if( ! props.attributes.displayOnMobile ) {
        showHideOn += ' athemes-blocks-block-hide-on-mobile';
    }

    return (
        <div id={ props.attributes.wrapperID ? props.attributes.wrapperID : `athemes-blocks-block-${props.attributes.block_id}` } className={ `athemes-blocks-block athemes-blocks-block-${props.attributes.block_id} athemes-blocks-block-container align${ props.attributes.align }${showHideOn}` }>
            <div className={ `athemes-blocks-block-container-wrapper athemes-blocks-block-container-bg-${ props.attributes.wrapperBackgroundImageType } athemes-blocks-block-container-bg-effect-${ props.attributes.wrapperBackgroundEffect }` }>
                {
                    props.attributes.wrapperBackgroundType == 'image' && props.attributes.wrapperBackgroundImage != null && (
                        <img { ...backgroundImageAtts } />
                    )
                }
                <div className="athemes-blocks-block-container-wrapper-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
}

export default save;
