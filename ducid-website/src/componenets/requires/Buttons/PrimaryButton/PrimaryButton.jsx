import React from "react";

import './PrimaryButton.css';

function PrimaryButton(props) {
    return (
        <a href={props.link} >
            <button type={props.type} onClick={props.onClick} className="primary-button-hover primary-button">
                {props.text}
            </button>
        </a>
    )
}
export default PrimaryButton;