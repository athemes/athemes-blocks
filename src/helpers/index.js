/**
 * aThemes - Helpers
 * 
 */

// WordPress dependencies
const { Icon } = wp.components;

/*
 * Toggle block class identifier in the inspector controls wrapper
 *
 */
export function toggle_editor_athemes_block_selected_class( props ) {
    let editor = '';
    if( document.querySelector( '#editor' ) !== null ) {
        editor = document.querySelector( '#editor' );
    } else if( document.querySelector( '#widgets-editor' ) !== null ) {
        editor = document.querySelector( '#widgets-editor' );
    } else {
        editor = document.querySelector( '#customize-theme-controls' );
    }

    if( props.isSelected ) {
        editor.classList.add( 'athemes-block-selected' );
    } else {
        editor.classList.remove( 'athemes-block-selected' );
    }
}

/*
 * Format the rgba object and return as string
 *
 */
export function get_rgba( rgba_obj ) {
    return `rgba(${rgba_obj.r}, ${rgba_obj.g}, ${rgba_obj.b}, ${rgba_obj.a})`;
}

/*
 * Check which device type is selected and return the specified attribute value
 *
 */
export function get_block_responsive_attr_value( props, deviceType, attribute, unit ) {
    let att_value = '';

    if( unit ) {
        unit = 'Unit';
    }

    switch ( deviceType ) {
        case 'Tablet':
            att_value = props.attributes[ attribute + 'Tablet' + unit ];
            break;

        case 'Mobile':
            att_value = props.attributes[ attribute + 'Mobile' + unit ];
            break;
    
        case 'Desktop':
        default:
            att_value = props.attributes[ attribute + unit ];
            break;

    }
        
    return att_value;
}

/*
 * Mount CSS string
 *
 */
export function mount_css( id, selectors, deviceType ) {
    let css = '',
        device = deviceType ? deviceType.toLowerCase() : 'desktop';
    
    for( let i in selectors ) {
        let css_values = selectors[i],
            css_props_and_values = '';

        for( let u in css_values ) {
            css_props_and_values += u + ':' + css_values[u] + ';';
        }

        css += ( device == 'desktop' ? id : '.athemes-blocks-editor-preview-' + device.toLowerCase() + ' ' + id );
        css += ' ' + i + '{';
        css += css_props_and_values;
        css += '}';
    }

    return css;
}

/*
 * Icons
 *
 */
export function athemes_icons( icon_id ) {
    let icon = '';
    
    switch ( icon_id ) {
        case 'container-block':
            icon = <Icon icon={
                <svg className="athemes-block-icon atheme-block-container-icon" width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.33334" y="2.33333" width="23.3333" height="23.3333" rx="2" stroke="#BECCF9"/>
                    <rect x="4.83334" y="5.83333" width="16.3333" height="7" rx="1.16667" fill="#335EEA"/>
                    <rect x="4.83334" y="15.1667" width="16.3333" height="7" rx="1.16667" fill="#335EEA"/>
                </svg>
            } />
            break;
        case 'google-map-block':
            icon = <Icon icon={
                <svg className="athemes-block-icon atheme-block-google-map-icon" width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.3333 2H3C1.89543 2 1 2.89543 1 4V23.3333C1 24.4379 1.89543 25.3333 3 25.3333H22.3333C23.4379 25.3333 24.3333 24.4379 24.3333 23.3333V4C24.3333 2.89543 23.4379 2 22.3333 2Z" stroke="#BECCF9"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.3867 21.9293C13.3288 21.9729 13.2588 21.9975 13.1864 21.9998C13.114 22.0022 13.0426 21.9821 12.982 21.9424C11.6451 21.0998 10.4582 20.0399 9.46997 18.8062C8.26033 17.3348 7.44685 15.5782 7.10687 13.7033C6.82617 11.9631 7.09382 10.2905 7.9642 8.9293C8.3156 8.37637 8.75688 7.88612 9.26978 7.47881C10.3921 6.54094 11.8029 6.0187 13.2648 6C14.6805 6.02286 16.0361 6.57617 17.0641 7.55068C17.4589 7.91291 17.8003 8.32943 18.0781 8.78774C19.0072 10.3123 19.2074 12.2724 18.7983 14.2587C18.4556 15.8349 17.7999 17.326 16.8703 18.6437C15.9407 19.9614 14.7561 21.0787 13.3867 21.9293ZM13.0016 9.09483C13.592 9.09483 14.1692 9.27008 14.6602 9.59841C15.1511 9.92675 15.5338 10.3934 15.7597 10.9394C15.9857 11.4854 16.0448 12.0862 15.9296 12.6659C15.8144 13.2455 15.5301 13.7779 15.1126 14.1958C14.695 14.6137 14.1631 14.8983 13.584 15.0136C13.0049 15.1289 12.4046 15.0697 11.8591 14.8436C11.3136 14.6174 10.8473 14.2344 10.5193 13.743C10.1912 13.2516 10.0161 12.6739 10.0161 12.0829C10.0161 11.2904 10.3307 10.5304 10.8905 9.97002C11.4504 9.40964 12.2098 9.09483 13.0016 9.09483Z" fill="#335EEA"/>
                </svg>
            } />
            break;
        
        case 'padding-all':
        case 'margin-all':
            icon = <Icon icon={
                <svg width="18" height="18" viewBox="0 -3 25 25">
                    <rect height="18" width="18" y="2.99565" x="2.61607" stroke="#335eea" strokeWidth="3" fill="#FFF"/>
                </svg>
            } />
            break;

        case 'margin-top-bottom':
            icon = <Icon icon={
                <svg width="19" height="19" viewBox="0 -1 25 25">
                    <rect height="19" width="19" y="2.99565" x="2.61607" stroke="#bbbbbb" fill="#FFF"/>
                    <rect stroke="#000" strokeWidth="0" height="3.59595" width="19" y="2.35765" x="2.25034" fill="#335eea"/>
                    <rect stroke="#000" strokeWidth="0" height="3.59595" width="19" y="19" x="2.25034" fill="#335eea"/>
                </svg>
            } />
            break;
        
        case 'padding-top':
        case 'margin-top':
            icon = <Icon icon={
                <svg width="19" height="19" viewBox="0 -1 25 25">
                    <rect height="19" width="19" y="2.99565" x="2.61607" stroke="#bbbbbb" fill="#FFF"/>
                    <rect stroke="#000" strokeWidth="0" height="3.59595" width="19" y="2.35765" x="2.25034" fill="#335eea"/>
                </svg>
            } />
            break;

        case 'padding-right':
        case 'margin-right':
            icon = <Icon icon={
                <svg width="19" height="19" viewBox="-1 0 25 25" style={ { transform: 'rotate(180deg)' } }>
                    <rect height="19" width="19" y="3.58389" x="2.61607" stroke="#bbbbbb" fill="#FFF"/>
                    <rect transform="rotate(90 4.10146 33.4497)" stroke="#000" strokeWidth="0" height="3.59595" width="20" y="31.65176" x="-26.33789" fill="#335eea"/>
                </svg>
                    
            } />
            break;

        case 'padding-bottom':
        case 'margin-bottom':
            icon = <Icon icon={
                <svg width="19" height="19" viewBox="0 -1 25 25" style={ { transform: 'rotate(180deg)' } }>
                    <rect height="19" width="19" y="2.99565" x="2.61607" stroke="#bbbbbb" fill="#FFF"/>
                    <rect stroke="#000" strokeWidth="0" height="3.59595" width="19" y="2.35765" x="2.25034" fill="#335eea"/>
                </svg>
            } />
            break;

        case 'padding-left':
        case 'margin-left':
            icon = <Icon icon={
                <svg width="19" height="19" viewBox="0 -1 25 25">
                    <rect height="19" width="19" y="3.58389" x="2.61607" stroke="#bbbbbb" fill="#FFF"/>
                    <rect transform="rotate(90 4.10146 33.4497)" stroke="#000" strokeWidth="0" height="3.59595" width="60.8786" y="31.65176" x="-26.33789" fill="#335eea"/>
                </svg>  
            } />
            break;
         
        case 'settings':
            icon = <Icon icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V3C19 1.89543 18.1046 1 17 1Z" stroke="#555555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 7H19" stroke="#555555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 19V7" stroke="#555555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            } />
            break;

        case 'style':
            icon = <Icon icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.2647 1.00654C13.6449 0.904684 14.0415 0.87872 14.4317 0.930132C14.822 0.981544 15.1983 1.10932 15.5392 1.30617C15.8801 1.50303 16.1788 1.76509 16.4184 2.07741C16.658 2.38973 16.8337 2.74618 16.9355 3.12642L19.8979 14.1803C19.9998 14.5605 20.0257 14.9571 19.9743 15.3473C19.9229 15.7376 19.7951 16.1139 19.5983 16.4548C19.4014 16.7956 19.1393 17.0944 18.827 17.334C18.5147 17.5736 18.1583 17.7493 17.778 17.8511L10.9367 19.6854C10.5563 19.7876 10.1595 19.8138 9.76901 19.7626C9.3785 19.7113 9.00193 19.5836 8.66081 19.3867C8.3197 19.1898 8.02073 18.9277 7.78099 18.6152C7.54126 18.3027 7.36547 17.946 7.26366 17.5655L4.30238 6.51168C4.20052 6.13145 4.17456 5.73489 4.22597 5.34463C4.27738 4.95438 4.40516 4.57807 4.60201 4.2372C4.79886 3.89633 5.06093 3.59757 5.37325 3.35798C5.68557 3.1184 6.04202 2.94268 6.42225 2.84086L13.2647 1.00654ZM4.29148 10.686L6.2119 17.8467C6.40058 18.5566 6.77796 19.2022 7.30399 19.7148L6.82116 19.6887C6.02742 19.647 5.28274 19.2917 4.75091 18.701C4.21908 18.1104 3.94365 17.3326 3.98521 16.5389L4.29148 10.686ZM13.6876 2.58582L6.84514 4.42123C6.49632 4.51473 6.1989 4.7429 6.01824 5.05559C5.83757 5.36827 5.78845 5.7399 5.88166 6.08879L8.84294 17.1438C8.88923 17.3166 8.96912 17.4786 9.07803 17.6206C9.18694 17.7625 9.32275 17.8816 9.47771 17.9711C9.63266 18.0606 9.80372 18.1187 9.98111 18.142C10.1585 18.1654 10.3388 18.1535 10.5116 18.1072L17.3551 16.2729C17.704 16.1794 18.0014 15.9512 18.182 15.6386C18.3627 15.3259 18.4118 14.9542 18.3186 14.6054L15.3562 3.5493C15.2627 3.20049 15.0346 2.90307 14.7219 2.7224C14.4092 2.54174 14.0376 2.49261 13.6887 2.58582H13.6876ZM3.28331 9.07515L2.89639 16.4822C2.85606 17.2429 3.02718 17.9666 3.35851 18.5966L2.90729 18.4211C2.53979 18.2801 2.20368 18.068 1.91814 17.7971C1.63259 17.5262 1.40322 17.2016 1.2431 16.842C1.08299 16.4824 0.995278 16.0948 0.984975 15.7013C0.974671 15.3078 1.04198 14.9162 1.18305 14.5487L3.28331 9.07515ZM8.58354 5.64629C8.72181 5.60922 8.86602 5.59974 9.00794 5.6184C9.14987 5.63707 9.28672 5.6835 9.4107 5.75505C9.53468 5.82661 9.64335 5.92188 9.73051 6.03543C9.81767 6.14898 9.88161 6.27859 9.91868 6.41685C9.95575 6.55512 9.96523 6.69933 9.94657 6.84125C9.9279 6.98318 9.88147 7.12003 9.80992 7.24401C9.73836 7.36799 9.64309 7.47667 9.52954 7.56382C9.41599 7.65098 9.28638 7.71492 9.14812 7.75199C9.00985 7.78906 8.86564 7.79854 8.72372 7.77988C8.5818 7.76122 8.44494 7.71478 8.32096 7.64323C8.07057 7.49872 7.88784 7.26066 7.81298 6.98143C7.73811 6.70219 7.77723 6.40466 7.92174 6.15427C8.06625 5.90388 8.30431 5.72115 8.58354 5.64629Z" fill="#555555"/>
                </svg>

            } />
            break;

        case 'advanced':
            icon = <Icon icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 13.7273C12.5062 13.7273 13.7273 12.5062 13.7273 11C13.7273 9.49377 12.5062 8.27273 11 8.27273C9.49375 8.27273 8.27271 9.49377 8.27271 11C8.27271 12.5062 9.49375 13.7273 11 13.7273Z" stroke="#555555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.7273 13.7273C17.6063 14.0015 17.5702 14.3056 17.6236 14.6005C17.6771 14.8954 17.8177 15.1676 18.0273 15.3818L18.0818 15.4364C18.2509 15.6052 18.385 15.8057 18.4765 16.0265C18.568 16.2472 18.6151 16.4838 18.6151 16.7227C18.6151 16.9617 18.568 17.1983 18.4765 17.419C18.385 17.6397 18.2509 17.8402 18.0818 18.0091C17.913 18.1781 17.7124 18.3122 17.4917 18.4037C17.271 18.4952 17.0344 18.5423 16.7955 18.5423C16.5565 18.5423 16.3199 18.4952 16.0992 18.4037C15.8785 18.3122 15.678 18.1781 15.5091 18.0091L15.4545 17.9545C15.2403 17.745 14.9682 17.6044 14.6733 17.5509C14.3784 17.4974 14.0742 17.5335 13.8 17.6545C13.5311 17.7698 13.3018 17.9611 13.1403 18.205C12.9788 18.4489 12.8921 18.7347 12.8909 19.0273V19.1818C12.8909 19.664 12.6994 20.1265 12.3584 20.4675C12.0174 20.8084 11.5549 21 11.0727 21C10.5905 21 10.1281 20.8084 9.78708 20.4675C9.4461 20.1265 9.25455 19.664 9.25455 19.1818V19.1C9.24751 18.7991 9.15011 18.5073 8.97501 18.2625C8.79991 18.0176 8.55521 17.8312 8.27273 17.7273C7.99853 17.6063 7.69437 17.5702 7.39947 17.6236C7.10456 17.6771 6.83244 17.8177 6.61818 18.0273L6.56364 18.0818C6.39478 18.2509 6.19425 18.385 5.97353 18.4765C5.7528 18.568 5.51621 18.6151 5.27727 18.6151C5.03834 18.6151 4.80174 18.568 4.58102 18.4765C4.36029 18.385 4.15977 18.2509 3.99091 18.0818C3.82186 17.913 3.68775 17.7124 3.59626 17.4917C3.50476 17.271 3.45766 17.0344 3.45766 16.7955C3.45766 16.5565 3.50476 16.3199 3.59626 16.0992C3.68775 15.8785 3.82186 15.678 3.99091 15.5091L4.04545 15.4545C4.25503 15.2403 4.39562 14.9682 4.4491 14.6733C4.50257 14.3784 4.46647 14.0742 4.34545 13.8C4.23022 13.5311 4.03887 13.3018 3.79497 13.1403C3.55107 12.9788 3.26526 12.8921 2.97273 12.8909H2.81818C2.33597 12.8909 1.87351 12.6994 1.53253 12.3584C1.19156 12.0174 1 11.5549 1 11.0727C1 10.5905 1.19156 10.1281 1.53253 9.78708C1.87351 9.4461 2.33597 9.25455 2.81818 9.25455H2.9C3.2009 9.24751 3.49273 9.15011 3.73754 8.97501C3.98236 8.79991 4.16883 8.55521 4.27273 8.27273C4.39374 7.99853 4.42984 7.69437 4.37637 7.39947C4.3229 7.10456 4.18231 6.83244 3.97273 6.61818L3.91818 6.56364C3.74913 6.39478 3.61503 6.19425 3.52353 5.97353C3.43203 5.7528 3.38493 5.51621 3.38493 5.27727C3.38493 5.03834 3.43203 4.80174 3.52353 4.58102C3.61503 4.36029 3.74913 4.15977 3.91818 3.99091C4.08704 3.82186 4.28757 3.68775 4.50829 3.59626C4.72901 3.50476 4.96561 3.45766 5.20455 3.45766C5.44348 3.45766 5.68008 3.50476 5.9008 3.59626C6.12152 3.68775 6.32205 3.82186 6.49091 3.99091L6.54545 4.04545C6.75971 4.25503 7.03183 4.39562 7.32674 4.4491C7.62164 4.50257 7.9258 4.46647 8.2 4.34545H8.27273C8.54161 4.23022 8.77092 4.03887 8.93245 3.79497C9.09397 3.55107 9.18065 3.26526 9.18182 2.97273V2.81818C9.18182 2.33597 9.37338 1.87351 9.71435 1.53253C10.0553 1.19156 10.5178 1 11 1C11.4822 1 11.9447 1.19156 12.2856 1.53253C12.6266 1.87351 12.8182 2.33597 12.8182 2.81818V2.9C12.8193 3.19253 12.906 3.47834 13.0676 3.72224C13.2291 3.96614 13.4584 4.15749 13.7273 4.27273C14.0015 4.39374 14.3056 4.42984 14.6005 4.37637C14.8954 4.3229 15.1676 4.18231 15.3818 3.97273L15.4364 3.91818C15.6052 3.74913 15.8057 3.61503 16.0265 3.52353C16.2472 3.43203 16.4838 3.38493 16.7227 3.38493C16.9617 3.38493 17.1983 3.43203 17.419 3.52353C17.6397 3.61503 17.8402 3.74913 18.0091 3.91818C18.1781 4.08704 18.3122 4.28757 18.4037 4.50829C18.4952 4.72901 18.5423 4.96561 18.5423 5.20455C18.5423 5.44348 18.4952 5.68008 18.4037 5.9008C18.3122 6.12152 18.1781 6.32205 18.0091 6.49091L17.9545 6.54545C17.745 6.75971 17.6044 7.03183 17.5509 7.32674C17.4974 7.62164 17.5335 7.9258 17.6545 8.2V8.27273C17.7698 8.54161 17.9611 8.77092 18.205 8.93245C18.4489 9.09397 18.7347 9.18065 19.0273 9.18182H19.1818C19.664 9.18182 20.1265 9.37338 20.4675 9.71435C20.8084 10.0553 21 10.5178 21 11C21 11.4822 20.8084 11.9447 20.4675 12.2856C20.1265 12.6266 19.664 12.8182 19.1818 12.8182H19.1C18.8075 12.8193 18.5217 12.906 18.2778 13.0676C18.0339 13.2291 17.8425 13.4584 17.7273 13.7273V13.7273Z" stroke="#555555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            } />
            break;

        case 'link':
            icon = <Icon icon={
                <svg width="16.5" height="16.5" viewBox="0 3 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="#212121" strokeWidth="0.5" d="M14.101,42.314c-1.87,0-3.628-0.729-4.95-2.051L7.736,38.85c-2.729-2.729-2.729-7.171,0-9.899l9.192-9.192     c1.322-1.322,3.08-2.051,4.95-2.051s3.628,0.729,4.949,2.051l1.414,1.414c0.391,0.391,0.391,1.023,0,1.414s-1.023,0.391-1.414,0     l-1.414-1.414c-0.944-0.944-2.2-1.465-3.535-1.465c-1.336,0-2.592,0.521-3.536,1.465L9.15,30.364     c-1.949,1.949-1.949,5.121,0,7.071l1.414,1.414c0.944,0.944,2.2,1.465,3.536,1.465c1.335,0,2.591-0.521,3.535-1.465L24,32.485     c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-6.364,6.364C17.729,41.586,15.971,42.314,14.101,42.314z"/>
                    <path stroke="#212121" strokeWidth="0.5" d="M26.121,30.293c-1.869,0-3.628-0.729-4.949-2.051c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0     c0.944,0.944,2.2,1.465,3.535,1.465c1.336,0,2.592-0.521,3.536-1.465l9.192-9.192c1.949-1.949,1.949-5.121,0-7.07L37.436,9.15     c-1.949-1.949-5.122-1.949-7.071,0L24,15.515c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414l6.364-6.364     c2.729-2.729,7.17-2.729,9.899,0l1.414,1.415c2.729,2.729,2.729,7.17,0,9.898l-9.192,9.192     C29.75,29.564,27.991,30.293,26.121,30.293z"/>
                </svg>
            } />
            break;

        case 'broken-link':
            icon = <Icon icon={
                <svg width="15" height="15" viewBox="0 3 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="#212121" strokeWidth="0.1" d="M29.35,6.88,25.11,2.63a3,3,0,0,0-4.23,0L14.64,8.81l1.41,1.42,6.23-6.18a1,1,0,0,1,1.42,0l4.24,4.24a1,1,0,0,1,0,1.42L21.7,15.89l1.41,1.42,6.23-6.18A2.94,2.94,0,0,0,30.23,9,3,3,0,0,0,29.35,6.88Z"/>
                    <path stroke="#212121" strokeWidth="0.1" d="M9.71,27.89a1,1,0,0,1-1.41,0L4.06,23.64a1,1,0,0,1-.3-.71,1,1,0,0,1,.3-.71L10.29,16,8.88,14.62,2.65,20.8a3,3,0,0,0,0,4.26L6.88,29.3A3,3,0,0,0,9,30.17a3,3,0,0,0,2.11-.86l6.23-6.19L15.94,21.7Z"/>
                    <rect stroke="#212121" strokeWidth="0.1" height="5" width="2" x="11" y="5"/>
                    <rect stroke="#212121" strokeWidth="0.1" height="2" width="5" x="5" y="11"/>
                    <rect stroke="#212121" strokeWidth="0.1" height="5" width="2" x="19" y="22"/>
                    <rect stroke="#212121" strokeWidth="0.1" height="2" width="5" x="22" y="19"/>
                </svg>
            } />
            break;
    }

    return icon;
}

/*
 * Media Upload - Check if is image 
 * 
 */
export function media_is_image( media, props, att ) {
    if( media.type == 'image' ) {
        props.setAttributes( { [att]: media } )
        return;
    }
}

/*
 * Create responsive attributes
 *
 */
export function createResponsiveAttributes( attrName, defaults, unit ) {
    
    const responsiveModes = ['', 'Tablet', 'Mobile'];

    let obj = {}
    let attWithMode = {}

    responsiveModes.forEach( ( mode ) => {
        attWithMode = {
            [attrName + mode] : {
                ...defaults
            }
        }

        if( typeof unit !== 'undefined' ) {
            if( typeof unit === 'boolean' ) {
                unit = 'px';
            }
            const attWithModeUnit = {
                [attrName + mode + 'Unit'] : {
                    type: 'string',
                    default: unit
                }
            }
            
            attWithMode = { ...attWithMode, ...attWithModeUnit }
        }

        obj = { ...obj, ...attWithMode }
    } );

    return obj;
}

/*
 * Global attributes
 *
 */
export function control_atts( type ) {
    let obj = {}

    switch ( type ) {
        case 'background':
            obj = {
                wrapperBackgroundType: {
                    type: 'string',
                    default: 'color'
                },
                wrapperBackgroundColor: {
                    type: 'string',
                    default: '#f4f4f4'
                },
                wrapperBackgroundGradientColor1: {
                    type: 'string',
                    default: '#f7f7f7'
                },
                wrapperBackgroundGradientColor1Position: {
                    type: 'number',
                    default: 0
                },
                wrapperBackgroundGradientColor2: {
                    type: 'string',
                    default: '#bbbbbb'
                },
                wrapperBackgroundGradientColor2Position: {
                    type: 'number',
                    default: 100
                },
                wrapperBackgroundGradientDegree: {
                    type: 'number',
                    default: 45
                },
                wrapperBackgroundImage: {
                    type: 'object'
                },
                wrapperBackgroundImageType: {
                    type: 'string',
                    default: 'cover'
                },
                wrapperBackgroundImageLazyLoading: {
                    type: 'boolean',
                    default: true
                },
                wrapperBackgroundPosition: {
                    type: 'string',
                    default: 'center'
                },
                wrapperBackgroundEffect: {
                    type: 'string',
                    default: 'scroll'
                },
                wrapperBackgroundParallaxTransition: {
                    type: 'number',
                    default: 0
                }
            }
            break;
    }

    return obj;
}
