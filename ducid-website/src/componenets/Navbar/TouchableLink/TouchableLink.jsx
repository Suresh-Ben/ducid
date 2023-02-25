import React from 'react';

import './TouchableLink.css';

function TouchableLink(props) {
    return(
        <a style={{padding : props.padding}} className='touchable-link' href={props.link}>{props.text}</a>
    );
}

export default TouchableLink;