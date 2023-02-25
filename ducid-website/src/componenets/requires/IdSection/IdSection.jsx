import React from "react";

import './IdSection.css';
import Clipboard from '../../../files/images/clipboard.png';

function IdSection(props) {
    return(
        <div>
            <label className="lable" >Your {props.purpose} id:</label><br />
            <div className="clgid" style={{display : "flex", height: '2rem'}}>
                <input value={props.ducid}  disabled={true} style={{paddingLeft:'.75rem', display : 'inline-block', width: '100%'}} type="text" />
                <a style={{height : '2rem', display : 'inline-block', border: '1px', borderStyle: 'solid', borderRadius: '4px'}} >
                    <div style={{height: '2rem', padding: '0 8px'}} type="button" className="copybutton" onClick={() =>  navigator.clipboard.writeText(props.ducid)}><img style={{display : 'inline-block' , height : '1.5rem'}} src={Clipboard} alt = "This is Clipboard" /></div>
                </a>
            </div>
        </div>
    );
}

export default IdSection;