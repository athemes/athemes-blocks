/**
 * aThemes Blocks Component - Tabs Content
 * Control to render the tabs content at inspector controls
 * Should be used in conjuction with panel tabs buttons
 * 
 */
   
function panelTabsContent( props ) {
    document.querySelector('#editor').classList.remove('athemes-blocks-tab-active-layout');
    document.querySelector('#editor').classList.remove('athemes-blocks-tab-active-style');
    document.querySelector('#editor').classList.remove('athemes-blocks-tab-active-advanced');
    document.querySelector('#editor').classList.add( `athemes-blocks-tab-active-${ props.blockProps.attributes.tabSelected }` );

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