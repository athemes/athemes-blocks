/**
 * aThemes - Google Map Block (save)
 */

// WordPress dependencies
import {
    useBlockProps
} from '@wordpress/block-editor';

import {
    RawHTML
} from '@wordpress/element';

const save = ( props ) => {

    const { attributes } = props;

    const { block_id, iframe } = attributes;

    const blockClassName = `athemes-blocks-block athemes-blocks-block-${block_id.substr( 0, 8 )} athemes-blocks-block-google-map`;

    const blockProps = useBlockProps.save({className: blockClassName});

    return (
        <RawHTML { ...blockProps }>
            { iframe }
        </RawHTML>
    );
}

export default save;