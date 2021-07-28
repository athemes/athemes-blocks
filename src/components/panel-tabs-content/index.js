/**
 * aThemes Blocks Component - Tabs Content
 * Control to render the tabs content at inspector controls
 * Should be used in conjuction with panel tabs buttons
 * 
 */
   
function panelTabsContent( props ) {
    let editor = '';
    if( document.querySelector( '#editor' ) !== null ) {
        editor = document.querySelector( '#editor' );
    } else if( document.querySelector( '#widgets-editor' ) !== null ) {
        editor = document.querySelector( '#widgets-editor' );
    } else {
        editor = document.querySelector( '#customize-theme-controls' );
    }
    
    editor.classList.remove('athemes-blocks-tab-active-layout');
    editor.classList.remove('athemes-blocks-tab-active-style');
    editor.classList.remove('athemes-blocks-tab-active-advanced');
    editor.classList.add( `athemes-blocks-tab-active-${ props.blockProps.attributes.tabSelected }` );

    let hide_show_class = 'athemes-element-hide';
    if( props.dataTabID == props.blockProps.attributes.tabSelected ) {
        hide_show_class = 'athemes-element-show';
    }

    return (
        <div className={ `athemes-blocks-inspector-tabs-content-wrapper ${ hide_show_class }` } data-tab-id={ props.dataTabID }>
            <div className="athemes-blocks-inspector-tabs-content-layout">
            
                { props.children }

            </div>
        </div>
    );
  }
  
export default panelTabsContent