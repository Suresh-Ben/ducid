import React from "react";

import './SecondaryButton.css';

function SecondaryButton(props){
    return (
        <div>
            <a href={props.link} onClick={props.onClick} className="secondary-button secondary-button-hover">
                {props.text}
            </a>
        </div>
    )
}
export default SecondaryButton